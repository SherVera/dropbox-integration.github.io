
export function isLoggedIn(state) {
  return localStorage.getItem('DROPBOX_SESSION_INFO') !== ('' || undefined || null)
}

