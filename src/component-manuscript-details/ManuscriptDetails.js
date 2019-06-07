import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import {
  AuthorPeerReviewPage,
  EditorPeerReviewPage,
} from '../component-manuscript-details'

const ManuscriptDetails = ({ match, ...rest }) => {
  let [currentManuscript, setCurrentManuscript] = useState(0)
  let [totalManuscripts, setTotalManuscripts] = useState(0)

  const { submissionId } = match.params
  const { data } = useQuery(queries.getSubmission, {
    variables: { submissionId },
  })
  const submission = get(data, 'getSubmission', [])
  const manuscript = submission[currentManuscript - 1]
  const userRole = get(manuscript, 'userRole', null)

  useEffect(() => {
    if (!submission) return
    setTotalManuscripts(submission.length)
    setCurrentManuscript(submission.length)
  }, [submission])

  if (userRole === 'professor')
    return (
      <EditorPeerReviewPage
        submission={submission}
        totalManuscripts={totalManuscripts}
        currentManuscript={currentManuscript}
        setCurrentManuscript={setCurrentManuscript}
        pt={3}
        pb={3}
      />
    )
  else
    return (
      <AuthorPeerReviewPage
        submission={submission}
        totalManuscripts={totalManuscripts}
        currentManuscript={currentManuscript}
        setCurrentManuscript={setCurrentManuscript}
        pt={6}
        pb={3}
      />
    )
}

export default ManuscriptDetails
