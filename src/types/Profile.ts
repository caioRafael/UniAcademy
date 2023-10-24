import Entity from './Entity'
import User from './User'

export default interface Profile extends Entity {
  nome_completo: string
  tipo_usuario: string
  usuario?: number
  matricula?: string
  favoritou_professor_read?: string
  foto?: string | File
}

export interface CreateUserProfile extends Profile, User {}
