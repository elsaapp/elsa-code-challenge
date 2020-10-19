import React, {useState} from 'react'
import {StyleSheet, ScrollView, View} from 'react-native'
import {Colors} from '~/Colors'
import {useDispatch} from 'react-redux'
import {PrimaryBlueButton, TextInput, Body} from '~/Components'
import type {RootNavigation} from '~/Root'
import {addMedication} from '~/Store/Actions'
import {Routes} from '~/Navigation/Routes'
import {TextInputMask} from 'react-native-masked-text'
import {Font, FontWeight} from '~/Font'

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 24,
  },
  erorMessage: {
    alignItems: 'center',
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

type ChangeNameProps = {
  navigation: RootNavigation
}
export const AddMedication: React.FC<ChangeNameProps> = ({navigation}) => {
  const dispatch = useDispatch()
  const onAddMedication = () => {
    const allInputsAreFilled =
      name && substance && strength && dosage && administratedVia && startingDate
    if (allInputsAreFilled) {
      setErrorMessage(false)
      dispatch(addMedication(name, substance, strength, dosage, administratedVia, startingDate))
      navigation.navigate(Routes.START)
    } else {
      setErrorMessage(true)
    }
  }
  const [name, setName] = useState('')
  const [substance, setSubstance] = useState('')
  const [strength, setStrength] = useState('')
  const [dosage, setDosage] = useState('')
  const [administratedVia, setAdministratedVia] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [startingDate, setStartingDate] = useState('')

  return (
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
      <TextInput value={administratedVia} placeholder='Orally, Injection, Infusion etc' onChangeText={setAdministratedVia} />
      <Body variant="medium">Starting date</Body>
      <TextInputMask
        style={styles.dateInput}
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY',
        }}
        value={startingDate}
        onChangeText={setStartingDate}
        placeholder="DD/MM/YYYY"
      />
      <PrimaryBlueButton
        style={styles.button}
        title={'Add new medication'}
        onPress={onAddMedication}
      />
      {errorMessage && (
        <View style={styles.erorMessage}>
          <Body color={Colors.red1}>Please, fill it up all the fields.</Body>
        </View>
      )}
    </ScrollView>
  )
}
