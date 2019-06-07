import React, { useState } from 'react'
import { Page, Document } from 'react-pdf'
import styled from 'styled-components'
import 'react-pdf/dist/Page/AnnotationLayer.css'
// import { Document } from 'react-pdf/dist/entry.webpack'

const PdfViewer = () => {
  let [totalPages, setTotalPages] = useState(0)
  let [pageNumber, setPageNumber] = useState(1)
  let [file, setFile] = useState(null)
  const goToPrevPage = () => pageNumber > 1 && setPageNumber(pageNumber - 1)
  const goToNextPage = () =>
    pageNumber < totalPages && setPageNumber(pageNumber + 1)
  return (
    <div>
      <br />
      <h1>PDF Preview</h1>
      <form>
        <input type="file" onChange={event => setFile(event.target.files[0])} />
      </form>
      <RenderDocument>
        {file ? (
          <p>
            Page {pageNumber} of {totalPages}
          </p>
        ) : null}
        <Document
          file={file}
          onLoadSuccess={numPages => setTotalPages(numPages._pdfInfo.numPages)}
          noData={<h4>Please select a file</h4>}
        >
          <Page pageNumber={pageNumber} width={760} />
        </Document>
      </RenderDocument>
      {file ? (
        <nav>
          <button onClick={goToPrevPage}>Prev</button>
          <button onClick={goToNextPage}>Next</button>
        </nav>
      ) : null}
    </div>
  )
}
const RenderDocument = styled.div`
  width: 40%;
`

export default PdfViewer
