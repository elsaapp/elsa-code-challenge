import React, {useState} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {useDispatch} from 'react-redux'
import {PrimaryBlueButton, TextInput} from '~/Components'
import {Routes} from '~/Navigation/Routes'
import type {AddMedicationRouteProp, RootNavigation} from '~/Root'
import {addMedication} from '~/Store/Actions'

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  button: {
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 10,
    margin: 5
  },
})

type AddMedicationProps = {
  navigation: RootNavigation
  route: AddMedicationRouteProp
}
export const AddMedication: React.FC<AddMedicationProps> = ({navigation, route}) => {
  const dispatch = useDispatch()
  const [medication, setMedication] = useState('')
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Medication name</Text>
      <TextInput value={medication} onChangeText={setMedication} />
      <PrimaryBlueButton
        style={styles.button}
        title={'Update'}
        onPress={() => {
          dispatch(addMedication(medication))
          navigation.setOptions({title: medication})
          navigation.navigate(Routes.START)
        }}
      />
    </View>
  )
}
