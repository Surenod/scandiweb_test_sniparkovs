// Import React
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Import svg
import CartIcon from "../../svg/cart.svg";

// Import css
import "./CartMini.css";

export class CartMini extends Component {
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
    const { cart } = this.props;
    return (
      <div className="header-cartmini">
        <div
          className="header-cartmini__btn"
          onClick={() => this.props.openToggle()}
        >
          <img src={CartIcon} alt="" width="20" />
          <span className="header-cartmini__count">
            {this.props.cart.length}
          </span>
        </div>
        {/* If state isopen === true, render Cartmini html */}
        {this.props.isOpen ? (
          <div className="header-cartmini__container">
            <p className="cartmini-title">
              <b>My Bag,</b> {this.props.cart.length}{" "}
              {cart.length <= 1 ? "item" : "items"}
            </p>
            {/* Render product HTML for every product in cart */}
            {cart.map((cartItem) => {
              const cartItemCount = cartItem[1];
              return (
                <div key={cartItem[0].id} className="cartmini-item">
                  <div className="cartmini-item__description">
                    <p className="cartmini-item__name">
                      {cartItem[0].brand} {cartItem[0].name}
                    </p>
                    <div className="cartmini-item__price">
                      {cartItem[0].prices.map((e) => {
                        if (e.currency !== this.props.currency) {
                          return null;
                        }
                        return (
                          (e.amount * cartItem[1]).toFixed(2) + " " + e.currency
                        );
                      })}
                    </div>
                    <form>
                      {/* Render custom inputs for product attributes */}
                      {cartItem[0].attributes.map((attribute) => {
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
                                            ? cartItem[0].inStock
                                              ? "cartmini-item-attribute__btn--color"
                                              : "cartmini-item-attribute__btn--color-out-of-stock"
                                            : cartItem[0].inStock
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
                      onClick={() => this.props.increase(cartItem[0].id)}
                    >
                      +
                    </button>
                    <span>{cartItemCount}</span>
                    <button
                      className="cartmini-item__count-btn"
                      onClick={() => this.props.decrease(cartItem[0].id)}
                    >
                      -
                    </button>
                  </div>
                  {/* Product image and remove button */}
                  <div className="cartmini-item__img">
                    <img src={cartItem[0].gallery[0]} alt="product__img" />
                  </div>
                  <div
                    className="cartmini-item__remove"
                    onClick={() => this.props.delete(cartItem[0].id)}
                  >
                    X
                  </div>
                </div>
              );
            })}
            <div className="cartmini__total-price">
              <p>Total:</p>
              <p>{this.props.total + " " + this.props.currency}</p>
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
