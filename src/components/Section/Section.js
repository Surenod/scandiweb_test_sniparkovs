// Import react and react-dom
import React, { Component } from "react";
import { Route } from "react-router-dom";

//Import apollo
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

// Import component
import ProductGrid from "./ProductGrid/ProductGrid.js";
import ProductDetails from "./ProductDetails/ProductDetails.js";
import Cart from "./Cart/Cart.js";

export class Section extends Component {
  render() {
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
    return (
      <Query query={SECTION_QUERY}>
        {({ data, loading }) => {
          if (loading) return null;
          return (
            <section>
              {/* Create every route for every category form incoming data */}
              {data.categories.map((item, indexObj, indexRoute) => {
                return (
                  <div key={indexObj}>
                    <Route key={item.name} path={"/" + item.name} exact>
                      <ProductGrid
                        currency={this.props.currency}
                        addCart={this.props.addCart}
                        categoryName={item.name}
                      />
                    </Route>
                    <Route
                      key={indexRoute}
                      path={"/" + item.name + "/:id"}
                      render={(props) => (
                        <ProductDetails
                          currency={this.props.currency}
                          {...props}
                          addCart={this.props.addCart}
                        />
                      )}
                    />
                  </div>
                );
              })}
              {/* Create "all" category route */}
              <Route path="/all" exact>
                <ProductGrid
                  currency={this.props.currency}
                  categoryName=""
                  addCart={this.props.addCart}
                />
              </Route>
              <Route
                path="/all/:id"
                render={(props) => (
                  <ProductDetails
                    currency={this.props.currency}
                    {...props}
                    addCart={this.props.addCart}
                  />
                )}
              />
              {/* Create cart route */}
              <Route
                path="/cart"
                render={(props) => (
                  <Cart
                    currency={this.props.currency}
                    {...props}
                    addCart={this.props.addCart}
                    cart={this.props.cart}
                    increase={this.props.increase}
                    decrease={this.props.decrease}
                    delete={this.props.delete}
                  />
                )}
              />
            </section>
          );
        }}
      </Query>
    );
  }
}

export default Section;
