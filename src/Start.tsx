import React from 'react'
import {StyleSheet, View, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector, useDispatch} from 'react-redux'
import {Colors} from '~/Colors'
import {
  H1,
  H2,
  SecondaryBlueButton,
  SecondaryGrayButton,
  AddButton,
  List,
  ListDivider,
  SectionHeader,
  SectionHeaderClickable,
  Section,
  ListItem,
} from '~/Components'
import {Routes} from '~/Navigation/Routes'
import type {RootNavigation} from '~/Root'
import {nameSelector, medicationsSelector} from '~/Store/Selectors/User'
import {cleanMedicationList} from '~/Store/Actions'
import {Body} from './Components/Typography'
import {IMedication} from '~/Store'

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
  },
  text: {
    marginTop: 12,
  },
  clearListButtonContainer: {
    marginVertical: 24,
  },
})

type StartProps = {
  navigation: RootNavigation
}

export const Start: React.FC<StartProps> = ({navigation}) => {
  const name = useSelector(nameSelector)
  const medications = useSelector(medicationsSelector)

  const goToChangeNameScreen = () => navigation.navigate(Routes.CHANGE_NAME, {name})
  const gotoAddMedicationScreen = () => navigation.navigate(Routes.ADD_MEDICATION)
  const gotoMedicationHistoryScreen = () => navigation.navigate(Routes.MEDICATION_HISTORY)

  const dispatch = useDispatch()

  const inUseMedicationsList = medications.filter(item => item.paused !== true)
  const pausedMedicationsList = medications.filter(item => item.paused !== false)

  const displayMedicationList = (medicationArray: IMedication[]) =>
    medicationArray.map((medication, key) => {
      return (
        <ListItem
          key={key}
          name={medication.name}
          substance={medication.substance}
          strength={medication.strength}
          dosage={medication.dosage}
          titleStyle={{fontSize: 17}}
          withArrow
          onPress={() => {
            const result = medications.find(item => item.name === medication.name)
            navigation.navigate(Routes.MEDICATION_DETAILS, {
              name: result.name,
              substance: result.substance,
              strength: result.strength,
              dosage: result.dosage,
              administratedVia: result.administratedVia,
              addedAt: result.addedAt,
              paused: result.paused,
              startingDate: result.startingDate,
            })
          }}
        />
      )
    })

  const clearMedicationList = () => {
    Alert.alert('Delete Medication List', 'Are you sure you want to delete your list?', [
      {text: 'No'},
      {text: 'Yes', onPress: () => dispatch(cleanMedicationList(medications))},
    ])
  }

  return (
    <SafeAreaView style={styles.background} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.info}>
          <H1>Hello {name}!</H1>
          <SecondaryBlueButton title='Change name' onPress={goToChangeNameScreen} />
        </View>
        <List>
          <Section>
            <SectionHeader>
              <H2>My medications</H2>
            </SectionHeader>
            <ListDivider />
            {inUseMedicationsList.length !== 0 ? (
              displayMedicationList(inUseMedicationsList)
            ) : (
              <Body style={styles.text} variant="medium">This list is empty.</Body>
            )}
          </Section>
          <AddButton title="Add new medication" onPress={gotoAddMedicationScreen} />
          <View style={styles.clearListButtonContainer}>
            <SecondaryGrayButton title="Clear list" onPress={clearMedicationList} />
          </View>
          {pausedMedicationsList.length !== 0 && (
            <Section>
              <SectionHeader>
                <H2>Medications paused</H2>
              </SectionHeader>
              <ListDivider />
              {displayMedicationList(pausedMedicationsList)}
            </Section>
          )}
          <Section>
            <SectionHeaderClickable withArrow title='Medication history' onPress={gotoMedicationHistoryScreen} />
            <ListDivider />
            </Section>
        </List>
      </View>
    </SafeAreaView>
  )
}
