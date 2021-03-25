import Middleware from './middleware'
import { Auth, authMiddleware, ExpiredAuthSessionError } from '~auth/runtime'

// Active schemes
import { RefreshScheme } from '~auth/runtime'

Middleware.auth = authMiddleware

export default function (ctx, inject) {
  // Options
  const options = {
  "resetOnError": false,
  "ignoreExceptions": false,
  "scopeKey": "scope",
  "rewriteRedirects": true,
  "fullPathRedirect": false,
  "watchLoggedIn": true,
  "redirect": {
    "login": "/login",
    "logout": "/",
    "home": "/",
    "callback": "/login"
  },
  "vuex": {
    "namespace": "auth"
  },
  "cookie": {
    "prefix": "auth.",
    "options": {
      "path": "/"
    }
  },
  "localStorage": {
    "prefix": "auth."
  },
  "defaultStrategy": "monster"
}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // monster
  $auth.registerStrategy('monster', new RefreshScheme($auth, {
  "token": {
    "property": "data.access_token",
    "maxAge": 1800,
    "type": "Bearer"
  },
  "refreshToken": {
    "property": "data.refresh_token",
    "data": "refresh_token",
    "maxAge": 2592000
  },
  "user": {
    "property": "data",
    "autoFetch": true
  },
  "endpoints": {
    "login": {
      "url": "http://172.16.50.59:8888/api/auth/login",
      "method": "post"
    },
    "refresh": {
      "url": "http://172.16.50.59:8888/api/auth/refresh",
      "method": "post"
    },
    "user": {
      "url": "http://172.16.50.59:8888/api/v1/user/me",
      "method": "get"
    },
    "logout": {
      "url": "http://172.16.50.59:8888/api/v1/auth/logout",
      "method": "post"
    }
  },
  "autoLogout": true,
  "name": "monster"
}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      // Don't console log expired auth session errors. This error is common, and expected to happen.
      // The error happens whenever the user does an ssr request (reload/initial navigation) with an expired refresh
      // token. We don't want to log this as an error.
      if (error instanceof ExpiredAuthSessionError) {
        return
      }

      console.error('[ERROR] [AUTH]', error)
    }
  })
}
