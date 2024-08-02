import { createSelector } from "@ngrx/store"
import { MovieDetailsState } from "../../shared/models"

export const selectFeature = (state) : MovieDetailsState => {
  return state.movieDetails
}

export const selectDetailedMovie = createSelector(
  selectFeature,
  (state) => state
)

export const selectShake = createSelector(
  selectFeature,
  (state) => state.shake
)