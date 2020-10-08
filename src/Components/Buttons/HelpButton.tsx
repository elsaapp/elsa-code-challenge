import React from 'react'
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native'
import {Colors} from '~/Colors'
import {ButtonWrapper} from './Buttons'
import {Font, FontWeight} from '~/Font'

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: Colors.green7,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pressedButton: {
    backgroundColor: Colors.green6,
  },
  title: {
    color: Colors.green1,
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
