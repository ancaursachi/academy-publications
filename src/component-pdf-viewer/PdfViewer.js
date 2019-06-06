import React from 'react'
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
class PdfViewer extends React.Component {
  state = {
    file: null,
    numPages: 0,
    pageNumber: 1,
  }

  onFileChange = event => {
    this.setState({
      file: event.target.files[0],
    })
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages })
  }

  nextPage = () => {
    const currentPageNumber = this.state.pageNumber
    let nextPageNumber

    if (currentPageNumber + 1 > this.state.numPages) {
      nextPageNumber = 1
    } else {
      nextPageNumber = currentPageNumber + 1
    }

    this.setState({
      pageNumber: nextPageNumber,
    })
  }

  render() {
    const { pageNumber, numPages } = this.state

    return (
      <div>
        <br />
        <h1>PDF Preview</h1>
        <form>
          <input type="file" onChange={this.onFileChange} />
        </form>
        <div >
          <div onClick={this.nextPage}>
            <Document
              file={this.state.file}
              onLoadSuccess={this.onDocumentLoadSuccess}
              noData={<h4>Please select a file</h4>}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            {console.log(this.state)}
            {this.state.file ? (
              <p>
                Page {pageNumber} of {numPages}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default PdfViewer
