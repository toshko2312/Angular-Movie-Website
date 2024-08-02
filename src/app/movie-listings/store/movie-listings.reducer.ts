import { createReducer, on } from "@ngrx/store"
import * as Actions from "./movie-listings.actions"
import _ from "lodash"

const initialState = {
  movies: null,
  genres: null
}

export const movieListingsReducer = createReducer(
  initialState,
  on(Actions.setMovies, (state, action) => {

    return {
      ...state,
      movies: action.movie
    }
  }),
  on(Actions.setGenres, (state, action) => {

    return {
      ...state,
      genres: action.genre
    }
  }),
  on(Actions.loadMoreMovies, (state, action) => {
    const newState = _.cloneDeep(state)
    newState.movies.page++
    newState.movies.results.push(...action.movie.results)

    return newState
  }),
)