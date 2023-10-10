import Profile from '@/types/Profile'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Progress } from '../ui/progress'

interface UserProfileConainerProps {
  profile: Profile
}

export function UserProfileConainer(props: UserProfileConainerProps) {
  const { profile } = props
  const initalsName = profile?.nome_completo.split(' ') as string[]
  return (
    <div className="flex flex-col h-full space-y-9">
      {/* <div>
        <h1 className="font-semibold text-sm">Perfil do usuário</h1>
        <div className="w-28 h-1 rounded-sm bg-secondary" />
      </div> */}

      <div className="flex gap-3 items-center">
        <Avatar className="w-14 h-14">
          <AvatarImage src="" />
          <AvatarFallback className="text-secondary">
            {initalsName[0].charAt(0).toUpperCase()}
            {initalsName[1]?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <section className="flex flex-col">
          <h1 className="text-sm font-semibold">{profile.nome_completo}</h1>
          <p className="font-normal text-xs">Curso - campus</p>
        </section>
      </div>

      <div className="flex flex-col">
        <h1>Nivel 14</h1>
        <Progress value={74} className="w-2/3 h-2" />
      </div>
    </div>
  )
}
