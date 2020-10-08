import React from 'react'
import Login from './Login'
import RecoverPass from './RecoverPassword'
import NoMatch from './NoMatch'

export default class extends React.Component {
  componentDidMount() {
    document.getElementsByTagName('body')[0].className = 'authentication-bg';
  }

  render() {
    let RenderComponent;

    switch(this.props.type){
      case "RecoverPassword":
        RenderComponent = RecoverPass;
        break;
      case "NoMatch":
        RenderComponent = NoMatch;
        break;
      default:
        RenderComponent = Login;
        break;
    }

    return <RenderComponent/>
  }
}