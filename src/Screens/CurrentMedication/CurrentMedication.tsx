import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {Body, H1} from '../../Components/Typography/'
import {COLORS} from '~/Style/Colors'
import {useSelector} from 'react-redux'
import {medicationsSelector} from '~/Store/Selectors'
import {SafeAreaView} from 'react-native-safe-area-context'
import {currentMedicationService as service} from './CurrentMedication.service'
import {ListItem} from '~/Components'
import {IMedication} from '~/Store'

const styles = StyleSheet.create({
  CONTAINER: {
    flex: 1,
  },
  INFO: {
    marginHorizontal: 24,
    marginVertical: 24,
    alignItems: 'center',
  },
})

export const CurrentMedication: React.FC = () => {
  const fetchMedication = useSelector(medicationsSelector)

  const [medications, setMedications] = useState<IMedication[]>([])

  useEffect(() => {
    service.load(fetchMedication).then(s => {
      // @ts-ignore
      setMedications(s)
    })
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
          You have not added any medications yet
        </Body>
      </View>
    )
  }

  return (
    <>
      <SafeAreaView style={{backgroundColor: COLORS.darknavy}} edges={['top']} />
      <View style={styles.CONTAINER}>
        <View style={styles.INFO}>
          <H1>Active Medication(s)</H1>
        </View>

        <FlatList
          data={medications}
          ListEmptyComponent={isEmpty}
          renderItem={({item: medications}) => (
            <ListItem
              title={medications.name}
              detailsText={medications.addedAt}
              subtitle={medications.substance}
              onPress={() => (medications.finished = false)}
            />
          )}
        />
      </View>
    </>
  )
}
