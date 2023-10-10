import { Title } from '@/components/Title'

import { getUser } from '@/lib/auth'
import { Content } from './components/Content'

export default async function Page({ params }: { params: { id: string } }) {
  const { token } = await getUser()

  return (
    <div className="w-full h-full flex flex-col px-8 pt-16 gap-10">
      <Title title="Fórum" />
      <Content token={token} id={params.id} />
    </div>
  )
}
