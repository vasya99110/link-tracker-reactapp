import React from 'react'
import PageLayout from '../Page/PageLayout'
import 'handsontable/dist/handsontable.full.css'
import { HotTable } from '@handsontable/react'
import AppBreadcrumb from '../../layouts/AppBreadcrumb'

function Sheet () {
  const [sheetData, setSheetdata] = React.useState([
    ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
    ['2016', 10, 11, 12, 13],
    ['2017', 20, 11, 14, 13],
    ['2018', 30, 15, 12, 13],
  ])

  return (
    <PageLayout pageTittle="Sheet">
      <AppBreadcrumb page_name="Sheet"/>
      <div id="hot-app">
        <HotTable licenseKey='non-commercial-and-evaluation' data={sheetData} colHeaders={true} rowHeaders={true}
                  width="600" height="300"/>
      </div>
    </PageLayout>
  )
}

export default Sheet