import { createAction, props } from "@ngrx/store"
import * as Models from "../../shared/models"

export const setMovies = createAction('[Movie Listings] setMovies' ,
  props<{movie: Models.moviesData}>()
)
export const setGenres = createAction('[Movie Listings] setGenres',
  props<{genre: Models.genresData}>()
)

export const loadMoreMovies = createAction('[ Movie Listings ] loadMoreMovies',
  props<{movie: Models.moviesData}>()
)