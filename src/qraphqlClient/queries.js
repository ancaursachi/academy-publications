import gql from 'graphql-tag'

const queries = {
  getLoggedInUser: gql`
    query loggedInUser {
      loggedInUser {
        _id
        firstName
        lastName
        email
        role
        country
        city
        university
        specialization
      }
    }
  `,
  getUsers: gql`
    query users {
      users {
        _id
        firstName
        lastName
        email
        country
        city
        university
        specialization
        role
      }
    }
  `,
  getManuscripts: gql`
    query manuscripts {
      manuscripts {
        _id
        title
        userId
        created
        status
        version
        abstract
        professorId
        articleType
        professorName
        professorComment
        userComment
        submissionId
      }
    }
  `,
  getSubmission: gql`
    query getSubmission($submissionId: ID!) {
      getSubmission(submissionId: $submissionId) {
        _id
        filename
        size
        url
        title
        userId
        created
        status
        version
        userRole
        abstract
        professorId
        articleType
        professorName
        professorDecision
        professorComment
        userComment
        submissionId
      }
    }
  `,
  getSignedUrl: gql`
    query signedUrl($providerKey: String) {
      signedUrl(providerKey: $providerKey)
    }
  `,
  getUserManuscripts: gql`
    query userManuscripts {
      userManuscripts {
        _id
        title
        userId
        status
        version
        created
        abstract
        submissionId
        professorId
        articleType
        professorName
      }
    }
  `,
  getUnassignedManuscripts: gql`
    query unassignedManuscripts {
      unassignedManuscripts {
        _id
        title
        status
        version
        created
        abstract
        articleType
      }
    }
  `,
  getAssignedManuscripts: gql`
    query assignedManuscripts {
      assignedManuscripts {
        _id
        title
        status
        version
        created
        abstract
        articleType
        userComment
        submissionId
        professorName
        professorComment
      }
    }
  `,
}

export default queries
