import Entity from './Entity'

export interface ClassItem {
  id: number
  nome_usuario_criacao: string
  titulo: string
  assunto: string
  mensagem: string
  data_criacao: string
  arquivo: string
  usuario_criacao: number
  modulo: number
}

export default interface Class extends Entity {
  count: number
  next: string
  previous: string
  results: ClassItem[]
}
