import React, {useEffect, useRef, useState} from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import {Animated, TouchableOpacity, View, ViewStyle} from 'react-native'
import {COLORS} from '~/Style/Colors'
import {Body} from '~/Components'
import {animateService} from '~/Logic/animate/Animate.service'

interface Props {
  onOptionPress: (option?: string) => any
  options: string[]
  width?: number
}

const shadow = {
  DOWN: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.84,
    elevation: 2,
  } as ViewStyle,
}

export function MoreButton(props: Props) {
  const {onOptionPress, options, width = 120} = props

  const [menuVisible, showMenu] = useState<boolean>(false)

  const angleAnimation = useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(0)).current
  const angle = angleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  })

  useEffect(() => {
    animateService.animate(angleAnimation, menuVisible ? 1 : 0)
    animateService.animate(opacity, menuVisible ? 1 : 0)
  }, [angleAnimation, menuVisible, opacity])

  return (
    <TouchableOpacity
      onPress={() => showMenu(!menuVisible)}
      style={{
        position: 'absolute',
        zIndex: 100,
        top: 38,
        right: 12,
      }}>
      <View>
        <Animated.View style={{transform: [{rotateZ: angle}], zIndex: 120}}>
          <Entypo name="dots-three-horizontal" onPress={() => showMenu(!menuVisible)} size={20} />
        </Animated.View>
        {menuVisible && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: -12,
                right: -12,
                backgroundColor: COLORS.wellbeing_light,
                borderTopLeftRadius: 24,
                borderBottomLeftRadius: 24,
                width,
                paddingVertical: 8,
                paddingHorizontal: 16,
                opacity,
              },
              shadow.DOWN,
            ]}>
            {options.map(option => (
              <TouchableOpacity
                key={option}
                style={{
                  padding: 4,
                  backgroundColor: COLORS.wellbeing_light,
                  width: '100%',
                }}
                onPress={() => {
                  onOptionPress(option)
                  showMenu(false)
                }}>
                <Body style={{textTransform: 'uppercase'}}>{option}</Body>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  )
}
