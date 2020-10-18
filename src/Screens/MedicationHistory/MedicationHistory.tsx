import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
import {Body, H1} from '../../Components/Typography'
import {SafeAreaView} from 'react-native-safe-area-context'
import {COLORS} from '../../Style/Colors'
import {useSelector} from 'react-redux'
import {medicationsSelector} from '~/Store/Selectors'
import {medicationHistoryService as service} from './MedicationHistory.service'

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
  const fetchMedication = useSelector(medicationsSelector)

  const [seeHistory, setHistory] = useState([])

  useEffect(() => {
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
          renderItem={({item: medication}) => (
            <TouchableWithoutFeedback>
              <View style={{paddingBottom: 5}}>
                <Body>Hello</Body>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    </>
  )
}
