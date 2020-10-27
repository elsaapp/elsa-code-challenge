import React, {useState} from 'react'
import {StyleSheet, View, Text, Alert} from 'react-native'
import {formatDistanceToNow} from 'date-fns'
import * as R from 'ramda'
import {
  List,
  ListItem,
  H2,
  SecondaryGrayButton,
  RedButton,
  PrimaryBlueButton,
  SectionHeader,
  Section,
} from '~/Components'
import {Body} from '~/Components/Typography'
import {IMedication} from './Store'
import {Colors} from './Colors'
import {useDispatch} from 'react-redux'
import {removeMedication} from '~/Store/Actions'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    flex: 1,
  },
  listWrapper: {
    height: '75%',
  },
  smallButton: {
    height: 35,
    margin: 'auto',
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 'auto',
    marginBottom: 10,
  },
})

const deleteConfirmation = (medication: IMedication, onConfirm: () => void) => {
  return Alert.alert(
    'Delete medication',
    `Do you want to delete ${medication.name}`,
    [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {text: 'OK', onPress: () => onConfirm()},
    ],
    {cancelable: false}
  )
}

const groupAndFilterMedications = (medications: Array<IMedication>, showAll: boolean) => {
  const filteredMedications = medications.filter(m => showAll || !m.removedAt)
  const sortedMedications = R.sortWith(
    [R.ascend(R.prop('substance')), R.ascend(R.prop('name'))],
    filteredMedications
  )
  return R.groupBy(m => m.substance, sortedMedications)
}

type MedicationListProps = {
  medications: Array<IMedication>
  onPressMedication: (name: string) => void
}
type MedicationListState = {
  inEdit: boolean
  showAll: boolean
}
export const MedicationList: React.FC<MedicationListProps> = ({medications, onPressMedication}) => {
  const [state, setState] = useState<MedicationListState>({inEdit: false, showAll: false})
  const dispatch = useDispatch()

  const substanceGroups = groupAndFilterMedications(medications, state.showAll)

  const toggleEdit = () => setState({...state, inEdit: !state.inEdit})
  const toggleAll = () => setState({...state, showAll: !state.showAll})

  const listContent = R.keys(substanceGroups).map(substance => (
    <Section key={substance}>
      <SectionHeader>
        <Body bold color={Colors.black}>
          {substance}
        </Body>
      </SectionHeader>
      {substanceGroups[substance].map((medication, index) => (
        <ListItem
          key={index}
          title={medication.name}
          onPress={() => onPressMedication(medication.name)}
          subtitle={`added ${formatDistanceToNow(new Date(medication.addedAt))}`}>
          <View style={styles.itemWrapper}>
            <View>
              <Body color={Colors.black}>{medication.name}</Body>

              <Body color={Colors.gray1}>{`added ${formatDistanceToNow(
                new Date(medication.addedAt)
              )} ago`}</Body>
            </View>

            {state.inEdit && (
              <RedButton
                style={styles.smallButton}
                onPress={() =>
                  deleteConfirmation(medication, () => dispatch(removeMedication(medication.name)))
                }
                title="del"
              />
            )}
          </View>
        </ListItem>
      ))}
    </Section>
  ))

  return (
    <View style={styles.container}>
      <H2>Your medications</H2>
      <View style={styles.controls}>
        <PrimaryBlueButton
          style={styles.smallButton}
          onPress={() => toggleAll()}
          title={state.showAll ? 'Show less' : 'Show all'}
        />
        <SecondaryGrayButton
          style={styles.smallButton}
          onPress={() => toggleEdit()}
          title={state.inEdit ? 'done' : 'edit'}
        />
      </View>
      {medications.length === 0 ? (
        <Text>No medications yet</Text>
      ) : (
        <>
          <View style={styles.listWrapper}>
            <List>{listContent}</List>
          </View>
        </>
      )}
    </View>
  )
}
