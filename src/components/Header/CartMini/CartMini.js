// Import React
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

// Import svg
import CartIcon from "../../svg/cart.svg";

// Import currency symbol
import getSymbolFromCurrency from 'currency-symbol-map';

// Import css
import "./CartMini.css";

export class CartMini extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.setValue = this.setValue.bind(this);
  }

  // Changing state when picking property of product
  setValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {cart, currency, decrease, increase, openCartMiniToggle, openCartMini, total} = this.props;
    return (
      <div className="header-cartmini">
        <div
          className="header-cartmini__btn"
          onClick={() => {openCartMiniToggle()}}
        >
          <img src={CartIcon} alt="" width="20" />
          <span className="header-cartmini__count">
            {cart.length}
          </span>
        </div>
        {/* If state isopen === true, render Cartmini html */}
        {openCartMini ? ( 
          <div className="header-cartmini__container">
            <p className="cartmini-title">
              <b>My Bag,</b> {cart.length}{" "}
              {cart.length <= 1 ? "item" : "items"}
            </p>
            {/* Render product HTML for every product in cart */}
            {cart.map((cartItem) => {
              const cartItemData = cartItem[0];
              const cartItemCount = cartItem[1];
              return (
                <div key={cartItemData.id} className="cartmini-item">
                  <div className="cartmini-item__description">
                    <p className="cartmini-item__name">
                      {cartItemData.brand} {cartItemData.name}
                    </p>
                    <div className="cartmini-item__price">
                      {cartItemData.prices.map((e) => {
                        if (e.currency !== currency.value) {
                          return null;
                        }
                        return (
                          getSymbolFromCurrency(e.currency) + " " + (e.amount * cartItemCount).toFixed(2)
                        );
                      })}
                    </div>
                    <form>
                      {/* Render custom inputs for product attributes */}
                      {cartItemData.attributes.map((attribute) => {
                        return (
                          <ul
                            className="cartmini-item__form-list"
                            key={attribute.id}
                          >
                            {attribute.items.map(
                              (attributeItem, indexAttributeItem) => {
                                return (
                                  <li
                                    className="cartmini-item__form-list-li"
                                    key={indexAttributeItem}
                                  >
                                    <label>
                                      <input
                                        type="radio"
                                        value={attributeItem.value}
                                        name={attribute.name}
                                        onChange={this.setValue}
                                      />
                                      <span
                                        className={
                                          attribute.type === "swatch"
                                            ? cartItemData.inStock
                                              ? "cartmini-item-attribute__btn--color"
                                              : "cartmini-item-attribute__btn--color-out-of-stock"
                                            : cartItemData.inStock
                                            ? "cartmini-item-attribute__btn"
                                            : "cartmini-item-attribute__btn-out-of-stock"
                                        }
                                        style={{
                                          background: attributeItem.value,
                                        }}
                                      >
                                        {/* If attribute type === swatch create color input without text */}
                                        {attribute.type === "swatch" ? null : (
                                          <span className="cartmini-item-attribute__btn-value">
                                            {attributeItem.value}
                                          </span>
                                        )}
                                      </span>
                                    </label>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        );
                      })}
                    </form>
                  </div>
                  <div className="cartmini-item__count">
                    {/* Html for increase and decrease product amount buttons */}
                    <button
                      className="cartmini-item__count-btn"
                      onClick={() => increase(cartItemData.id)}
                    >
                      +
                    </button>
                    <span>{cartItemCount}</span>
                    <button
                      className="cartmini-item__count-btn"
                      onClick={() => decrease(cartItemData.id)}
                    >
                      -
                    </button>
                  </div>
                  {/* Product image and remove button */}
                  <div className="cartmini-item__img">
                    <img src={cartItemData.gallery[0]} alt="product__img" />
                  </div>
                </div>
              );
            })}
            <div className="cartmini__total-price">
              <p>Total:</p>
              <p>{currency.symbol + " " + total}</p>
            </div>
            <div className="cartmini__submit">
              <Link to="/cart">
                <button className="cartmini__btn">VIEW BAG</button>
              </Link>
              <button className="cartmini__btn">CHECK OUT</button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CartMini;
