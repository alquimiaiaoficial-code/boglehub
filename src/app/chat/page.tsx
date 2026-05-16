import { Header } from '@/components/Header'
import { Chat } from '@/components/Chat'

export const metadata = {
  title: 'Chat IA',
  description: 'Pregunta lo que quieras sobre inversión, fondos indexados, FIRE. Chat con IA gratis en español.',
  openGraph: {
    images: [`/api/og?title=${encodeURIComponent('Chat IA')}&subtitle=${encodeURIComponent('Pregunta sobre inversión y fondos indexados')}`],
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
