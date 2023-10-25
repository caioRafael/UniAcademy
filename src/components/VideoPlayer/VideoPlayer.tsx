'use client'

import ReactPlayer from 'react-player'
import { Control } from './Control'
import { useState, useRef, useEffect } from 'react'
import { formatTime } from '@/utils/formatTime'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { OnProgressProps } from 'react-player/base'
import { IVideoState } from '@/types/VideoPlayer'
import { progressQueryService } from '@/app/(authenticated)/courses/[id]/services/progress'
import { useClassContext } from '@/app/(authenticated)/courses/[id]/context/ClassesContext'
import { useVideoPlayerContext } from '@/app/(authenticated)/courses/[id]/context/VideoPlayContext'

export interface VideoPlayerProps {
  url: string
  token: string
  usernameId: number
  classId: number
}

export function VideoPlayer({
  url,
  usernameId,
  token,
  classId,
}: VideoPlayerProps) {
  const { mutateAsync: saveProgress } = progressQueryService.useCreate(token)
  const { selectedClass } = useClassContext()
  const { clip, createClip, setCreateClip } = useVideoPlayerContext()

  const videoPlayerRef = useRef<ReactPlayer>(null)
  const handleFullScreen = useFullScreenHandle()

  const [isFirstRender, setIsFirstRender] = useState(true)
  const [videoState, setVideoState] = useState<IVideoState>({
    playing: false,
    muted: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
  })

  const { playing, muted, volume, played, seeking } = videoState

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : 0
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : 0

  const formatCurrentTime = formatTime(currentTime)
  const formatDuration = formatTime(duration)

  function calcuteProgressPercentage() {
    return (currentTime / duration) * 100
  }

  const currentProgress = calcuteProgressPercentage()

  const saveVideoProgress = async () => {
    if (!classId) return

    if (currentProgress)
      await saveProgress({
        progresso:
          currentProgress > 98 ? '100' : currentProgress.toFixed()?.toString(),
        usuario: usernameId,
        aula: classId,
      })
  }

  const seekToHandler = (progress: number) => {
    videoPlayerRef?.current?.seekTo(duration * (progress / 100))
  }

  useEffect(() => {
    if (clip.isActive && clip.selectedClip) {
      seekToHandler(clip.selectedClip.tempo_inicial)
    }
  }, [clip.selectedClip])

  useEffect(() => {
    if (!clip.isActive) {
      return
    }
    if (!clip.selectedClip) return

    if (currentProgress > clip.selectedClip.tempo_final) {
      if (!clip.selectedClip) return
      setVideoState({ ...videoState, playing: false, played: 0 })
      seekToHandler(0)
    }
  }, [clip, currentProgress])

  useEffect(() => {
    if (createClip.isStarted) {
      setVideoState({ ...videoState, playing: false })
    }
  }, [createClip])

  useEffect(() => {
    saveVideoProgress()
    return () => {
      saveVideoProgress()
    }
  }, [selectedClass, playing])

  useEffect(() => {
    seekToHandler(selectedClass?.meu_progresso_read?.progresso || 0)
  }, [selectedClass?.meu_progresso_read])

  useEffect(() => {
    if (isFirstRender) return
    seekToHandler(selectedClass?.meu_progresso_read?.progresso || 0)
  }, [isFirstRender])

  const playPauseHandler = () => {
    if (createClip.isStarted) return
    setVideoState({ ...videoState, playing: !videoState.playing })
  }

  const rewindHandler = () => {
    if (videoPlayerRef.current)
      videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5)
  }

  const handleFastFoward = () => {
    if (videoPlayerRef.current)
      videoPlayerRef.current.seekTo(
        videoPlayerRef.current.getCurrentTime() + 10,
      )
  }

  const progressHandler = (state: OnProgressProps) => {
    if (videoPlayerRef.current) {
      if (!seeking) {
        setVideoState({ ...videoState, ...state })
      }
    }
  }

  const seekHandler = (value: number[]) => {
    if (videoPlayerRef.current) {
      setVideoState({ ...videoState, played: value[0] / 100 })
      videoPlayerRef.current.seekTo(value[0] / 100)
    }
  }
  const seekClipHandler = (value: number[]) => {
    const selectThumb = createClip.initial !== value[0] ? 0 : 1
    if (videoPlayerRef.current) {
      setVideoState({ ...videoState, played: value[selectThumb] / 100 })
      videoPlayerRef.current.seekTo(value[selectThumb] / 100)
      setCreateClip({ ...createClip, initial: value[0], final: value[1] })
    }
  }

  const volumeChangeHandler = (value: number[]) => {
    const newVolume = value[0] / 100

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0,
    })
  }

  const muteHandler = () => {
    setVideoState({ ...videoState, muted: !videoState.muted })
  }

  const onFullScreenHanlder = () => {
    handleFullScreen.active ? handleFullScreen.exit() : handleFullScreen.enter()
  }

  const bufferStartHandler = () => {
    setVideoState({ ...videoState, buffer: true })
  }

  const bufferEndHandler = () => {
    setVideoState({ ...videoState, buffer: false })
  }

  const onEndHandler = () => {
    setVideoState({ ...videoState, playing: false })
    saveVideoProgress()
  }

  const onReadyHandler = () => {
    setIsFirstRender(false)
  }

  return (
    <FullScreen
      className={handleFullScreen.active ? 'content-center h-full flex' : ''}
      handle={handleFullScreen}
    >
      <div className="w-full aspect-video relative">
        <ReactPlayer
          ref={videoPlayerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={progressHandler}
          onBuffer={bufferStartHandler}
          onBufferEnd={bufferEndHandler}
          onEnded={onEndHandler}
          controls={false}
          onReady={onReadyHandler}
        />

        <Control
          onPlayPause={playPauseHandler}
          playing={playing}
          onRewind={rewindHandler}
          onForward={handleFastFoward}
          played={played}
          onSeek={seekHandler}
          onSeekClip={seekClipHandler}
          volume={volume}
          onVolumeChangeHandler={volumeChangeHandler}
          mute={muted}
          onMute={muteHandler}
          duration={formatDuration}
          currentTime={formatCurrentTime}
          onFullScreen={onFullScreenHanlder}
          isFullScreen={handleFullScreen.active}
          token={token}
          usuario_criacao={usernameId}
        />
      </div>
    </FullScreen>
  )
}
