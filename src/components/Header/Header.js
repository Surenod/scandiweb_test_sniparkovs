// Import react and react-router
import React, { Component } from "react";
import { Link } from "react-router-dom";

//Import apollo
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

// Import svg
import Menu from "../svg/bars.svg";
import Close from "../svg/close.svg";
import Logo from "../svg/brand_icon.svg";

// Import css
import "./Header.css";

// Import Component
import Currency from "./Currency/Currency";
import CartMini from "./CartMini/CartMini";

const HEADER_QUERY = gql`
  query {
    categories {
      name
    }
    category {
      name
    }
    currencies
  }
`;

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
    };
  }

  // Change open state of heade menu(Mobile version)
  menuToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    const { toggle } = this.state;
    return (
      <Query query={HEADER_QUERY}>
        {({ data, loading }) => {
          if (loading) return null;
          // Save incomig data in different variables
          const categories = data.categories;
          const category = data.category;
          const currencies = data.currencies;
          return (
            <header>
              <div className="header__menu" onClick={this.menuToggle}>
                <img src={Menu} alt="Menu" width="20" />
              </div>
              <nav>
                <ul
                  className={
                    toggle ? "header__navlinks" : "header__navlinks toggle"
                  }
                >
                  {/* Mapping through categories array and create links in nav */}
                  {categories.map((item) => {
                    return (
                      <li key={item.name}>
                        <Link to={"/" + item.name}>{item.name}</Link>
                      </li>
                    );
                  })}
                  <li key={category.name}>
                    <Link to={"/" + category.name}>{category.name}</Link>
                  </li>
                  <div className="header__close" onClick={this.menuToggle}>
                    <img src={Close} alt="" width="20" />
                  </div>
                </ul>
              </nav>
              <div className="header__logo">
                <Link to="/">
                  <img src={Logo} alt="Logo" width="30" />
                </Link>
              </div>
              <div className="header__currencycart">
                {/* Passing state and functions to child components */}
                <Currency
                  currencyChange={this.props.currencyChange}
                  currencies={currencies}
                />
                <CartMini
                  currency={this.props.currency}
                  cart={this.props.cart}
                  increase={this.props.increase}
                  decrease={this.props.decrease}
                  delete={this.props.delete}
                  openToggle={this.props.openToggle}
                  isOpen={this.props.isOpen}
                  total={this.props.total}
                />
              </div>
            </header>
          );
        }}
      </Query>
    );
  }
}

export default Header;
