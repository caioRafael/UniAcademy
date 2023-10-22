import Entity from './Entity'

export interface ClipItem extends Entity {
  id: number
  aula: number
  usuario_criacao: number
  data_criacao: string
  tempo_inicial: string
  tempo_final: string
  titulo: string
  descricao: string
}
