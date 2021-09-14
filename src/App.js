// Import react and react-rrouter
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Import components
import Header from "./components/Header/Header.js";
import Section from "./components/Section/Section.js";

// Import css
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: "USD",
      cart: [],
      isOpen: false,
      total: 0,
    };

    // Binding this
    this.currencyChange = this.currencyChange.bind(this);
    this.addCart = this.addCart.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.delete = this.delete.bind(this);
    this.openToggle = this.openToggle.bind(this);
  }
  
  // Change currency function
  currencyChange(e) {
    this.setState({ currency: e });
  }

  // Change open state function
  openToggle() {
    this.setState({ isOpen: !this.state.isOpen });
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
        return item[1] <= 1 ? (item[1] = 1) : (item[1] -= 1);
      }
      return null;
    });
    this.setState({ cart: this.state.cart });
  }

  // Delete product from cart function
  delete(id) {
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
            if (price.currency === this.state.currency) {
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
                cart={this.state.cart}
                currency={this.state.currency}
                increase={this.increase}
                decrease={this.decrease}
                delete={this.delete}
                openToggle={this.openToggle}
                isOpen={this.state.isOpen}
                total={this.state.total}
              />
              <Section
                currency={this.state.currency}
                cart={this.state.cart}
                addCart={this.addCart}
                increase={this.increase}
                decrease={this.decrease}
                delete={this.delete}
              />
            </Router>
          </div>
        </div>
        {this.state.isOpen ? <div className="app__overlay"></div> : null}
      </div>
    );
  }
}
