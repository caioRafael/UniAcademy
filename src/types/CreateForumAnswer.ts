import Entity from './Entity'

export default interface CreateForumAnswer extends Entity {
  texto: string
  usuario_criacao: number
  forum: number
}
