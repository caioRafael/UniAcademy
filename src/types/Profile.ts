import Entity from './Entity'

export default interface Profile extends Entity {
  nome_completo: string
  tipo_usuario: string
  usuario: number
}
