import { getUser } from './auth-client'

async function bootstrapAppData () {
  const data = await getUser()
  if (!data) {
    return { user: null }
  }

  return {
    user: data,
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export { bootstrapAppData, sleep }
