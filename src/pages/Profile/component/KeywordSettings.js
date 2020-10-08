import React from 'react'
import KeywordUpDownTrendForm from './Form/KeywordUpDownTrendForm'
import KeywordRankingDropForm from './Form/KeywordRankingDropForm'

function KeywordSettings () {
  return <div className='mt-2'>
    <KeywordUpDownTrendForm/>
    <hr/>
    <KeywordRankingDropForm/>
  </div>
}

export default KeywordSettings