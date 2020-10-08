import React from 'react'
import Hashids from 'hashids'
import BacklinkTooltip
  from '../pages/Backlink/BacklinkDetail/components/BacklinkTable/BacklinkTooltip'

function InTopTooltip ({value}) {
  if(value === 0 || value === null) {
    const hashids = new Hashids(),
      urlId = hashids.encode(value)
    return <BacklinkTooltip text_content tooltip_id={urlId} short_text={'-'}
                            full_text={'Not in top 100'}/>
  } else {
    return value
  }
}

export default InTopTooltip