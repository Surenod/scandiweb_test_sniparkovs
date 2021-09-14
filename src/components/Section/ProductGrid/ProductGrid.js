// Import react and react-dom
import React, { Component } from "react";
import { Link } from "react-router-dom";

//Import apollo
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

// Import css and svg
import "./ProductGrid.css";
import CartIcon from "../../svg/cart_white.svg";

export class ProductGrid extends Component {
  render() {
    const categoryName = this.props.categoryName;
    const PRODUCTGRID_QUERY = gql`
      query {
        category(input: { title: "${categoryName}" }) {
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
    return (
      <Query query={PRODUCTGRID_QUERY}>
        {({ data, loading }) => {
          if (loading) return null;
          return (
            <div className="category">
              <div className="category__name">{data.category.name}</div>
              <div className="category__productsgrid product">
                {/* Create HTML for every category*/}
                {data.category.products.map(
                  (
                    item,
                    indexContainer,
                    indexImg,
                    indexName,
                    indexPrice,
                    indexCartBtn
                  ) => {
                    const itemCount = 1;
                    return (
                      <div key={indexContainer} className="product__container">
                        {/* If inStock is false open product description without adding to cart */}
                        <Link
                          key={item.id}
                          to={`/${data.category.name}/${item.id}`}
                        >
                          <img
                            key={indexImg}
                            src={item.gallery[0]}
                            alt={item.name}
                            className={
                              item.inStock
                                ? "product__img"
                                : "product__img product__img-outofstock"
                            }
                          />
                          <div
                            key={indexName}
                            className={
                              item.inStock
                                ? "product__name"
                                : "product__name-outofstock"
                            }
                          >
                            {item.brand + " " + item.name}
                          </div>
                          <div
                            key={indexPrice}
                            className={
                              item.inStock
                                ? "product__price"
                                : "product__price-outofstock"
                            }
                          >
                            {/* Display currency according to currency state */}
                            {item.prices
                              .map((item) => {
                                return item.currency === this.props.currency
                                  ? item.amount
                                  : null;
                              })
                              .join("") +
                              " " +
                              this.props.currency}
                          </div>
                          {/* If inStock is false display product out of stock*/}
                          <div
                            className={
                              item.inStock ? "product__in" : "product__out"
                            }
                          >
                            OUT OF STOCK
                          </div>
                        </Link>
                        {/* Create add cart button */}
                        <div
                          key={indexCartBtn}
                          className={
                            item.inStock ? "product__btn" : "product__btn-disable"
                          }
                          onClick={() => {
                            this.props.addCart([item, itemCount]);
                          }}
                        >
                          <img src={CartIcon} alt="" width="24" />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProductGrid;
