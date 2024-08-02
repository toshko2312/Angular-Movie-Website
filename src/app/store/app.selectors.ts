import { createSelector } from "@ngrx/store";
import { AppState } from "../shared/models";

export const selectFeature = (state) : AppState => {
  return state.app
}

export const selectPage = createSelector(
  selectFeature,
  (state) => state.page
)

export const selectIsLoading = createSelector(
  selectFeature,
  (state) => state.isLoading
)