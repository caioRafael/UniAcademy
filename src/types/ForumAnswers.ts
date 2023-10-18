import Entity from './Entity'

export interface ForumAnswerItem {
  id: number
  texto: string
  data_criacao: string
  usuario_criacao: number
  nome_usuario_criacao: string
  forum: number
}

export default interface ForumAnswer extends Entity {
  count: number
  next: string
  previous: string
  results: ForumAnswerItem[]
}
