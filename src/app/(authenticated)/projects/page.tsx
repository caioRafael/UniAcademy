import { Title } from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProjectsContainer } from './components/ProjectsContainer'
import { getUser } from '@/lib/auth'
import { CreateProjectModal } from './components/CreateProjectModal'

export default async function Projects() {
  const { token, id, profile } = await getUser()
  return (
    <div className="w-full flex flex-col px-8 pt-16 gap-10">
      <Title title="Vitrine de projetos" />
      <div className="flex flex-row items-center justify-between w-full mb-3">
        <div className="w-1/2 flex gap-1">
          <Input
            // className="max-w-[250px]"
            placeholder="O que você procura?"
            // onChange={(e) => setQuery(e.target.value)}
          />
          <Button>Buscar</Button>
        </div>
        {profile?.tipo_usuario === ('aluno' || 'professor') && (
          <CreateProjectModal token={token} userId={id} />
        )}
      </div>
      <ProjectsContainer token={token} />
    </div>
  )
}
