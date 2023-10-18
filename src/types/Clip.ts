import Entity from './Entity'

export interface ClipItem {
  id: number
  aula: number
  usuario_criacao: number
  data_criacao: string
  tempo_inicial: string
  tempo_final: string
  titulo: string
  descricao: string
}

export default interface Clip extends Entity {
  count: number
  next: string
  previous: string
  results: ClipItem[]
}
