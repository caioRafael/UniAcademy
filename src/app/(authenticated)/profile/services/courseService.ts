import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { Course } from '@/types/Course'
import { ListResponse } from '@/types/ListResponse'

export class CourseService implements ResourceService<Course, Course> {
  baseApi: IBaseApi<Course, Course>

  constructor(baseApi: IBaseApi<Course, Course>) {
    this.baseApi = baseApi
  }

  async create(data: Course, token: string): Promise<Course | null> {
    const response = await this.baseApi.upload('/api/cursos/', data, token)

    return response.data
  }

  findQuery(): Promise<Course[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(
    token: string,
    categoryId: number,
    usuario_criacao?: number,
    offset?: number | null,
    usuarios_com_acesso?: number,
    // query: string,
    // ordering: string,
  ): Promise<ListResponse<Course>> {
    const response = await this.baseApi.getAll(
      `/api/cursos/?categoria=${categoryId || ''}${
        usuario_criacao ? '&usuario_criacao=' : ''
      }${usuario_criacao || ''}&limit=${offset}${
        usuarios_com_acesso ? '&usuarios_com_acesso=' : ''
      }${[usuarios_com_acesso] || ''}`,
      token,
    )

    return response.data
  }

  async findOne(id: string, token?: string): Promise<Course | null> {
    const response = await this.baseApi.getOne(`/api/cursos/${id}`, token)

    return response.data as Course
  }

  async update(
    data: Partial<Course>,
    token: string,
    id: string,
  ): Promise<Course | null> {
    const response = await this.baseApi.patch(`/api/cursos/${id}/`, token, data)

    return response.data as Course
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Course | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Course | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Course): Course {
    return executionTest
  }

  commandToQuery(executionTest: Course): Course {
    return executionTest
  }
}
