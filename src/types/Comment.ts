import Entity from './Entity'

export interface CommentItem extends Entity {
  id?: number
  usuario: number
  texto: string
  aula: number
  data?: string
  anexo?: number
}
