import {DefaultTheme, NavigationContainer, RouteProp} from '@react-navigation/native'
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useRef} from 'react'
import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {ChangeName} from '~/ChangeName'
import {Colors} from '~/Colors'
import {defaultNavigationOptions} from '~/Navigation'
import {Routes} from '~/Navigation/Routes'
import {Start} from '~/Start'
import {initiateStore, persistor} from '~/Store'
import {AddMedication} from './AddMedication'
import {ViewMedication} from './ViewMedication'

export type RootStackParamList = {
  [Routes.START]: undefined
  [Routes.CHANGE_NAME]: {name: string}
  [Routes.ADD_MEIDCATION]: undefined
  [Routes.VIEW_MEIDCATION]: {name: string}
}
const Stack = createStackNavigator<RootStackParamList>()

export type RootNavigation = StackNavigationProp<RootStackParamList>
export type ChangeNameRouteProp = RouteProp<RootStackParamList, Routes.CHANGE_NAME>
export type ViewMedicationRouteProp = RouteProp<RootStackParamList, Routes.VIEW_MEIDCATION>

const RootStack: React.FC = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        ...defaultNavigationOptions,
      }}>
      <Stack.Screen name={Routes.START} component={Start} options={{headerShown: false}} />
      <Stack.Screen
        name={Routes.CHANGE_NAME}
        component={ChangeName}
        options={({route}) => ({
          title: route.params.name,
        })}
      />
      <Stack.Screen name={Routes.ADD_MEIDCATION} component={AddMedication} />
      <Stack.Screen
        name={Routes.VIEW_MEIDCATION}
        component={ViewMedication}
        options={({route}) => ({
          title: route.params.name,
        })}
      />
    </Stack.Navigator>
  )
}

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
}
export const Root = () => {
  const store = useRef(initiateStore())
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={Colors.darknavy} barStyle="light-content" />
      <Provider store={store.current}>
        <PersistGate loading={null} persistor={persistor(store.current)}>
          <NavigationContainer theme={CustomTheme}>
            <RootStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}
