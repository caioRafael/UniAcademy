'use client'
import { Course } from '@/types/Course'
import { ModuleItem } from '@/types/Module'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import {
  classRoomQueryService,
  courseQueryService,
  moduleQueryService,
} from '../services'
import { useRouter } from 'next/navigation'
import { promise } from 'zod'

// Defina o formato do estado
interface CourseContextState {
  moduleList: ModuleItem[]
  setModuleList: Dispatch<SetStateAction<ModuleItem[]>>
  save: () => void
  capa: File | null
  setCapa: Dispatch<SetStateAction<File | null>>
  titulo: string
  setTitulo: Dispatch<SetStateAction<string>>
  descricao: string
  setDescricao: Dispatch<SetStateAction<string>>
  setUserId: Dispatch<SetStateAction<number | null>>
  setToken: Dispatch<SetStateAction<string>>
  load: boolean
  category: number | null
  setCategory: Dispatch<SetStateAction<number | null>>
}

interface CourseContextProviderProps {
  children: ReactNode
}

// Crie o contexto
const CourseContext = createContext<CourseContextState | undefined>(undefined)

// Provedor do contexto
export const CourseContextProvider = ({
  children,
}: CourseContextProviderProps) => {
  const [userId, setUserId] = useState<number | null>(null)
  const [token, setToken] = useState<string>('')
  const [moduleList, setModuleList] = useState<ModuleItem[]>([])
  const [capa, setCapa] = useState<File | null>(null)
  const [titulo, setTitulo] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [category, setCategory] = useState<number | null>(null)

  const router = useRouter()

  const { mutateAsync: createCourse, isLoading: loadCourse } =
    courseQueryService.useCreate(token)
  const { mutateAsync: createModule, isLoading: loadModule } =
    moduleQueryService.useCreate(token)
  const { mutateAsync: createClassRom, isLoading: loadClassRoom } =
    classRoomQueryService.useCreate(token)

  const load = loadCourse || loadModule || loadClassRoom
  // Função para salvar os dados
  const saveData = async () => {
    const courseData: Course = {
      titulo,
      descricao,
      categoria: category as number,
      codigo: String(Math.floor(Math.random() * (2000 - 100)) + 100),
      usuario_atualizacao: userId as number,
      usuario_criacao: userId as number,
      usuarios_com_acesso: [userId as number],
      capa: capa as File,
    }

    try {
      const responseCourse = await createCourse(courseData)

      const newModules = moduleList.map(async (module) => {
        const responseModule = await createModule({
          ...module,
          descricao: 'modulo',
          curso: responseCourse?.id as number,
        } as ModuleItem)

        const aulas = module.aulas as File[]
        Promise.all(
          aulas.map(async (classRoom, index) => {
            //@ts-ignore
            await createClassRom({
              descricao: 'modulo',
              titulo: classRoom.name,
              ordem: index,
              modulo: responseModule?.id as number,
              usuario_atualizacao: userId as number,
              trancricao: '',
              video: classRoom as File,
              tipo_aula: 'video',
              usuario_criacao: userId as number,
            })
          }),
        )
      })
      if (responseCourse && newModules.length !== 0) router.push('/courses')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CourseContext.Provider
      value={{
        moduleList,
        setModuleList,
        save: saveData,
        capa,
        setCapa,
        titulo,
        setTitulo,
        descricao,
        setDescricao,
        setUserId,
        setToken,
        load,
        category,
        setCategory,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}

// Hook personalizado para usar o contexto
export const useCourseContext = () => {
  const context = useContext(CourseContext)
  if (!context) {
    throw new Error(
      'useCourseContext deve ser usado dentro de um CourseContextProvider',
    )
  }
  return context
}
