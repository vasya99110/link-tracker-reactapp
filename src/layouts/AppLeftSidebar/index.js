import React from 'react';
import {Link} from 'react-router-dom';
import LeftSideBar from './../../core/leftSidebar';
import ItemList from './components/ItemList';
import {Scrollbars} from 'react-custom-scrollbars';
import LogoImage from './../../components/LogoImage';

export default class extends React.Component {
  componentDidMount() {
    let body = document.getElementsByTagName('body')[0];
    body.setAttribute('data-leftbar-theme', 'dark');

    const leftSideBar = new LeftSideBar();
    leftSideBar.init();
  }

  render() {
    return (
        <div className="left-side-menu">
          <Scrollbars className="slimscroll-menu" id="left-side-menu-container">
            <Link to="/dashboard" className="logo text-center">
              <span className="logo-lg">
                <LogoImage alt="" height="45"
                           id="side-main-logo"/>
              </span>
              <span className="logo-sm">
                <LogoImage alt="" height="45"
                           id="side-main-logo"/>
              </span>
            </Link>
            <ItemList/>
          </Scrollbars>
        </div>

    );
  }
}