import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector, useDispatch} from 'react-redux'
import {Colors} from '~/Colors'
import {H1, H2, SecondaryBlueButton} from '~/Components'
import {Routes} from '~/Navigation/Routes'
import type {RootNavigation} from '~/Root'
import {nameSelector, medicationsSelector} from '~/Store/Selectors/User'
import {removeMedication} from '~/Store/Actions'

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
  noMedsText: {
    fontSize: 20,
  },
  button: {
    marginBottom: 10,
  },
  deleteButton: {
    padding: 0.5,
    borderWidth: 0,
  },
  deleteButtonText: {
    color: 'red',
  },
  listRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
  },
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
          <View>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
          <SecondaryBlueButton
            titleStyle={styles.deleteButtonText}
            style={styles.deleteButton}
            title={'X'}
            onPress={() => dispatch(removeMedication(item.name))}
          />
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

        <View style={styles.medications}>
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
                <H2 style={styles.noMedsText}>You haven't added any medications yet...</H2>
              </>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
