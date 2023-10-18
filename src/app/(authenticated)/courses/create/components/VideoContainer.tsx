import { Play } from 'lucide-react'

interface VideoContainerProps {
  video: File
}

export function VideoContainer(props: VideoContainerProps) {
  const { video } = props

  //   const formatVideoDuration = async (videoFile: File): Promise<string> => {
  //     const video = document.createElement('video')
  //     video.src = URL.createObjectURL(videoFile)

  //     return new Promise<string>((resolve, reject) => {
  //       video.onloadedmetadata = () => {
  //         const durationInSeconds = Math.floor(video.duration)
  //         const minutes = Math.floor(durationInSeconds / 60)
  //         const seconds = durationInSeconds % 60
  //         const formattedDuration = `${minutes
  //           .toString()
  //           .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  //         resolve(formattedDuration)
  //       }
  //       video.onerror = (error) => {
  //         reject(error)
  //       }
  //     })
  //   }

  return (
    <div className="w-full px-3 flex items-center justify-between my-4">
      <span className="flex gap-1 items-center font-medium text-xs">
        <Play />
        {video.name}
      </span>

      {/* <p className="font-medium text-xs">{formatVideoDuration(video)}</p> */}
    </div>
  )
}
