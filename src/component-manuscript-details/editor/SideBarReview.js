import React, { Fragment } from 'react'
import styled from 'styled-components'
import { th, Row, Button, InputTextarea } from '../../component-ui'
import { Formik } from 'formik'

const GiveComment = () => {
  const initialValues = { comment: '' }
  return (
    <Formik initialValues={initialValues} onSubmit={input => {}}>
      {({ values, handleChange, handleSubmit, errors }) => {
        return (
          <Fragment>
            <InputTextarea
              name="comment"
              type="textarea"
              mt={1}
              heightinput={8}
              value={values.comment}
              onChange={handleChange}
            />
            <Row mr={20} mb={0.5} justify="flex-end">
              <Button
                name="Add"
                type="submit"
                fontSize={0.9}
                color={th.colorBlueLight}
                iconName={'arrow-right'}
                onClick={handleSubmit}
              />
            </Row>
          </Fragment>
        )
      }}
    </Formik>
  )
}
const SideBarReview = ({ manuscript, currentPageNumber }) => {
  return (
    <Root>
      <Title>Comments</Title>
      <GiveComment />
    </Root>
  )
}
const Root = styled.div`
  overflow: scroll;
  padding: 10px 10px;
  background-color: white;
  height: 100vh;
  box-shadow: 0em 0em 0em 0.3px ${th.colorBlueGray};
`
const Title = styled.div``

export default SideBarReview
