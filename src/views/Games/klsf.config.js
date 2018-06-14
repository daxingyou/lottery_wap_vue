export const getEvenCode = () => {
  let array = []
  for (let i = 1; i < 21; i++) {
    array.push({
      isCheck: false,
      name: i,
      odds: ''
    })
  }
  return array
}