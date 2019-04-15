import React from 'react'
import { compose } from 'recompose'
import styled from 'styled-components'
import {
  th,
  Row,
  Button,
  InputFile,
  InputForm,
  InputSelect,
  InputTextarea,
} from '../component-ui'
import { Formik } from 'formik'
import { mutations } from '../qraphqlClient'
import { withRouter } from 'react-router-dom'
import { submissionValidation } from '../component-submission'

const SubmissionForm = ({ createManuscript, history }) => {
  const initialValues = {
    title: '',
    articleType: 'Research article',
    abstract: '',
    manuscriptFile: '',
  }
  const handleSubmission = manuscript => {
    return createManuscript({
      variables: {
        input: manuscript,
      },
    })
      .then(() => {
        history.push('/dashboard')
        window.location.reload()
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
          <Root>
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
              widthInput={14}
              width={14}
              mt={1}
              required
              value={values.abstract}
              onChange={handleChange}
              error={errors.abstract}
            />
            <InputFile
              label="Manuscript File"
              name="manuscriptFile"
              widthInput={14}
              width={14}
              mt={1}
              required
              value={values.manuscriptFile}
              onChange={handleChange}
              error={errors.manuscriptFile}
            />
            <Row mt={1} mr={20} justify="flex-end">
              <Button
                underline
                name="Submit"
                type="submit"
                fontSize={1.2}
                color={th.colorBrick}
                iconName={'arrow-right'}
                onClick={handleSubmit}
              />
            </Row>
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
  margin: 2em 2em;
  color: ${th.colorDark};
`

const Title = styled.div`
  font-size: 1.7em;
  display: flex;
  justify-content: center;
  font-weight: 600;
  color: ${th.colorBrick};
`
