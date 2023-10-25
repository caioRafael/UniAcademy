'use client'

import Image from 'next/image'
import { useClassContext } from '../../context/ClassesContext'
import ClassVideo from '../classVideo'
import remotely from '@/assets/remotely.svg'
interface ClassVideoContentProps {
  usernameId: number
  token: string
}

const ClassVideoContent = ({ usernameId, token }: ClassVideoContentProps) => {
  const { selectedClass } = useClassContext()
  return (
    <>
      {selectedClass ? (
        <ClassVideo usernameId={usernameId} token={token} />
      ) : (
        <div className="flex flex-col justify-center items-center mb-16 mt-3">
          <Image src={remotely} alt="Nenhuma aula selecionada" width="450" />
          <p className="mt-3 font-semibold text-xl">
            Selecione uma aula na
            <i className="font-semibold text-secondary">playlist</i>
          </p>
        </div>
      )}
    </>
  )
}

export default ClassVideoContent
