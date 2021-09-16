import { gql } from "@apollo/client";

export const PRODUCTGRID_QUERY = gql`
  query category($categoryName: String!){
    category(input: { title: $categoryName }) {
      name
      products {
        gallery
        id
        name
        attributes{
          id
          name
          type
          items{
            displayValue
            value
            id
          }
        }
        prices {
          currency
          amount
        }
        inStock
        brand
      }
    }
  }
  `;

export default PRODUCTGRID_QUERY