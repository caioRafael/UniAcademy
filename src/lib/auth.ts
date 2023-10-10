import decode from 'jwt-decode'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import User from '@/types/User'
import { getServerSession } from 'next-auth'
import { profileService } from '@/app/(authenticated)/services'

export async function getUser() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) throw new Error('Unauthenticated!')

  const decodedToken: User = decode(session.access)

  const profile = await profileService.findOne(
    String(decodedToken.user_id),
    session.access,
  )

  const user = {
    token: session.access,
    ...decodedToken,
    id: decodedToken.user_id,
    profile,
  }

  return user
}
