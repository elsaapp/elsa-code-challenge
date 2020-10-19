import React from 'react'
import {StyleSheet, View, Alert} from 'react-native'
import {medicationHistorySelector} from '~/Store/Selectors/User'
import {useSelector, useDispatch} from 'react-redux'
import {
    SecondaryGrayButton,
    List,
    Section,
    ListItem,
  } from '~/Components'
  import {Body} from './Components/Typography'
  import {cleanHistory} from '~/Store/Actions'

  const styles = StyleSheet.create({
    text: {
        marginTop: 12,
      },
      clearListButtonContainer: {
        marginVertical: 24,
      },
  })

type MedicationHistoryProps = {}

export const MedicationHistory: React.FC<MedicationHistoryProps> = () => {
    const medicationHistory = useSelector(medicationHistorySelector)

    const dispatch = useDispatch()

    const clearHistory = () => {
        Alert.alert('Delete history', 'Are you sure you want to delete your history?', [
          {text: 'No'},
          {text: 'Yes', onPress: () => dispatch(cleanHistory())},
        ])
      }

    return (
        <List>
            <Section>
                {medicationHistory.length !== 0 ? (
                    medicationHistory.map((medication, key) => {
                        return <ListItem
                            key={key}
                            name={medication.name}
                            substance={medication.substance}
                            strength={medication.strength}
                            dosage={medication.dosage}
                            administratedVia={medication.administratedVia}
                            addedAt={medication.addedAt}
                            startingDate={medication.startingDate}
                            titleStyle={{fontSize: 17}}
                        />
                    })
                ) : (
                    <Body style={styles.text} variant="medium">This list is empty.</Body>
                )}
                <View style={styles.clearListButtonContainer}>
                    <SecondaryGrayButton title="Clear history" onPress={clearHistory} />
                </View>
            </Section>
        </List>
    )
}