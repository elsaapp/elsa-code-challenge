import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {useDispatch} from 'react-redux'
import {PrimaryBlueButton, TextInput} from '~/Components'
import type {ChangeNameRouteProp, RootNavigation} from '~/Root'
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

type ChangeNameProps = {
  navigation: RootNavigation
  route: ChangeNameRouteProp
}
export const ChangeName: React.FC<ChangeNameProps> = ({navigation, route}) => {
  const dispatch = useDispatch()
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
