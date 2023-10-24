'use client'
import Profile from '@/types/Profile'
import { courseQueryService } from '../services'
import { CourseCard } from './CourseCard'

interface CoursesContainerProps {
  userId: number
  token: string
  profile: Profile
}

export function CoursesContainer(props: CoursesContainerProps) {
  const { token, userId, profile } = props
  const { data } = courseQueryService.useFindAll(
    token,
    undefined,
    profile.tipo_usuario === 'professor' ? userId : undefined,
    6,
    profile.tipo_usuario === 'aluno' ? userId : undefined,
  )
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4  ">
      {data?.results.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
