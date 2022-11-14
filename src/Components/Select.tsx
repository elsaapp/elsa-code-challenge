import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import SelectDropdown, {SelectDropdownProps} from 'react-native-select-dropdown'
import {Colors} from '~/Colors'
import {Font, FontWeight} from '~/Font'
import {Icons} from '~/Icons'
import {humanReadableText} from '~/Utils'
// This is just a quick way of showing the principle of including
// from an external package once, style it and pass it on.
// Never use react-native-select-dropdown anywhere else.
// ...and yeah the textInputStyles should be moved to a more global
// context where we can use it for both TextInput and Select.
export type SelectItem = {
  label: string
  value: string
}

export const selectItemMapper = (value: string): SelectItem => {
  // Making the values more read friendly for presentation.
  // A better way would be to create a mapping table, but this will work for now.
  const label = humanReadableText(value)
  return {
    label,
    value,
  }
}

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
    paddingLeft: 0,
    borderWidth: 0,
    // marginRight: 'auto',
    marginLeft: 0,
    color: Colors.gray1,
    ...Font({fontSize: 16, fontWeight: FontWeight.regular}),
    width: 50,
  },
  // Below Taken from component example
  dropdown1BtnStyle: {
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: '100%',
    textAlign: 'right',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: 'blue', borderWidth: 1},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
})

export const Select: React.FC<SelectDropdownProps> = props => {
  return (
    <View style={[styles.container]}>
      <SelectDropdown
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.textInput}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
        renderDropdownIcon={isOpened => {
          const rotateDegs = isOpened ? '270deg' : '90deg'
          return (
            <Text
              style={{
                transform: [{rotate: rotateDegs}],
              }}>
              <Icons.chevron color="#ccc" />
            </Text>
          )
        }}
        dropdownIconPosition="left"
        {...props}
      />
    </View>
  )
}
