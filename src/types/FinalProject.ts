import Entity from './Entity'

export interface FinalProject extends Entity {
  arquivo: string | File
  descricao: string
  resultado: string
  data_criacao?: string
  data_conclusao?: string
  usuario_criacao: number
  nome_usuario_criacao_read?: string
  curso: number
}
