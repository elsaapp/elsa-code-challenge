import React from 'react'
import {StyleSheet} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

export interface Props {
  lib?: 'Entypo'
  name: string
  color: string
}

const styles = StyleSheet.create({
  TAB_BAR_ICON: {
    marginTop: 4,
  },
})

export default function TabIcon(props: Props) {
  const {lib, name, color} = props

  const config = {
    name,
    color,
    size: 24,
    style: styles.TAB_BAR_ICON,
  }

  if (lib) {
    return <Entypo {...config} />
  }
  return null
}
