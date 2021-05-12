import {
  createSlice,
  PayloadAction,
  configureStore,
  createSelector,
  getDefaultMiddleware,
  combineReducers,
  EnhancedStore,
} from '@reduxjs/toolkit'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
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
    updateEffectors: (state, action: PayloadAction<State['effectors'][string][]>) => ({
      ...state,
      effectors: {
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

// persistConfigのためのstorage のエラー対応
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null)
    },
    setItem(_key, value) {
      return Promise.resolve(value)
    },
    removeItem(_key) {
      return Promise.resolve()
    },
  }
}

// stateを永続化するためのstorage
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

// persistの設定
const persistConfig = {
  key: 'effector-geek',
  version: 1,
  storage,
}

// persistに対応したreducer
const persistedReducer = persistReducer(persistConfig, reducer)

// store
const useStore = (): EnhancedStore => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })
}

export const store = useStore()

// stateの値を確認するためのもの
// store.subscribe(() =>
//   console.log(store.getState())
// )

type RootState = ReturnType<typeof reducer>

export const getArticleIds = createSelector(
  (state: RootState) => state.articles,
  (articles) => Object.keys(articles)
)

export const getArticleById = (id: Article['id']) =>
  createSelector<RootState, RootState['articles'], Article | undefined >(
    (state: RootState) => state.articles,
    (articles) => articles[id]
  )

export const getEffectorIds = createSelector(
  (state: RootState) => state.effectors,
  (effectors) => Object.keys(effectors)
)

export const getEffectorById = (id: Effector['id']) =>
  createSelector<RootState, RootState['effectors'], Effector | undefined >(
    (state: RootState) => state.effectors,
    (effectors) => effectors[id]
  )

export const getEffectors = createSelector(
  (state: RootState) => state.effectors,
  (effectors) => Object.values(effectors)
)
