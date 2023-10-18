import Entity from './Entity'

export interface Course extends Entity {
  codigo: string
  capa: File | string
  titulo: string
  descricao: string
  categoria: number
  usuario_criacao: number
  usuario_atualizacao: number
  usuarios_com_acesso: number[]
}
export default interface Courses extends Entity {
  count: number
  next: string
  previous: string
  results: Course[]
}

export interface CourseCategory extends Entity {
  nome: string
}
