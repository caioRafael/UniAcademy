import Entity from './Entity'

export interface FavoriteItem {
  id: number
  usuario: string
  texto: string
  aula: string
  data: string
  anexo: string
}

export default interface Favorite extends Entity {
  count: number
  next: string
  previous: string
  results: FavoriteItem[]
}
