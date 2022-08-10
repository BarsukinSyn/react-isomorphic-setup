import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux'

import { State, Dispatch } from '../../store'

export const useDispatch: () => Dispatch = useReduxDispatch

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector
