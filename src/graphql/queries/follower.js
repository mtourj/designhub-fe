//needs testing against data

import gql from 'graphql-tags';

const follower = gql`
  query Followers($id: ID!) {
    follower(id: $id) {
      id
      followedId
      followingId
      created_at
    }
  }
`;
export default follower;
