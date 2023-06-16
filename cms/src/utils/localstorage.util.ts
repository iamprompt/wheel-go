enum LOCALSTORAGE_KEY {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export function getUserToken() {
  const accessToken = localStorage.getItem(LOCALSTORAGE_KEY.ACCESS_TOKEN)
  const refreshToken = localStorage.getItem(LOCALSTORAGE_KEY.REFRESH_TOKEN)

  return { accessToken, refreshToken }
}

export function setUserToken(accessToken: string, refreshToken: string) {
  localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, accessToken)
  localStorage.setItem(LOCALSTORAGE_KEY.REFRESH_TOKEN, refreshToken)
}

export function removeUserToken() {
  localStorage.removeItem(LOCALSTORAGE_KEY.ACCESS_TOKEN)
  localStorage.removeItem(LOCALSTORAGE_KEY.REFRESH_TOKEN)
}
