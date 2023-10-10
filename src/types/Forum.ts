import Entity from './Entity'

export interface ForumItem {
  id: number
  nome_usuario_criacao: string
  titulo: string
  assunto: string
  mensagem: string
  data_criacao: string
  arquivo: string
  usuario_criacao: number
}
export default interface Forum extends Entity {
  count: number
  next: string
  previous: string
  results: ForumItem[]
}
