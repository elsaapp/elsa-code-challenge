import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import type {StackNavigationProp} from '@react-navigation/stack'
import type {Routes} from './Routes'

export * from './BackButton'
export * from './Options'
export * from './Routes'
export * from '@react-navigation/native'

type RootNavigation = StackNavigationProp<RootStackParamList>

export type RootStackParamList = {
  [Routes.START]: undefined
  [Routes.CHANGE_NAME]: {name: string}
}

const useTypedNavigation = () => useNavigation<RootNavigation>()
const useTypedRoute = <T extends Routes>() => useRoute<RouteProp<RootStackParamList, T>>()

export {useTypedNavigation as useNavigation}
export {useTypedRoute as useRoute}
