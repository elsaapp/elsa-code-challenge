import React, {FunctionComponent, forwardRef} from 'react'
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  ViewProps,
  ScrollViewProps,
} from 'react-native'
import {Colors} from '~/Colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  listDivider: {
    height: 1,
    backgroundColor: Colors.gray3,
  },
  sectionGroup: {
    marginBottom: 16,
  },
  sectionHeader: {
    marginTop: 24,
    paddingBottom: 12,
    borderBottomColor: Colors.gray3,
    borderBottomWidth: 1,
  },
})

type ListProps = {
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
  children: React.ReactNode | React.ReactNode[]
  keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps']
}

export const List = forwardRef<ScrollView, ListProps>(
  ({children, style, contentContainerStyle, keyboardShouldPersistTaps}, ref) => {
    return (
      <ScrollView
        ref={ref}
        style={[styles.container, style]}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        {children}
      </ScrollView>
    )
  }
)

export const SectionHeader: FunctionComponent<ViewProps> = ({children, style, ...props}) => (
  <View style={[styles.sectionHeader, style]} {...props}>
    {children}
  </View>
)

export const Section: FunctionComponent<ViewProps> = ({children, style, ...props}) => (
  <View style={[styles.sectionGroup, style]} {...props}>
    {children}
  </View>
)

export const ListDivider = ({style}: {style?: StyleProp<ViewStyle>}) => (
  <View style={[styles.listDivider, style]} />
)
