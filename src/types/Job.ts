import Entity from './Entity'

// Enum para a experiência
export enum Experiencia {
  Estagio = 'estagio',
  Assistente = 'assistente',
  Junior = 'junior',
  Pleno = 'pleno',
  Senior = 'senior',
  Trainee = 'trainee',
}

// Enum para o modo de trabalho
export enum ModoDeTrabalho {
  Presencial = 'presencial',
  Remoto = 'remoto',
  Hibrido = 'hibrido',
}

// Enum para o horário
export enum Horario {
  Integral = 'integral',
  MeioPeriodo = 'meioperiodo',
}

export default interface Job extends Entity {
  titulo: string
  sobre_empresa: string
  sobre_vaga: string
  horario: Horario | string
  funcionarios: number
  experiencia: Experiencia | string
  modo_de_trabalho: ModoDeTrabalho | string
  data_de_publicacao?: string
  link_vaga?: string
  contratante: number
  candidatos: number[]
}

// Descrições correspondentes para os enums
export const experienciaDescription: Record<Experiencia, string> = {
  [Experiencia.Estagio]: 'Estágio',
  [Experiencia.Assistente]: 'Assistente',
  [Experiencia.Junior]: 'Júnior',
  [Experiencia.Pleno]: 'Pleno',
  [Experiencia.Senior]: 'Sênior',
  [Experiencia.Trainee]: 'Trainee',
}

export const modoDeTrabalhoDescription: Record<ModoDeTrabalho, string> = {
  [ModoDeTrabalho.Presencial]: 'Presencial',
  [ModoDeTrabalho.Remoto]: 'Remoto',
  [ModoDeTrabalho.Hibrido]: 'Híbrido',
}

export const horarioDescription: Record<Horario, string> = {
  [Horario.Integral]: 'Integral',
  [Horario.MeioPeriodo]: 'Meio Período',
}
