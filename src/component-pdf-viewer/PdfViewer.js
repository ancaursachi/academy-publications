import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-apollo-hooks'
import { get } from 'lodash'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import { queries } from '../qraphqlClient'
import { th, Loader } from '../component-ui'
import { PdfRender } from '../component-pdf-viewer'

const PdfViewer = ({ match, ...rest }) => {
  const { manuscriptId } = match.params

  const { data } = useQuery(queries.getManuscript, {
    variables: { _id: manuscriptId },
  })
  const manuscript = get(data, 'manuscript')

  return <PdfRender manuscript={manuscript} {...rest} />
}

export default PdfViewer
