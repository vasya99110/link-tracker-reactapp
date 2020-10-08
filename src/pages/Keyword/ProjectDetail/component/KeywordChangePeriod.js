import React from 'react'
import classNames from 'classnames'

function KeywordChangePeriod ({ updateRankPeriod, rankPeriod }) {
  const defaultClasses = ['btn', 'btn-outline-info']
  return <div className='text-right'>
    <h5>Last Ranking Change Days</h5>
    <div className='button-list'>
      <button
        className={classNames(defaultClasses, { 'active': rankPeriod === 1 })}
        onClick={() => updateRankPeriod(1)}>2
      </button>
      <button
        className={classNames(defaultClasses, { 'active': rankPeriod === 7 })}
        onClick={() => updateRankPeriod(7)}>7
      </button>
      <button
        className={classNames(defaultClasses, { 'active': rankPeriod === 30 })}
        onClick={() => updateRankPeriod(30)}>30
      </button>
      <button
        className={classNames(defaultClasses, { 'active': rankPeriod === 60 })}
        onClick={() => updateRankPeriod(60)}>60
      </button>
      <button
        className={classNames(defaultClasses, { 'active': rankPeriod === 90 })}
        onClick={() => updateRankPeriod(90)}>90
      </button>
    </div>
  </div>
}

export default KeywordChangePeriod