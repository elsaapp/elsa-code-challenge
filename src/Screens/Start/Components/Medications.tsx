import React, {useState} from 'react'
import {FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {Colors} from '~/Colors'
import {AddButton, Body, H2, H3, TextInput} from '~/Components'
import {addMedication, medicationsSelector} from '~/State'

import type {ListRenderItemInfo} from 'react-native'
import type {Medication} from '~/State'

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
  listItem: {
    height: 45,
    marginBottom: 8,
    justifyContent: 'center',
    borderRadius: 10,
  },
  medication: {
    padding: 8,
    paddingLeft: 16,
    backgroundColor: Colors.gray4,
  },
  name: {
    color: Colors.dark_blue_grey,
  },
  addNewMedication: {
    position: 'relative',
    bottom: 0,
    marginTop: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
})

const MedicationItem = ({item: {name}}: ListRenderItemInfo<Medication>) => (
  <View style={[styles.listItem, styles.medication]} accessibilityLabel="Medicine item">
    <H3 style={styles.name}>{name}</H3>
  </View>
)

export const Medications = () => {
  const addMedicinePlaceholder = 'Enter name of medication'

  const dispatch = useDispatch()
  const medications = useSelector(medicationsSelector)
  const [newMedication, setMedication] = useState(addMedicinePlaceholder)

  return (
    <KeyboardAvoidingView
      style={styles.fullFlex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={40}>
      <H2>Your current medications</H2>
      {medications.length ? (
        <FlatList
          data={medications}
          renderItem={MedicationItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <Body style={styles.fullFlex}>
          You have not added any medications yet, please add your medications below.
        </Body>
      )}
      <View style={styles.addNewMedication}>
        <TextInput
          value={newMedication}
          style={styles.listItem}
          onChangeText={setMedication}
          accessibilityLabel="input"
          onFocus={() => newMedication === addMedicinePlaceholder && setMedication('')}
          onBlur={() => setMedication(addMedicinePlaceholder)}
        />
        <AddButton
          title={'Add medicine'}
          style={[styles.fullFlex, styles.listItem]}
          onPress={() => dispatch(addMedication(newMedication)) && Keyboard.dismiss()}
        />
      </View>
    </KeyboardAvoidingView>
  )
}
