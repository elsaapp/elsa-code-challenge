import React from 'react'
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native'
import {Colors} from '~/Colors'
import {Icons} from '~/Icons'
import {ButtonWrapper} from '../Buttons'
import {Body} from '../Typography'
import {Toggle} from '../Toggle'

const styles = StyleSheet.create({
  listItem: {
    height: 56,
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.gray3,
    borderBottomWidth: 1,
  },
  firstListItem: {
    borderTopColor: Colors.gray3,
    borderTopWidth: 1,
  },
  arrow: {
    marginRight: -6,
  },
  leftSide: {
    flex: 1,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressedItem: {
    opacity: 0.5,
  },
})

export type ListItemProps = {
  arrowColor?: string
  checked?: boolean
  detailsText?: string
  detailsTextStyle?: StyleProp<TextStyle>
  icon?: React.ReactElement
  isFirst?: boolean
  onPress?: () => void
  onToggle?: (checked: boolean) => void
  opacityFeedback?: boolean
  style?: StyleProp<ViewStyle>
  subtitle?: string
  title?: string
  titleStyle?: StyleProp<TextStyle>
  withArrow?: boolean
}
export const ListItem: React.FC<ListItemProps> = ({
  arrowColor = Colors.gray1,
  checked,
  children,
  detailsText,
  detailsTextStyle,
  icon,
  isFirst = false,
  onPress,
  onToggle,
  opacityFeedback = true,
  style,
  subtitle,
  title,
  titleStyle,
  withArrow = false,
}) => (
  <ButtonWrapper
    onPress={onPress}
    style={[styles.listItem, isFirst && styles.firstListItem, style]}
    pressedStyle={onPress && opacityFeedback && styles.pressedItem}>
    {children ? (
      children
    ) : (
      <>
        <View style={styles.leftSide}>
          <Body bold color={Colors.black} style={titleStyle}>
            {title}
          </Body>
          {subtitle && <Body color={Colors.gray1}>{subtitle}</Body>}
        </View>
        <View style={styles.rightSide}>
          {detailsText && (
            <Body color={Colors.blue3} style={detailsTextStyle}>
              {detailsText}
            </Body>
          )}
          {icon && icon}
          {checked !== undefined && onToggle && <Toggle checked={checked} onToggle={onToggle} />}
          {withArrow && <Icons.chevron style={styles.arrow} color={arrowColor} size={20} />}
        </View>
      </>
    )}
  </ButtonWrapper>
)
