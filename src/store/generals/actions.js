export function fetchAccessToken({ commit }) {
  const DROPBOX_SESSION_INFO = localStorage.getItem('DROPBOX_SESSION_INFO')
  commit('updateAccessToken',DROPBOX_SESSION_INFO)
}
export function logout ({ commit }) {
  localStorage.removeItem('DROPBOX_SESSION_INFO')
  commit('logout')
}
