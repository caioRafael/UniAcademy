/* eslint-disable react-hooks/rules-of-hooks */
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { ResourceService } from './ResourceService'
import { toast } from '@/components/ui/use-toast'
import { queryClient } from '@/providers/QueryProvider'
import { AxiosError } from 'axios'
import { ListResponse } from '@/types/ListResponse'

export class ResourceQueryService<Q, C> {
  resourceService: ResourceService<Q, C>
  key: string
  hideSucessCreateMessage?: boolean
  successCreateMessage?: string
  successUpdateMessage?: string
  successDeleteMessage?: string
  constructor(
    key: string,
    resourceService: ResourceService<Q, C>,
    hideSucessCreateMessage?: boolean,
    successCreateMessage?: string,
    successUpdateMessage?: string,
    successDeleteMessage?: string,
  ) {
    this.resourceService = resourceService
    this.key = key
    this.successCreateMessage = successCreateMessage
    this.hideSucessCreateMessage = hideSucessCreateMessage
    this.successUpdateMessage = successUpdateMessage
    this.successDeleteMessage = successDeleteMessage
  }

  useFindAll(...options: unknown[]): UseQueryResult<ListResponse<Q>, Error> {
    return useQuery([this.key, ...options], () =>
      this.resourceService.findAll(...options),
    )
  }

  useFindOne(
    id: string,
    ...options: unknown[]
  ): UseQueryResult<Q | null, Error> {
    return useQuery([this.key, ...options], () =>
      this.resourceService.findOne(id, ...options),
    )
  }

  useCreate(...options: unknown[]): UseMutationResult<C | null, AxiosError, C> {
    return useMutation(
      (item: C) => this.resourceService.create(item, ...options),
      {
        onSuccess: () => {
          if (
            this.successCreateMessage !== '' &&
            !this.hideSucessCreateMessage
          ) {
            toast({
              title: 'Sucesso',
              description: 'Item criado com sucesso',
            })
          }
          this.invalidateQueries()
        },
        onError: (error: AxiosError) => {
          const firstKey = Object.keys(error.response?.data as any)[0]
          if (error) {
            toast({
              title: 'Erro',
              description: (error.response?.data as any)[firstKey],
              variant: 'destructive',
            })
          }
        },
      },
    )
  }

  useUpdate(
    id: string,
    ...options: unknown[]
  ): UseMutationResult<C | null, AxiosError, C> {
    return useMutation(
      (item: C) => this.resourceService.update(item, id, options),
      {
        onSuccess: () => {
          if (this.successUpdateMessage === '') {
            toast({
              title: 'Sucesso',
              description: 'Atualização realizada com sucesso',
            })
          } else {
            toast({
              title: 'Sucesso',
              description: 'Inscrição feita com sucesso!',
            })
          }

          this.invalidateQueries()
        },
        onError: (error) => {
          const firstKey = Object.keys(error.response?.data as any)[0]
          if (error) {
            toast({
              title: 'Erro',
              description: (error.response?.data as any)[firstKey],
              variant: 'destructive',
            })
          }
        },
      },
    )
  }

  useDelete(...options: unknown[]): UseMutationResult<void, Error, string> {
    return useMutation(
      (id: string) => this.resourceService.delete(id as string, ...options),
      {
        onSuccess: () => {
          toast({
            title: 'Sucesso',
            description: 'Item excluido com sucesso',
          })
          this.invalidateQueries()
        },
        onError: (error) => {
          toast({
            title: 'Erro',
            description: error.message,
            variant: 'destructive',
          })
        },
      },
    )
  }

  invalidateQueries(): void {
    queryClient.invalidateQueries([this.key])
  }
}
