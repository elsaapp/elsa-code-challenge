import React from 'react'
import {StyleSheet, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Colors} from '~/Colors'
import {Header, Medications} from './Components'

import type {ReactElement} from 'react'

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.darknavy,
  },
  content: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.white,
  },
})

export const Start = (): ReactElement => (
  <SafeAreaView style={styles.background} edges={['top']}>
    <View style={styles.content}>
      <Header />
      <Medications />
    </View>
  </SafeAreaView>
)
