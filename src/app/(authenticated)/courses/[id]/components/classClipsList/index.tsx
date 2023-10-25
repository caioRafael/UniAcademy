import { ClipItem } from '@/types/Clip'
import Image from 'next/image'
import clipIcon from '../../../../../../assets/clip-icon.png'
import { clipItemQueryService } from '../../services'
import { useClassContext } from '../../context/ClassesContext'
import { useVideoPlayerContext } from '../../context/VideoPlayContext'
import { Button } from '@/components/ui/button'
import { useMemo } from 'react'

export interface ClassClipsListProps {
  token: string
  usernameId: number
}

export const ClassClipsList = ({ token, usernameId }: ClassClipsListProps) => {
  const { selectedClass } = useClassContext()
  const { setClip, setCreateClip, createClip } = useVideoPlayerContext()
  const selectedClassId = useMemo(() => {
    return selectedClass?.id
  }, [selectedClass])
  const { data: dataClip } = clipItemQueryService.useFindAll(
    token,
    usernameId,
    selectedClassId,
  )

  const handleSelectClip = (item: ClipItem) => {
    setClip({ isActive: true, selectedClip: item })
  }

  const handleStartCreateClip = () => {
    setCreateClip({ isStarted: true, initial: 0, final: 0 })
  }

  const handleCancelCreateClip = () => {
    setCreateClip({ isStarted: false, initial: 0, final: 0 })
  }

  return (
    <div className="flex flex-col">
      {selectedClass?.id && (
        <Button
          onClick={
            createClip.isStarted
              ? handleCancelCreateClip
              : handleStartCreateClip
          }
          className="self-end mb-4"
          variant={'outline'}
        >
          {createClip.isStarted ? 'Cancelar nova clipagem' : 'Clipar aula'}
        </Button>
      )}
      {selectedClass?.id && (
        <ul>
          {dataClip?.results && dataClip?.results?.length > 0 ? (
            dataClip?.results?.map((clip: ClipItem) => (
              <li
                onClickCapture={() => handleSelectClip(clip)}
                className="flex gap-3 items-center  mb-5 cursor-pointer"
                key={clip.id}
              >
                <Image src={clipIcon} alt="Miniatura do clipe da aula" />
                <div className="py-3 pl-3 bg-white rounded border-2 w-full">
                  <h3 className="text-xxs font-medium mb-2">{clip.titulo}</h3>
                  <p className="text-xxs font-normal">{clip.descricao}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-xxs font-normal">
              Você ainda não possui clipagem.
            </p>
          )}
        </ul>
      )}
    </div>
  )
}

export default ClassClipsList
