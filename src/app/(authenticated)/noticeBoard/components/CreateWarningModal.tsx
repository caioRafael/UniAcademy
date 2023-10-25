'use client'

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
import { ImportFile } from './ImportFile'
import { useState } from 'react'
// import { projetctCategoryQueryService, projetctQueryService } from '../services'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Spin } from '@/components/spin'
import { ListResponse } from '@/types/ListResponse'
import { Category } from '@/types/Category'
import { Warning } from '@/types/Warning'
import {
  noticeBoardQueryService,
  warningCategoryQueryService,
} from '../services'

interface CreateProjectModalProps {
  token: string
  userId: number
}

export function CreateWarningModal(props: CreateProjectModalProps) {
  const { token, userId } = props
  const [progress, setProgress] = useState<number>(0)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const [titulo, setTitulo] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [category, setCategory] = useState<number | null>(null)
  const { data } = warningCategoryQueryService.useFindAll(token)

  const { mutateAsync: createWarning, isLoading } =
    noticeBoardQueryService.useCreate(token, setProgress)

  const handleCreateProject = async () => {
    const data = {
      titulo,
      descricao,
      categoria: category,
      autor: userId,
      arquivo: file,
    } as Warning

    const createdWarning = await createWarning(data)

    if (createdWarning) {
      setOpenModal(false)
      setProgress(0)
      setDescricao('')
      setTitulo('')
    }
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant={'outline'} onClick={() => setOpenModal(true)}>
          Cadastrar aviso
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%]">
        <DialogTitle>Cadastro de aviso</DialogTitle>
        <div className="flex flex-col w-full gap-4 pb-10">
          <Progress value={progress} className="h-1" />

          <div className="w-full">
            <Label className="font-medium text-xs">Informe o título</Label>
            <Input
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.currentTarget.value)}
            />
          </div>
          <div className="w-full">
            <Label className="font-medium text-xs">Informe a descrição</Label>
            <Textarea
              placeholder="Descrição"
              className="resize-none"
              value={descricao}
              onChange={(e) => setDescricao(e.currentTarget.value)}
            />
          </div>
          <div className="w-full">
            <Label className="font-medium text-xs">Categoria</Label>
            <Select
              onValueChange={(value) => setCategory(Number(value))}
              value={String(category)}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Selecione uma categoria"
                  className="font-medium text-xs"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="font-medium text-xs">
                  <SelectLabel className="font-medium text-xs">
                    Selecione uma categoria
                  </SelectLabel>
                  {data &&
                    (data as ListResponse<Category>).results.map((category) => (
                      <SelectItem
                        key={category.id}
                        className="font-medium text-xs"
                        value={String(category.id)}
                      >
                        {category.nome}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <Label className="font-medium text-xs">Anexo</Label>
            <ImportFile file={file} setFile={setFile} />
          </div>

          <Button
            type="button"
            onClick={handleCreateProject}
            className="w-32 self-end"
          >
            {isLoading ? <Spin /> : 'Cadastrar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
