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
  successCreateMessage?: string
  successUpdateMessage?: string
  successDeleteMessage?: string
  constructor(
    key: string,
    resourceService: ResourceService<Q, C>,
    successCreateMessage?: string,
    successUpdateMessage?: string,
    successDeleteMessage?: string,
  ) {
    this.resourceService = resourceService
    this.key = key
    this.successCreateMessage = successCreateMessage
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
          if (this.successCreateMessage !== '') {
            toast({
              title: 'Sucesso',
              description: 'Item criado com sucesso',
            })
          }
          this.invalidateQueries()
        },
        onError: (error: AxiosError) => {
          if (error) {
            toast({
              title: 'Erro',
              description: error?.message,
              variant: 'destructive',
            })
          }
        },
      },
    )
  }

  useUpdate(...options: unknown[]): UseMutationResult<C | null, Error, C> {
    return useMutation(
      (item: C) => this.resourceService.update(item, options),
      {
        onSuccess: () => {
          toast({
            title: 'Sucesso',
            description: 'Atualização realizada com sucesso',
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
