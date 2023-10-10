'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChevronLeft, ChevronRight, Paperclip } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { forumQueryService } from '../../services'
import Forum from '@/types/Forum'

const dataMock = [
  {
    id: 0,
    title: 'Demonstração direta',
    subject: 'Matemática Discreta',
    author: 'Claudio Callejas',
    creationDate: '2023-09-30',
    file: 'base64',
  },
  {
    id: 1,
    title: 'Demonstração direta',
    subject: 'Matemática Discreta',
    author: 'Claudio Callejas',
    creationDate: '2023-09-30',
    file: 'base64',
  },
  {
    id: 2,
    title: 'Demonstração direta',
    subject: 'Matemática Discreta',
    author: 'Claudio Callejas',
    creationDate: '2023-09-30',
    file: 'base64',
  },
  {
    id: 3,
    title: 'Demonstração direta',
    subject: 'Matemática Discreta',
    author: 'Claudio Callejas',
    creationDate: '2023-09-30',
    file: 'base64',
  },
]

export interface ForunsTableProps {
  token: string
}

export function ForunsTable({ token }: ForunsTableProps) {
  const { data, isLoading } = forumQueryService.useFindAll(token)
  const dataForum = data as Forum

  const router = useRouter()

  return (
    <>
      <Table className="border">
        <TableHeader className="bg-gray">
          <TableRow>
            <TableHead className="text-xxs font-bold">Título</TableHead>
            <TableHead className="text-xxs font-bold">Assunto</TableHead>
            <TableHead className="text-xxs font-bold">Autor</TableHead>
            <TableHead className="text-xxs font-bold">Data</TableHead>
            <TableHead className="text-xxs font-bold">Anexo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            dataForum?.results.map(
              ({ id, titulo, nome_usuario_criacao, assunto, data_criacao }) => (
                <TableRow className="even:bg-grayLight" key={id}>
                  <TableCell
                    className="text-darkRed text-[14px] decoration-solid font-medium underline decoration-solid cursor-pointer"
                    onClick={() => router.push(`/foruns/${id}`)}
                  >
                    {titulo}
                  </TableCell>
                  <TableCell>{assunto}</TableCell>
                  <TableCell>{nome_usuario_criacao}</TableCell>
                  <TableCell>{data_criacao}</TableCell>
                  <TableCell className="text-center">
                    <button className="w-6 h-6" onClick={() => console.log('')}>
                      <Paperclip
                        width={24}
                        height={24}
                        className="text-black opacity-50"
                      />
                    </button>
                  </TableCell>
                </TableRow>
              ),
            )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <span className="text-xxs">Página 1 de 1</span>
        <button
        // onClick={() => table.previousPage()}
        // disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft
            width={24}
            height={24}
            className="text-black opacity-50"
          />
        </button>
        <button
        //  onClick={() => table.nextPage()}
        // disabled={!table.getCanNextPage()}
        >
          <ChevronRight
            width={24}
            height={24}
            className="text-black opacity-50"
          />
        </button>
      </div>
    </>
  )
}
