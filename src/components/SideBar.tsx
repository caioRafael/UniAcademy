'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Icon } from './Icon'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { CrownIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Profile from '@/types/Profile'

interface SideBarProps {
  profile?: Profile | null
}

const SideBar = ({ profile }: SideBarProps) => {
  const pathname = usePathname()
  const currentPage = pathname.split('/')[1]
  const router = useRouter()

  const goToPage = (route: string) => {
    router.push(`/${route}`)
  }

  async function logout(route: string) {
    await signOut({
      redirect: false,
    })

    router.replace(route)
  }

  const menuOptions = [
    {
      id: 1,
      title: 'Início',
      route: 'home',
      icon: 'home',
    },
    {
      id: 2,
      title: 'Cursos',
      route: 'courses',
      icon: 'play',
    },
    {
      id: 5,
      title: 'Fóruns',
      route: 'foruns',
      icon: 'subtitles',
    },
    {
      id: 6,
      title: 'Vitrine de Projetos',
      route: 'projects',
      icon: 'library',
    },
    {
      id: 7,
      title: 'Vagas',
      route: 'jobs',
      icon: 'rocket',
    },
    {
      id: 8,
      title: 'Ranking',
      route: 'ranking',
      icon: 'line-chart',
    },
    {
      id: 9,
      title: 'Mural de Avisos',
      route: 'noticeBoard',
      icon: 'album',
    },
    {
      id: 11,
      title: 'Sair',
      route: 'logout',
      icon: 'log-out',
      onClick: () => logout('/'),
    },
  ]

  return (
    <nav className="mt-10 mb-10">
      <div className="w-full h-full flex flex-col gap-2 items-center justify-start border-r border-solid border-border px-5 ">
        {profile?.tipo_usuario === 'visitante' && (
          <div className="bg-white border rounded-sm pl-4 pr-4 pt-2 pb-2 mb-5">
            <div className="flex flex-row justify-between mb-2">
              <CrownIcon />
              <button
                className="text-xxs text-secondary"
                onClick={() => logout('/signUp')}
              >
                Registre-se
              </button>
            </div>
            <p className="text-xxxs font-semibold text-left">
              Tenha acesso completo registrando-se como aluno ou professor
            </p>
          </div>
        )}
        {menuOptions.map(({ title, route, icon, id, onClick }) => {
          function handleOnClick() {
            if (route === 'logout') {
              return onClick && onClick()
            }

            return goToPage(route)
          }
          return (
            <div key={id} className="group  w-full h-9 ">
              <button
                className={` w-full h-9 flex gap-2 items-center px-3 rounded-md py-0.5 transition-all ${
                  currentPage === route && 'bg-secondary'
                } group-hover:bg-secondary`}
                onClick={handleOnClick}
              >
                <Icon
                  name={icon as keyof typeof dynamicIconImports}
                  height={16}
                  width={16}
                  className={`${
                    currentPage === route ? 'text-white' : 'text-black4'
                  } transition-all group-hover:text-white`}
                />
                <span
                  className={`text-xxs font-medium  transition-all ${
                    currentPage === route ? 'text-white' : 'text-black4'
                  } group-hover:text-white`}
                >
                  {title}
                </span>
              </button>
            </div>
          )
        })}
      </div>
    </nav>
  )
}

export default SideBar
