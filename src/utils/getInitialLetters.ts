export const getInitialLetters = (value: string) => {
  return value
    .split(' ')
    .slice(0, 2)
    .reduce((acc, curr) => acc + curr[0], '')
    .toUpperCase()
}
