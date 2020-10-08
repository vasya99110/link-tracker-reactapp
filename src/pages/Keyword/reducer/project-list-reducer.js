const projectListReducer = (states, action) => {
  switch (action.type) {
    case 'fetchProjectList':
      return {
        ...states,
        projectFetchCount: action.projectFetchCount
      }
    default:
      return {...states}
  }
}

const projectListStates = {
  projectFetchCount: 0
}

export {projectListReducer, projectListStates}