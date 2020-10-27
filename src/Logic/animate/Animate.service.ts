import {Animated} from 'react-native'

class AnimateService {
  private readonly DEFAULT_SPRING_CONFIG = {
    friction: 9,
    tension: 40,
  }

  animate(animated: Animated.Value, tovalue: number) {
    Animated.spring(animated, {
      toValue: tovalue,
      useNativeDriver: false,
      ...this.DEFAULT_SPRING_CONFIG,
    }).start()
  }
}

export const animateService = new AnimateService()
