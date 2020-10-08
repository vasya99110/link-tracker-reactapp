import React from 'react'

function ChangeArrow ({value}){
  if(value > 0) {
    return <i className="mdi mdi-arrow-up-thick"></i>
  } else if (value < 0) {
    return <i className="mdi mdi-arrow-down-thick"></i>
  }

  return '';
}

export default ChangeArrow