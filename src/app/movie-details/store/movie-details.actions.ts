import { createAction, props } from "@ngrx/store"
import { detailedMovieData } from "../../shared/models"

export const setDetailedMovie = createAction('[ Detailed Movie ], setDetailedMovie',
  props<{movie: detailedMovieData | null}>()
)

export const setShake = createAction('[ Detailed Movie ] setShake',
  props<{shake: boolean}>()
)