import React, {useState} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {useDispatch} from 'react-redux'
import {PrimaryBlueButton, TextInput} from '~/Components'
import {Routes} from '~/Navigation/Routes'
import type {AddMedicationRouteProp, RootNavigation} from '~/Root'
import {addMedication} from '~/Store/Actions'

type AddMedication = {
  navigation: RootNavigation
  route: AddMedicationRouteProp
}
export const AddMedication: React.FC<AddMedication> = ({navigation}) => {
  const dispatch = useDispatch()
  const [medication, setMedication] = useState('')
  const [substance, setSubstance] = useState('')
  const [dosage, setDosage] = useState('')
  const [modeOfAdministration, setModeOfAdministration] = useState('')
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabels}>Name</Text>
      <TextInput value={medication} onChangeText={setMedication} />
      <Text style={styles.inputLabels}>Substance</Text>
      <TextInput value={substance} onChangeText={setSubstance} />
      <Text style={styles.inputLabels}>Dosage</Text>
      <TextInput value={dosage} onChangeText={setDosage} />
      <Text style={styles.inputLabels}>Mode of Administration</Text>
      <TextInput value={modeOfAdministration} onChangeText={setModeOfAdministration} />

      <PrimaryBlueButton
        title={'Create'}
        style={styles.addButton}
        onPress={() => {
          dispatch(addMedication(medication, substance, dosage, modeOfAdministration))
          navigation.navigate(Routes.VIEW_MEDICATION)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  inputLabels: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
  },
  addButton: {
    alignSelf: 'flex-start',
  },
})
