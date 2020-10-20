import React from 'react'
import {Platform, ScrollView, StyleSheet, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'
import {COLORS} from '~/Style/Colors'
import {H1, PrimaryBlueButton, AddMedication, MoreButton} from '~/Components'
import {nameSelector} from '~/Store/Selectors'

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
      <ScrollView style={styles.content}>
        {Platform.OS === 'ios' && (
          <View>
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
          </View>
        )}

        <View style={styles.info}>
          <View>
            <H1 style={{textAlign: 'center'}}>Hello {name}!</H1>
          </View>
          {Platform.OS === 'android' && (
            <View>
              <PrimaryBlueButton
                title={'Settings'}
                onPress={() => {
                  navigation.navigate('changeName', {
                    name: name,
                  })
                }}
              />
            </View>
          )}
        </View>
        <View style={{paddingHorizontal: 24}}>
          <AddMedication />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
