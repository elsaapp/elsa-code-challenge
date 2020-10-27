import React, {useState} from 'react'

import {StyleSheet, Switch, TouchableOpacity, View} from 'react-native'
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

  const [reminder, setReminder] = useState<boolean>(true)

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
        <TextInput
          style={{width: 200}}
          value={administered}
          onChangeText={setAdministered}
          placeholder={'orally, injected, etc'}
        />
      </View>
      <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
        <Body style={{paddingHorizontal: 10}}>
          Do you want to set a daily reminder for your medication
        </Body>
        <Switch
          value={reminder}
          onValueChange={() => {
            setReminder(!reminder)
            console.log(reminder)
          }}
        />
      </View>
      {reminder && (
        <View style={{flexDirection: 'row', paddingVertical: 20}}>
          <TouchableOpacity>
            <Body>click to pick a time for reminder.</Body>
          </TouchableOpacity>
        </View>
      )}
      <View style={{paddingVertical: 20}}>
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
