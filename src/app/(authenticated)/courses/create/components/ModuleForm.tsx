'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImageInput } from './ImageInput'
import { ModulesContainer } from './MofulesContainer'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCourseContext } from '../context/CourseContext'
import { useEffect } from 'react'
import { Spin } from '@/components/spin'
import { ListResponse } from '@/types/ListResponse'
import { CourseCategory } from '@/types/Course'
import { courseCategoryQueryService } from '../services'

interface ModuleFormProps {
  userId: number
  token: string
}

export function ModuleForm(props: ModuleFormProps) {
  const { userId, token } = props
  const { data } = courseCategoryQueryService.useFindAll(token)
  const {
    save,
    titulo,
    setTitulo,
    descricao,
    setDescricao,
    setUserId,
    setToken,
    load,
    setCategory,
    category,
  } = useCourseContext()

  useEffect(() => {
    setUserId(userId)
    setToken(token)
  }, [userId, token, setUserId, setToken])

  return (
    <div className="flex flex-col w-full gap-4 pb-10">
      <div className="w-full">
        <Label className="font-medium text-xs">Nome do curso</Label>
        <Input
          value={titulo}
          onChange={(e) => setTitulo(e.currentTarget.value)}
        />
      </div>

      <div className="w-full">
        <Label className="font-medium text-xs">Categoria do curso</Label>
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
              {data &&
                (data as ListResponse<CourseCategory>).results.map(
                  (category) => (
                    <SelectItem
                      key={category.id}
                      className="font-medium text-xs"
                      value={String(category.id)}
                    >
                      {category.nome}
                    </SelectItem>
                  ),
                )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <Label className="font-medium text-xs">Descrição do curso</Label>
        <Textarea
          className="resize-none"
          value={descricao}
          onChange={(e) => setDescricao(e.currentTarget.value)}
        />
      </div>

      <ImageInput />

      <Label className="border-l-4 border-secondary pl-1 font-semibold text-xs mt-10">
        Estrutura do curso
      </Label>
      <ModulesContainer />

      <Button type="button" onClick={save} className="w-2/3 self-center">
        {load ? <Spin /> : 'Criar'}
      </Button>
    </div>
  )
}
