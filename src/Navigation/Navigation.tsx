import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {Start} from '~/Screens/Start/Start'
import {Settings} from '~/Screens/Settings/Settings'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import TabIcon from '../Components/TabIcon/TabIcon'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import {Body} from '~/Components'
import {CurrentMedication} from '~/Screens/CurrentMedication/CurrentMedication'
import {MedicationHistory} from '~/Screens/MedicationHistory/MedicationHistory'
import {IMedication} from '~/Store'
import {MedicationInfo} from '~/Screens/Medication/Medication'

export type NavigationStackParams = {
  start: undefined
  changeName: {
    name: string
  }
  tab: undefined
  history: undefined
}

export type HistoryStackParams = {
  history: undefined
}

export type CurrentMedicationStackParams = {
  medication: undefined
  info: {meds: IMedication}
}

export type MedicationTab = {
  start: undefined
  currentMedication: undefined
  history: undefined
}

export function Navigation() {
  const Stack = createStackNavigator<NavigationStackParams>()

  return (
    <Stack.Navigator initialRouteName="tab" headerMode="none">
      <Stack.Screen name="history" component={HistoryStackParams} />

      <Stack.Screen name="tab" component={MedicationTab} />
    </Stack.Navigator>
  )
}

function MedicationTab() {
  const Tab = createBottomTabNavigator<MedicationTab>()
  return (
    <Tab.Navigator
      initialRouteName="start"
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          switch (route.name) {
            case 'start':
              return <TabIcon lib="Entypo" name="magnifying-glass" color={color} />
            case 'currentMedication':
              return <FontAwesome5Icon name="pills" color={color} size={24} />
            case 'history':
              return <FontAwesome5Icon name="history" color={color} size={24} />
          }
        },
        tabBarLabel: ({color}) => {
          switch (route.name) {
            case 'start':
              return (
                <Body variant="small" style={{color}}>
                  Start
                </Body>
              )
            case 'currentMedication':
              return (
                <Body variant="small" style={{color}}>
                  Medication
                </Body>
              )
            case 'history':
              return (
                <Body variant="small" style={{color}}>
                  History
                </Body>
              )
          }
        },
      })}>
      <Tab.Screen name="start" component={NavigationStackParams} />
      <Tab.Screen name="currentMedication" component={CurrentMedicationStackParams} />
      <Tab.Screen name="history" component={HistoryStackParams} />
    </Tab.Navigator>
  )
}

function NavigationStackParams() {
  const Stack = createStackNavigator<NavigationStackParams>()

  return (
    <Stack.Navigator initialRouteName="start" headerMode="none">
      <Stack.Screen name="start" component={Start} />
      <Stack.Screen name="changeName" component={Settings} />
    </Stack.Navigator>
  )
}

function CurrentMedicationStackParams() {
  const Stack = createStackNavigator<CurrentMedicationStackParams>()

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="medication" component={CurrentMedication} />
      <Stack.Screen name="info" component={MedicationInfo} />
    </Stack.Navigator>
  )
}

function HistoryStackParams() {
  const Stack = createStackNavigator<HistoryStackParams>()

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="history" component={MedicationHistory} />
    </Stack.Navigator>
  )
}
