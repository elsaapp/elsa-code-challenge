jest.mock('react-native-reanimated', () => {
  return {
    // @ts-ignore
    ...jest.requireActual('react-native-reanimated/mock'),
  }
})
