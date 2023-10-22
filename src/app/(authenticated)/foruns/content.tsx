'use client'

import { Title } from '@/components/Title'
import { ForunsList } from './components/forunsList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CreateForumModal } from './components/createForumModal'
import { useState } from 'react'

export interface ContentProps {
  token: string
  id: number
}
export function Content({ id, token }: ContentProps) {
  const [query, setQuery] = useState('')
  const [orderForuns, setOrderForuns] = useState('-data_criacao')

  return (
    <div className="w-full flex flex-col px-8 pt-16 gap-10">
      <Title title="Fórum" />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3 flex-1">
          <Input
            className="max-w-[250px]"
            placeholder="O que você procura?"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant={'outline'}>Buscar</Button>
          <div className="flex flex-col justify-between">
            <span className="text-xxs">Filtrar por:</span>
            <div>
              <RadioGroup
                className="flex flex-row w-full"
                defaultValue="-data_criacao"
                onValueChange={(value) => setOrderForuns(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="-data_criacao" id="r1" />
                  <Label className="text-xxs font-normal" htmlFor="r1">
                    Mais recentes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="r2" />
                  <Label className="text-xxs font-normal" htmlFor="r2">
                    Mais antigos
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <CreateForumModal token={token} usuario_criacao={id} />
      </div>

      <div className="w-full">
        <Tabs defaultValue="all">
          <TabsList className="mb-5">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="id">Meus Fóruns</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ForunsList token={token} query={query} ordering={orderForuns} />
          </TabsContent>
          <TabsContent value="id">
            <ForunsList
              token={token}
              usuario_criacao={id}
              query={query}
              ordering={orderForuns}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
