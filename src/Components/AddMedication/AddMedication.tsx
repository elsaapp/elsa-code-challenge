import React, {useState} from 'react'

import {StyleSheet, View} from 'react-native'
import {Body} from '../Typography/Body'
import {TextInput} from '../TextInputs'
import {addMedication} from '../../Store/Actions/actions'
import {PrimaryBlueButton} from '../Buttons/Buttons'
import {useDispatch, useSelector} from 'react-redux'
import {medicationsSelector} from '../../Store/Selectors'

const styles = StyleSheet.create({
  BUTTON: {
    alignSelf: 'center',
    height: 40,
  },
  CONTAINER: {
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  TEXT: {
    textAlign: 'center',
    paddingBottom: 24,
  },
  INPUT_TEXT: {
    marginTop: 8,
  },
})

export const AddMedication = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [substance, setSubstance] = useState('')
  const [dose, setDose] = useState('')
  const [administered, setAdministered] = useState('')

  console.log(useSelector(medicationsSelector))
  return (
    <View style={styles.CONTAINER}>
      <Body style={styles.TEXT}>Add Medication</Body>
      <View style={{flexDirection: 'row', alignContent: 'space-between'}}>
        <Body style={styles.INPUT_TEXT}>Brand Name:</Body>
        <TextInput style={{width: 200, marginLeft: 6}} value={name} onChangeText={setName} />
      </View>
      <View style={{flexDirection: 'row', alignContent: 'space-between'}}>
        <Body style={styles.INPUT_TEXT}>Substance:</Body>
        <TextInput
          style={{width: 200, marginLeft: 20}}
          value={substance}
          onChangeText={setSubstance}
        />
      </View>
      <View style={{flexDirection: 'row', alignContent: 'space-between'}}>
        <Body style={styles.INPUT_TEXT}>Dose:</Body>
        <TextInput style={{width: 200, marginLeft: 55}} value={dose} onChangeText={setDose} />
      </View>
      <View style={{flexDirection: 'row', alignContent: 'space-between'}}>
        <Body style={styles.INPUT_TEXT}>Administered:</Body>
        <TextInput style={{width: 200}} value={administered} onChangeText={setAdministered} />
      </View>
      <View style={{paddingBottom: 20}}>
        <PrimaryBlueButton
          style={styles.BUTTON}
          title={'Add Medicine'}
          onPress={() => {
            dispatch(addMedication(name, substance, false, administered, dose))
            console.log('do i get here')
            setName('')
            setDose('')
            setAdministered('')
            setSubstance('')
          }}
        />
      </View>
    </View>
  )
}
