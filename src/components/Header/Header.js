// Import react and react-router
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

//Import apollo
import { Query } from "@apollo/client/react/components";

// Import svg
import Menu from "../svg/bars.svg";
import Close from "../svg/close.svg";
import Logo from "../svg/brand_icon.svg";

// Import css
import "./Header.css";

// Import query
import HEADER_QUERY from "./HeaderQuery.js";

// Import Component
import Currency from "./Currency/Currency";
import CartMini from "./CartMini/CartMini";

export class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
    };
  }

  // Change open state of header menu(Mobile version)
  menuToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    const {toggle} = this.state;
    const {cart, currency, currencyChange, decrease, increase, openCurrency, openCurrencyToggle, openCartMiniToggle, openCartMini, total} = this.props;
    return (
      <Query query={HEADER_QUERY}>
        {({ data, loading }) => {
          if (loading) return null;
          // Save incomig data in different variables
          const {categories, category, currencies} = data;
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
                  currencyChange={currencyChange}
                  currencies={currencies}
                  currency={currency}
                  openCurrencyToggle={openCurrencyToggle}
                  openCurrency={openCurrency}
                />
                <CartMini
                  currency={currency}
                  cart={cart}
                  increase={increase}
                  decrease={decrease}
                  openCartMiniToggle={openCartMiniToggle}
                  openCartMini={openCartMini}
                  total={total}
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
