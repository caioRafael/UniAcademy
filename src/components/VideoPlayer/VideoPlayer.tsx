'use client'

import ReactPlayer from 'react-player'
import { Control } from './Control'
import { useState, useRef } from 'react'
import { formatTime } from '@/utils/formatTime'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { OnProgressProps } from 'react-player/base'
import { IVideoState } from '@/types/VideoPlayer'

export function VideoPlayer() {
  const videoPlayerRef = useRef<ReactPlayer>(null)
  const handleFullScreen = useFullScreenHandle()

  const [videoState, setVideoState] = useState<IVideoState>({
    playing: true,
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

  const playPauseHandler = () => {
    setVideoState({ ...videoState, playing: !videoState.playing })
  }

  const rewindHandler = () => {
    if (videoPlayerRef.current)
      // Rewinds the video player reducing 5
      videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5)
  }

  const handleFastFoward = () => {
    if (videoPlayerRef.current)
      // FastFowards the video player by adding 10
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
    // console.log('Bufering.......')
    setVideoState({ ...videoState, buffer: true })
  }

  const bufferEndHandler = () => {
    // console.log('buffering stoped, play')
    setVideoState({ ...videoState, buffer: false })
  }

  return (
    <FullScreen
      className={handleFullScreen.active ? 'content-center h-full flex' : ''}
      handle={handleFullScreen}
    >
      <div className="w-full aspect-video relative">
        <ReactPlayer
          ref={videoPlayerRef}
          url="https://www.youtube.com/watch?v=oITDcIjJBlY"
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={progressHandler}
          onBuffer={bufferStartHandler}
          onBufferEnd={bufferEndHandler}
          controls={false}
        />

        <Control
          onPlayPause={playPauseHandler}
          playing={playing}
          onRewind={rewindHandler}
          onForward={handleFastFoward}
          played={played}
          onSeek={seekHandler}
          volume={volume}
          onVolumeChangeHandler={volumeChangeHandler}
          mute={muted}
          onMute={muteHandler}
          duration={formatDuration}
          currentTime={formatCurrentTime}
          onFullScreen={onFullScreenHanlder}
        />
      </div>
    </FullScreen>
  )
}
