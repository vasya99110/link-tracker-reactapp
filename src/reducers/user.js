const userReducer = (states, action) => {
  switch (action.type) {
    case 'updateEmail':
      return { ...states, email: action.email }
    case 'updateName':
      return { ...states, name: action.name }
    case 'updateImage':
      return { ...states, image: action.image }
    default:
      return { ...states }
  }
}

export default userReducer