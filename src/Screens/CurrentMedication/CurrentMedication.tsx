import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
import {Body, H1} from '../../Components/Typography/'
import {COLORS} from '../../Style/Colors'
import {useSelector} from 'react-redux'
import {medicationsSelector} from '../../Store/Selectors'
import {SafeAreaView} from 'react-native-safe-area-context'
import {currentMedicationService as service} from './CurrentMedication.service'

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

  const [medications, setMedications] = useState([])

  useEffect(() => {
    service.load(fetchMedication).then(s => {
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
