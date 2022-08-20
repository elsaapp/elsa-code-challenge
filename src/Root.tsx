import {createStackNavigator} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {ChangeName} from '~/Screens/ChangeName'
import {Colors} from '~/Colors'
import {
  defaultNavigationOptions,
  DefaultTheme,
  NavigationContainer,
  RootStackParamList,
  Routes,
} from '~/Navigation'
import {Start} from '~/Screens/Start'
import {store, persistor} from '~/State'

const Stack = createStackNavigator<RootStackParamList>()

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
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={Colors.darknavy} barStyle="light-content" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer theme={CustomTheme}>
            <RootStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}
