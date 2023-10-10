export const getInitialWords = (value: string) => {
  return value.split(' ').slice(0, 2).join(' ')
}
