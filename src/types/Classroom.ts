import Entity from './Entity'

export default interface ClassRoom extends Entity {
  visto?: number
  favoritou_aula?: string
  meu_progresso_read?: string
  titulo: string
  descricao: string
  trancricao: string
  data_publicacao?: Date
  tipo_aula: string
  video: string | File
  ordem: number
  usuario_atualizacao: number
  usuario_criacao: number
  modulo: number
}
