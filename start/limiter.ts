/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import env from '#start/env'
import limiter from '@adonisjs/limiter/services/main'

export const authThrottle = limiter.define('auth', () => {
  if (env.get('NODE_ENV') === 'test') {
    return limiter.allowRequests(25).every('5 seconds').blockFor('15 minutes')
  }
  return limiter.allowRequests(15).every('15 minutes').blockFor('15 minutes')
})
