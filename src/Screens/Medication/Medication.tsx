import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Body, H1} from '../../Components/Typography/'
import {COLORS} from '~/Style/Colors'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'

import {BackButton} from '~/Navigation'
import {CurrentMedicationStackParams} from '~/Navigation/Navigation'
import {PrimaryBlueButton} from '~/Components'
import {useDispatch} from 'react-redux'
import {archiveMedication, deleteMedication} from '~/Store/Actions'

const styles = StyleSheet.create({
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
          <Body style={styles.TEXT}>Yes</Body>
        </View>
        <View style={styles.INFO_BOXES}>
          <Body style={styles.TEXT_HEADER}>Administration Method: </Body>
          <Body style={styles.TEXT}>{medication.administered}</Body>
        </View>
        <View
          style={{
            paddingVertical: 30,
            width: 200,
            alignSelf: 'center',
          }}>
          <PrimaryBlueButton
            title={'End Medication'}
            onPress={() => {
              dispatch(
                archiveMedication(
                  medication.id,
                  medication.name,
                  medication.substance,
                  true,
                  medication.administered,
                  String(medication.dosage),
                  medication.addedAt
                )
              )
              dispatch(deleteMedication(medication.id))
              navigation.reset({
                stale: true,
                routes: [{name: 'medication'}],
              })
            }}
          />
        </View>
      </View>
    </>
  )
}
