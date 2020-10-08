const projectDetailStats = {
  keywordFetchCount: 0,
  noteFetchCount: 0,
  chartPeriod: 'month'
}

const projectDetailReducer = (states, action) => {
  switch (action.type) {
    case 'updateChartPeriod':
      return {
        ...states,
        chartPeriod: action.chartPeriod
      }
    case 'fetchKeywordList':
      return {
        ...states,
        keywordFetchCount: action.keywordFetchCount
      }
    case 'fetchNoteList':
      return {
        ...states,
        noteFetchCount:action.noteFetchCount
      }
    default:
      return {...states}
  }
}

export {projectDetailReducer, projectDetailStats}