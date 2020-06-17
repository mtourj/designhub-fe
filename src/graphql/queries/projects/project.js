import gql from 'graphql-tag';

const GET_PROJECT_BY_ID_QUERY = gql`
  query Project($id: ID!) {
    project(id: $id) {
      id
      userId
      private
      name
      description
      figma
      invision
      mainImg
      created_at
      updated_at
      photos {
        id
        projectId
        url
        description
        title
        created_at
      }
      comments {
        id
        username
        userId
        projectId
        text
        created_at
        user {
          id
          username
        }
      }
    }
  }
`;
export default GET_PROJECT_BY_ID_QUERY;
