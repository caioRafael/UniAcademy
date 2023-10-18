import Entity from './Entity'

export interface ModuleItem extends Entity {
  titulo: string
  descricao: string
  curso?: number
  aulas?: File[]
}
