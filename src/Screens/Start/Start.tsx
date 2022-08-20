import React, {ReactElement} from 'react'
import {StyleSheet, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'
import {Colors} from '~/Colors'
import {Body, H1, SecondaryBlueButton} from '~/Components'
import {nameSelector} from '~/State'
import {Routes, useNavigation} from '~/Navigation'

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.darknavy,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  info: {
    marginHorizontal: 24,
    marginVertical: 24,
    alignItems: 'flex-start',
  },
  help: {
    marginHorizontal: 24,
  },
})

export const Start = (): ReactElement => {
  const name = useSelector(nameSelector)
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.background} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.info}>
          <H1>Hello {name}!</H1>
          <SecondaryBlueButton
            title={'Change name'}
            onPress={() => navigation.navigate(Routes.CHANGE_NAME, {name})}
          />
        </View>
        <Body
          style={styles.help}>{`Hmm. It would be great if I had a list of my medications here... 🤔
        
        
Please have a look at src/Start.tsx to get started!
👩‍💻👨‍💻`}</Body>
      </View>
    </SafeAreaView>
  )
}
