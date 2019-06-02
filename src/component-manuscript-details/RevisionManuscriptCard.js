import React from 'react'
import { compose } from 'recompose'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import {
  th,
  Row,
  File,
  Button,
  InputForm,
  InputSelect,
  InputTextarea,
} from '../component-ui'
import { mutations, queries } from '../qraphqlClient'
import { submissionValidation, UploadFile } from '../component-submission'
import { get } from 'lodash'

const RevisionManuscriptCard = ({
  updateManuscript,
  history,
  match,
  manuscript,
  ...rest
}) => {
  const initialValues = {
    title: get(manuscript, 'title', ''),
    articleType: get(manuscript, 'articleType', ''),
    abstract: get(manuscript, 'abstract', ''),
    userComment: '',
    fileId: get(manuscript, 'fileId', null),
  }
  const currentFile = {
    filename: get(manuscript, 'filename'),
    size: get(manuscript, 'size'),
    url: get(manuscript, 'url'),
  }

  const manuscriptId = get(manuscript, '_id', null)
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
          console.log(values) || (
            <Root {...rest}>
              <Card pt={2} pr={2} pl={2} pb={2}>
                <Title>Revision</Title>
                <Row mt={1.5} justify={'flex-start'}>
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
                    pl={2}
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
                  <UploadFile
                    match={match}
                    currentFile={currentFile}
                    manuscriptId={manuscriptId}
                  />
                </Row>

                <Row mt={1} mr={20} mb={0.5} justify="flex-end">
                  <Button
                    underline
                    name="Revision"
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
        )
      }}
    </Formik>
  )
}

export default compose(
  mutations,
  withRouter,
)(RevisionManuscriptCard)

const Card = styled.div`
  background-color: white;
  font-family: 'Nunito';
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '0px')};
  height: fit-content;
  width: 40px;
  width: 50em;
  ${th.marginHelper}
  ${th.paddingHelper}
`
const Root = styled.div`
  display: flex;
  font-family: 'Nunito';
  justify-content: center;

  ${th.marginHelper};
  ${th.paddingHelper};
`
const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: ${th.colorBlueLight};
`
