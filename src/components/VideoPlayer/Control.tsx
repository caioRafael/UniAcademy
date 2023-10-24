'use client'

import { Slider } from '../ui/slider'
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume,
  Volume2,
  Maximize,
  Paperclip,
} from 'lucide-react'
import { ControlProps } from '@/types/VideoPlayer'
import { useVideoPlayerContext } from '@/app/(authenticated)/courses/[id]/context/VideoPlayContext'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { useMemo } from 'react'
import { ClipSlider } from '@/app/(authenticated)/courses/[id]/components/clipSlider'
import { CreateClipModal } from '@/app/(authenticated)/courses/[id]/components/createClipModal'

export function Control({
  onPlayPause,
  playing,
  onRewind,
  onForward,
  played,
  onSeek,
  onSeekClip,
  onVolumeChangeHandler,
  onFullScreen,
  volume,
  mute,
  onMute,
  duration,
  currentTime,
  showForward,
  showRewind,
  token,
  usuario_criacao,
  isFullScreen,
}: ControlProps) {
  const { clip, createClip, handleDisableClip } = useVideoPlayerContext()
  const minValue = useMemo(() => {
    if (clip.selectedClip) {
      return clip.selectedClip.tempo_inicial
    }
    return 0
  }, [clip])

  const maxValue = useMemo(() => {
    if (clip.selectedClip) {
      return clip.selectedClip.tempo_final
    }
    return 100
  }, [clip])
  return (
    <div className="bg-primary pt-3 pb-3 rounded-b-[6px]">
      <div
        className="absolute top-0 bottom-[60px] w-full"
        onClick={onPlayPause}
      />

      <div className={` left-0 right-0 bottom-0 ${isFullScreen && 'absolute'}`}>
        <div className="slider__container">
          {createClip.isStarted ? (
            <ClipSlider
              showThumb
              min={0}
              max={100}
              defaultValue={[createClip.initial, createClip.final]}
              value={[createClip.initial, createClip.final]}
              onValueChange={onSeekClip}
              variant="video"
            />
          ) : (
            <Slider
              min={minValue}
              max={maxValue}
              defaultValue={[played * 100]}
              value={[played * 100]}
              onValueChange={onSeek}
              variant="video"
            />
          )}
        </div>

        {!createClip.isStarted ? (
          <div className="w-full flex flex-row items-center justify-between pt-4 p-3 bg-zinc-900 bg-opacity-25">
            <div className="flex flex-row gap-4">
              {showRewind && (
                <SkipBack className="text-white" onDoubleClick={onRewind} />
              )}

              <div className="text-white cursor-pointer" onClick={onPlayPause}>
                {playing ? <Pause /> : <Play />}
              </div>

              {showForward && (
                <SkipForward className="text-white" onDoubleClick={onForward} />
              )}

              <div className="text-white cursor-pointer" onClick={onMute}>
                {mute ? <Volume /> : <Volume2 />}
              </div>

              <Slider
                onValueChange={onVolumeChangeHandler}
                defaultValue={[volume * 100]}
                variant="volume"
                showThumb
                className="w-20"
              />
            </div>

            <div className="flex flex-row gap-4">
              <span className="text-white">
                {currentTime}/{duration}
              </span>

              {clip.isActive && (
                <div className="text-white" onClick={handleDisableClip}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Paperclip className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xxs">Sair da clipagem</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              <Maximize
                className="text-white cursor-pointer"
                onClick={onFullScreen}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-between items-center gap-4 bg-zinc-900 bg-opacity-25 pl-3 pr-3 pt-3">
            <span className="text-white">
              {currentTime}/{duration}
            </span>
            <div className="flex flex-row justify-between items-center gap-4">
              <span className="text-white align-middle">
                Selecione o intervalo para criar a clipagem
              </span>

              <CreateClipModal
                token={token}
                usuario_criacao={usuario_criacao}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
