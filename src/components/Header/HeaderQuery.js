import { gql } from "@apollo/client";

const HEADER_QUERY = gql`
  query {
    categories {
      name
    }
    category {
      name
    }
    currencies
  }
`;

export default HEADER_QUERY