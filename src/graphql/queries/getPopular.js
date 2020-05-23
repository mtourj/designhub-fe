//needs testing against data

import gql from 'graphql-tags';

const getPopular = gql`
  query Explore {
    getpopular {
      recent {
        id
        userId
        privateProjects
        name
        description
        figma
        invision
        created_at
        updated_at
        mainImg
      }
      following {
        id
        userId
        privateProjects
        name
        description
        figma
        invision
        created_at
        updated_at
        mainImg
      }
      popular {
        id
        userId
        privateProjects
        name
        description
        figma
        invision
        created_at
        updated_at
        mainImg
      }
    }
  }
`;

export default getPopular;
