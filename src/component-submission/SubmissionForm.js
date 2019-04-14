import React from 'react'
import styled from 'styled-components'
import {
  th,
  InputForm,
  InputSelect,
  Row,
  InputTextarea,
  InputFile,
} from '../component-ui'
import { Formik } from 'formik'
import { submissionValidation } from './validation'

const SubmissionForm = () => {
  const initialValues = {
    title: '',
    articleType: 'Research article',
    abstract: '',
    manuscriptFile: '',
  }

  return (
    <Formik initialValues={initialValues}>
      {({ values, handleChange, handleSubmit, errors }) => {
        return (
          console.log({ values }) || (
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
                value={values.abstract}
                onChange={handleChange}
                error={errors.abstract}
              />
            </Root>
          )
        )
      }}
    </Formik>
  )
}

export default SubmissionForm

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
