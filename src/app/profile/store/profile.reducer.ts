import { createReducer, on } from "@ngrx/store";
import { ProfileState } from "../../shared/models";
import { setProfileDetails, setRatedMovies } from "./profile.actions";

const initialState: ProfileState = {
  ratedMovies: null,
  profileDetails: null
}

export const profileReducer = createReducer(
  initialState,
  on(setRatedMovies, (state, action) => {

    return {
      ...state,
      ratedMovies: action.ratedMovies
    }
  }),
  on(setProfileDetails, (state, action) => {

    return {
      ...state,
      profileDetails: action.profileDetails
    }
  })
)