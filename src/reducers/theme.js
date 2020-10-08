const themeReducer = (states, action) => {
  switch (action.type) {
    case 'changeTheme':
      return { ...states, mode: action.mode }
    default:
      return { ...states }
  }
}

export default themeReducer