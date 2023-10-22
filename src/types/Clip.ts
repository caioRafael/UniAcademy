import Entity from './Entity'

export interface ClipItem extends Entity {
  id: number
  aula: number
  usuario_criacao: number
  data_criacao: string
  tempo_inicial: number
  tempo_final: number
  titulo: string
  descricao: string
}
