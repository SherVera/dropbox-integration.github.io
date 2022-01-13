export const updateAccessToken = (state, DROPBOX_SESSION_INFO) => {
  if (DROPBOX_SESSION_INFO) {
    state.DROPBOX_SESSION_INFO = DROPBOX_SESSION_INFO
  } else {
    state.DROPBOX_SESSION_INFO = ''
  }
}
export const login = (state, data) => {
  localStorage.setItem('DROPBOX_SESSION_INFO', data)
  state.DROPBOX_SESSION_INFO = data
}

export const logout = (state) => {
  localStorage.removeItem('DROPBOX_SESSION_INFO')
  state.DROPBOX_SESSION_INFO = ''
}
