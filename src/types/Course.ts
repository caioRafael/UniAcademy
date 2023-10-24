import Entity from './Entity'

export interface Course extends Entity {
  codigo?: string
  capa: File | string
  titulo: string
  descricao: string
  categoria: number
  usuario_criacao: number
  usuario_atualizacao: number
  usuarios_com_acesso: number[]
  descricao_projeto_final?: string
  meu_progresso_read?: {
    aulas_finalizadas: number
    curso_finalizado: boolean
    modulos_finalizados: number
    pontuacao_questionarios: number
    progresso_aula: number
    progresso_curso: number
    progresso_questionario: number
    quantidade_acertos_curso: number
    quantidade_aulas: number
    quantidade_questionarios_curso: number
  }
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
