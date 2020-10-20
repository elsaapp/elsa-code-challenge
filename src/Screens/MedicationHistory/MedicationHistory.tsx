import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {Body, H1} from '../../Components/Typography'
import {SafeAreaView} from 'react-native-safe-area-context'
import {COLORS} from '../../Style/Colors'
import {useSelector} from 'react-redux'
import {historySelector} from '~/Store/Selectors'
import {medicationHistoryService as service} from './MedicationHistory.service'
import {ListItem} from '~/Components'
import {IMedication} from '~/Store'

const styles = StyleSheet.create({
  CONTAINER: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  INFO: {
    marginHorizontal: 24,
    marginVertical: 24,
    alignItems: 'center',
  },
})

export const MedicationHistory: React.FC = () => {
  const fetchMedication = useSelector(historySelector)

  const [seeHistory, setHistory] = useState<IMedication[]>([])

  useEffect(() => {
    // @ts-ignore
    service.load(fetchMedication).then(s => setHistory(s))
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
          There is nothing in you past history yet. Have you cancelled any Active medications?
        </Body>
      </View>
    )
  }

  return (
    <>
      <SafeAreaView style={{backgroundColor: COLORS.darknavy}} edges={['top']} />
      <View style={styles.CONTAINER}>
        <View style={styles.INFO}>
          <H1 style={{textAlign: 'center'}}>Medication History</H1>
        </View>
        <FlatList
          data={seeHistory}
          ListEmptyComponent={isEmpty}
          renderItem={({item: medications}) => (
            <ListItem
              subtitle={medications.substance}
              style={{paddingHorizontal: 20}}
              title={medications.name}
              detailsText={`Started: ${medications?.addedAt}`}
              detailsSecondLine={`Ended: ${medications?.endedAt}`}
              detailsTextStyle={{color: COLORS.black}}
              onPress={() => (medications.finished = false)}
            />
          )}
        />
      </View>
    </>
  )
}
