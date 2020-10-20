import React from 'react'
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native'
import {COLORS} from '../../Style/Colors'
import {ButtonWrapper} from './Buttons'
import {Font, FontWeight} from '../../Style/Font'

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: COLORS.green7,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pressedButton: {
    backgroundColor: COLORS.green6,
  },
  title: {
    color: COLORS.green1,
    lineHeight: 22,
    ...Font({fontSize: 16, fontWeight: FontWeight.semiBold}),
  },
})

type HelpButtonProps = {
  disabled?: boolean
  onPress: () => void
  style?: StyleProp<ViewStyle>
  title: string
}

export const HelpButton = ({disabled, onPress, style, title}: HelpButtonProps) => (
  <ButtonWrapper
    onPress={() => !disabled && onPress()}
    style={[styles.button, style, disabled && styles.disabledButton]}
    pressedStyle={!disabled && styles.pressedButton}>
    <Text style={styles.title}>{title}</Text>
  </ButtonWrapper>
)
