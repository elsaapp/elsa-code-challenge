import React, {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {ScrollView, StyleSheet, Alert} from 'react-native'
import type {MedicationDetailsRouteProp, RootNavigation} from '~/Root'
import {useDispatch} from 'react-redux'
import {SecondaryBlueButton, Body} from '~/Components'
import {deleteRecord} from '~/Store/Actions'
import {Routes} from '~/Navigation/Routes'
import {Colors} from '~/Colors'

type MedicationRecordProp = {
  navigation: RootNavigation
  route: MedicationDetailsRouteProp
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.darknavy,
  },
  container: {
    paddingVertical: 24,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  body: {
    marginBottom: 12,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 24,
  },
})

export const MedicationRecord: React.FC<MedicationRecordProp> = ({navigation, route}) => {
  const [name, setName] = useState(route.params.name)
  const [substance, setSubstance] = useState(route.params.substance)
  const [strength, setStrength] = useState(route.params.strength)
  const [dosage, setDosage] = useState(route.params.dosage)
  const [administratedVia, setAdministratedVia] = useState(route.params.administratedVia)
  const [paused, setPaused] = useState(route.params.paused)
  const [addedAt, setAddedAt] = useState(route.params.addedAt)
  const [startingDate, setStartingDate] = useState(route.params.startingDate)

  const formattedDay = addedAt?.substring(8, 10)
  const formattedMonth = addedAt?.substring(5, 7)
  const formattedYear = addedAt?.substring(0, 4)
  const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`

  const dispatch = useDispatch()

  const onPressRemoveMedication = () =>
    Alert.alert(
      'Delete record',
      'Are you sure you want to delete this medication from your history?',
      [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: () => {
            dispatch(deleteRecord(addedAt))
            navigation.navigate(Routes.MEDICATION_HISTORY)
          },
        },
      ]
    )

  return (
    <SafeAreaView style={styles.background} edges={['top']}>
      <ScrollView style={styles.container}>
        <Body bold variant="large">Brand name: </Body>
        <Body variant="large" style={styles.body}>{name}</Body>
        <Body bold variant="large">Substance: </Body>
        <Body variant="large" style={styles.body}>{substance}</Body>
        <Body bold variant="large">Strength: </Body>
        <Body variant="large" style={styles.body}>{strength}</Body>
        <Body bold variant="large">Dosage: </Body>
        <Body variant="large" style={styles.body}>{dosage}</Body>
        <Body bold variant="large">How is this medication administered?</Body>
        <Body variant="large" style={styles.body}>{administratedVia}</Body>
        <Body bold variant="large">Starting date: </Body>
        <Body variant="large" style={styles.body}>{startingDate}</Body>
        <Body bold variant="large">Added to medication list in:</Body>
        <Body variant="large" style={styles.body}>{formattedDate}</Body>
        <SecondaryBlueButton
          style={styles.button}
          title='Delete record'
          onPress={onPressRemoveMedication}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
