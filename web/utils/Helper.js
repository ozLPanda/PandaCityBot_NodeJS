export function getFieldObjectFromString(str, obj) {
  return str.split('.').reduce((o, i) => o[i], obj)
}
