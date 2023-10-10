import { CourseCard } from './CourseCard'

export function CoursesContainer() {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4  ">
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
    </div>
  )
}
