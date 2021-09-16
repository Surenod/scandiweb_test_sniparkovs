// Import react and react-dom
import React, { PureComponent } from "react";
import { Route } from "react-router-dom";

//Import apollo
import { Query } from "@apollo/client/react/components";

// Import query
import SECTION_QUERY from "./SectionQuery.js";

// Import component
import ProductGrid from "./ProductGrid/ProductGrid.js";
import ProductDetails from "./ProductDetails/ProductDetails.js";
import Cart from "./Cart/Cart.js";

export class Section extends PureComponent {
  render() {
    // Declaring variables
    const {addCart, cart, currency, decrease, increase} = this.props;
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
                        currency={currency}
                        addCart={addCart}
                        categoryName={item.name}
                      />
                    </Route>
                    <Route
                      key={indexRoute}
                      path={"/" + item.name + "/:id"}
                      render={(props) => (
                        <ProductDetails
                          currency={currency}
                          addCart={addCart}
                          {...props}
                        />
                      )}
                    />
                  </div>
                );
              })}
              {/* Create "all" category route */}
              <Route path="/all" exact>
                <ProductGrid
                  currency={currency}
                  categoryName=""
                  addCart={addCart}
                />
              </Route>
              <Route
                path="/all/:id"
                render={(props) => (
                  <ProductDetails
                    currency={currency}
                    addCart={addCart}
                    {...props}
                  />
                )}
              />
              {/* Create cart route */}
              <Route
                path="/cart"
                render={(props) => (
                  <Cart
                    currency={currency}
                    addCart={addCart}
                    cart={cart}
                    increase={increase}
                    decrease={decrease}
                    {...props}
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
