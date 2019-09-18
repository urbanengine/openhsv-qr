import Auth0Lock from 'auth0-lock'

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`

const lock = new Auth0Lock(
  process.env.clientId,
  process.env.clientDomain,
  {
    container: 'login-page',
    auth: {
      redirectUrl: `${getBaseUrl()}/auth/login`, // If not specified, defaults to the current page
      responseType: 'token id_token',
      params: {
        scope: 'openid profile email user_metadata app_metadata' // Learn about scopes: https://auth0.com/docs/scopes
      }
    }
  }
)

export default (ctx, inject) => {
  let silentCheck = null

  inject('auth0Lock', {
    instance: lock,

    show () {
      lock.show()
    },

    hide () {
      lock.hide()
    },

    checkSession (options) {
      return new Promise((resolve, reject) => {
        lock.checkSession(options || {}, (err, authResult) => {
          if (err || !authResult) return reject(err || new Error('No auth result'))

          resolve(authResult)
        })
      })
    },

    silentCheck (next, time) {
      if (silentCheck) clearTimeout(silentCheck)

      silentCheck = setTimeout(() => {
        this.checkSession()
          .then(authResult => {
            if (next) next(authResult)

            this.silentCheck(next, time)
          })
          .catch(err => {
            if (err) console.log(err)
          })
      }, time || (15 * 60 * 1000))
    },

    getProfile (accessToken) {
      return new Promise((resolve, reject) => {
        lock.getUserInfo(accessToken, (err, profile) => {
          if (err) return reject(err)

          resolve(profile)
        })
      })
    },

    logout () {
      if (silentCheck) clearTimeout(silentCheck)

      lock.logout({
        returnTo: `${getBaseUrl()}/`
      })
    }
  })
}
