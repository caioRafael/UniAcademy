import { getUser } from '@/lib/auth'
import { Content } from './content'

export default async function Foruns() {
  const { token, id, profile } = await getUser()
  return (
    <Content token={token} id={id} typeUser={profile?.tipo_usuario || ''} />
  )
}
