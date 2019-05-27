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
        abstract
        professorId
        articleType
        manuscriptFile
        professorName
        professorComment
        userComment
        submissionId
      }
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
        professorId
        articleType
        manuscriptFile
        professorName
      }
    }
  `,
  getUnassignedManuscripts: gql`
    query unassignedManuscripts {
      unassignedManuscripts {
        _id
        title
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
        created
        abstract
        professorName
        articleType
        professorComment
        userComment
        submissionId
      }
    }
  `,
}

export default queries
