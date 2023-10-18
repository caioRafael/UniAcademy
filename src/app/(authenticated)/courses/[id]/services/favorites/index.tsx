import { BaseApi } from '@/lib/api/BaseApi'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import Favorite, { FavoriteItem } from '@/types/Favorite'
import { FavoritesService } from './favoritesService'
import { FavoriteService } from './favoriteService'

const favoriteBaseApi = new BaseApi<Favorite, Favorite>()
export const favoriteService = new FavoritesService(favoriteBaseApi)
export const favoriteQueryService = new ResourceQueryService(
  'favorites',
  favoriteService,
)

const favoriteItemBaseApi = new BaseApi<FavoriteItem, FavoriteItem>()
export const favoriteItemService = new FavoriteService(favoriteItemBaseApi)
export const favoriteItemQueryService = new ResourceQueryService(
  'favorite',
  favoriteItemService,
)
