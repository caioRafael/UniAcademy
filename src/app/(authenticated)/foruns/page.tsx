import { Title } from '@/components/Title'
import { ForunsTable } from './components/table'
import { getUser } from '@/lib/auth'
export default async function Foruns() {
  const { token } = await getUser()
  return (
    <div className="w-full flex flex-col px-8 pt-16 gap-10">
      <Title title="Fórum" />
      <section className="pl-6">
        <p className="text-xxs">Conheça o nosso fórum e tire suas dúvidas</p>
        <div className="w-full mt-1 py-5 px-6 border rounded-sm">
          <ForunsTable token={token} />
        </div>
      </section>
    </div>
  )
}
