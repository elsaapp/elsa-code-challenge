import React, {useState} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {useDispatch} from 'react-redux'
import {PrimaryBlueButton, TextInput} from '~/Components'
import {Routes} from '~/Navigation/Routes'
import type {ChangeNameRouteProp, RootNavigation} from '~/Root'
import {changeName} from '~/Store/Actions'

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

type ChangeNameProps = {
  navigation: RootNavigation
  route: ChangeNameRouteProp
}
export const ChangeName: React.FC<ChangeNameProps> = ({navigation, route}) => {
  const dispatch = useDispatch()
  const [name, setName] = useState(route.params.userName)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name</Text>
      <TextInput value={name} onChangeText={setName} />
      <PrimaryBlueButton
        style={styles.button}
        title={'Update name'}
        onPress={() => {
          dispatch(changeName(name))
          navigation.setOptions({title: name})
          navigation.navigate(Routes.START)
        }}
      />
    </View>
  )
}
