import * as API from './API'

export function getUserList () {
  return API.get('api/admin/list-user')
}