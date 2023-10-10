import { BaseApi } from '@/lib/api/BaseApi'
import User from '@/types/User'
import { UserService } from './userService'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import Profile from '@/types/Profile'
import { ProfileService } from './profileService'

const baseApi = new BaseApi<User, User>()
export const userService = new UserService(baseApi)
export const userQueryService = new ResourceQueryService('user', userService)

const profileBaseApi = new BaseApi<Profile, Profile>()
export const profileService = new ProfileService(profileBaseApi)
export const profileQueryService = new ResourceQueryService(
  'profile',
  profileService,
)
