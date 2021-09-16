// Import React
import React, { PureComponent } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";

// Import css
import "./Cart.css";
import "../../Section/ProductDetails/ProductDetails.css";

// Swiper modules Installation
SwiperCore.use([Navigation]);

export class Cart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.setValue = this.setValue.bind(this);
  }

  // Change state of product property inputs
  setValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {cart, currency, increase, decrease} = this.props;
    return (
      <div className="cart">
        <div className="cart-name">CART</div>
        <div className="cart-inner">
          {/* Create HTML for every product in cart */}
          {cart.map((cartItem, index) => {
            const cartItemData = cartItem[0];
            const cartItemCount = cartItem[1];
            return (
              <div key={index} className="cart__inner-container">
                <div className="cart__line" />
                <div key={cartItemData.id} className="cart-item">
                  <div className="cart-item__description">
                    <div className="cart-item__name">
                      <p className="cart-item__brand">{cartItemData.brand}</p>
                      {cartItemData.name}
                    </div>
                    <p className="cart-item__price">
                      {cartItemData.prices
                        .map((item) => {
                          return item.currency === currency.value
                            ? currency.symbol + " " + (item.amount * cartItemCount).toFixed(2)
                            : null;
                        })
                      }
                    </p>
                    <form>
                      {/* Create inputs for product attributes */}
                      {cartItemData.attributes.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className="product-details-attribute"
                          >
                            <p className="product-details-attribute__name cart-btn-category__name">
                              {item.name}:
                            </p>
                            <ul className="product-details-attribute__btn-list cart-btn-list">
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
                                            ? cartItemData.inStock
                                              ? "product-details-attribute__btn--color"
                                              : "product-details-attribute__btn--color out-of-stock"
                                            : cartItemData.inStock
                                            ? "product-details-attribute__btn"
                                            : "product-details-attribute__btn out-of-stock"
                                        }
                                        style={{ background: attribute.value }}
                                      >
                                        {/* Create color input */}
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
                    </form>
                  </div>
                  <div className="cart__count">
                    {/* Create buttons for increasing and decreasing product amount */}
                    <div className="cartmini-item__count cart-item__count">
                      <button
                        className="cartmini-item__count-btn cart-item__count-btn"
                        onClick={() => increase(cartItemData.id)}
                      >
                        +
                      </button>
                      <span>{cartItemCount}</span>
                      <button
                        className="cartmini-item__count-btn cart-item__count-btn"
                        onClick={() => decrease(cartItemData.id)}
                      >
                        -
                      </button>
                    </div>
                    <div className="cartmini-item__img cart__img">
                      {/* Create swiper slider with all product images from incoming data */}
                      <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={50}
                        slidesPerView={1}
                      >
                        {cartItemData.gallery.map((image, index) => {
                          return (
                            <SwiperSlide key={index}>
                              <img src={image} alt="product__img" />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Cart;
