import React from 'react';
import LogoImage from './../../../components/LogoImage';

class Logo extends React.Component {
  render(){
    return (
        <div className="card-header pt-4 pb-4 text-center bg-primary">
          <a href="/">
            <span><LogoImage height="50"/></span>
          </a>
        </div>
    );
  }
}

export default Logo;