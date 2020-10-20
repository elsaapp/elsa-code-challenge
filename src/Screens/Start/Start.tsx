import React from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'
import {COLORS} from '../../Style/Colors'
import {H1} from '../../Components/Typography'
import {nameSelector} from '../../Store/Selectors/User'
import {AddMedication} from '../../Components/AddMedication/AddMedication'
import {MoreButton} from '~/Components/Buttons/More'
import {PrimaryBlueButton} from '~/Components'

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
    alignItems: 'center',
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
        {Platform.OS === 'ios' && (
          <MoreButton
            options={['Settings']}
            onOptionPress={option => {
              switch (option) {
                case 'Settings':
                  navigation.navigate('changeName', {
                    name: name,
                  })
                  break
              }
            }}
            width={200}
          />
        )}

        <View style={styles.info}>
          <H1 style={{textAlign: 'center'}}>Hello {name}!</H1>
          {Platform.OS === 'android' && (
            <PrimaryBlueButton
              title={'Settings'}
              onPress={() => {
                navigation.navigate('changeName', {
                  name: name,
                })
              }}
            />
          )}
        </View>
        <View style={{paddingHorizontal: 24}}>
          <AddMedication />
        </View>
      </View>
    </SafeAreaView>
  )
}
