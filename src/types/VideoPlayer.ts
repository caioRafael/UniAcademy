export interface IVideoState {
  playing: boolean
  muted: boolean
  volume: number
  playbackRate: number
  played: number
  seeking: boolean
  buffer: boolean
}

export interface ControlProps {
  onPlayPause: () => void
  onRewind: () => void
  onForward: () => void
  onSeek: (value: number[]) => void
  onSeekClip: (value: number[]) => void
  onVolumeChangeHandler: (value: number[]) => void
  onMute: () => void
  onFullScreen: () => void
  currentTime: string
  duration: string
  mute: boolean
  playing: boolean
  played: number
  volume: number
  showRewind?: boolean
  showForward?: boolean
  token: string
  usuario_criacao: number
  isFullScreen: boolean
}
