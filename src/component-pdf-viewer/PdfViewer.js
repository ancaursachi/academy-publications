import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { get } from 'lodash'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import { queries } from '../qraphqlClient'
import { PdfRender } from '../component-pdf-viewer'

const PdfViewer = ({ match, ...rest }) => {
  const { manuscriptId } = match.params

  const { data } = useQuery(queries.getManuscript, {
    variables: { _id: manuscriptId },
  })
  const manuscript = get(data, 'manuscript')

  let [totalPages, setTotalPages] = useState(0)
  let [currentPageNumber, setCurrentPageNumber] = useState(1)

  return (
    <PdfRender
      manuscript={manuscript}
      totalPages={totalPages}
      setTotalPages={setTotalPages}
      currentPageNumber={currentPageNumber}
      setCurrentPageNumber={setCurrentPageNumber}
      {...rest}
    />
  )
}

export default PdfViewer
