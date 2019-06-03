import React, { Fragment } from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { th, File, Row, StatusTag, DetailsCard } from '../component-ui'

const ManuscriptDetailsCard = ({ manuscript, ...rest }) => {
  const title = get(manuscript, 'title', '')
  const status = get(manuscript, 'status', '')
  const articleType = get(manuscript, 'articleType', '')
  const version = get(manuscript, 'version', '')
  const abstract = get(manuscript, 'abstract', '')
  const professorName = get(manuscript, 'professorName', null)
  const file = get(manuscript, 'file', null)
  const authorComment = get(manuscript, 'author.comment', null)

  return (
    <Root {...rest}>
      <DetailsCard pt={2} pr={2} pl={2} pb={2}>
        <Row>
          <Title>{title}</Title>
          <StatusTag status={status} />
        </Row>

        <Row>
          <ArticleType>{articleType}</ArticleType>
          <VersionTag>Version {version}</VersionTag>
        </Row>

        {professorName && (
          <Fragment>
            <Label>Professor</Label>
            <Abstract>{professorName}</Abstract>
          </Fragment>
        )}

        <Label>Abstract</Label>
        <Abstract>{abstract}</Abstract>

        <Label>File</Label>
        <File file={file} mb={0.8} />

        {authorComment && (
          <Fragment>
            <Label>Author Comment</Label>
            <Abstract>{authorComment}</Abstract>
          </Fragment>
        )}
      </DetailsCard>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  font-family: 'Nunito';
  justify-content: center;

  ${th.marginHelper};
  ${th.paddingHelper};
`
const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: ${th.colorBrick};
`
const ArticleType = styled.div`
  padding: 7px 0px;
  font-size: 16px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  color: ${th.colorGrey};
  text-overflow: ellipsis;
`
const VersionTag = styled.div`
  color: ${th.colorGrey};
  white-space: nowrap;
`
const Abstract = styled.div`
  font-size: 16px;
  padding: 0px 0px 16px;
`
const Label = styled.div`
  font-size: 17px;
  font-weight: 600;
  padding: 16px 0px 0px;
`

export default ManuscriptDetailsCard
