import type {RootState, RootDispatch} from '~/Store'

declare module 'react-redux' {
  // Add overload function to support type checked dispatch
  export function useDispatch(): RootDispatch
  export function useSelector<TState = RootState, TSelected>(
    selector: (state: TState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected
}
