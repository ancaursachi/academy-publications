import React from 'react'
import { Page, Document } from 'react-pdf'
import styled from 'styled-components'
import { useQuery } from 'react-apollo-hooks'
import { get } from 'lodash'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import { queries } from '../qraphqlClient'
import { th, Loader, Button } from '../component-ui'

const LoaderComponent = ({ ...rest }) => (
  <RootLoader>
    <Loader />
  </RootLoader>
)

const PdfRender = ({
  manuscript,
  currentPageNumber,
  setCurrentPageNumber,
  totalPages,
  setTotalPages,
  ...rest
}) => {
  const providerKey = get(manuscript, 'file.providerKey')
  const { data: signedUrl, loading } = useQuery(queries.getSignedUrl, {
    variables: { providerKey },
  })
  const url = get(signedUrl, 'signedUrl')

  const goToPrevPage = () =>
    currentPageNumber > 1 && setCurrentPageNumber(currentPageNumber - 1)
  const goToNextPage = () =>
    currentPageNumber < totalPages &&
    setCurrentPageNumber(currentPageNumber + 1)

  if (loading) {
    return (
      <Root {...rest}>
        <LoaderComponent />
      </Root>
    )
  }
  return (
    <Root {...rest}>
      <RenderDocument>
        {totalPages !== 0 && (
          <ChangePage>
            {currentPageNumber > 1 && (
              <Button
                mt={1}
                iconLeft
                underline
                name="Prev"
                color={th.colorGrey}
                iconName={'arrow-left'}
                onClick={goToPrevPage}
              />
            )}
            <DisplayCurrentPage>
              Page {currentPageNumber} of {totalPages}
            </DisplayCurrentPage>
            {currentPageNumber < totalPages && (
              <Button
                mt={1}
                iconRight
                underline
                name="Next"
                color={th.colorGrey}
                iconName={'arrow-right'}
                onClick={goToNextPage}
              />
            )}
          </ChangePage>
        )}
        {url && (
          <Document
            file={{
              url: url,
              httpHeaders: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-CustomHeader': '40359820958024350238508234',
              },
              withCredentials: true,
            }}
            onLoadSuccess={numPages =>
              setTotalPages(numPages._pdfInfo.numPages)
            }
            noData={<h4>No file yet</h4>}
            loading={<LoaderComponent />}
          >
            <Page pageNumber={currentPageNumber} width={700} />
          </Document>
        )}

        {totalPages !== 0 && (
          <ChangePage>
            {currentPageNumber > 1 && (
              <Button
                mt={1}
                iconLeft
                underline
                name="Prev"
                color={th.colorGrey}
                iconName={'arrow-left'}
                onClick={goToPrevPage}
              />
            )}
            <DisplayCurrentPage>
              Page {currentPageNumber} of {totalPages}
            </DisplayCurrentPage>
            {currentPageNumber < totalPages && (
              <Button
                mt={1}
                iconRight
                underline
                name="Next"
                color={th.colorGrey}
                iconName={'arrow-right'}
                onClick={goToNextPage}
              />
            )}
          </ChangePage>
        )}
      </RenderDocument>
    </Root>
  )
}
const RootLoader = styled.div`
  overflow: scroll;
  display: flex;
  justify-content: center;
  height: 600px;
  padding-top: 3em;
  font-family: 'Nunito';
`
const Root = styled.div`
  overflow: scroll;
  display: flex;
  justify-content: center;
  font-family: 'Nunito';
  ${th.marginHelper};
  ${th.paddingHelper};
`
const RenderDocument = styled.div``
const ChangePage = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5em;
  font-family: 'Nunito';
`
const DisplayCurrentPage = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: 800;
  font-family: 'Nunito';
  margin: 16px 11px 0px;
  background-color: ${th.colorWhite};
  padding: 2px 3px;
  border-radius: 4px;
  border: 1px solid ${th.colorBlueLight};
  font-size: 15px;
  color: ${th.colorBlueLight};
  white-space: nowrap;
`
export default PdfRender
