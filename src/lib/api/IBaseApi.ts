/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Response<T> {
  headers: T
  status: number
  data: T
}

export interface IBaseApi<Q, C> {
  getAll(url: string, token?: string): Promise<Response<Q[] | Q>>
  getOne(url: string, token?: string): Promise<Response<Q>>
  post(url: string, data?: Record<string, any>): Promise<Response<C | C[]>>
  put(url: string, data?: Record<string, any>): Promise<Response<C>>
  delete(url: string, token?: string): Promise<Response<void>>
  // upload(
  //   url: string,
  //   data: Record<string, any>,
  //   onUploadProgress?: (progressEvent: any) => void,
  //   signal?: AbortSignal,
  // ): Promise<Response<C>>
  // download(
  //   url: string,
  //   data?: unknown,
  //   onDownloadProgress?: (progressEvent: any) => void,
  // ): Promise<AxiosResponse>
  regenerateToken(): Promise<unknown>
}
