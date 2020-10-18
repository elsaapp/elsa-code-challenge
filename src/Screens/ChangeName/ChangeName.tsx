import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import {PrimaryBlueButton, SecondaryBlueButton} from '../../Components/Buttons/Buttons'
import {TextInput} from '../../Components/TextInputs'
import {changeName, clearState} from '../../Store/Actions/actions'
import {NavigationStackParams} from '~/Navigation/Navigation'

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  button: {
    alignSelf: 'flex-start',
  },
})

export const ChangeName: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute<RouteProp<NavigationStackParams, 'changeName'>>()
  const [name, setName] = useState(route.params.name)
  return (
    <View style={styles.container}>
      <TextInput value={name} onChangeText={setName} />
      <PrimaryBlueButton
        style={styles.button}
        title={'Update name'}
        onPress={() => {
          dispatch(changeName(name))
          navigation.goBack()
        }}
      />
      <SecondaryBlueButton title={'Reset App'} onPress={() => dispatch(clearState())} />
    </View>
  )
}
