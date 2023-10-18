import { Title } from '@/components/Title'

import { getUser } from '@/lib/auth'
import { Content } from './components/Content'

export default async function Page({ params }: { params: { id: number } }) {
  const { token, id } = await getUser()

  return (
    <div className="w-full h-full flex flex-col px-8 pt-16 gap-10">
      <Title title="Fórum" />
      <Content token={token} usuario_criacao={id} id={params.id} />
    </div>
  )
}
