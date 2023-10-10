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
} from 'lucide-react'
import { ControlProps } from '@/types/VideoPlayer'

export function Control({
  onPlayPause,
  playing,
  onRewind,
  onForward,
  played,
  onSeek,
  onVolumeChangeHandler,
  onFullScreen,
  volume,
  mute,
  onMute,
  duration,
  currentTime,
  showForward,
  showRewind,
}: ControlProps) {
  return (
    <div className=" absolute bottom-0 left-0 right-0 top-0">
      <div className="w-full h-full" onClick={onPlayPause} />

      <div className="absolute left-0 right-0 bottom-0">
        <div className="slider__container">
          <Slider
            min={0}
            max={100}
            defaultValue={[played * 100]}
            value={[played * 100]}
            onValueChange={onSeek}
            variant="video"
          />
        </div>

        <div className="w-full flex flex-row content-center justify-between p-3 bg-zinc-900 bg-opacity-25">
          <div className="flex flex-row gap-4">
            {showRewind && (
              <SkipBack className="text-white" onDoubleClick={onRewind} />
            )}

            <div className="text-white" onClick={onPlayPause}>
              {playing ? <Pause /> : <Play />}
            </div>

            {showForward && (
              <SkipForward className="text-white" onDoubleClick={onForward} />
            )}

            <div className="text-white" onClick={onMute}>
              {mute ? <Volume /> : <Volume2 />}
            </div>

            <Slider
              onValueChange={onVolumeChangeHandler}
              defaultValue={[volume * 100]}
              variant="volume"
              className="w-20"
            />
          </div>

          <div className="flex flex-row gap-4">
            <span className="text-white">
              {currentTime}/{duration}
            </span>

            <Maximize className="text-white" onClick={onFullScreen} />
          </div>
        </div>
      </div>
    </div>
  )
}
