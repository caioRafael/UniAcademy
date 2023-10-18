import { Title } from '@/components/Title'
import { ModuleForm } from './components/ModuleForm'
import { CourseContextProvider } from './context/CourseContext'
import { getUser } from '@/lib/auth'

export default async function CreateCoursePage() {
  const { id, token } = await getUser()
  return (
    <div className="w-full flex flex-col px-8 py-16 gap-10">
      <Title title="Criar curso" />
      <section className="flex flex-col items-center px-20">
        <CourseContextProvider>
          <ModuleForm userId={id} token={token} />
        </CourseContextProvider>
      </section>
    </div>
  )
}
