import Entity from './Entity'

export interface Warning extends Entity {
  titulo: string
  descricao: string
  data_da_publicacao?: Date
  arquivo: File | string
  categoria: number
  autor: number
}
