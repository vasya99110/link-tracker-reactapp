import React from 'react'
import DeleteKeywordButton from './Button/DeleteKeywordButton'

// import KeywordGraphButton from './Button/KeywordGraphButton'

function ActionColumn ({keywordId}) {
  return (
    <div className='button-list action-columns'>
      {/*<KeywordGraphButton keywordId={keywordId}/>*/}
      <DeleteKeywordButton keywordId={keywordId}/>
    </div>
  )
}

export default ActionColumn