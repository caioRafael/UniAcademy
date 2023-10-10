import { AxiosInstance } from 'axios'
import { IBaseApi, Response } from './IBaseApi'
import { api } from './api'

export class BaseApi<Q, C> implements IBaseApi<Q, C> {
  axios: AxiosInstance

  constructor() {
    this.axios = api
  }

  getAll(url: string, token?: string): Promise<Response<Q[] | Q>> {
    return this.axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
  }

  getOne(url: string, token?: string): Promise<Response<Q>> {
    return this.axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
  }

  post(
    url: string,
    data?: Record<string, unknown> | undefined,
  ): Promise<Response<C | C[]>> {
    return this.axios.post(url, data)
  }

  put(
    url: string,
    data?: Record<string, unknown> | undefined,
  ): Promise<Response<C>> {
    return this.axios.put(url, data)
  }

  delete(url: string, token?: string): Promise<Response<void>> {
    return this.axios.delete(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
  }

  // upload(
  //   url: string,
  //   data: Record<string, unknown>,
  //   onUploadProgress?: ((progressEvent: unknown) => void) | undefined,
  //   signal?: AbortSignal | undefined,
  // ): Promise<Response<C>> {
  //   throw new Error('Method not implemented.')
  // }

  // download(
  //   url: string,
  //   data?: unknown,
  //   onDownloadProgress?: ((progressEvent: unknown) => void) | undefined,
  // ): Promise<AxiosResponse<unknown, unknown>> {
  //   throw new Error('Method not implemented.')
  // }

  regenerateToken(): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
}
