export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function makeId(length = 5) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const getFormattedNum = (num) => {
  num += ''
  if (num.length === 1) {
    return `#000${num}`
  } else if (num.length === 2) {
    return `#00${num}`
  } else if (num.length === 3) {
    return `#0${num}`
  } else return `#${num}`
}
