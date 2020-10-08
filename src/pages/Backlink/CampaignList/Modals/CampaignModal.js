import React from 'react'
import { Modal } from 'reactstrap'

class CampaignModal extends React.Component {
  render () {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.switch}
             className={this.props.className}>
        {this.props.render(this.props.campaign_id)}
      </Modal>
    )
  }
}

export default CampaignModal