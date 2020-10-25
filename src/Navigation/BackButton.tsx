import React from 'react'
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'
import {COLORS, Opacity} from '~/Style/Colors'
import {Icons} from '~/Icons'
import type {StackHeaderLeftButtonProps} from '@react-navigation/stack'

const styles = StyleSheet.create({
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.purple3 + Opacity(0.4),
    marginLeft: 16,
    paddingRight: 2,
  },
})

type BackButtonProps = {
  color?: string
  style?: StyleProp<ViewStyle>
} & StackHeaderLeftButtonProps

export const BackButton: React.FC<BackButtonProps> = ({color = COLORS.purple7, onPress, style}) => (
  <TouchableOpacity style={[styles.backButton, style]} onPress={onPress}>
    {Icons.backArrow({color})}
  </TouchableOpacity>
)
