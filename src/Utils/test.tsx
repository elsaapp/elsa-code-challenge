import React from 'react'
import {render} from '@testing-library/react-native'
import {Provider} from 'react-redux'
import {store} from '~/State'
import {defaultNavigationOptions, NavigationContainer, Routes} from '~/Navigation'
import {createStackNavigator} from '@react-navigation/stack'

import type {ReactElement, ReactNode} from 'react'
import type {RenderOptions} from '@testing-library/react'
import type {RootStackParamList} from '~/Navigation'

const Stack = createStackNavigator<RootStackParamList>()

const Wrapper = ({children}: {children: ReactNode}) => (
  <NavigationContainer>
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        ...defaultNavigationOptions,
      }}>
      <Stack.Screen
        name={Routes.START}
        // eslint-disable-next-line react/no-children-prop
        children={() => <Provider store={store}>{children}</Provider>}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

const decoratedRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {wrapper: Wrapper, ...options})

export * from '@testing-library/react-native'
export {decoratedRender as render}
