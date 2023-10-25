import { CoursesContainer } from './components/CoursesContainer'

import { getUser } from '@/lib/auth'
import Profile from '@/types/Profile'

export default async function Profile() {
  const { id, token, profile } = await getUser()
  return (
    <div className="w-full h-full flex flex-col px-6 pt-14 gap-4 mb-6">
      <div className="flex flex-col h-[400px] gap-6">
        <h1 className="border-l-4 border-secondary pl-1 font-semibold text-xs">
          Meus cursos
        </h1>
        <CoursesContainer
          userId={id}
          token={token}
          profile={profile as Profile}
        />
      </div>
    </div>
  )
}
