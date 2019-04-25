import React from 'react'
import { compose } from 'recompose'
import styled from 'styled-components'
import {
  th,
  Row,
  Card,
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

const SubmissionForm = ({ createManuscript, history, ...rest }) => {
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
          <Root {...rest}>
            <Card height={35} width={40} mb={4} pt={2.2} pr={2} pl={2} pb={2}>
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
              <Row mt={2} mr={20} justify="flex-end">
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
