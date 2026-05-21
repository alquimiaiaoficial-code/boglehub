import { Header } from '@/components/Header'
import { Chat } from '@/components/Chat'

export const metadata = {
  title: 'Chat IA sobre inversión indexada en español',
  description: 'Pregunta lo que quieras sobre fondos indexados, ETFs, FIRE o fiscalidad. Chat con IA especializado en inversión pasiva, gratis y en español.',
  openGraph: {
    images: [`/api/og?title=${encodeURIComponent('Chat IA')}&subtitle=${encodeURIComponent('Preguntas sobre ETFs, FIRE y fiscalidad')}`],
  },
}

export default function ChatPage() {
  return (
    <>
      <Header />
      <main className="bg-bg">
        <Chat />
      </main>
    </>
  )
}
