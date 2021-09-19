// Import react and react-dom
import React, { PureComponent } from "react";

//Import apollo
import { Query } from "@apollo/client/react/components";

// Import currency symbol
import getSymbolFromCurrency from 'currency-symbol-map';

// Import react-jsx-parser
import JsxParser from 'react-jsx-parser';

// Import components
import ProductGallery from "./ProductGallery/ProductGallery.js";

// Import css and svg
import "./ProductDetails.css";

// Import query
import PRODUCTDETAILS_QUERY from "./ProductDetailsQuery";

export class ProductDetails extends PureComponent {
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
    const {currency,addCart} = this.props;
    const productsID = this.props.match.params.id;
    return (
      <Query variables={{productID: productsID}} query={PRODUCTDETAILS_QUERY}>
        {({ data, loading }) => {
          if (loading) return null;
          const {product} = data;
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
                            return item.currency === currency.value
                              ? getSymbolFromCurrency(item.currency) + " " + item.amount
                              : null;
                          })
                        }
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
                        if(product.attributes.length === 0 ){
                          addCart([product, productCount]);
                        } else {
                          if(Object.keys(this.state).length !== 0){
                            addCart([product, productCount]);
                          } else {
                            alert("Choose product properties.")
                          }
                        }
                      }}
                    >
                      ADD TO CART
                    </button>
                  </form>
                  {/* Parse and display product description */}
                  <JsxParser jsx={product.description}/>
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
