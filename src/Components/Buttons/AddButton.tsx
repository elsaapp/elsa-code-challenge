import React from 'react'
import {StyleProp, StyleSheet, ViewStyle, View, Text} from 'react-native'
import {Font, FontWeight} from '~/Font'
import {ButtonWrapper} from './Buttons'
import {Colors} from '~/Colors'

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 16,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.blue3,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pressedButton: {
    backgroundColor: Colors.blue8,
  },
  title: {
    marginStart: 4,
    color: Colors.white,
    ...Font({fontSize: 16, fontWeight: FontWeight.semiBold}),
  },
  plusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
})

type PlusProps = {
  color: string
  size?: number
  thickness?: number
}
const Plus = ({color, size = 12, thickness = 2}: PlusProps) => {
  return (
    <View
      style={[
        styles.plusContainer,
        {
          width: size,
          height: size,
        },
      ]}>
      <View style={{width: '100%', height: thickness, backgroundColor: color}} />
      <View
        style={{position: 'absolute', width: thickness, height: '100%', backgroundColor: color}}
      />
    </View>
  )
}

type AddButtonProps = {
  color?: Colors
  disabled?: boolean
  onPress: () => void
  style?: StyleProp<ViewStyle>
  title: string
}

export const AddButton = ({
  color = Colors.white,
  disabled = false,
  onPress,
  style,
  title,
}: AddButtonProps) => (
  <ButtonWrapper
    onPress={() => !disabled && onPress()}
    style={[styles.button, style, disabled && styles.disabledButton]}
    pressedStyle={disabled ? null : styles.pressedButton}>
    <Plus color={color} />
    <Text style={styles.title}>{title}</Text>
  </ButtonWrapper>
)
