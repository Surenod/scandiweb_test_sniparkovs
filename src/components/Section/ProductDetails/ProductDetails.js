// Import react and react-dom
import React, { Component } from "react";

//Import apollo
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

// Import components
import ProductGallery from "./ProductGallery/ProductGallery.js";

// Import css and svg
import "./ProductDetails.css";

export class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.setValue = this.setValue.bind(this);
  }

  // Change state for product attributes
  setValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const productsID = this.props.match.params.id;
    const PRODUCTDETAILS_QUERY = gql`
    query{
      product(id:"${productsID}"){
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
    return (
      <Query query={PRODUCTDETAILS_QUERY}>
        {({ data, loading }) => {
          if (loading) return null;
          const product = data.product;
          const productCount = 1;
          return (
            <>
              <div className="product-details">
                {/* Create product gallery component */}
                <ProductGallery product={product} />
                <div className="product-details-container">
                  <div className="product-details__brand">{product.brand}</div>
                  <div className="product-details__name">{product.name}</div>
                  <form className="product-details__size">
                    {/* Create inputs for product attributes */}
                    {product.attributes.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="product-details-attribute"
                        >
                          <p className="product-details-attribute__name">
                            {item.name}:
                          </p>
                          <ul className="product-details-attribute__btn-list">
                            {item.items.map((attribute) => {
                              return (
                                <li key={attribute.id}>
                                  <label>
                                    <input
                                      type="radio"
                                      value={attribute.value}
                                      name={item.name}
                                      onChange={this.setValue}
                                    />
                                    <span
                                      className={
                                        item.type === "swatch"
                                          ? product.inStock
                                            ? "product-details-attribute__btn--color"
                                            : "product-details-attribute__btn--color out-of-stock"
                                          : product.inStock
                                          ? "product-details-attribute__btn"
                                          : "product-details-attribute__btn out-of-stock"
                                      }
                                      style={{ background: attribute.value }}
                                    >
                                      <span className="radio__label">
                                        {item.type === "swatch"
                                          ? null
                                          : attribute.value}
                                      </span>
                                    </span>
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                    <div className="product-details-price">
                      <p className="product-details-price__name">Price:</p>
                      <p className="product-details-price__amount">
                        {/* Display product price */}
                        {product.prices
                          .map((item) => {
                            return item.currency === this.props.currency
                              ? item.amount
                              : null;
                          })
                          .join("") +
                          " " +
                          this.props.currency}
                      </p>
                    </div>
                    {/* If inStock is false create out of stock button else add to cart button */}
                    <button
                      className={
                        product.inStock
                          ? "display-none"
                          : "product-details-out-of-stock"
                      }
                    >
                      OUT OF STOCK
                    </button>
                    <button
                      className={
                        product.inStock
                          ? "product-details__btn"
                          : "display-none"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.addCart([product, productCount]);
                      }}
                    >
                      ADD TO CART
                    </button>
                  </form>
                  {/* Parse and display product description */}
                  <div className="product-details-description">
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}

export default ProductDetails;
