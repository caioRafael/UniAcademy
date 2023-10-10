import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

export function CourseCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row w-full items-center justify-between">
        <BookOpen />

        <Link href={'#'}>Continuar</Link>
      </CardHeader>
      <CardContent>
        <p>Estruturas de dados com JavaScript: aprenda um pouco mais</p>
      </CardContent>
      <CardFooter>
        <Progress value={74} className="bg-slate-200 h-1" />
      </CardFooter>
    </Card>
  )
}
