import React from 'react'

export default function withTableRow (WrappedComponent, objectId, cellLength) {
  return <tr>
    <td colSpan={cellLength}>
      <WrappedComponent labId={objectId}/>
    </td>
  </tr>
}