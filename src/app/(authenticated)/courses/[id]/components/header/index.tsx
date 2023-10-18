'use client'
import { Title } from '@/components/Title'
import { useClassContext } from '../../context/ClassesContext'

const Header = () => {
  const { selectedClass } = useClassContext()
  return (
    <div className="flex justify-between items-center mb-4">
      <Title title={selectedClass?.titulo || ''} />
      <span className="text-darkRed text-xxs font-medium">
        Relatar Problema
      </span>
    </div>
  )
}

export default Header
