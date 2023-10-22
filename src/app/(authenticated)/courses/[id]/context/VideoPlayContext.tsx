'use client'
import { ClipItem } from '@/types/Clip'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface IClip {
  isActive: boolean
  selectedClip: ClipItem | null
}

interface ICreateClip {
  isStarted: boolean
  initial: number
  final: number
}

interface VideoPlayerContextState {
  clip: IClip
  setClip: Dispatch<SetStateAction<IClip>>
  handleDisableClip: () => void
  createClip: ICreateClip
  setCreateClip: Dispatch<SetStateAction<ICreateClip>>
}

interface VideoPlayerContextProviderProps {
  children: ReactNode
}

const VideoPlayerContext = createContext<VideoPlayerContextState | undefined>(
  undefined,
)

export const VideoPlayerContextProvider = ({
  children,
}: VideoPlayerContextProviderProps) => {
  const [clip, setClip] = useState<IClip>({
    isActive: false,
    selectedClip: null,
  })

  const [createClip, setCreateClip] = useState<ICreateClip>({
    isStarted: false,
    initial: 0,
    final: 0,
  })

  const handleDisableClip = () => {
    setClip({ isActive: false, selectedClip: null })
  }

  return (
    <VideoPlayerContext.Provider
      value={{
        clip,
        setClip,
        handleDisableClip,
        createClip,
        setCreateClip,
      }}
    >
      {children}
    </VideoPlayerContext.Provider>
  )
}

export const useVideoPlayerContext = () => {
  const context = useContext(VideoPlayerContext)
  if (!context) {
    throw new Error(
      'useClassContext deve ser usado dentro de um ClassContextProvider',
    )
  }
  return context
}
