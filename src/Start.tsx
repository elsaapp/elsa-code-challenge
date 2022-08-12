import React from 'react'
import {StyleSheet, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'
import {Colors} from '~/Colors'
import {Body, H1, IconButton, SecondaryBlueButton} from '~/Components'
import {Routes} from '~/Navigation/Routes'
import type {RootNavigation} from '~/Root'
import {nameSelector} from '~/Store/Selectors/User'
import {Icons} from '~/Icons'

type StartProps = {
  navigation: RootNavigation
}
export const Start: React.FC<StartProps> = ({navigation}) => {
  const name = useSelector(nameSelector)

  return (
    <SafeAreaView style={styles.background} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.info}>
          <H1>Hello {name}!</H1>
          <SecondaryBlueButton
            title={'Change name'}
            onPress={() => navigation.navigate(Routes.CHANGE_NAME, {name})}
          />
        </View>
        <Body style={styles.help}>
          {`Welcome to Elsa! Your companion in tracking & managing your medications`}
        </Body>

        <View
          style={{
            flex: 1,
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <IconButton
            icon={Icons.log({color: Colors.red2, size: 30})}
            style={styles.tiles}
            onPress={() => {
              navigation.setOptions({title: 'Add Medication'})
              navigation.navigate(Routes.ADD_MEDICATION, {title: 'Add Medication'})
            }}
          />
          <IconButton
            icon={Icons.Categories.medication({color: Colors.red2, size: 30})}
            style={styles.tiles}
            onPress={() => {
              navigation.setOptions({title: 'Medications'})
              navigation.navigate(Routes.VIEW_MEDICATION, {title: 'medications'})
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

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
  help: {
    paddingTop: '20%',
    paddingHorizontal: 25,
  },
  tiles: {
    borderRadius: 5,
    width: 100,
    height: 100,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
