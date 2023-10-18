import Entity from './Entity'

export interface AnnotationItem {
  id?: number
  data_criacao?: string
  data_atualizacao?: string
  usuario_criacao: number
  usuario_atualizacao?: number
  aula: number
  anotacao: string
  duracao?: string
}

export default interface Annotation extends Entity {
  count: number
  next: string
  previous: string
  results: AnnotationItem[]
}
