import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import Job from '@/types/Job'

import { ListResponse } from '@/types/ListResponse'

export class JobService implements ResourceService<Job, Job> {
  baseApi: IBaseApi<Job, Job>

  constructor(baseApi: IBaseApi<Job, Job>) {
    this.baseApi = baseApi
  }

  async create(data: Job, token: string): Promise<Job | null> {
    const response = await this.baseApi.upload('/api/vagas/', data, token)

    return response.data as Job
  }

  findQuery(): Promise<Job[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<Job>> {
    const response = await this.baseApi.getAll('/api/vagas/', token)

    return response.data
  }

  async findOne(id: string, token: string): Promise<Job> {
    const response = await this.baseApi.getOne(`/api/vagas/${id}`, token)

    return response.data as Job
  }

  async update(): Promise<Job | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Job | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Job | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Job): Job {
    return executionTest
  }

  commandToQuery(executionTest: Job): Job {
    return executionTest
  }
}
