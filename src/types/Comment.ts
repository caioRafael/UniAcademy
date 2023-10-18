import Entity from './Entity'

export interface CommentItem {
  id?: number
  usuario: number
  texto: string
  aula: number
  data?: string
  anexo?: number
}

export default interface Comment extends Entity {
  count: number
  next: string
  previous: string
  results: CommentItem[]
}
