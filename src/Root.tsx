import React, {useEffect, useState} from 'react'
import {StyleSheet, StatusBar} from 'react-native'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import {Colors} from '~/Colors'
import {List, ListItem} from './Components'

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.darknavy,
  },
})

export const Root = () => {
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={Colors.darknavy} barStyle="light-content" />
      <SafeAreaView style={styles.background} edges={['top']}>
        <List>
          <ListItem title={'Cool Stuff'} />
          <ListItem title={'Cool Stuff 2'} withArrow />
          <ListItem
            title={'With toggle'}
            checked={checked}
            onToggle={() => setChecked(checked => !checked)}
          />
        </List>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
