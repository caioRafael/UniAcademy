import Entity from './Entity'

export default interface Project extends Entity {
  titulo: string
  descricao: string
  anexo: File | string | null
  categoria: number
  autor: number
  data_do_projeto?: Date
}
