# -*- coding: utf-8 -*-
# Auditoría de la web entera contra una copia local, sin tocar producción (28-sep-2026).
# Uso: npm run build && npx next start -p 3100, y luego:
#   python scripts/auditoria-web.py [http://localhost:3100] [salida.json]
# NO apuntarlo a boglehub.com: son ~500 peticiones seguidas y el filtro anti bots de Vercel
# responde 403 (reto), que no es una caída.
# Recorre el sitemap, sigue los enlaces internos de cada página y revisa lo que suele romperse
# sin que nadie lo vea.
import sys, re, json, html, urllib.request, urllib.error, concurrent.futures as cf
from collections import defaultdict, Counter
from urllib.parse import urljoin, urlparse
sys.stdout.reconfigure(encoding='utf-8')

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:3100'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'auditoria.json'

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None
opener = urllib.request.build_opener(NoRedirect)

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'auditoria-boglehub'})
    try:
        r = opener.open(req, timeout=60)
        return r.status, dict(r.headers), r.read().decode('utf-8', 'replace')
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers), e.read().decode('utf-8', 'replace') if e.code < 500 else ''
    except Exception as e:
        return 'ERR ' + type(e).__name__, {}, ''

def local(u):
    p = urlparse(u)
    return BASE + (p.path or '/') + (('?' + p.query) if p.query else '')

# 1. URLs del sitemap
_, _, sm = get(BASE + '/sitemap.xml')
sitemap = [local(u) for u in re.findall(r'<loc>([^<]+)</loc>', sm)]
print('sitemap:', len(sitemap))

paginas = {}
def revisar(url):
    st, hd, body = get(url)
    info = {'status': st}
    if st == 200 and 'text/html' in hd.get('Content-Type', hd.get('content-type', '')):
        t = body
        m = re.search(r'<title>(.*?)</title>', t, re.S)
        info['title'] = html.unescape(m.group(1).strip()) if m else None
        m = re.search(r'<meta name="description" content="([^"]*)"', t)
        info['desc'] = html.unescape(m.group(1)) if m else None
        m = re.search(r'<link rel="canonical" href="([^"]*)"', t)
        info['canonical'] = m.group(1) if m else None
        m = re.search(r'<meta name="robots" content="([^"]*)"', t)
        info['robots'] = m.group(1) if m else None
        info['h1'] = len(re.findall(r'<h1[\s>]', t))
        info['img_sin_alt'] = len([x for x in re.findall(r'<img\b[^>]*>', t) if ' alt=' not in x])
        # datos estructurados
        ld_mal = 0
        tipos = []
        for bloque in re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', t, re.S):
            try:
                d = json.loads(bloque)
                tipos.append(d.get('@type') if isinstance(d, dict) else 'lista')
            except Exception:
                ld_mal += 1
        info['jsonld_mal'] = ld_mal
        info['jsonld_tipos'] = tipos
        # enlaces internos
        hrefs = set()
        for h in re.findall(r'<a[^>]+href="([^"#]+)"', t):
            h = html.unescape(h)
            if h.startswith('/') and not h.startswith('//'):
                hrefs.add(BASE + h.split('#')[0])
            elif h.startswith('https://boglehub.com'):
                hrefs.add(local(h))
        info['enlaces'] = sorted(hrefs)
        info['bytes'] = len(body.encode('utf-8'))
        # textos que no deberían salir nunca
        visible = re.sub(r'<script.*?</script>|<style.*?</style>', ' ', t, flags=re.S)
        visible = html.unescape(re.sub(r'<[^>]+>', ' ', visible))
        info['sospechosos'] = sorted(set(re.findall(r'\b(undefined|NaN|\[object Object\]|null €|Infinity)\b', visible)))
    elif isinstance(st, int) and 300 <= st < 400:
        info['location'] = hd.get('Location') or hd.get('location')
    return url, info

with cf.ThreadPoolExecutor(8) as ex:
    for url, info in ex.map(revisar, sitemap):
        paginas[url] = info

# 2. Enlaces internos que no están en el sitemap: comprobar que existen
todos = set()
origen = defaultdict(list)
for u, i in paginas.items():
    for h in i.get('enlaces', []):
        todos.add(h)
        if len(origen[h]) < 3:
            origen[h].append(u.replace(BASE, ''))
