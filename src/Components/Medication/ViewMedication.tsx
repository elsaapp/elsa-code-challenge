import React from 'react'
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {RootNavigation, ViewMedicationRouteProp} from '~/Root'
import {medicationsSelector} from '~/Store/Selectors'
import {deleteMedication} from '~/Store/Actions'
import {IconButton} from '~/Components'
import {Icons} from '~/Icons'
import {Colors} from '~/Colors'
import {Routes} from '~/Navigation/Routes'

type ViewMedication = {
  navigation: RootNavigation
  route: ViewMedicationRouteProp
}
export const ViewMedication: React.FC<ViewMedication> = ({navigation}) => {
  const dispatch = useDispatch()
  const medications = useSelector(medicationsSelector)

  const itemSeparator = () => {
    return <View style={styles.separator} />
  }

  const emptyList = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={styles.listItem}>No medications found</Text>
      </View>
    )
  }

  const removeMedication = (name: string) => {
    Alert.alert('Remove Medication', 'This medication will be removed from your current list?', [
      {
        text: 'PROCEED',
        onPress: () => {
          dispatch(deleteMedication(name))
          navigation.navigate(Routes.VIEW_MEDICATION)
        },
      },
      {text: 'CANCEL'},
    ])
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={medications}
        renderItem={({item}) => (
          <View>
            <Text style={styles.listItem}>{item.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.itemSummary}>dosage: </Text>
              <Text style={styles.itemSummary}>{item.dosage}</Text>

              <IconButton
                icon={Icons.close({color: Colors.red2, size: 22})}
                style={styles.icon}
                onPress={() => removeMedication(item.name)}
              />
            </View>
          </View>
        )}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={emptyList}
        keyExtractor={item => item.name}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  listItem: {
    padding: 20,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  itemSummary: {
    fontSize: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  separator: {
    height: 1,
    backgroundColor: 'grey',
    marginHorizontal: 10,
  },
  icon: {
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
})
