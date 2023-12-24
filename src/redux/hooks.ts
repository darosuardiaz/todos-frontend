import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from './store'

export const useAppState: TypedUseSelectorHook<RootState> = useSelector