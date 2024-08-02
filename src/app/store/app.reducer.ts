import { createReducer, on } from "@ngrx/store"
import { AppState } from "../shared/models"
import * as Actions from './app.actions'
import _ from "lodash"


const initialState: AppState = {
  page: 1,
  isLoading: false
}

export const appReducer = createReducer(
  initialState,
  on(Actions.setPage, (state, action) => {
    return {
      ...state,
      page: action.page
    }
  }),
  on(Actions.incrementPage, (state) => {
    return {
      ...state,
      page: state.page + 1
    }
  }),
  on(Actions.setLoading, (state, action) => {
    return {
      ...state,
      isLoading: action.loading
    }
  })
)