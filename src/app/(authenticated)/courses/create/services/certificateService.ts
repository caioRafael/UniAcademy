import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { ListResponse } from '@/types/ListResponse'
import Certificate from '@/types/certificate'

export class CertificateService
  implements ResourceService<Certificate, Certificate>
{
  baseApi: IBaseApi<Certificate, Certificate>

  constructor(baseApi: IBaseApi<Certificate, Certificate>) {
    this.baseApi = baseApi
  }

  async create(data: Certificate, token: string): Promise<Certificate | null> {
    const response = await this.baseApi.upload(
      '/api/certificados/',
      data,
      token,
    )

    return response.data
  }

  findQuery(): Promise<Certificate[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(
    token: string,
    moduleId?: number,
  ): Promise<ListResponse<Certificate>> {
    throw new Error('Method not implemented.')
  }

  async findOne(id: string, token: string): Promise<Certificate | null> {
    throw new Error('Method not implemented.')
  }

  async update(): Promise<Certificate | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Certificate | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Certificate | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Certificate): Certificate {
    throw new Error('Method not implemented.')
  }

  commandToQuery(executionTest: Certificate): Certificate {
    throw new Error('Method not implemented.')
  }
}
