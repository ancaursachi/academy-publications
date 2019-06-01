import React from 'react'
import styled from 'styled-components'
import { th, Row, Button, InputSelect, InputTextarea } from '../component-ui'
import { Formik } from 'formik'
import { compose } from 'recompose'
import { mutations, queries } from '../qraphqlClient'

const ProfessorMakeDecisionCard = ({
  addProfessorDecision,
  manuscript,
  ...rest
}) => {
  const initialValues = {
    professorDecision: 'publish',
    professorComment: '',
  }
  const handleSubmission = input => {
    return addProfessorDecision({
      variables: {
        submissionId: manuscript.submissionId,
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
            <Card pt={2} pr={2} pl={2} pb={2}>
              <Title>Your Decision</Title>
              <InputSelect
                label="Decision"
                name="professorDecision"
                type="text"
                options={['publish', 'revision', 'reject']}
                widthInput={14}
                width={14}
                required
                value={values.professorDecision}
                onChange={handleChange}
              />
              <InputTextarea
                label="Comment"
                name="professorComment"
                type="textarea"
                width={14}
                heightinput={7}
                mt={1}
                required
                value={values.professorComment}
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
            </Card>
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
const Title = styled.div`
  padding-bottom: 0.6em;
  font-size: 22px;
  font-weight: 600;
`
export default compose(mutations)(ProfessorMakeDecisionCard)
