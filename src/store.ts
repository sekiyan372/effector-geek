import { createSlice, PayloadAction, configureStore, createSelector } from '@reduxjs/toolkit'
import { Article, Effector } from '~/types'

type State = {
  articles: { [id: string]: Article }
  effectors: { [id: string]: Effector }
}

const initialState: State = {
  articles: {},
  effectors: {},
}

const slice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    updateArticles: (state, action: PayloadAction<State['articles'][string][]>) => ({
      ...state,
      articles: {
        ...action.payload.reduce(
          (prev, current) => ({
            ...prev,
            [current.id]: current,
          }),
          {}
        ),
      },
    }),
  },
})

export const actions = slice.actions
export const reducer = slice.reducer

export const store = configureStore({ reducer })

store.subscribe(() =>
  console.log(store.getState())
)

type RootState = ReturnType<typeof store.getState>

export const getArticles = createSelector(
  (state: RootState) => state.articles,
  (articles) => Object.keys(articles),
)

export const getArticleById = (id: Article['id']) =>
  createSelector<RootState, RootState['articles'], Article | undefined >(
    (state: RootState) => state.articles,
    (articles) => articles[id]
  )