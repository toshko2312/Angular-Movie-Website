import { createAction, props } from "@ngrx/store";

export const setPage = createAction('[ App Page ] setPage',
  props<{page: number}>()
)

export const incrementPage = createAction('[ App Page ] incrementPage')

export const setLoading = createAction('[ App Loading ] toggleLoading',
  props<{loading: boolean}>()
)