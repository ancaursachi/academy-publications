import React from 'react'
import styled from 'styled-components'
import {
  th,
  Row,
  Button,
  InputSelect,
  InputTextarea,
  DetailsCard,
} from '../component-ui'
import { Formik } from 'formik'
import { compose } from 'recompose'
import { mutations, queries } from '../qraphqlClient'

const EditorMakeDecisionCard = ({
  addProfessorDecision,
  manuscript,
  ...rest
}) => {
  const initialValues = {
    decision: 'publish',
    comment: '',
  }
  const handleSubmission = input => {
    return addProfessorDecision({
      variables: {
        manuscriptId: manuscript._id,
        input,
      },
      refetchQueries: [
        {
          query: queries.getSubmission,
          variables: { submissionId: manuscript.submissionId },
        },
      ],
    })
  }
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmission}>
      {({ values, handleChange, handleSubmit }) => {
        return (
          <Root {...rest}>
            <DetailsCard>
              <Title>Your Decision</Title>
              <InputSelect
                label="Decision"
                name="decision"
                type="text"
                options={['publish', 'revision', 'reject']}
                widthInput={14}
                width={14}
                required
                value={values.decision}
                onChange={handleChange}
              />
              <InputTextarea
                label="Comment"
                name="comment"
                type="textarea"
                width={14}
                heightinput={7}
                mt={1}
                required
                value={values.comment}
                onChange={handleChange}
              />

              <Row mt={1} mr={20} mb={0.5} justify="flex-end">
                <Button
                  underline
                  name="Make Decision"
                  type="submit"
                  fontSize={1.2}
                  color={th.colorBlueLight}
                  iconName={'arrow-right'}
                  onClick={handleSubmit}
                />
              </Row>
            </DetailsCard>
          </Root>
        )
      }}
    </Formik>
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
  padding-bottom: 0.6em;
  font-size: 22px;
  font-weight: 600;
`
export default compose(mutations)(EditorMakeDecisionCard)
