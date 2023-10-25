import ClassesPlaylist from './components/classesPlaylist'
import { getUser } from '@/lib/auth'
import TabsContainer from './components/tabsContainer'
import Header from './components/header'
import { ClassesContextProvider } from './context/ClassesContext'
import { VideoPlayerContextProvider } from './context/VideoPlayContext'
import ClassVideoContent from './components/classVideoContent'

export interface Option {
  id: number
  label: string
  component: any
}

interface ClassesProps {
  params: {
    id: number
  }
}

export default async function Classes(props: ClassesProps) {
  const { params } = props
  const { token, profile } = await getUser()
  const userIsTeacher = profile?.tipo_usuario === 'professor'
  const userIsStudent = profile?.tipo_usuario === 'aluno'
  return (
    <ClassesContextProvider>
      <VideoPlayerContextProvider>
        <div className="w-full flex pl-10 gap-6 justify-between">
          <main className="w-5/6 mt-11">
            <Header
              token={token}
              profileType={profile?.tipo_usuario || ''}
              userId={profile?.usuario || 0}
            />
            <ClassVideoContent
              usernameId={profile?.usuario as number}
              token={token}
            />
            <TabsContainer
              courseId={params.id}
              token={token}
              usernameId={profile?.usuario as number}
            />
          </main>
          <ClassesPlaylist
            token={token}
            courseId={params.id}
            usernameId={profile?.usuario as number}
            userIsTeacher={userIsTeacher}
            profileId={profile?.id as number}
            userIsStudent={userIsStudent}
          />
        </div>
      </VideoPlayerContextProvider>
    </ClassesContextProvider>
  )
}
