import Entity from './Entity'

export interface GraduationItem {
  id: number
  nome: string
}
export default interface Graduation extends Entity {
  count: number
  next: string
  previous: string
  results: GraduationItem[]
}
