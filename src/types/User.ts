import Entity from './Entity'

export default interface User extends Entity {
  email: string
  username: string
  password: string
}
