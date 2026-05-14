import { Header } from '@/components/Header'
import { Chat } from '@/components/Chat'

export const metadata = {
  title: 'Chat IA — BogleHub',
  description: 'Pregunta lo que quieras sobre inversión, fondos indexados, FIRE. Chat con IA gratis en español.',
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
