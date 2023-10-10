import { BaseApi } from '@/lib/api/BaseApi'
import Profile from '@/types/Profile'
import { ProfileService } from './profileServoce'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'

const profileBaseApi = new BaseApi<Profile, Profile>()
export const profileService = new ProfileService(profileBaseApi)
export const profileQueryService = new ResourceQueryService(
  'profile',
  profileService,
)
