/*
export function someMutation (state) {
}
*/
export function changeState (state, data) {
  state.changed = data
//   console.log('data = ' + data.changed)
}
export function changeOdds (state, data) {
  state.meron = data.meron
  state.wala = data.wala
}
