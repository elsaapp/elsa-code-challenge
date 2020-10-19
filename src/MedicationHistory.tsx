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
import {Routes} from '~/Navigation/Routes'
import type {RootNavigation} from '~/Root'

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
    },
    text: {
        marginTop: 12,
    },
    clearListButtonContainer: {
        marginVertical: 24,
    },
})

type MedicationHistoryProps = {
    navigation: RootNavigation
}

export const MedicationHistory: React.FC<MedicationHistoryProps> = ({navigation}) => {
    const medicationHistory = useSelector(medicationHistorySelector)

    const dispatch = useDispatch()

    const clearHistory = () => {
        Alert.alert('Delete history', 'Are you sure you want to delete your history?', [
          {text: 'No'},
          {text: 'Yes', onPress: () => dispatch(cleanHistory())},
        ])
      }

    return (
        <List style={styles.container}>
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
                            startingDate={medication.startingDate}
                            titleStyle={{fontSize: 17}}
                            onPress={() => {
                                const result = medicationHistory.find(item => item.name === medication.name)
                                navigation.navigate(Routes.MEDICATION_RECORD, {
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