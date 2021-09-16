// Import react and react-rrouter
import React, { PureComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Import components
import Header from "./components/Header/Header.js";
import Section from "./components/Section/Section.js";

// Import css
import "./App.css";

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currency: {symbol: "$", value: 'USD'},
      cart: [],
      openCurrency: false,
      openCartMini: false,
      total: 0,
    };

    // Binding this
    this.currencyChange = this.currencyChange.bind(this);
    this.addCart = this.addCart.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.openCurrencyToggle = this.openCurrencyToggle.bind(this);
    this.openCartMiniToggle = this.openCartMiniToggle.bind(this);
  }
  
  // Change currency function
  currencyChange(e) {
    this.setState({ currency: {symbol: e[0], value: e[1]} });
  }

  // Change open state function
  openCurrencyToggle() {
    this.setState({ openCurrency: !this.state.openCurrency });
    this.setState({ openCartMini: false });
  }

  openCartMiniToggle() {
    this.setState({ openCartMini: !this.state.openCartMini });
    this.setState({ openCurrency: false });
  }

  // Add elements to cart function
  addCart(e) {
    const check = this.state.cart.every((item) => {
      return item[0].id !== e[0].id;
    });

    if (check) {
      this.setState({ cart: [...this.state.cart, e] });
    } else {
      alert("The product has been added to cart");
    }
  }

  // Increase product amount function
  increase(id) {
    this.state.cart.map((item) => {
      if (item[0].id === id) {
        return (item[1] += 1);
      }
      return null;
    });
    this.setState({ cart: this.state.cart });
  }

  // Decrease product amount function
  decrease(id) {
    this.state.cart.map((item) => {
      if (item[0].id === id) {
        return item[1] <= 1 ? (this.deleteItem(id)) : (item[1] -= 1);
      }
      return null;
    });
    this.setState({ cart: this.state.cart });
  }

  // Delete product from cart function
  deleteItem(id) {
    this.state.cart.map((item, index) => {
      if (item[0].id === id) {
        return this.state.cart.splice(index, 1);
      }
      return null;
    });
    this.setState({ cart: this.state.cart });
  }

  // Count total price function
  getTotal() {
    const res = this.state.cart
      .map((item) => {
        return item[0].prices
          .map((price) => {
            if (price.currency === this.state.currency.value) {
              return price.amount * item[1];
            }
            return null;
          })
          .join("");
      })
      .reduce((prevTotal, newTotal) => {
        return (Number(prevTotal) + Number(newTotal)).toFixed(2);
      }, 0);
    this.setState({ total: res });
  }

  render() {
    // Declaring variables
    const {currency, cart, openCurrency, openCartMini, total} = this.state;
    return (
      <div
        className="application"
        onClick={() => {
          this.getTotal();
        }}
      >
        <div className="app">
          <div className="app__container">
            <Router>
              <Header
                currencyChange={this.currencyChange}
                cart={cart}
                currency={currency}
                increase={this.increase}
                decrease={this.decrease}
                openCurrencyToggle={this.openCurrencyToggle}
                openCurrency={openCurrency}
                openCartMiniToggle={this.openCartMiniToggle}
                openCartMini={openCartMini}
                total={total}
              />
              <Section
                currency={currency}
                cart={cart}
                addCart={this.addCart}
                increase={this.increase}
                decrease={this.decrease}
              />
            </Router>
          </div>
        </div>
        {/* Show overlay background if cartmini is open */}
        {openCartMini ? <div className="app__overlay"></div> : null}
      </div>
    );
  }
}
