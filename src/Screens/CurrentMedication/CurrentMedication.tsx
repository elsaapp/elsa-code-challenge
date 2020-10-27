import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {COLORS} from '~/Style/Colors'
import {useNavigation} from '@react-navigation/native'
import {useSelector} from 'react-redux'
import {medicationsSelector} from '~/Store/Selectors'
import {SafeAreaView} from 'react-native-safe-area-context'
import {currentMedicationService as service} from './CurrentMedication.service'
import {ListItem, Body, H1} from '~/Components'
import {IMedication} from '~/Store'

const styles = StyleSheet.create({
  CONTAINER: {
    flex: 1,
  },
  INFO: {
    marginHorizontal: 24,
    marginVertical: 24,
    height: '7%',
    alignItems: 'center',
  },
})

export const CurrentMedication: React.FC = () => {
  const fetchMedication = useSelector(medicationsSelector)
  const navigation = useNavigation()

  const [activeMedications, setActiveMedications] = useState<IMedication[]>([])
  const [pausedMedications, setPausedMedications] = useState<IMedication[]>([])
  useEffect(() => {
    service.load(fetchMedication)
    setActiveMedications(service.loadActiveMedications())
    setPausedMedications(service.loadPausedMedications())
  }, [fetchMedication])

  function isEmpty() {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingVertical: 10,
          height: 400,
        }}>
        <Body
          variant="large"
          style={{
            textAlign: 'center',
          }}>
          You have either not added any medications or none are active at the moment.
        </Body>
      </View>
    )
  }

  function isEmptyAndPaused() {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingVertical: 10,
          height: 400,
        }}>
        <Body
          variant="large"
          style={{
            textAlign: 'center',
          }}>
          You have no paused Medications.
        </Body>
      </View>
    )
  }

  return (
    <>
      <SafeAreaView style={{backgroundColor: COLORS.darknavy}} edges={['top']} />
      <View style={styles.CONTAINER}>
        <View style={styles.INFO}>
          <H1>Active medication(s)</H1>
        </View>
        <View style={{height: '40%'}}>
          <FlatList
            data={activeMedications}
            ListEmptyComponent={isEmpty}
            keyExtractor={item => item.id}
            renderItem={({item: medication}) => (
              <ListItem
                subtitle={medication?.substance}
                style={{paddingHorizontal: 20}}
                title={medication?.name}
                detailsText={`Paused: ${medication?.addedAt}`}
                detailsTextStyle={{color: COLORS.black}}
                onPress={() => navigation.navigate('info', {meds: medication})}
                withArrow={true}
              />
            )}
          />
        </View>
        {pausedMedications.length > 0 ? (
          <View>
            <View style={[styles.INFO, {height: '9%'}]}>
              <H1>Paused medication(s)</H1>
            </View>
            <View style={{height: '45%'}}>
              <FlatList
                data={pausedMedications}
                ListEmptyComponent={isEmptyAndPaused}
                keyExtractor={item => item.id}
                renderItem={({item: medication}) => (
                  <ListItem
                    subtitle={medication?.substance}
                    style={{paddingHorizontal: 20}}
                    title={medication?.name}
                    detailsText={`Paused: ${medication?.pausedAt}`}
                    detailsTextStyle={{color: COLORS.black}}
                    onPress={() => navigation.navigate('info', {meds: medication})}
                    withArrow={true}
                  />
                )}
              />
            </View>
          </View>
        ) : null}
      </View>
    </>
  )
}
