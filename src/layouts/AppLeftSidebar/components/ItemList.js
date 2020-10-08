import { Link } from 'react-router-dom'
import React from 'react'
import { useUser } from '../../../context/user-context'

function ItemList() {
  const user = useUser()
  return <>
    <ul className="metismenu side-nav">
      {user.role === 'admin' ? <><li className="side-nav-title side-nav-item mt-1">Admin</li>
        <li className="side-nav-item">
          <Link to="/users" className="side-nav-link">
            <i className="dripicons-user"></i>
            <span> Users </span>
          </Link>
        </li></> : ''}

        <li className="side-nav-title side-nav-item">Navigation</li>
        <li className="side-nav-item">
          <Link to="/dashboard" className="side-nav-link">
            <i className="dripicons-meter"></i>
            <span> Dashboards </span>
          </Link>
        </li>
        {/*<li className="side-nav-item">
          <Link to="/setting" className="side-nav-link">
            <i className="dripicons-gear"></i>
            <span>Settings</span>
          </Link>
        </li>*/}
        <li className="side-nav-item">
          <Link to="/backlinks" className="side-nav-link">
            <i className="dripicons-link"></i>
            <span>Backlinks</span>
          </Link>
        </li>
        <li className="side-nav-item">
          <Link to="/keywords" className="side-nav-link">
            <i className="dripicons-graph-bar"></i>
            <span>Keywords</span>
          </Link>
        </li>
      <li className="side-nav-item">
          <Link to="/labs" className="side-nav-link">
            <i className="dripicons-experiment"></i>
            <span>Labs</span>
          </Link>
        </li>
      {/*<li className="side-nav-item">
          <Link to="/sheets" className="side-nav-link">
            <i className="dripicons-document"></i>
            <span>Sheets</span>
          </Link>
        </li>
        <li className="side-nav-item">
          <Link to="/index" className="side-nav-link">
            <i className="dripicons-preview"></i>
            <span>Index</span>
          </Link>
        </li>
        <li className="side-nav-item">
          <Link to="/report" className="side-nav-link">
            <i className="dripicons-graph-pie"></i>
            <span>Report</span>
          </Link>
        </li>*/}
        <li className="side-nav-item">
          <a href="https://linktrackerpro.ladesk.com/" target='_blank'
             rel='noopener noreferrer' className="side-nav-link">
            <i className="dripicons-briefcase"></i>
            <span>Support</span>
          </a>
        </li>
      </ul>
  </>
}

export default ItemList;