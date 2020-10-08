import React from 'react';
import logo from './../assets/images/logo.png';
function LogoImage(props) {
  return (
      <img src={logo} alt={props.alt} height={props.height}
           id={props.id} className={props.className}/>
  );
}
export default LogoImage;
