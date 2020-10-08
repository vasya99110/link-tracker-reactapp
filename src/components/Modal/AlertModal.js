import React from 'react'

function AlertModal (props) {
  const modalType = props.modal_type
  const modalContent = props.children

  return (
    <div id="success-alert-modal" className="modal fade" tabIndex="-1"
         role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-sm">
        <div className="modal-content modal-filled bg-success">
          <div className="modal-body p-4">
            <div className="text-center">
              <i className="dripicons-checkmark h1"></i>
              <h4 className="mt-2">Well Done!</h4>
              <p className="mt-3">Cras mattis consectetur purus sit amet
                fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                eget quam.</p>
              <button type="button" className="btn btn-light my-2"
                      data-dismiss="modal">Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertModal