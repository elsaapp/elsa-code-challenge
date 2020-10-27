import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'
import {Body} from '~/Components'
import type {ViewMedicationRouteProp, RootNavigation} from '~/Root'
import {medicationSelector} from './Store/Selectors'

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  labelValue: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
  },
})

const LabelValue = ({label, value}: {label: string; value: string}) => (
  <View style={styles.labelValue}>
    <Body bold style={styles.label}>
      {label}
    </Body>
    <Body>{value}</Body>
  </View>
)

type ViewMedicationProps = {
  navigation: RootNavigation
  route: ViewMedicationRouteProp
}
export const ViewMedication: React.FC<ViewMedicationProps> = ({route}) => {
  const medication = useSelector(medicationSelector(route.params.name))
  if (medication) {
    return (
      <View style={styles.container}>
        <LabelValue label="Name" value={medication.name} />
        <LabelValue label="Substance" value={medication.substance} />
        <LabelValue label="Administration" value={medication.administration} />
        <LabelValue
          label="Strenght"
          value={`${medication.strenght.value}${medication.strenght.unit}`}
        />
      </View>
    )
  }

  return null
}
