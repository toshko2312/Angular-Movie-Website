import { createSelector } from "@ngrx/store"
import { ProfileState } from "../../shared/models"

export const selectFeature = (state) : ProfileState => {
  return state.profile
}

export const selectRatedMovies = createSelector(
  selectFeature,
  (state) => state.ratedMovies
)

export const selectProfileDetails = createSelector(
  selectFeature,
  (state) => state.profileDetails
)