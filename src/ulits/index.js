export function getTime(time) {
  let min = parseInt(time / 60) > 10 ? parseInt(time / 60) : '0' + parseInt(time / 60)
  let se = time - (parseInt(time / 60) * 60) > 10 ? (time - parseInt(time / 60) * 60) : '0' + (time - parseInt(time / 60) * 60)
  return min + ':' + se
}