fuera = sorted(h for h in todos if h not in paginas)
print('enlaces internos distintos:', len(todos), '| fuera del sitemap:', len(fuera))
with cf.ThreadPoolExecutor(8) as ex:
    for url, info in ex.map(revisar, fuera):
        info['fuera_sitemap'] = True
        paginas[url] = info

json.dump({'paginas': paginas, 'origen': origen}, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False)

# 3. Informe
rotos = {u: i for u, i in paginas.items() if not (i['status'] == 200 or (isinstance(i['status'], int) and 300 <= i['status'] < 400))}
print('\n== ENLACES ROTOS O PÁGINAS CON ERROR:', len(rotos))
for u, i in sorted(rotos.items()):
    print(' ', i['status'], u.replace(BASE, ''), '<- desde', origen.get(u, ['(sitemap)'])[:3])

redirs = {u: i for u, i in paginas.items() if isinstance(i['status'], int) and 300 <= i['status'] < 400}
print('\n== REDIRECCIONES ENLAZADAS DESDE DENTRO:', len(redirs))
for u, i in sorted(redirs.items())[:40]:
    print(' ', i['status'], u.replace(BASE, ''), '->', i.get('location'), '<- desde', origen.get(u, ['(sitemap)'])[:2])

ok = {u: i for u, i in paginas.items() if i['status'] == 200 and 'title' in i}
print('\n== PÁGINAS HTML 200:', len(ok))
sin_title = [u for u, i in ok.items() if not i['title']]
sin_desc = [u for u, i in ok.items() if not i['desc']]
print('sin <title>:', len(sin_title), sin_title[:5])
print('sin description:', len(sin_desc), [u.replace(BASE, '') for u in sin_desc[:10]])
largos = [(len(i['title']), u.replace(BASE, '')) for u, i in ok.items() if i['title'] and len(i['title']) > 70]
print('títulos de más de 70 caracteres:', len(largos))
dt = Counter(i['title'] for i in ok.values() if i['title'])
dup_t = {t: n for t, n in dt.items() if n > 1}
print('títulos duplicados:', len(dup_t))
for t, n in list(dup_t.items())[:10]:
    print('   ', n, '×', t[:100], [u.replace(BASE, '') for u, i in ok.items() if i['title'] == t][:4])
dd = Counter(i['desc'] for i in ok.values() if i['desc'])
dup_d = {t: n for t, n in dd.items() if n > 1}
print('descripciones duplicadas:', len(dup_d))
for t, n in list(dup_d.items())[:8]:
    print('   ', n, '×', t[:90], [u.replace(BASE, '') for u, i in ok.items() if i['desc'] == t][:4])
h1mal = [(i['h1'], u.replace(BASE, '')) for u, i in ok.items() if i['h1'] != 1]
print('páginas sin h1 o con varios:', len(h1mal), h1mal[:15])
print('imágenes sin alt:', sum(i['img_sin_alt'] for i in ok.values()), [u.replace(BASE, '') for u, i in ok.items() if i['img_sin_alt']][:8])
print('JSON-LD que no parsea:', [u.replace(BASE, '') for u, i in ok.items() if i['jsonld_mal']])
sosp = {u.replace(BASE, ''): i['sospechosos'] for u, i in ok.items() if i['sospechosos']}
print('textos sospechosos (undefined, NaN...):', len(sosp), list(sosp.items())[:10])
sin_canon = [u.replace(BASE, '') for u, i in ok.items() if not i['canonical']]
print('sin canonical:', len(sin_canon), sin_canon[:8])
noidx_en_sitemap = [u.replace(BASE, '') for u, i in ok.items() if not i.get('fuera_sitemap') and i['robots'] and 'noindex' in i['robots']]
print('en el sitemap PERO noindex:', len(noidx_en_sitemap), noidx_en_sitemap[:10])
canon_raro = [(u.replace(BASE, ''), i['canonical']) for u, i in ok.items() if i['canonical'] and not i.get('fuera_sitemap') and urlparse(i['canonical']).path.rstrip('/') != urlparse(u).path.rstrip('/')]
print('canonical que apunta a otra URL (en el sitemap):', len(canon_raro), canon_raro[:8])
pesadas = sorted(((i['bytes'], u.replace(BASE, '')) for u, i in ok.items()), reverse=True)[:5]
print('HTML más pesados (bytes):', pesadas)
