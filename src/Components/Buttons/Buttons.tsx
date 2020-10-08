import React, {useEffect, useRef, useState} from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native'
import {Colors} from '~/Colors'
import {Font, FontWeight} from '~/Font'
// import {WhiteSnakeSpinner} from '../Spinners'

const styles = StyleSheet.create({
  dots: {marginRight: 8},
  button: {
    height: 48,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    ...Font({fontSize: 16, fontWeight: FontWeight.semiBold}),
  },
  disabled: {opacity: 0.5},
  blueButton: {backgroundColor: Colors.blue3},
  greenButton: {backgroundColor: Colors.green3},
  redButton: {backgroundColor: Colors.red3},
  whiteButton: {backgroundColor: Colors.transparent, borderColor: Colors.white, borderWidth: 2},
  grayButton: {backgroundColor: Colors.gray4},
  grayButtonText: {color: Colors.blue3},
  darkButton: {backgroundColor: Colors.gray1},
  darkButtonText: {color: Colors.white},
  secondaryBlueButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.blue3,
    borderWidth: 2,
  },
  secondaryBlueButtonText: {color: Colors.blue3},
  secondaryBlueButtonPressed: {opacity: 0.8},
  blueButtonPressed: {backgroundColor: Colors.blue8},
  greenButtonPressed: {backgroundColor: Colors.green8},
  grayButtonPressed: {backgroundColor: Colors.gray4},
  darkButtonPressed: {backgroundColor: Colors.dark_button_pressed},
  redButtonPressed: {backgroundColor: Colors.red8},
  whiteButtonPressed: {opacity: 0.8},
  pressedButtonText: {opacity: 0.8},
  stepContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 20,
  },
  stepHorizontal: {height: 2, width: 16},
  stepVertical: {height: 16, width: 2, position: 'absolute'},
  row: {flexDirection: 'row', alignItems: 'center'},
})

interface RoundButtonProps {
  color?: Colors
  backgroundColor?: Colors
  borderColor?: Colors
  isIncrementing?: boolean
  disabled?: boolean
  onPress: () => void
  pressedStyle?: StyleProp<ViewStyle>
}
export const RoundButton = ({
  isIncrementing,
  disabled,
  onPress,
  color = Colors.blue3,
  backgroundColor = Colors.white,
  borderColor = Colors.blue3,
  pressedStyle,
}: RoundButtonProps) => (
  <BaseButton
    hitSlop={EXTENDED_HIT_SLOP}
    onPress={() => !disabled && onPress()}
    style={[
      styles.stepContainer,
      {borderColor: borderColor, backgroundColor: backgroundColor},
      disabled && styles.disabled,
    ]}
    pressedStyle={pressedStyle}>
    <View style={[styles.stepHorizontal, {backgroundColor: color}]} />
    {isIncrementing ? <View style={[styles.stepVertical, {backgroundColor: color}]} /> : null}
  </BaseButton>
)

interface BaseButtonProps {
  children?: React.ReactNode
  hitSlop?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
  style?: StyleProp<ViewStyle>
  pressedStyle?: StyleProp<ViewStyle>
  onPress?: (evt?: GestureResponderEvent) => void
  onBlock?: (isBlocking: boolean) => void
  onPressed?: (isPressed: boolean) => void
}

const DOUBLE_TAP_DELAY = 300
const delayedTap = () => new Promise(resolve => setTimeout(resolve, DOUBLE_TAP_DELAY))

const BaseButton = (props: BaseButtonProps) => {
  const {children, hitSlop, style, pressedStyle} = props

  const [pressed, setPressed] = useState(false)
  const [blocked, setBlocked] = useState(false)

  const isMounted = useRef(true)
  useEffect(
    () => () => {
      isMounted.current = false
    },
    []
  )

  const onPressIn = () => {
    if (!blocked) {
      setPressed(true)
      props.onPressed && props.onPressed(true)
    }
  }

  const onPressOut = () => {
    if (!blocked) {
      setPressed(false)
      props.onPressed && props.onPressed(false)
    }
  }

  const onPress = async (evt: GestureResponderEvent) => {
    if (!blocked && props.onPress) {
      setPressed(true)
      setBlocked(true)
      props.onBlock && props.onBlock(true)
      await Promise.all([props.onPress(evt), delayedTap()])
      if (isMounted.current) {
        setPressed(false)
        setBlocked(false)
        props.onBlock && props.onBlock(false)
      }
    }
  }

  return (
    <TouchableWithoutFeedback
      hitSlop={hitSlop}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}>
      {/* https://github.com/facebook/react-native/issues/18611 */}
      <View style={[style, pressed && pressedStyle]}>{children}</View>
    </TouchableWithoutFeedback>
  )
}

