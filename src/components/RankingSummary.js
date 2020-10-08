import React from 'react'
import { Table } from 'react-bootstrap'

function RankingSummary ({data}) {
  const showData = React.useCallback(({ dataList }) => {
    return dataList.map((item, key) => {
      const createdDate = item.created_at ? item.created_at: item.created_on
      return <tr key={key}>
        <td>Position: {item.recent_ranking}</td>
        <td className='text-right'>{createdDate}</td>
      </tr>
    })
  }, [data.data])

  return <>
    <h5>Previous Results</h5>
    <Table responsive size='sm' className='table-borderless'>
      <tbody>
      {showData({ dataList: data.data })}
      </tbody>
    </Table>
  </>
}

export default RankingSummary