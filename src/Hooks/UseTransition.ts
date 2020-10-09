import {TimingConfig, withTimingTransition} from 'react-native-redash'
import {useState, useEffect} from 'react'
import Animated from 'react-native-reanimated'

export const useTransition = (val: number, config?: TimingConfig) => {
  const [animatedValue] = useState(new Animated.Value(val))
  useEffect(() => {
    animatedValue.setValue(val)
  }, [animatedValue, val])
  return withTimingTransition(animatedValue, config)
}
