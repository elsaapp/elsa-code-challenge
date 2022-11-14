import {DefaultTheme, NavigationContainer, RouteProp} from '@react-navigation/native'
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useRef} from 'react'
import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {ChangeName} from '~/ChangeName'
import {AddMedication} from '~/AddMedication'
import {Colors} from '~/Colors'
import {defaultNavigationOptions} from '~/Navigation'
import {Routes} from '~/Navigation/Routes'
import {Start} from '~/Start'
import {initiateStore, persistor} from '~/Store'

export type RootStackParamList = {
  [Routes.START]: undefined
  [Routes.CHANGE_NAME]: {name: string}
  [Routes.ADD_MEDICATION]: undefined
}
const Stack = createStackNavigator<RootStackParamList>()

export type RootNavigation = StackNavigationProp<RootStackParamList>
export type ChangeNameRouteProps = RouteProp<RootStackParamList, Routes.CHANGE_NAME>
export type AddMedicationRouteProps = RouteProp<RootStackParamList, Routes.ADD_MEDICATION>

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
      <Stack.Screen
        name={Routes.ADD_MEDICATION}
        component={AddMedication}
        options={() => ({
          title: 'Add medication',
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
