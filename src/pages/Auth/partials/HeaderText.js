import React from 'react';

class HeaderText extends React.Component {
  render(){
    return (
        <div className="text-center w-75 m-auto">
          <h4 className="text-dark-50 text-center mt-0 font-weight-bold">{this.props.title}</h4>
          <p className="text-muted mb-4">{this.props.text}</p>
        </div>
    );
  }
}

export default HeaderText;