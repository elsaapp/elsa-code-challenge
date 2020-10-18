import React, {useState} from 'react'
import {Modal, StyleSheet, View} from 'react-native'
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import {PrimaryBlueButton, SecondaryBlueButton} from '../../Components/Buttons/Buttons'
import {TextInput} from '../../Components/TextInputs'
import {changeName, clearState} from '../../Store/Actions/actions'
import {NavigationStackParams} from '~/Navigation/Navigation'
import {SafeAreaView} from 'react-native-safe-area-context'
import {COLORS} from '../../Style/Colors'
import {Body, H1} from '../../Components/Typography'
import {BackButton} from '~/Navigation'

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 24,
  },
  button: {
    alignSelf: 'center',
  },
  info: {
    marginHorizontal: 24,
    marginVertical: 12,
    alignItems: 'center',
  },
  modal: {
    paddingVertical: 100,
  },
})

export const Settings: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute<RouteProp<NavigationStackParams, 'changeName'>>()
  const [name, setName] = useState(route.params.name)
  const [visible, setIsVisible] = useState<boolean>(false)

  return (
    <>
      <SafeAreaView style={{backgroundColor: COLORS.darknavy}} edges={['top']} />
      <View style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.info}>
          <H1 style={{textAlign: 'center'}}>Settings</H1>
        </View>
        <Body>Your Name</Body>
        <TextInput value={name} onChangeText={setName} />
        <PrimaryBlueButton
          style={styles.button}
          title={'Update name'}
          onPress={() => {
            dispatch(changeName(name))
          }}
        />
        <View style={{paddingVertical: 20}}>
          <SecondaryBlueButton title={'Reset App'} onPress={() => setIsVisible(true)} />
        </View>
      </View>
      <Modal visible={visible}>
        <View style={styles.modal}>
          <Body style={{textAlign: 'center'}}>
            Are you sure you want to reset the state of the app?{' '}
          </Body>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <View style={{marginHorizontal: 12}}>
              <PrimaryBlueButton
                title={'Reset'}
                style={styles.button}
                onPress={() => {
                  dispatch(clearState())
                  navigation.goBack()
                }}
              />
            </View>
            <View>
              <SecondaryBlueButton
                title={'Cancel'}
                style={styles.button}
                onPress={() => setIsVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
