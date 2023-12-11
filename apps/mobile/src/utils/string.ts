export const camelCaseToWords = (string: string) => {
  const result = string.replace(/([A-Z])/g, ' $1').replace('_', ' ')
  return result.charAt(0).toUpperCase() + result.slice(1)
}
