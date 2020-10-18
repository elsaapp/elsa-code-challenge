import {
  CardStyleInterpolators,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'
import React from 'react'
import {Platform, StyleSheet} from 'react-native'
import {initialWindowSafeAreaInsets} from 'react-native-safe-area-context'
import {COLORS} from '../Style/Colors'
import {Font, FontWeight} from '../Style/Font'
import {BackButton} from './BackButton'

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.darknavy,
    height: 64 + (initialWindowSafeAreaInsets?.top ?? 0),
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    ...Font({fontSize: 20, fontWeight: FontWeight.bold}),
  },
  headerPadding: {
    paddingBottom: 8,
  },
  headerTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    marginHorizontal: 72,
    paddingBottom: 8,
  },
})

export const defaultNavigationOptions: StackNavigationOptions = {
  cardStyleInterpolator:
    Platform.OS === 'ios'
      ? CardStyleInterpolators.forHorizontalIOS
      : CardStyleInterpolators.forFadeFromBottomAndroid,
  headerBackTitle: undefined,
  headerStyle: styles.header,
  headerTintColor: COLORS.white,
  headerTitleStyle: styles.headerTitle,
  headerTitleContainerStyle: styles.headerTitleContainer,
  headerLeft: props => <BackButton {...props} />,
  headerLeftContainerStyle: styles.headerPadding,
  headerRightContainerStyle: styles.headerPadding,
}

export const bottomModalOptions: StackNavigationOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
  gestureEnabled: false,
}

export const bottomModalWithGesturesOptions: StackNavigationOptions = {
  ...bottomModalOptions,
  gestureEnabled: true,
  gestureDirection: 'vertical',
}
