import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Course } from '@/types/Course'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

interface CourseCardProps {
  course: Course
}

export function CourseCard(props: CourseCardProps) {
  const { course } = props
  return (
    <Card>
      <CardHeader className="flex flex-row w-full items-center justify-between">
        <BookOpen />

        <Link href={`/courses/${course.id}`}>Continuar</Link>
      </CardHeader>
      <CardContent>
        <p>{course.titulo}</p>
      </CardContent>
      <CardFooter>
        <Progress
          value={course?.meu_progresso_read?.progresso_curso || 0}
          className="bg-slate-200 h-1"
        />
      </CardFooter>
    </Card>
  )
}
