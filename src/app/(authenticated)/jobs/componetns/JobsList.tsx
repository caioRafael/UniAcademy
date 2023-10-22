import { AvatarIcon } from '@/components/AvatarIcon'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Job, {
  Experiencia,
  ModoDeTrabalho,
  experienciaDescription,
  modoDeTrabalhoDescription,
} from '@/types/Job'
import { JobDetailModal } from './JobDetailModal'

interface JobsListProps {
  jobList: Job[]
  token: string
}

export function JobsList(props: JobsListProps) {
  const { jobList, token } = props

  if (jobList.length === 0) {
    return (
      <div className="flex flex-col w-full min-h-full items-center justify-center">
        <h1 className="font-semibold text-2xl">Nenhuma vaga foi encontrada</h1>
      </div>
    )
  }
  return (
    <>
      {jobList.map((job) => (
        <Card
          key={job.id}
          className="w-full h-20 grid grid-cols-[60px_1fr_1fr_1fr_100px] p-5"
        >
          <AvatarIcon userId={job.contratante} token={token} />
          <div className="flex flex-1 items-center justify-center">
            <h1 className="font-bold text-sm">{job.titulo}</h1>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <h1 className="font-bold text-sm">
              {experienciaDescription[job.experiencia as Experiencia]}
            </h1>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <h1 className="font-bold text-sm">
              {
                modoDeTrabalhoDescription[
                  job.modo_de_trabalho as ModoDeTrabalho
                ]
              }
            </h1>
          </div>
          <JobDetailModal job={job} token={token} />
        </Card>
      ))}
    </>
  )
}
