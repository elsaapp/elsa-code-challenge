import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'
import {COLORS} from '../../Style/Colors'
import {Body, H1} from '../../Components/Typography'
import {SecondaryBlueButton} from '../../Components/Buttons/Buttons'
import {nameSelector} from '../../Store/Selectors/User'
import {AddMedication} from '../../Components/AddMedication/AddMedication'

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.darknavy,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  info: {
    marginHorizontal: 24,
    marginVertical: 24,
    alignItems: 'flex-start',
  },
  help: {
    marginHorizontal: 24,
    textAlign: 'center',
  },
})

export const Start: React.FC = () => {
  const name = useSelector(nameSelector)
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.background} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.info}>
          <H1>Hello {name}!</H1>

          <SecondaryBlueButton
            title={'Settings'}
            onPress={() =>
              navigation.navigate('changeName', {
                name: name,
              })
            }
          />
        </View>
        <Body style={styles.help}>Here you can add a new medication to your List.</Body>
        <View style={{paddingHorizontal: 24}}>
          <AddMedication />
        </View>
      </View>
    </SafeAreaView>
  )
}
