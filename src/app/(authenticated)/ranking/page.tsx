import { Title } from '@/components/Title'
import Lista from './Components/Lista'
import { getUser } from '@/lib/auth'

export default async function Ranking() {
  const { token } = await getUser()

  return (
    <div className="w-full max-h-[80vh] flex-col p-2">
      <section className="w-full p-2 h-10 mb-4 flex items-center justify-between">
        <Title title="Ranking" />
      </section>
      <Lista token={token} />
    </div>
  )
}
