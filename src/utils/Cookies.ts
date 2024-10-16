export const setCookie = (name: string, value: string, options: { [key: string]: any } = {}) => {
  if (!name || typeof name !== 'string') {
    throw new Error('Cookie name must be a non-empty string')
  }

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (options.expires instanceof Date) {
    cookieString += `; expires=${options.expires.toUTCString()}`
  } else if (options.expires === 'forever') {
    const farFuture = new Date()
    farFuture.setFullYear(farFuture.getFullYear() + 50)
    cookieString += `; expires=${farFuture.toUTCString()}`
  } else if (typeof options.expires === 'number') {
    const expireDate = new Date()
    expireDate.setTime(expireDate.getTime() + options.expires * 1000)
    cookieString += `; expires=${expireDate.toUTCString()}`
  } else {
    const expireDate = new Date()
    expireDate.setTime(expireDate.getTime() + 59 * 60 * 1000)
    cookieString += `; expires=${expireDate.toUTCString()}`
  }

  // Domain
  if (options.domain) {
    cookieString += `; domain=${options.domain}`
  }

  // Path
  if (options.path) {
    cookieString += `; path=${options.path}`
  }

  // Secure
  if (options.secure) {
    cookieString += `; secure`
  }

  // SameSite
  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`
  }

  document.cookie = cookieString
}

export const deleteCookie = (name: string, options: { [key: string]: any } = {}) => {
  if (!name || typeof name !== 'string') {
    throw new Error('Cookie name must be a non-empty string')
  }

  // Set expiry date to a past date (Unix epoch past)
  const deleteDate = new Date(0).toUTCString()

  // Construct the cookie string to delete the cookie
  let cookieString = `${encodeURIComponent(name)}=; expires=${deleteDate}`

  // Domain
  if (options.domain) {
    cookieString += `; domain=${options.domain}`
  }

  // Path
  if (options.path) {
    cookieString += `; path=${options.path}`
  }

  // Secure
  if (options.secure) {
    cookieString += `; secure`
  }

  document.cookie = cookieString
}
