import React from 'react'
class FormErrorLabel extends React.PureComponent{
  render() {
    return <div className="invalid-feedback" {...this.props} style={{'display' : 'inherit'}}>{this.props.children}</div>
  }
}

export default FormErrorLabel