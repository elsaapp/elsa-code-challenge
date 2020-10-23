import React from 'react'
import {StyleSheet, View, Text, Button} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector, useDispatch} from 'react-redux'
import {Colors} from '~/Colors'
import {Body, H1, H2, SecondaryBlueButton} from '~/Components'
import {Routes} from '~/Navigation/Routes'
import type {RootNavigation} from '~/Root'
import {nameSelector, medicationsSelector} from '~/Store/Selectors/User'

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.darknavy,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  info: {
    marginHorizontal: 24,
    marginVertical: 24,
    alignItems: 'flex-start',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    display: 'flex',
  },
  medications: {
    marginHorizontal: 24,
    flex: 1,
    flexDirection: 'column',
  },
  medicationList: {
    fontSize: 20,
  },
  button: {
    marginBottom: 10,
  },
  listRow: {
  display: 'flex',
  flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

type StartProps = {
  navigation: RootNavigation
}
export const Start: React.FC<StartProps> = ({navigation}) => {
  const dispatch = useDispatch()
  const userName = useSelector(nameSelector)
  const medication = useSelector(medicationsSelector)
  const getSortedList = () => {
    medication.sort((a, b) => a.name.localeCompare(b.name))
    return medication.map(item => {
      return (
        <View key={item.name} style={styles.listRow}>
          <View><Text>{item.name}</Text></View>
        </View>
      )
    })
  }
  return (
    <SafeAreaView style={styles.background} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.info}>
          <H1>Hello {userName}!</H1>
          <SecondaryBlueButton
            style={styles.button}
            title={'Change name'}
            onPress={() => navigation.navigate(Routes.CHANGE_NAME, {userName})}
          />
        </View>

        <Body style={styles.medications}>
          <View>
            <SecondaryBlueButton
              style={styles.button}
              title={'Add medication'}
              onPress={() => {
                navigation.setOptions({title: 'Add medication'})
                navigation.navigate(Routes.ADD_MEDICATION, {title: 'Add medication'})
              }}
            />
            {medication.length > 0 ? (
              getSortedList()
            ) : (
              <>
                <H2 style={styles.medicationList}>You haven't added any medications yet...</H2>
              </>
            )}
          </View>
        </Body>
      </View>
    </SafeAreaView>
  )
}
