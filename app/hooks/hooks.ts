import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// export type AppSelector<Return> = (state: RootState) => Return
// export const createAppSelector = <R>(selector: AppSelector<R>): AppSelector<R> => selector