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
        { query: queries.getAssignedManuscripts },
        { query: queries.getReviewedManuscripts },
      ],
    })
  }
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmission}>
      {({ values, handleChange, handleSubmit }) => {
        return (
          <DetailsCard {...rest}>
            <Title>Your Decision</Title>
            <WrapperSelect>
              <InputSelect
                label="Decision"
                name="decision"
                type="text"
                options={['publish', 'revision', 'reject']}
                required
                value={values.decision}
                onChange={handleChange}
              />
            </WrapperSelect>
            <InputTextarea
              label="Comment (optional)"
              name="comment"
              type="textarea"
              mt={1}
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
        )
      }}
    </Formik>
  )
}
const Title = styled.div`
  padding-bottom: 0.6em;
  font-size: 22px;
  font-weight: 600;
`
const WrapperSelect = styled.div`
  width: 30%;
`
export default compose(mutations)(EditorMakeDecisionCard)
