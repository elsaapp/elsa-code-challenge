import React, {forwardRef, useState, useRef, useCallback} from 'react'
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  StyleProp,
  TextStyle,
  InteractionManager,
} from 'react-native'
import {useFocusEffect, useIsFocused} from '@react-navigation/native'
import {Colors} from '~/Colors'
import {Font, FontWeight} from '~/Font'
import {Icons} from '~/Icons'
import {IconButton} from './Buttons'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderRadius: 20,
    color: Colors.dark_blue_grey,
    backgroundColor: Colors.gray4,
    height: 40,
    width: '100%',
    marginBottom: 16,
  },
  textInput: {
    paddingLeft: 16,
    color: Colors.gray1,
    ...Font({fontSize: 16, fontWeight: FontWeight.regular}),
  },
  error: {borderWidth: 2, borderColor: Colors.red3},
  errorText: {color: Colors.red2},
  showPassword: {position: 'absolute', top: 8, right: 16},
})

interface TextInputProps extends RNTextInputProps {
  error?: boolean
  textStyle?: StyleProp<TextStyle>
}
export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({error, style, textStyle, ...props}, ref) => {
    const isFocused = useIsFocused()
    return (
      <View style={[styles.container, style, error && styles.error]}>
        {/*https://github.com/react-navigation/react-navigation/issues/6918#issuecomment-662975183*/}
        {isFocused && (
          <RNTextInput
            ref={ref}
            autoCorrect={false}
            clearButtonMode="while-editing"
            style={[styles.textInput, textStyle && textStyle, error && styles.errorText]}
            {...props}
          />
        )}
      </View>
    )
  }
)

type DelayedFocusTextInputProps = TextInputProps
export const DelayedFocusTextInput: React.FC<DelayedFocusTextInputProps> = props => {
  const [hasHadFocus, setHasHadFocus] = useState(false)
  const textInputRef = useRef<RNTextInput>(null)
  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        if (!hasHadFocus && textInputRef.current) {
          textInputRef.current.focus()
          setHasHadFocus(true)
        }
      })
      return () => task.cancel()
    }, [hasHadFocus])
  )

  return <TextInput ref={textInputRef} {...props} />
}

export const PasswordTextInput = forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => setShowPassword(showPassword => !showPassword)

  return (
    <>
      <TextInput
        ref={ref}
        autoCapitalize="none"
        clearButtonMode="never"
        secureTextEntry={!showPassword}
        {...props}
      />
      <IconButton
        icon={(showPassword ? Icons.showPassword : Icons.hidePassword)({
          color: Colors.gray1,
        })}
        style={styles.showPassword}
        onPress={toggleShowPassword}
      />
    </>
  )
})
