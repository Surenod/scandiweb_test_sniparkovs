import { gql } from "@apollo/client";

const SECTION_QUERY = gql`
  query {
    categories {
      name
      products {
        id
      }
    }
    category {
      name
      products {
        id
      }
    }
  }
`;

export default SECTION_QUERY