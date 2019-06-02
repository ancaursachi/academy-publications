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
        created
        status
        version
        abstract
        articleType
        submissionId
        editor {
          id
          name
          decision
          comment
        }
      }
    }
  `,
  getSubmission: gql`
    query getSubmission($submissionId: ID!) {
      getSubmission(submissionId: $submissionId) {
        _id
        title
        created
        status
        version
        userRole
        abstract
        articleType
        submissionId
        author {
          id
          comment
        }
        editor {
          id
          name
          decision
          comment
        }
        file {
          name
          size
          providerKey
        }
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
        status
        version
        created
        abstract
        submissionId
        articleType
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
        submissionId
        editor {
          id
          name
        }
      }
    }
  `,
}

export default queries
