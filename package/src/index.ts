import { QueryClient } from '@tanstack/react-query'
import { Arcessere } from '@filante/arcessere'
import { RouteKeys, Routes } from '@filante/arcessere/types'
import { Imprimer } from '@filante/imprimer'
import { useQuery, UseQueryParams } from './hooks/use_query.js'
import { useMutation, UseMutationParams } from './hooks/use_mutation.js'
import { useList, UseListParams } from './hooks/use_list.js'
import { useForm, UseFormParams } from './hooks/use_form.js'
import { queryKey, QueryKeyParams } from './helpers/query_key.js'
import { useParams } from './hooks/use_params.js'

export class Cobalt<ROUTES extends Routes, KEYS = never> {
  api: Arcessere<ROUTES>
  query: QueryClient
  routes: ROUTES
  logger: Imprimer

  constructor(params: {
    api: Arcessere<ROUTES>
    query: QueryClient
    routes: ROUTES
    logger: Imprimer
  }) {
    this.api = params.api
    this.query = params.query
    this.routes = params.routes
    this.logger = params.logger
  }

  // IMPROVE: Make reusable

  useParams = () => useParams<KEYS>()

  queryKey = <RK extends RouteKeys<ROUTES>, EP extends ROUTES[RK]['io']>(
    endpoint: QueryKeyParams<ROUTES, RK, EP>['endpoint'],
    params: QueryKeyParams<ROUTES, RK, EP>['params'],
    query?: QueryKeyParams<ROUTES, RK, EP>['query']
  ) =>
    queryKey(this, {
      endpoint,
      params,
      query,
    })

  useQuery = <RK extends RouteKeys<ROUTES>, EP extends ROUTES[RK]['io']>(
    params: UseQueryParams<ROUTES, RK, EP>
  ) => useQuery(this, params)

  useMutation = <RK extends RouteKeys<ROUTES>, EP extends ROUTES[RK]['io']>(
    params: UseMutationParams<ROUTES, RK, EP>
  ) => useMutation(this, params)

  useList = <RK extends RouteKeys<ROUTES>, EP extends ROUTES[RK]['io']>(
    params: UseListParams<ROUTES, RK, EP>
  ) => useList(this, params)

  useForm = <RK extends RouteKeys<ROUTES>, EP extends ROUTES[RK]['io']>(
    params: UseFormParams<ROUTES, RK, EP>
  ) => useForm(this, params)
}
