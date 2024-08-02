import { createReducer, on } from "@ngrx/store"
import { MovieDetailsState } from "../../shared/models"
import { setDetailedMovie, setShake } from "./movie-details.actions"
import _ from "lodash"
import { environment } from "../../../environments/environments"

const initialState: MovieDetailsState = {
  movie: null,
  trailerUrl: null,
  shake: false
}

export const movieDetailsReducer = createReducer(
  initialState,
  on(setDetailedMovie, (state, action) => {
    const newState = _.cloneDeep(state)
    newState.movie = action.movie
    if(action.movie) {
      newState.trailerUrl = environment.TRAILER_URL +
    action.movie.videos.results
      .slice()
      .reverse()
      .find((el) => el.type == 'Trailer')?.key;
    }

    return newState
  }),
  on(setShake, (state, action) => {

    return {
      ...state,
      shake: action.shake
    }
  })
)