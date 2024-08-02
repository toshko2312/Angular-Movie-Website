import { createSelector } from "@ngrx/store"
import { MovieListingsState } from "../../shared/models"

export const selectFeature = (state) : MovieListingsState => {
  return state.movieListings
}

export const selectMovies = createSelector(
  selectFeature,
  (state) => {
    return state.movies
  }
)

export const selectGenres = createSelector(
  selectFeature,
  (state) => state.genres?.genres
)