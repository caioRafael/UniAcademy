import { getUser } from '@/lib/auth'
import Recommended from './components/recommended/recommended'

export default async function Home() {
  const { token } = await getUser()

  return (
    <div className="flex flex-col w-full px-4 py-6 gap-8">
      <Recommended token={token} />
    </div>
  )
}
