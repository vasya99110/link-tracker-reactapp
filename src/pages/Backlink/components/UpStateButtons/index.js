import React from 'react'
import classNames from 'classnames'

function UpStateButtons ({ render, className }) {
  const classes = classNames('button-list', className)
  return (
    <div className={classes}>
      {render()}
    </div>
    )
}

export default UpStateButtons