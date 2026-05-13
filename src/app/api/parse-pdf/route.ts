import { NextRequest, NextResponse } from 'next/server'
import { parsePdf } from '@/lib/pdf-parser'

const MAX_SIZE = 5 * 1024 * 1024

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ success: false, error: 'No se recibió archivo' }, { status: 400 })
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ success: false, error: 'El archivo supera los 5MB' }, { status: 400 })
    }
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ success: false, error: 'Solo se aceptan archivos PDF' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await parsePdf(buffer)
    return NextResponse.json({ success: true, data: result })
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Error desconocido',
    }, { status: 500 })
  }
}
