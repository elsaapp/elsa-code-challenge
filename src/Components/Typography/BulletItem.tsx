import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {Colors} from '~/Colors'
import {Body, BodyProps, BodyVariants} from './Body'

const styles = StyleSheet.create({
  bulletBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    marginTop: 4,
    marginEnd: 8,
    backgroundColor: Colors.gray1,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
})

const variantStyle = (variant: BodyVariants) => {
  switch (variant) {
    case 'small':
      return {
        marginTop: 4,
      }
    case 'medium':
      return {
        marginTop: 6,
      }
    case 'large':
      return {
        marginTop: 8,
      }
  }
}

export type BulletItemProps = {
  containerStyle?: StyleProp<ViewStyle>
} & BodyProps
export const BulletItem: React.FC<BulletItemProps> = ({
  color = Colors.gray1,
  containerStyle,
  children,
  style,
  variant = 'medium',
  ...props
}) => (
  <View style={[styles.bulletBlock, containerStyle]}>
    <View
      style={[
        styles.bullet,
        variantStyle(variant),
        {
          backgroundColor: color,
        },
      ]}
    />
    <Body color={color} variant={variant} {...props}>
      {children}
    </Body>
  </View>
)
