import React, { useState } from 'react'
import { compose } from 'recompose'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Formik, Field } from 'formik'
import {
  th,
  Row,
  Card,
  Button,
  InputForm,
  InputSelect,
  InputCheckBox,
  InputTextarea,
} from '../component-ui'
import { mutations, queries } from '../qraphqlClient'
import { submissionValidation, UploadFile } from '../component-submission'
import { useMutation } from 'react-apollo-hooks'
import { createManuscript } from '../qraphqlClient/mutations'

const useCreateManuscript = () => {
  const useCreateManuscriptMutation = useMutation(createManuscript)
  const onCreateManuscript = (input, file, history) => {
    if (file) {
      useCreateManuscriptMutation({
        variables: {
          input: { file, ...input },
        },
        refetchQueries: [
          {
            query: queries.getUserManuscripts,
          },
        ],
      }).then(r => history.push(`/userManuscripts`))
    }
  }
  return { onCreateManuscript }
}

const SubmissionForm = ({ updateManuscript, history, match, ...rest }) => {
  const { onCreateManuscript } = useCreateManuscript()

  const initialValues = {
    title: '',
    articleType: 'Research article',
    abstract: '',
    author: { comment: '' },
    public: false,
  }
  const [file, setFile] = useState(null)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={submissionValidation}
      onSubmit={input => onCreateManuscript(input, file, history)}
    >
      {({ values, handleChange, handleSubmit, errors }) => {
        return (
          console.log(values) || (
            <Root {...rest}>
              <Column />
              <Column>
                <Card
                  borderRadius={'5px 5px 5px 5px'}
                  mb={4}
                  pt={2.2}
                  pr={2}
                  pl={2}
                  pb={2}
                >
                  <Title>Manuscript Details</Title>
                  <Row>
                    <InputForm
                      mr={0.5}
                      label="Manuscript Title"
                      name="title"
                      type="text"
                      required
                      value={values.title}
                      onChange={handleChange}
                      error={errors.title}
                    />
                    <InputSelect
                      ml={0.5}
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
                    name="author.comment"
                    type="textarea"
                    heightinput={5}
                    width={5}
                    mt={1}
                    value={values.author.comment}
                    onChange={handleChange}
                    error={errors.userComment}
                  />

                  <Row mt={1.2}>
                    <UploadFile match={match} setFile={setFile} file={file} />
                  </Row>

                  <InputCheckBox
                    label="public"
                    name="public"
                    mt={1}
                    value={values.public}
                    onChange={handleChange}
                  />

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
              </Column>
              <Column />
            </Root>
          )
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
  overflow: scroll;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  font-family: 'Nunito';
  ${th.marginHelper};
  ${th.paddingHelper};
`
const Column = styled.div``
const Title = styled.div`
  padding-bottom: 30px;
  font-size: 1.7em;
  display: flex;
  justify-content: center;
  font-weight: 600;
  color: ${th.colorBlueLight};
`
