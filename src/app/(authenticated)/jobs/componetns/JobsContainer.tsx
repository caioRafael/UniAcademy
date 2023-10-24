'use client'

import { Combobox, ComboboxItem } from '@/components/Combobox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Job, {
  Experiencia,
  Horario,
  ModoDeTrabalho,
  experienciaDescription,
  horarioDescription,
  modoDeTrabalhoDescription,
} from '@/types/Job'
import { useState } from 'react'
import { JobsList } from './JobsList'
import { jobQueryService } from '../services'
import { Spin } from '@/components/spin'
import { JobCreateModal } from './JobCreateModal'

interface JobsContainerProps {
  token: string
  userId: number
  userIsTeacher: boolean
}

export function JobsContainer(props: JobsContainerProps) {
  const { token, userId, userIsTeacher } = props
  const [experiencia, setExperiencia] = useState<string>('')
  const [modoTrabalho, setModoTrabalho] = useState<string>('')
  const [horarioTrabalho, setHorarioTrabalho] = useState<string>('')

  const { data, isLoading } = jobQueryService.useFindAll(token)
  return (
    <div className="w-full flex flex-col items-center px-8 gap-6">
      <h1 className="font-bold text-3xl">Busque por vagas!</h1>

      <div className="flex gap-3 w-full items-center justify-between">
        <div className="flex gap-3 w-1/2">
          <Input placeholder="Qual vaga você procura?" />
          <Button>Buscar</Button>
        </div>
        {userIsTeacher && <JobCreateModal token={token} userId={userId} />}
      </div>
      <div className="flex gap-3 w-full items-center justify-center">
        <Combobox
          placeholder="Nível de Experiência"
          options={experienceLevelList}
          value={experiencia}
          setValue={setExperiencia}
        />
        <Combobox
          placeholder="Modo de trabalho"
          options={workModeList}
          value={modoTrabalho}
          setValue={setModoTrabalho}
        />
        <Combobox
          placeholder="Horário"
          options={HourList}
          value={horarioTrabalho}
          setValue={setHorarioTrabalho}
        />
      </div>

      {isLoading ? (
        <Spin secondary />
      ) : (
        <JobsList jobList={data?.results as Job[]} token={token} />
      )}
    </div>
  )
}

const experienceLevelList: ComboboxItem[] = [
  {
    value: Experiencia.Assistente,
    label: experienciaDescription[Experiencia.Assistente],
  },
  {
    value: Experiencia.Estagio,
    label: experienciaDescription[Experiencia.Estagio],
  },
  {
    value: Experiencia.Junior,
    label: experienciaDescription[Experiencia.Junior],
  },
  {
    value: Experiencia.Pleno,
    label: experienciaDescription[Experiencia.Pleno],
  },
  {
    value: Experiencia.Senior,
    label: experienciaDescription[Experiencia.Senior],
  },
  {
    value: Experiencia.Trainee,
    label: experienciaDescription[Experiencia.Trainee],
  },
]

const workModeList: ComboboxItem[] = [
  {
    value: ModoDeTrabalho.Presencial,
    label: modoDeTrabalhoDescription[ModoDeTrabalho.Presencial],
  },
  {
    value: ModoDeTrabalho.Remoto,
    label: modoDeTrabalhoDescription[ModoDeTrabalho.Remoto],
  },
  {
    value: ModoDeTrabalho.Hibrido,
    label: modoDeTrabalhoDescription[ModoDeTrabalho.Hibrido],
  },
]

const HourList: ComboboxItem[] = [
  {
    value: Horario.Integral,
    label: horarioDescription[Horario.Integral],
  },
  {
    value: Horario.MeioPeriodo,
    label: horarioDescription[Horario.MeioPeriodo],
  },
]
