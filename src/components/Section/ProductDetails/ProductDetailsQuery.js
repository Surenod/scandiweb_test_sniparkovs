import { gql } from "@apollo/client";

export const PRODUCTDETAILS_QUERY = gql`
  query productid($productID: String!){
    product(id: $productID){
      id
      name
      inStock
      gallery
      description
      category
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
      prices{
        currency
        amount
      }
      brand
    }
  }
  `;

export default PRODUCTDETAILS_QUERY