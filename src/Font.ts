import {Platform} from 'react-native'

type FontStyles = 'normal' | 'italic' | undefined
export enum FontStyle {
  normal = 'normal',
  italic = 'italic',
}

type FontStyleType = {fontStyle: FontStyles}
const buildFontStyle = (s: FontStyles): FontStyleType | string | undefined => {
  switch (s) {
    case FontStyle.normal: {
      return Platform.OS === 'ios' ? {fontStyle: 'normal'} : ''
    }
    case FontStyle.italic: {
      return Platform.OS === 'ios' ? {fontStyle: 'italic'} : 'It'
    }
  }
}

type FontWeights =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined
export enum FontWeight {
  thin,
  extraLight,
  light,
  regular,
  medium,
  semiBold,
  bold,
  extraBold,
  black,
  _100,
  _200,
  _300,
  _400,
  _500,
  _600,
  _700,
  _800,
  _900,
  normal,
}
type FontWeightType = {fontWeight: FontWeights}
const buildFontWeight = (w: FontWeight): FontWeightType | string | undefined => {
  const build = (ios: FontWeights, android: string): FontWeightType | string | undefined =>
    Platform.OS === 'ios' ? {fontWeight: ios} : `-${android}`
  switch (w) {
    case FontWeight._100:
    case FontWeight.thin: {
      return build('100', 'Thin')
    }
    case FontWeight._200:
    case FontWeight.extraLight: {
      return build('200', 'Extralight')
    }
    case FontWeight._300:
    case FontWeight.light: {
      return build('300', 'Light')
    }
    case FontWeight._400:
    case FontWeight.regular:
    case FontWeight.normal: {
      return build('400', 'Regular')
    }
    case FontWeight._500:
    case FontWeight.medium: {
      return build('500', 'Medium')
    }
    case FontWeight._600:
    case FontWeight.semiBold: {
      return build('600', 'Semibold')
    }
    case FontWeight._700:
    case FontWeight.bold: {
      return build('700', 'Bold')
    }
    case FontWeight._800:
    case FontWeight.extraBold: {
      return build('800', 'Extrabold')
    }
    case FontWeight._900:
    case FontWeight.black: {
      return build('900', 'Black')
    }
  }
}

type FontType = {
  fontFamily: string
  fontWeight: FontWeights
  fontStyle: FontStyles
  fontSize: number
}
const buildFont = (
  fontFamily: string,
  weight?: FontWeight,
  style?: FontStyles,
  size?: number
): FontType => {
  let font = {fontFamily} as FontType
  if (!size) {
    font = {...font, fontSize: 13}
  } else {
    font = {...font, fontSize: size}
  }

  if (!weight) {
    weight = FontWeight.normal
  }

  const fontWeight = buildFontWeight(weight)
  if (Platform.OS === 'ios') {
    font = {...font, ...(fontWeight as FontWeightType)}
  } else {
    font.fontFamily = font.fontFamily + fontWeight
  }

  if (!style) {
    style = FontStyle.normal
  }

  const fontStyle = buildFontStyle(style)
  if (Platform.OS === 'ios') {
    font = {...font, ...(fontStyle as FontStyleType)}
  } else {
    font.fontFamily = font.fontFamily + fontStyle
  }

  return font
}

export const Font = ({
  fontWeight,
  fontStyle,
  fontSize,
}: {
  fontWeight?: FontWeight
  fontStyle?: FontStyles
  fontSize?: number
}): FontType =>
  // (Platform.OS === 'ios' ? {fontFamily: 'Proxima Nova', fontStyle: 'italic'}: { fontFamily: 'ProximaNova-RegularIt'})
  buildFont(Platform.OS === 'ios' ? 'Proxima Nova' : 'ProximaNova', fontWeight, fontStyle, fontSize)
