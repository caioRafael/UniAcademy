import Entity from './Entity'

export interface Recommended extends Entity {
  id: number
  visto: number
  favoritou_aula: boolean
  meu_progresso_read: {
    progresso: number
  }
  curso_read?: {
    id: number
    capa: string
    categoria_read: string
  }
  titulo: string
  descricao: string
  trancricao: any
  data_publicacao: string
  tipo_aula: string
  video: string
  ordem: number
  usuario_atualizacao: any
  usuario_criacao: any
  modulo: number
}
