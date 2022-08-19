import React, {useState} from 'react'
import {IconButton, TextInput, PrimaryBlueButton, SecondaryBlueButton} from '~/Components'
import {StyleSheet, View, Text} from 'react-native'
import {Icons} from '~/Icons'
import {IMedication} from '~/Store/User'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 14,
  },
  icon: {
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
})

const AddMedication = () => {
  const [value, setValue] = useState<string>('')
  const [listMedication, setListMedication] = useState<IMedication[]>([])

  const todayDate = new Date()
  const formatDate = todayDate.toISOString().substring(0, 10)

  const add = (): void => {
    if (value.trim()) setListMedication([...listMedication, {name: value, addedAt: formatDate}])
    setValue('')
  }

  const deleteMedication = (index: number): void => {
    setListMedication([...listMedication.slice(0, index), ...listMedication.slice(index + 1)])
  }

  const resetMedication = (): void => {
    setListMedication([])
  }

  return (
    <View style={styles.container}>
      <TextInput value={value} onChangeText={setValue} />
      <PrimaryBlueButton style={styles.button} title={'Add Medication'} onPress={add} />
      <SecondaryBlueButton style={styles.button} title={'Clear list'} onPress={resetMedication} />
      {listMedication.map((item, index) => (
        <View key={index} style={styles.container}>
          <Text>
            {item.name} - added at: {item.addedAt}
          </Text>
          <IconButton
            icon={Icons.close({color: Colors.red, size: 20})}
            style={styles.icon}
            onPress={() => deleteMedication(index)}
          />
        </View>
      ))}
    </View>
  )
}

export default AddMedication
