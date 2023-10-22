'use client'

import { ComboboxItem } from '@/components/Combobox'
import { Dropdown } from '@/components/Dropdown'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Job, {
  Experiencia,
  Horario,
  ModoDeTrabalho,
  experienciaDescription,
  horarioDescription,
  modoDeTrabalhoDescription,
} from '@/types/Job'
import { useState } from 'react'
import { jobQueryService } from '../services'
import { Spin } from '@/components/spin'

interface JobCreateModalProps {
  token: string
  userId: number
}

export function JobCreateModal(props: JobCreateModalProps) {
  const { token, userId } = props
  const { mutateAsync: createJob, isLoading } = jobQueryService.useCreate(token)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const [titulo, setTitulo] = useState<string>('')
  const [sobreEmpresa, setSobreEmpresa] = useState<string>('')
  const [sobreVaga, setSobreVaga] = useState<string>('')
  const [horario, setHorario] = useState<string>('')
  const [funcionarios, setFuncionarios] = useState<number>(0)
  const [experiencia, setExperiencia] = useState<string>('')
  const [modoDeTrabalho, setModoDeTrabalho] = useState<string>('')

  const createNewJob = async () => {
    const data = {
      titulo,
      sobre_empresa: sobreEmpresa,
      sobre_vaga: sobreVaga,
      horario,
      funcionarios,
      experiencia,
      modo_de_trabalho: modoDeTrabalho,
      contratante: userId,
      candidatos: [],
    } as Job

    const response = await createJob(data)

    if (response) setOpenModal(false)
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger>
        <Button variant={'outline'}>Cadastrar nova vaga</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%]">
        <DialogTitle>Cadastrar nova vaga</DialogTitle>
        <div className="flex flex-col w-full gap-4 pb-10">
          <div className="w-full">
            <Label className="font-medium text-xs">Informe o titulo</Label>
            <Input
              placeholder="Titulo da vaga"
              value={titulo}
              onChange={(e) => setTitulo(e.currentTarget.value)}
            />
          </div>
          <div className="w-full">
            <Label className="font-medium text-xs">Descrição da empresa</Label>
            <Textarea
              placeholder="Informe a descrição da empresa"
              className="h-20 resize-none"
              value={sobreEmpresa}
              onChange={(e) => setSobreEmpresa(e.currentTarget.value)}
            />
          </div>
          <div className="w-full">
            <Label className="font-medium text-xs">Descrição da vaga</Label>
            <Textarea
              placeholder="Informe a descrição da vaga"
              className="h-20 resize-none"
              value={sobreVaga}
              onChange={(e) => setSobreVaga(e.currentTarget.value)}
            />
          </div>
          <div className="flex gap-3 w-full items-center justify-center">
            <Dropdown
              placeholder="Nivel de experiencia"
              options={experienceLevelList}
              value={experiencia}
              setValue={setExperiencia}
            />
            <Dropdown
              placeholder="Modo de trabalho"
              options={workModeList}
              value={modoDeTrabalho}
              setValue={setModoDeTrabalho}
            />
            <Dropdown
              placeholder="Horario"
              options={HourList}
              value={horario}
              setValue={setHorario}
            />
          </div>
          <div className="w-full">
            <Label className="font-medium text-xs">
              Quantidade de funcionários
            </Label>
            <Input
              placeholder="Quantidade de funcionários"
              value={String(funcionarios)}
              onChange={(e) => setFuncionarios(Number(e.currentTarget.value))}
              type="number"
            />
          </div>

          <Button
            type="button"
            onClick={createNewJob}
            className="w-32 self-end"
          >
            {isLoading ? <Spin /> : 'Adicionar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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
