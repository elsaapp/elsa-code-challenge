import React, {useState} from 'react'
import {StyleSheet, View, Picker} from 'react-native'
import {useDispatch} from 'react-redux'
import {PrimaryBlueButton, TextInput, Body} from '~/Components'
import type {RootNavigation} from '~/Root'
import {addMedication, cleanState} from '~/Store/Actions'
import {IMedication} from './Store'

type PartialIMedication = Omit<IMedication, 'addedAt' | 'removedAt'>

const inValid = (name: string, substance: string) => name.length === 0 || substance.length === 0

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  body: {
    marginBottom: 5,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'flex-start',
  },
})

type AddMedicationProps = {
  navigation: RootNavigation
}
export const AddMedication: React.FC<AddMedicationProps> = ({navigation}) => {
  const dispatch = useDispatch()
  const [medication, setMedication] = useState<PartialIMedication>({
    name: '',
    substance: '',
    administration: 'Orally',
    strenght: {value: 0, unit: 'mg'},
  })
  return (
    <View style={styles.container}>
      <Body style={styles.body}>Name</Body>
      <TextInput
        value={medication.name}
        onChangeText={name => setMedication({...medication, name})}
      />
      <Body style={styles.body}>Substance</Body>
      <TextInput
        value={medication.substance}
        onChangeText={substance => setMedication({...medication, substance})}
      />
      <Body style={styles.body}>Administration</Body>
      <Picker
        selectedValue={medication.administration}
        onValueChange={administration => setMedication({...medication, administration})}>
        <Picker.Item label="Orally" value="Orally" />
        <Picker.Item label="Injection" value="Injection" />
        <Picker.Item label="Infusion" value="Infusion" />
      </Picker>
      <View style={styles.buttonWrapper}>
        <PrimaryBlueButton
          disabled={inValid(medication.name, medication.substance)}
          style={styles.button}
          title={'Add'}
          onPress={() => {
            dispatch(
              addMedication(
                medication.name,
                medication.substance,
                medication.administration,
                medication.strenght
              )
            )
            navigation.goBack()
          }}
        />
        <PrimaryBlueButton
          style={styles.button}
          title={'Cancel'}
          onPress={() => {
            dispatch(cleanState())
            navigation.goBack()
          }}
        />
      </View>
    </View>
  )
}
