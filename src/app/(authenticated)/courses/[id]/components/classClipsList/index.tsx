import { clipQueryService } from '../../services/clips'
import Clip, { ClipItem } from '@/types/Clip'
import Image from 'next/image'
import clipIcon from '../../../../../../assets/clip-icon.png'

export interface ClassClipsListProps {
  token: string
}

export const ClassClipsList = ({ token }: ClassClipsListProps) => {
  const { data, isLoading } = clipQueryService.useFindAll(token)
  const dataClip = data as Clip

  return (
    <ul>
      {dataClip?.results?.map((clip: ClipItem) => (
        <li className="flex gap-3 items-center  mb-5" key={clip.id}>
          <Image src={clipIcon} alt="Miniatura do clipe da aula" />
          <div className="py-3 pl-3 bg-white rounded border-2 w-full">
            <h3 className="text-xxs font-medium mb-2">{clip.titulo}</h3>
            <p className="text-xxs font-normal">{clip.descricao}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ClassClipsList