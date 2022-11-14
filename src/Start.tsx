import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'
import {Colors} from '~/Colors'
import {Body, H1, PrimaryBlueButton, MedicationList} from '~/Components'
import {Routes} from '~/Navigation/Routes'
import type {RootNavigation} from '~/Root'
import {nameSelector, medicationsSelector} from '~/Store/Selectors/User'

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
  underline: {
    textDecorationLine: 'underline',
  },
})

type StartProps = {
  navigation: RootNavigation
}
export const Start: React.FC<StartProps> = ({navigation}) => {
  const name = useSelector(nameSelector)
  const medications = useSelector(medicationsSelector)
  return (
    <SafeAreaView style={styles.background} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.info}>
          {name ? (
            <H1>
              <Text>Hello </Text>
              <Text
                style={styles.underline}
                onPress={() => navigation.navigate(Routes.CHANGE_NAME, {name})}>
                {name}
              </Text>
              <Text>!</Text>
            </H1>
          ) : (
            <H1
              style={styles.underline}
              onPress={() => navigation.navigate(Routes.CHANGE_NAME, {name})}>
              What is your name?
            </H1>
          )}
          <PrimaryBlueButton
            title="Add medication"
            onPress={() => navigation.navigate(Routes.ADD_MEDICATION)}
          />
        </View>
        {medications.length > 0 ? (
          <MedicationList medications={medications} />
        ) : (
          <Body style={styles.help}>{`Start by adding your medications.`}</Body>
        )}
      </View>
    </SafeAreaView>
  )
}
