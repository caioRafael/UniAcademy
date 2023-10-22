'use client'
import { Title } from '@/components/Title'
import { useClassContext } from '../../context/ClassesContext'

import { SubscribeModal } from '../subscribeModal'
import { useMemo } from 'react'
export interface HeaderProps {
  token: string
  userIsTeacher: boolean
  userId: number
}

const Header = ({ token, userIsTeacher, userId }: HeaderProps) => {
  const { selectedCourse, selectedClass } = useClassContext()

  const showSubscribeButton = useMemo(() => {
    if (!selectedCourse) {
      return false
    }
    if (userIsTeacher) {
      return false
    }
    return !selectedCourse?.usuarios_com_acesso?.includes(userId)
  }, [selectedCourse?.usuarios_com_acesso])

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="w-[70%]">
        <Title title={selectedClass?.titulo?.replace('.mp4', '') || ''} />
      </div>
      {showSubscribeButton && <SubscribeModal userId={userId} token={token} />}
    </div>
  )
}

export default Header
