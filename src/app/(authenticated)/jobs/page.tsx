import { Title } from '@/components/Title'
import { JobsContainer } from './componetns/JobsContainer'
import { getUser } from '@/lib/auth'

export default async function Jobs() {
  const { token, id, profile } = await getUser()
  const userIsTeacher = profile?.tipo_usuario === 'professor'

  return (
    <div className="w-full h-full flex flex-col px-6 pt-14 gap-4 mb-6">
      <Title title="Vagas" />
      <JobsContainer token={token} userId={id} userIsTeacher={userIsTeacher} />
    </div>
  )
}
