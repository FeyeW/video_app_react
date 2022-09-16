export function getTime(time) {
  let min = parseInt(time / 60) > 10 ? parseInt(time / 60) : '0' + parseInt(time / 60)
  let se = time - (parseInt(time / 60) * 60) > 10 ? (time - parseInt(time / 60) * 60) : '0' + (time - parseInt(time / 60) * 60)
  return min + ':' + se
}
export function handleTime(params) {
  let date = new Date(params);

  let Y = date.getFullYear();
  let M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let D = date.getDay() > 10 ? "0" + date.getDate() : date.getDate();
  return Y + "-" + M + "-" + D;
}

