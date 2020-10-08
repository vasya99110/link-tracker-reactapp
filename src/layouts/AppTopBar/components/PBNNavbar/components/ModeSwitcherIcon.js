import React from 'react'
import styles from './ModeSwitcherIcon.module.css'

function ModeSwitcherIcon ({className}) {
  return <span className={`${styles.toggle_icon} ${styles[className]}`}></span>
}

export default ModeSwitcherIcon