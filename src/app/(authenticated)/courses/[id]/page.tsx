import ClassesPlaylist from './components/classesPlaylist'
import { getUser } from '@/lib/auth'
import TabsContainer from './components/tabsContainer'
import Header from './components/header'
import { ClassesContextProvider } from './context/ClassesContext'

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

  return (
    <ClassesContextProvider>
      <div className="w-full flex pl-10 gap-6 justify-between">
        <main className="w-5/6 mt-11">
          <Header />
          <div className="bg-red-600 h-60 w-full">...</div>
          <TabsContainer
            courseId={params.id}
            token={token}
            username={profile?.nome_completo}
            usernameId={profile?.usuario as number}
          />
        </main>
        <ClassesPlaylist token={token} courseId={params.id} />
      </div>
    </ClassesContextProvider>
  )
}
