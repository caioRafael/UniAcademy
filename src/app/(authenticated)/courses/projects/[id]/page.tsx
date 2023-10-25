import { getUser } from '@/lib/auth'
import { Content } from './content'

export interface Option {
  id: number
  label: string
  component: any
}

interface ProjectsProps {
  params: {
    id: number
  }
}

export default async function Projects(props: ProjectsProps) {
  const { params } = props
  const { token } = await getUser()

  return <Content id={params.id} token={token} />
}