const DEFAULT_HIT_SLOP = {top: 0, bottom: 0, left: 0, right: 0}
export const EXTENDED_HIT_SLOP = {top: 16, bottom: 16, left: 16, right: 16}

interface ImageButtonProps extends BaseButtonProps {
  image: React.ReactNode
}
export const ImageButton = ({image, hitSlop, ...props}: ImageButtonProps) => (
  <BaseButton hitSlop={hitSlop ? hitSlop : DEFAULT_HIT_SLOP} {...props}>
    {image}
  </BaseButton>
)

interface IconButtonProps extends BaseButtonProps {
  icon: React.ReactNode
}
export const IconButton = ({icon, hitSlop, ...props}: IconButtonProps) => (
  <BaseButton hitSlop={hitSlop ? hitSlop : DEFAULT_HIT_SLOP} {...props}>
    {icon}
  </BaseButton>
)

export interface TextButtonProps extends BaseButtonProps {
  title: string | React.ReactNode | React.ReactNode[]
  titleStyle?: StyleProp<TextStyle>
  multipleLines?: boolean
}
export const TextButton = ({
  title,
  titleStyle,
  hitSlop,
  multipleLines = false,
  ...props
}: TextButtonProps) => (
  <BaseButton hitSlop={hitSlop ? hitSlop : DEFAULT_HIT_SLOP} {...props}>
    <Text numberOfLines={multipleLines ? undefined : 1} style={titleStyle}>
      {title}
    </Text>
  </BaseButton>
)

interface CustomButtonProps extends BaseButtonProps {
  children: React.ReactNode
}
export const ButtonWrapper = ({children, hitSlop, ...props}: CustomButtonProps) => (
  <BaseButton hitSlop={hitSlop ? hitSlop : DEFAULT_HIT_SLOP} {...props}>
    {children}
  </BaseButton>
)

interface DisableableButtonProps extends TextButtonProps {
  disabled?: boolean
  showSpinner?: boolean
}
const DisableableButton = ({
  disabled,
  showSpinner,
  style,
  title,
  titleStyle,
  onPress,
  pressedStyle,
}: DisableableButtonProps) => {
  const [isBlocking, setIsBlocking] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  return (
    <BaseButton
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={disabled ? undefined : () => onPress && onPress()}
      onPressed={isPressed => setIsPressed(isPressed)}
      pressedStyle={disabled ? null : pressedStyle}
      onBlock={isBlocking => setIsBlocking(isBlocking)}>
      {showSpinner && isBlocking ? (
        <View style={styles.row}>
          {/*<WhiteSnakeSpinner style={styles.dots} />*/}
          <Text style={[styles.title, style && titleStyle, isPressed && styles.pressedButtonText]}>
            {title}
          </Text>
        </View>
      ) : (
        <Text style={[styles.title, style && titleStyle, isPressed && styles.pressedButtonText]}>
          {title}
        </Text>
      )}
    </BaseButton>
  )
}

export const GreenButton = ({style, ...props}: DisableableButtonProps) => (
  <DisableableButton
    style={[styles.greenButton, style]}
    pressedStyle={styles.greenButtonPressed}
    {...props}
  />
)

export const RedButton = ({style, ...props}: DisableableButtonProps) => (
  <DisableableButton
    style={[styles.redButton, style]}
    pressedStyle={styles.redButtonPressed}
    {...props}
  />
)

export const PrimaryBlueButton = ({style, ...props}: DisableableButtonProps) => (
  <DisableableButton
    style={[styles.blueButton, style]}
    pressedStyle={styles.blueButtonPressed}
    {...props}
  />
)

export const SecondaryWhiteButton = ({style, ...props}: DisableableButtonProps) => (
  <DisableableButton
    style={[styles.whiteButton, style]}
    pressedStyle={styles.whiteButtonPressed}
    {...props}
  />
)

export const SecondaryGrayButton = ({style, ...props}: DisableableButtonProps) => (
  <DisableableButton
    style={[styles.grayButton, style]}
    titleStyle={styles.grayButtonText}
    pressedStyle={styles.grayButtonPressed}
    {...props}
  />
)
export const SecondaryDarkButton = ({style, ...props}: DisableableButtonProps) => (
  <DisableableButton
    style={[styles.darkButton, style]}
    titleStyle={styles.darkButtonText}
    pressedStyle={styles.darkButtonPressed}
    {...props}
  />
)

export const SecondaryBlueButton = ({style, ...props}: DisableableButtonProps) => (
  <DisableableButton
    style={[styles.secondaryBlueButton, style]}
    titleStyle={styles.secondaryBlueButtonText}
    pressedStyle={styles.secondaryBlueButtonPressed}
    {...props}
  />
)
