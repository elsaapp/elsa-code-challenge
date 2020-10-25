import React from 'react'
import {StyleSheet, View} from 'react-native'
import {COLORS} from '~/Style/Colors'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'

import {BackButton} from '~/Navigation'
import {CurrentMedicationStackParams} from '~/Navigation/Navigation'
import {PrimaryBlueButton, Body, H1, SecondaryBlueButton} from '~/Components'
import {useDispatch} from 'react-redux'
import {archiveMedication, pauseMedication, restartMedication} from '~/Store/Actions'

const styles = StyleSheet.create({
  BUTTON_CONTAINER: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  BUTTON: {
    width: 170,
  },
  CONTAINER: {
    flex: 1,
    marginHorizontal: 10,
  },
  INFO: {
    marginHorizontal: 50,
    marginVertical: 24,
    alignItems: 'center',
  },
  INFO_BOXES: {
    flexDirection: 'row',
  },
  TEXT_HEADER: {fontWeight: 'bold'},
  TEXT: {fontStyle: 'italic'},
})

export const MedicationInfo: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute<RouteProp<CurrentMedicationStackParams, 'info'>>()
  const medication = route.params.meds

  return (
    <>
      <SafeAreaView style={{backgroundColor: COLORS.darknavy}} edges={['top']} />
      <BackButton
        onPress={() => {
          navigation.reset({
            stale: true,
            routes: [{name: 'medication'}],
          })
        }}
      />
      <View style={styles.CONTAINER}>
        <View style={styles.INFO}>
          <H1>Medication</H1>
        </View>
        <View style={styles.INFO_BOXES}>
          <Body style={styles.TEXT_HEADER}>Brand: </Body>
          <Body style={styles.TEXT}>{medication.name}</Body>
        </View>
        <View style={styles.INFO_BOXES}>
          <Body style={styles.TEXT_HEADER}>Substance: </Body>
          <Body style={styles.TEXT}>{medication.substance}</Body>
        </View>
        <View style={styles.INFO_BOXES}>
          <Body style={styles.TEXT_HEADER}>Dosage: </Body>
          <Body style={styles.TEXT}>{medication.dosage}</Body>
        </View>
        <View style={styles.INFO_BOXES}>
          <Body style={styles.TEXT_HEADER}>Started Taking: </Body>
          <Body style={styles.TEXT}>{medication?.addedAt?.substring(0, 10)}</Body>
        </View>
        <View style={styles.INFO_BOXES}>
          <Body style={styles.TEXT_HEADER}>Active: </Body>
          {!medication.paused ? (
            <Body style={styles.TEXT}>Yes</Body>
          ) : (
            <Body style={styles.TEXT}>No</Body>
          )}
        </View>
        <View style={styles.INFO_BOXES}>
          <Body style={styles.TEXT_HEADER}>Administration Method: </Body>
          <Body style={styles.TEXT}>{medication.administered}</Body>
        </View>
        <View style={styles.BUTTON_CONTAINER}>
          <PrimaryBlueButton
            title={'End medication'}
            titleStyle={{paddingHorizontal: 5, textAlign: 'center'}}
            style={[styles.BUTTON]}
            onPress={() => {
              dispatch(archiveMedication(medication))
              navigation.reset({
                stale: true,
                routes: [{name: 'medication'}],
              })
            }}
          />
          {!medication.paused ? (
            <SecondaryBlueButton
              title={'Pause'}
              titleStyle={{textAlign: 'center', color: COLORS.blue3, marginHorizontal: 1}}
              style={styles.BUTTON}
              onPress={() => {
                dispatch(pauseMedication(medication))
                navigation.reset({
                  stale: true,
                  routes: [{name: 'medication'}],
                })
              }}
            />
          ) : (
            <SecondaryBlueButton
              title={'Resume'}
              titleStyle={{textAlign: 'center', color: COLORS.blue3, marginHorizontal: 1}}
              style={styles.BUTTON}
              onPress={() => {
                dispatch(restartMedication(medication))
                navigation.reset({
                  stale: true,
                  routes: [{name: 'medication'}],
                })
              }}
            />
          )}
        </View>
      </View>
    </>
  )
}
