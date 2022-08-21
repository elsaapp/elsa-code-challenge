import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'
import {H1, SecondaryBlueButton} from '~/Components'
import {Routes, useNavigation} from '~/Navigation'
import {nameSelector} from '~/State'

import type {ReactElement} from 'react'

const greetingFlex = 0.65

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    marginBottom: 0,
    flex: greetingFlex,
  },
  changeNameButton: {
    flex: 1 - greetingFlex,
  },
})

export const Header = (): ReactElement => {
  const navigation = useNavigation()

  const name = useSelector(nameSelector)

  return (
    <View style={styles.header}>
      <H1 style={styles.greeting}>Hello {name}!</H1>
      <SecondaryBlueButton
        onPress={() => navigation.navigate(Routes.CHANGE_NAME, {name})}
        style={styles.changeNameButton}
        title={'Change name'}
      />
    </View>
  )
}
