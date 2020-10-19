import React, {useState} from 'react'
import {Dimensions, StyleSheet, View, Alert} from 'react-native'
import {useDispatch} from 'react-redux'
import {PrimaryBlueButton, SecondaryGrayButton, TextInput} from '~/Components'
import type {ChangeNameRouteProp, RootNavigation} from '~/Root'
import {changeName, cleanState} from '~/Store/Actions'
import {Routes} from '~/Navigation/Routes'

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
    height: Dimensions.get('window').height * 0.8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'center',
  },
})

type ChangeNameProps = {
  navigation: RootNavigation
  route: ChangeNameRouteProp
}
export const ChangeName: React.FC<ChangeNameProps> = ({navigation, route}) => {
  const dispatch = useDispatch()
  const [name, setName] = useState(route.params.name)

  const changeUserName = () => {
    dispatch(changeName(name))
    navigation.setOptions({title: name})
    navigation.navigate(Routes.START)
  }

  const resetState = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {text: 'No'},
      {
        text: 'Yes',
        onPress: () => {
          dispatch(cleanState())
          navigation.navigate(Routes.START)
        },
      },
    ])
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput value={name} onChangeText={setName} />
        <PrimaryBlueButton style={styles.button} title={'Update name'} onPress={changeUserName} />
      </View>
      <SecondaryGrayButton style={styles.button} title="Sign Out" onPress={resetState} />
    </View>
  )
}
