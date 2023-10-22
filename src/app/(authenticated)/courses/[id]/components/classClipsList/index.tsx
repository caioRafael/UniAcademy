import { ClipItem } from '@/types/Clip'
import Image from 'next/image'
import clipIcon from '../../../../../../assets/clip-icon.png'
import { clipItemQueryService } from '../../services'

export interface ClassClipsListProps {
  token: string
}

export const ClassClipsList = ({ token }: ClassClipsListProps) => {
  const { data: dataClip } = clipItemQueryService.useFindAll(token)

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
