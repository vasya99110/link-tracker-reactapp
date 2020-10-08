export function handleAction ({ actionFn, successFn, data, showAlert = true }) {
  return actionFn(data).then(res => {
    if (true === showAlert) {
      alert(res.data.success.message)
    }

    successFn()
  }).catch(error => {
    if (error.response) {
      const errorData = error.response.data
      if (errorData.error) {
        alert(errorData.error.message)
      } else if (errorData.errors) {
        let messageList = Object.values(errorData.errors)
        alert(messageList.join('\n'))
      }
    } else {
      console.dir(error)
    }
  })
}
