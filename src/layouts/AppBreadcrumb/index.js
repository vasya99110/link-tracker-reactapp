import React from 'react'

export default function AppBreadcrumb ({ page_name, children }) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box">
          <div className="page-title-right">
            {children}
          </div>
          <h4 className="page-title">{page_name}</h4>
        </div>
      </div>
    </div>
  )
}