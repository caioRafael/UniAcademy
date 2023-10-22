import { AvatarIcon } from '@/components/AvatarIcon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Job from '@/types/Job'
import { formatDate } from '@/utils/formatDate'
import { Building, Clock7 } from 'lucide-react'

interface JobDetailModalProps {
  job: Job
  token: string
}

export function JobDetailModal(props: JobDetailModalProps) {
  const { job, token } = props
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Ver mais</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%]">
        <DialogTitle>{job.titulo}</DialogTitle>
        <div className="flex flex-col w-full gap-4 pb-10">
          <section className="flex gap-2 items-center">
            <AvatarIcon userId={job.contratante} token={token} hasName />
            <h1>{formatDate(job.data_de_publicacao as string)}</h1>
          </section>
          <section className="flex gap-2 items-center">
            <div className="flex gap-2">
              <Clock7 /> {job.horario}
            </div>
            <div className="flex gap-2">
              <Building /> {`${job.funcionarios} funcionarios`}
            </div>
          </section>

          <section className="flex gap-2 items-center">
            <strong>Informações</strong>
            <div className="w-full border-2 border-secondary rounded-sm" />
          </section>

          <h1 className="border-l-4 border-secondary pl-1 font-semibold text-xs">
            Sobre a empresa
          </h1>
          <p>{job.sobre_empresa}</p>

          <h1 className="border-l-4 border-secondary pl-1 font-semibold text-xs">
            Sobre a vaga
          </h1>
          <p>{job.sobre_vaga}</p>

          <Button variant={'outline'} className="w-40 self-center">
            Candidatar-se
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
