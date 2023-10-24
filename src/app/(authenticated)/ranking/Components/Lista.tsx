'use client'
import ListItem from './listItem'
import { rankingQueryService } from '../services'
export type Student = {
  id: number
  image: string
  name: string
  curso: string
  finalized: number
  presence: number
  progressos_read?: any
  usuario_completo_read?: any
}
interface ListaProps {
  token: string
}

export default function Lista({ token }: ListaProps) {
  const { data } = rankingQueryService.useFindAll(token)

  return (
    <section className="h-full overflow-auto">
      <ul>
        {//@ts-ignore
        data?.results?.map((student: Student, index: number) => {
          return (
            <li key={index}>
              <ListItem student={student} index={index} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
