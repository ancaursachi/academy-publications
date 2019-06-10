import React, { Fragment } from 'react'
import styled from 'styled-components'
import { th, Row, Button, InputTextarea } from '../../component-ui'
import { Formik } from 'formik'
import { compose } from 'recompose'
import { get, sortBy } from 'lodash'
import { mutations, queries } from '../../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'

const GiveComment = ({ createComment, manuscript, currentPageNumber }) => {
  const handleCreateComment = values => {
    return createComment({
      variables: {
        input: {
          manuscriptId: manuscript._id,
          page: currentPageNumber,
          text: values.text,
        },
      },
      refetchQueries: [
        {
          query: queries.getSubmission,
          variables: { submissionId: manuscript.submissionId },
        },
        {
          query: queries.getManuscriptComments,
          variables: { manuscriptId: manuscript._id },
        },
        {
          query: queries.getEditorCommentsPerPage,
          variables: { manuscriptId: manuscript._id, page: currentPageNumber },
        },
      ],
    })
  }
  const initialValues = { text: '' }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => handleCreateComment(values)}
    >
      {({ values, handleChange, handleSubmit, errors, handleReset }) => {
        return (
          <Fragment>
            <InputTextarea
              name="text"
              type="textarea"
              mt={1}
              heightinput={8}
              value={values.text}
              onChange={handleChange}
            />
            <Row mr={20} mb={0.5} justify="flex-end">
              <Button
                name="Add"
                type="submit"
                fontSize={0.9}
                color={th.colorBlueLight}
                iconName={'arrow-right'}
                onClick={() => {
                  handleSubmit()
                  setTimeout(() => {
                    handleReset()
                  })
                }}
              />
            </Row>
          </Fragment>
        )
      }}
    </Formik>
  )
}
const DisplayComment = ({ comment }) => {
  const editorComment = comment.text
  return <Card>{editorComment}</Card>
}
const SideBarReview = ({ createComment, manuscript, currentPageNumber }) => {
  const { data } = useQuery(queries.getEditorCommentsPerPage, {
    variables: { manuscriptId: manuscript._id, page: currentPageNumber },
  })
  const pageComments = get(data, 'editorCommentsPerPage')
  const sortedComents = sortBy(pageComments, comments => -comments.created)
  return (
    <Root>
      <Title>Comments</Title>
      <GiveComment
        manuscript={manuscript}
        createComment={createComment}
        currentPageNumber={currentPageNumber}
      />
      {sortedComents &&
        sortedComents.map(comment => (
          <DisplayComment key={comment._id} comment={comment} />
        ))}
    </Root>
  )
}
const Root = styled.div`
  overflow: scroll;
  padding: 10px 10px;
  background-color: white;
  height: calc(100vh - 90px);
  box-shadow: 0em 0em 0em 0.3px ${th.colorBlueGray};
`
const Title = styled.div``

const Card = styled.div`
  background-color: whitesmoke;
  border-radius: 4px;
  margin: 10px 0px;
  padding: 0.5em 0.5em;
  border: 1px solid ${th.colorCremLight};
`

export default compose(mutations)(SideBarReview)
