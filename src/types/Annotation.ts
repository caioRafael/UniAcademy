import Entity from './Entity'

export interface AnnotationItem extends Entity {
  id?: number
  data_criacao?: string
  data_atualizacao?: string
  usuario_criacao: number
  usuario_atualizacao?: number
  aula: number
  anotacao: string
  duracao?: string
}
