import React, {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {ScrollView, StyleSheet, Alert, Switch, View} from 'react-native'
import type {MedicationDetailsRouteProp, RootNavigation} from '~/Root'
import {useDispatch} from 'react-redux'
import {PrimaryBlueButton, SecondaryBlueButton, TextInput, Body} from '~/Components'
import {removeMedication, updateMedication} from '~/Store/Actions'
import {Routes} from '~/Navigation/Routes'
import {Colors} from '~/Colors'
import {TextInputMask} from 'react-native-masked-text'
import {Font, FontWeight} from '~/Font'

type MedicationDetailsProp = {
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
  button: {
    alignSelf: 'center',
    marginVertical: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.gray4,
    height: 40,
    width: '100%',
    marginBottom: 16,
    paddingLeft: 16,
    color: Colors.gray1,
    ...Font({fontSize: 16, fontWeight: FontWeight.regular}),
  },
})

export const MedicationDetails: React.FC<MedicationDetailsProp> = ({navigation, route}) => {
  const [name, setName] = useState(route.params.name)
  const [substance, setSubstance] = useState(route.params.substance)
  const [strength, setStrength] = useState(route.params.strength)
  const [dosage, setDosage] = useState(route.params.dosage)
  const [administratedVia, setAdministratedVia] = useState(route.params.administratedVia)
  const [paused, setPaused] = useState(route.params.paused)
  const [addedAt, setAddedAt] = useState(route.params.addedAt)
  const [startingDate, setStartingDate] = useState(route.params.startingDate)

  const dispatch = useDispatch()

  const onPressUpdateMedication = () => {
    dispatch(
      updateMedication(
        name,
        substance,
        strength,
        dosage,
        administratedVia,
        paused,
        addedAt,
        startingDate
      )
    )
    navigation.navigate(Routes.START)
  }

  const onPressRemoveMedication = () =>
    Alert.alert(
      'Remove Medication',
      'Are you sure you want to remove this medication from your list?',
      [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: () => {
            dispatch(
              removeMedication(
                name,
                addedAt,
                substance,
                strength,
                dosage,
                administratedVia,
                paused,
                startingDate
              )
            )
            navigation.navigate(Routes.START)
          },
        },
      ]
    )

  const toggleSwitch = () => {
    setPaused(!paused)
  }

  return (
    <SafeAreaView style={styles.background} edges={['top']}>
      <ScrollView style={styles.container}>
        <Body variant="medium">Brand name</Body>
        <TextInput value={name} onChangeText={setName} />
        <Body variant="medium">Substance</Body>
        <TextInput value={substance} onChangeText={setSubstance} />
        <Body variant="medium">Strength</Body>
        <TextInput value={strength} onChangeText={setStrength} />
        <Body variant="medium">Dosage</Body>
        <TextInput value={dosage} onChangeText={setDosage} />
        <Body variant="medium">How is this medication administered?</Body>
        <TextInput value={administratedVia} onChangeText={setAdministratedVia} />
        <Body variant="medium">Starting date</Body>
        <TextInputMask
          style={styles.dateInput}
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          value={startingDate}
          onChangeText={setStartingDate}
        />
        <View style={styles.switchContainer}>
          <Body variant="medium">Pause Medication</Body>
          <Switch
            value={paused}
            thumbColor={paused ? Colors.blue3 : Colors.gray4}
            trackColor={{false: Colors.gray2, true: Colors.blue7}}
            onValueChange={toggleSwitch}
          />
        </View>
        <PrimaryBlueButton
          style={styles.button}
          title={'Update medication information'}
          onPress={onPressUpdateMedication}
        />
        <SecondaryBlueButton
          style={styles.button}
          title={'Remove medication'}
          onPress={onPressRemoveMedication}
        />
        <View style={{paddingBottom: 36}} />
      </ScrollView>
    </SafeAreaView>
  )
}
