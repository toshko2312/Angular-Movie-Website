import { createAction, props } from "@ngrx/store"
import { ProfileDetailsData, RatedMoviesData } from "../../shared/models"

export const setRatedMovies = createAction('[ Profile ] setRatedMovies',
  props<{ratedMovies: RatedMoviesData}>()
)

export const setProfileDetails = createAction('[ Profile ] setProfileDetails',
  props<{profileDetails: ProfileDetailsData}>()
)