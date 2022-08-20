import React, {ReactElement, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {useDispatch} from 'react-redux'
import {PrimaryBlueButton, TextInput} from '~/Components'
import {Routes, useNavigation, useRoute} from '~/Navigation'

import {changeName} from '~/State'

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  button: {
    alignSelf: 'flex-start',
  },
})

export const ChangeName = (): ReactElement => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute<Routes.CHANGE_NAME>()

  const [name, setName] = useState(route.params.name)

  return (
    <View style={styles.container}>
      <TextInput value={name} onChangeText={setName} />
      <PrimaryBlueButton
        style={styles.button}
        title={'Update name'}
        onPress={() => {
          dispatch(changeName(name))
          navigation.setOptions({title: name})
        }}
      />
    </View>
  )
}
