import React from 'react'
import { compose } from 'recompose'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import {
  th,
  Row,
  Card,
  Button,
  InputForm,
  InputSelect,
  InputTextarea,
} from '../component-ui'
import { mutations, queries } from '../qraphqlClient'
import { submissionValidation, UploadFile } from '../component-submission'

const SubmissionForm = ({ updateManuscript, history, match, ...rest }) => {
  const initialValues = {
    title: '',
    articleType: 'Research article',
    abstract: '',
    userComment: '',
    fileId: '',
  }
  const { manuscriptId } = match.params
  const handleSubmission = manuscript => {
    return updateManuscript({
      variables: {
        id: manuscriptId,
        input: manuscript,
      },
      refetchQueries: [
        {
          query: queries.getUserManuscripts,
        },
      ],
    })
      .then(() => {
        history.push('/userManuscripts')
      })
      .catch(error => alert(error))
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={submissionValidation}
      onSubmit={handleSubmission}
    >
      {({ values, handleChange, handleSubmit, errors }) => {
        return (
          <Root {...rest}>
            <Card
              borderRadius={'5px 5px 5px 5px'}
              width={40}
              mb={4}
              pt={2.2}
              pr={2}
              pl={2}
              pb={2}
            >
              <Title>Manuscript Details</Title>
              <Row mt={2}>
                <InputForm
                  label="Manuscript Title"
                  name="title"
                  type="text"
                  required
                  widthInput={21}
                  value={values.title}
                  onChange={handleChange}
                  error={errors.title}
                />
                <InputSelect
                  label="Manuscript Type"
                  name="articleType"
                  type="text"
                  options={['Research article', 'Review article']}
                  widthInput={14}
                  width={14}
                  required
                  value={values.articleType}
                  onChange={handleChange}
                  error={errors.articleType}
                />
              </Row>
              <InputTextarea
                label="Abstract"
                name="abstract"
                type="textarea"
                width={14}
                heightinput={7}
                mt={1}
                required
                value={values.abstract}
                onChange={handleChange}
                error={errors.abstract}
              />
              <InputTextarea
                label="Comment (optional)"
                name="userComment"
                type="textarea"
                heightinput={5}
                width={5}
                mt={1}
                value={values.userComment}
                onChange={handleChange}
                error={errors.userComment}
              />
              <Row mt={1.2}>
                <UploadFile match={match} />
              </Row>
              <Row mt={1} mr={20} mb={0.5} justify="flex-end">
                <Button
                  underline
                  name="Submit"
                  type="submit"
                  fontSize={1.2}
                  color={th.colorBlueLight}
                  iconName={'arrow-right'}
                  onClick={handleSubmit}
                />
              </Row>
            </Card>
          </Root>
        )
      }}
    </Formik>
  )
}

export default compose(
  mutations,
  withRouter,
)(SubmissionForm)

const Root = styled.div`
  display: flex;
  justify-content: center;
  ${th.marginHelper};
  ${th.paddingHelper};
`
const Title = styled.div`
  font-size: 1.7em;
  display: flex;
  justify-content: center;
  font-weight: 600;
  color: ${th.colorBlueLight};
`
