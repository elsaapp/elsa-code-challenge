import React, {useState} from 'react'

import {StyleSheet, View} from 'react-native'
import {addMedication} from '~/Store/Actions'
import {PrimaryBlueButton, H3, Body, TextInput} from '~/Components'
import {useDispatch} from 'react-redux'

const styles = StyleSheet.create({
  BUTTON: {
    alignSelf: 'center',
    height: 40,
  },
  CONTAINER: {
    paddingHorizontal: 10,
  },
  TEXT: {
    alignContent: 'center',
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

  return (
    <View style={styles.CONTAINER}>
      <H3 style={styles.TEXT}>Add Medication</H3>
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
      <View style={{paddingBottom: 10}}>
        <Body style={styles.TEXT}> Administered can be orally, injected, absorbed etc</Body>
      </View>
      <View style={{paddingBottom: 20}}>
        <PrimaryBlueButton
          style={styles.BUTTON}
          title={'Add Medicine'}
          onPress={() => {
            dispatch(addMedication(name, substance, administered, dose))
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
