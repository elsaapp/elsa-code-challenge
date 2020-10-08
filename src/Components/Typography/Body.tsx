import React from 'react'
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native'
import {Colors} from '~/Colors'
import {Font, FontWeight, FontStyle} from '~/Font'

const styles = StyleSheet.create({
  shared: {
    letterSpacing: 0,
  },
})

export type BodyVariants = 'small' | 'medium' | 'large'
const variantStyle = (
  variant: BodyVariants,
  fontWeight: FontWeight,
  fontStyle: FontStyle,
  underline: Pick<TextStyle, 'textDecorationLine'>
) => {
  switch (variant) {
    case 'small':
      return {
        ...styles.shared,
        lineHeight: 16,
        ...Font({fontSize: 14, fontWeight, fontStyle}),
        ...underline,
      }
    case 'medium':
      return {
        ...styles.shared,
        lineHeight: 20,
        ...Font({fontSize: 16, fontWeight, fontStyle}),
        ...underline,
      }
    case 'large':
      return {
        ...styles.shared,
        lineHeight: 24,
        ...Font({fontSize: 18, fontWeight, fontStyle}),
        ...underline,
      }
  }
}
export type BodyProps = {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  color?: string
  variant?: BodyVariants
} & TextProps
export const Body: React.FC<BodyProps> = ({
  bold = false,
  italic = false,
  underline = false,
  color = Colors.gray1,
  children,
  style,
  variant = 'medium',
  ...props
}) => (
  <Text
    style={[
      variantStyle(
        variant,
        bold ? FontWeight.semiBold : FontWeight.regular,
        italic ? FontStyle.italic : FontStyle.normal,
        underline ? {textDecorationLine: 'underline'} : {textDecorationLine: 'none'}
      ),
      {
        color,
      },
      style,
    ]}
    {...props}>
    {children}
  </Text>
)
