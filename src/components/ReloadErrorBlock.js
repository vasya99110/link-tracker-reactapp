import React from 'react'

function ReloadErrorBlock ({error, reload}) {
  return <div className="alert alert-danger">
    <p>{error.toString()}</p>
    <button onClick={reload}>try again</button>
  </div>
}

export default ReloadErrorBlock