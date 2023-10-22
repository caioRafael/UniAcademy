'use client'

import { VideoPlayer } from '@/components/VideoPlayer/VideoPlayer'
import { useClassContext } from '../../context/ClassesContext'
import { useMemo } from 'react'

export interface ClassVideoProps {
  token: string
  usernameId: number | undefined
}

export const ClassVideo = ({ token, usernameId }: ClassVideoProps) => {
  const { selectedClass } = useClassContext()

  const video = useMemo(() => {
    return selectedClass?.video
  }, [selectedClass?.video])

  return (
    <div className="aspect-video">
      <VideoPlayer
        url={video as string}
        usernameId={usernameId || 0}
        token={token}
        classId={selectedClass?.id || 0}
      />
    </div>
  )
}

export default ClassVideo
