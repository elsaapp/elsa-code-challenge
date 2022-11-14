export const humanReadableText = (str: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : ''

export const sortObjectByStringProp = <T extends object>(prop: keyof T) => {
  return (a: T, b: T) => {
    if (a[prop] > b[prop]) {
      return 1
    }
    if (a[prop] < b[prop]) {
      return -1
    }
    return 0
  }
}
