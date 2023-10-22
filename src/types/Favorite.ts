import Entity from './Entity'

export interface FavoriteItem extends Entity {
  id: number
  usuario: string
  texto: string
  aula: string
  data: string
  anexo: string
}
