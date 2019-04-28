module.exports = function playground(props) {
  return {
    settings: {
      'editor.theme': 'dark',
    },
    headers: {
      Authorization:
        'Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUuYW5jYWlvYW5hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHpVWkd6STZJLkY0VXpNSWRCZ0x5Lk9Sazdtc2ZScVRhVlZBQ0tlclphdHE2a2lVUXBrNTdtIiwiaWF0IjoxNTU2NDQyMTI1LCJleHAiOjE1NTY1MzIxMjV9.9tZLCz7dws0Hf2A0KvYCHHJTSyShWpKB4_s3BZqOirg"',
    },
    tabs: [
      {
        endpoint: 'http://localhost:1000/graphql',
      },
    ],
  }
}
