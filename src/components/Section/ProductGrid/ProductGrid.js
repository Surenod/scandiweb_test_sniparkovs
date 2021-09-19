// Import react and react-dom
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

// Import currency symbol
import getSymbolFromCurrency from "currency-symbol-map";

//Import apollo
import { Query } from "@apollo/client/react/components";

// Import css and svg
import "./ProductGrid.css";
import CartIcon from "../../svg/cart_white.svg";

// Import query
import PRODUCTGRID_QUERY from "./ProductGridQuery.js";

export class ProductGrid extends PureComponent {
  render() {
    const { categoryName, currency, addCart } = this.props;
    return (
      <Query
        variables={{ categoryName: categoryName }}
        query={PRODUCTGRID_QUERY}
      >
        {({ data, loading }) => {
          if (loading) return null;
          const { category } = data;
          return (
            <div className="category">
              <div className="category__name">{category.name}</div>
              <div className="category__productsgrid product">
                {/* Create HTML for every category*/}
                {category.products.map(
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
                        <Link key={item.id} to={`/${category.name}/${item.id}`}>
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
                          <p
                            key={indexPrice}
                            className={
                              item.inStock
                                ? "product__price"
                                : "product__price-outofstock"
                            }
                          >
                            {/* Display currency according to currency state */}
                            {item.prices.map((item) => {
                              if (item.currency === currency.value) {
                                return (
                                  getSymbolFromCurrency(item.currency) +
                                  " " +
                                  item.amount
                                );
                              }
                              return null;
                            })}
                          </p>
                          {/* If inStock is false display product out of stock*/}
                          <div
                            className={
                              item.inStock ? "product__in" : "product__out"
                            }
                          >
                            OUT OF STOCK
                          </div>
                          {/* Create add cart button */}
                          <div
                            key={indexCartBtn}
                            className={
                              item.inStock
                                ? "product__btn"
                                : "product__btn-disable"
                            }
                            onClick={() => {
                              if (item.attributes.length === 0) {
                                addCart([item, itemCount]);
                              }
                            }}
                          >
                            <img src={CartIcon} alt="" width="24" />
                          </div>
                        </Link>
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
