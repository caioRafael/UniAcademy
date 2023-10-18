'use client'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { ClassItem } from '@/types/Class'
import { Course } from '@/types/Course'

interface ClassContextState {
  selectedCourse: Course | undefined
  setSelectedCourse: Dispatch<SetStateAction<Course | undefined>>
  selectedClass: ClassItem | undefined
  setSelectedClass: Dispatch<SetStateAction<ClassItem | undefined>>
}

interface ClassContextProviderProps {
  children: ReactNode
}

const ClassContext = createContext<ClassContextState | undefined>(undefined)

export const ClassesContextProvider = ({
  children,
}: ClassContextProviderProps) => {
  const [selectedCourse, setSelectedCourse] = useState<Course>()
  const [selectedClass, setSelectedClass] = useState<ClassItem>()

  return (
    <ClassContext.Provider
      value={{
        selectedClass,
        setSelectedClass,
        selectedCourse,
        setSelectedCourse,
      }}
    >
      {children}
    </ClassContext.Provider>
  )
}

export const useClassContext = () => {
  const context = useContext(ClassContext)
  if (!context) {
    throw new Error(
      'useClassContext deve ser usado dentro de um ClassContextProvider',
    )
  }
  return context
}
