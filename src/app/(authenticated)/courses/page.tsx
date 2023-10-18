import { Title } from '@/components/Title'
import { getUser } from '@/lib/auth'
import GraduationsList from './components/graduationsList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ClassesContextProvider } from './[id]/context/ClassesContext'

export default async function Courses() {
  const { token, profile } = await getUser()
  const userIsTeacher = profile?.tipo_usuario === 'professor'

  return (
    <ClassesContextProvider>
      <div className="w-full pt-16 px-9 mb-8">
        <div className="flex justify-between items-center mb-14">
          <Title title="Cursos" />
          {userIsTeacher && (
            <Button>
              <Link className="text-xxs text-white" href="/courses/create">
                Adicionar Curso
              </Link>
            </Button>
          )}
        </div>
        <GraduationsList token={token} />
      </div>
    </ClassesContextProvider>
  )
}
