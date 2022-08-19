import React from 'react'
import {StyleSheet, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'
import {Colors} from '~/Colors'
import {H1, SecondaryBlueButton} from '~/Components'
import {Routes} from '~/Navigation/Routes'
import type {RootNavigation} from '~/Root'
import {nameSelector} from '~/Store/Selectors/User'

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

type StartProps = {
  navigation: RootNavigation
}
export const Start: React.FC<StartProps> = ({navigation}) => {
  const name = useSelector(nameSelector)
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

        <View style={styles.info}>
          <SecondaryBlueButton
            title="Medications"
            onPress={() => {
              navigation.navigate(Routes.ADD_MEDICATION)
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
