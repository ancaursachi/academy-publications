import React, { Fragment } from 'react'
import styled from 'styled-components'
import { th, Row, Button, InputTextarea } from '../../component-ui'
import { Formik } from 'formik'
import { compose } from 'recompose'
import { mutations, queries } from '../../qraphqlClient'

const GiveComment = ({ createComment, manuscript, currentPageNumber }) => {
  const handleCreateComment = values => {
    return createComment({
      variables: {
        input: {
          manuscriptId: manuscript._id,
          page: currentPageNumber,
          editorComment: values.editorComment,
        },
      },
      refetchQueries: [
        {
          query: queries.getSubmission,
          variables: { submissionId: manuscript.submissionId },
        },
      ],
    })
  }
  const initialValues = { editorComment: '' }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => handleCreateComment(values)}
    >
      {({ values, handleChange, handleSubmit, errors, handleReset }) => {
        return (
          <Fragment>
            <InputTextarea
              name="editorComment"
              type="textarea"
              mt={1}
              heightinput={8}
              value={values.editorComment}
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
const DisplayComment = () => {
  return <Card>hei</Card>
}
const SideBarReview = ({ createComment, manuscript, currentPageNumber }) => {
  return (
    <Root>
      <Title>Comments</Title>
      <GiveComment
        manuscript={manuscript}
        createComment={createComment}
        currentPageNumber={currentPageNumber}
      />
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

const Card = styled.div``

export default compose(mutations)(SideBarReview)
