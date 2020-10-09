import React from 'react'
import {StyleSheet, View} from 'react-native'
import Animated, {Easing} from 'react-native-reanimated'
import {Colors} from '~/Colors'
import {useTransition} from '~/Hooks/UseTransition'
import {ButtonWrapper, EXTENDED_HIT_SLOP} from './Buttons'

const {interpolate} = Animated

const styles = StyleSheet.create({
  track: {
    width: 56,
    height: 32,
    borderRadius: 16,
    alignItems: 'stretch',
    backgroundColor: Colors.gray3,
    overflow: 'hidden',
  },
  trackOn: {
    flex: 1,
    backgroundColor: Colors.green3,
  },
  dot: {
    position: 'absolute',
    left: 4,
    top: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
})

type ToggleProps = {
  checked: boolean
  onToggle: (checked: boolean) => void
}
export const Toggle = ({checked, onToggle}: ToggleProps) => {
  const isCheckedAnimation = useTransition(checked ? 1 : 0, {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  })

  const opacity = isCheckedAnimation
  const translateX = interpolate(isCheckedAnimation, {
    inputRange: [0, 1],
    outputRange: [0, 24],
  })
  const onPress = () => {
    onToggle(!checked)
  }
  return (
    <ButtonWrapper onPress={onPress} hitSlop={EXTENDED_HIT_SLOP}>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.trackOn,
            {
              opacity,
            },
          ]}
        />
      </View>
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              {
                translateX,
              },
            ],
          },
        ]}
      />
    </ButtonWrapper>
  )
}
