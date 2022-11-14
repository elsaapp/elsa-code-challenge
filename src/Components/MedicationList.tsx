import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {View, Text, FlatList, StyleSheet, StatusBar, Alert} from 'react-native'
import {IMedicationWithId} from '~/Store'
import {Br} from '~/Components/Br'
import {H2, Body} from '~/Components/Typography'
import {IconButton} from '~/Components/Buttons'
import {Icons} from '~/Icons'
import {humanReadableText, sortObjectByStringProp} from '~/Utils'
import {Colors} from '~/Colors'
import {deleteMedication} from '~/Store/Actions'
import {Toggle} from '~/Components/Toggle'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  brandName: {
    fontSize: 20,
  },
  item: {
    backgroundColor: '#e7e7e7',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    color: '#000000',
  },
  preTitle: {
    color: '#333',
  },
})

const Item: React.FC<{medication: IMedicationWithId}> = ({medication}) => {
  const dispatch = useDispatch()

  const createConfirmDelete = () => {
    return Alert.alert('Confirm', `Are you sure you want to delete ${medication.brandName}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => dispatch(deleteMedication(medication.id))},
    ])
  }

  return (
    <View style={[styles.item, {flexDirection: 'row'}]}>
      <View style={{alignItems: 'flex-start', flexGrow: 1}}>
        <Text style={[styles.title]}>
          <Text style={styles.preTitle}>
            {medication.substance} | id: {medication.id}
          </Text>
          <Br />
          <Text style={styles.brandName}>{medication.brandName}</Text>
          <Br />
          <Text>
            {medication.strength?.value} {medication.strength?.unit}{' '}
            {humanReadableText(medication.administration)} -{' '}
            {`Taken every ${medication.interval || '?'} hours`}
          </Text>
        </Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <IconButton
          icon={Icons.close({
            color: Colors.red3,
          })}
          onPress={createConfirmDelete}
        />
      </View>
    </View>
  )
}

export const MedicationList: React.FC<{medications: IMedicationWithId[]}> = ({medications}) => {
  // const dispatch = useDispatch()
  let medicationsToShow = medications.sort(
    sortObjectByStringProp<IMedicationWithId>('brandName' as keyof IMedicationWithId) // TODO See why `brandName` is not accepted as key without explicit casting
  )
  let medicationsBySubstance: {[substance: string]: IMedicationWithId[]} = {}
  const [isDeletedShown, setIsDeletedShown] = useState(false)
  const [isGroupedBySubstance, setIsGroupedBySubstance] = useState(false)

  const renderItem = ({item}: {item: IMedicationWithId}) => {
    return <Item medication={item} />
  }

  if (!isDeletedShown) {
    medicationsToShow = medications.filter(medication => !medication.deletedAt)
  }

  if (isGroupedBySubstance) {
    medicationsBySubstance = medicationsToShow.reduce<{[substance: string]: IMedicationWithId[]}>(
      (acc, curr) => {
        const substance = curr.substance
        return {
          ...acc,
          [substance]: acc[substance] ? [...acc[substance], curr] : [curr],
        }
      },
      {}
    )
  }

  return (
    <View>
      {/* <PrimaryBlueButton
        title="clean slate"
        onPress={() => dispatch(cleanState())}></PrimaryBlueButton> */}
      <View style={{flexDirection: 'row', paddingBottom: 8}}>
        <Toggle checked={isDeletedShown} onToggle={() => setIsDeletedShown(!isDeletedShown)} />
        <Body style={{marginLeft: 8, paddingTop: 5}}>Show deleted</Body>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Toggle
          checked={isGroupedBySubstance}
          onToggle={() => setIsGroupedBySubstance(!isGroupedBySubstance)}
        />
        <Body style={{marginLeft: 8, paddingTop: 5}}>Group by substance</Body>
      </View>
      {isGroupedBySubstance ? (
        <>
          {Object.keys(medicationsBySubstance).map((substance, index) => {
            return (
              <View key={index}>
                <H2 key={substance}>{substance}</H2>
                <FlatList
                  data={medicationsBySubstance[substance]}
                  renderItem={renderItem}
                  keyExtractor={item => item.brandName + item.addedAt}
                />
              </View>
            )
          })}
        </>
      ) : (
        <FlatList
          data={medicationsToShow}
          renderItem={renderItem}
          keyExtractor={item => item.brandName + item.addedAt}
        />
      )}
    </View>
  )
}
