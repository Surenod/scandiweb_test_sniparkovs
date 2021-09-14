// Import React
import React, { Component } from "react";

// Import svg
import arrowDown from "../../svg/arrow_down.svg";

// Import css
import "./Currency.css";

export class Currency extends Component {
  state = {
    listOpen: false,
  };

  // Change state to open or close currency menu
  openToggle = () => {
    this.setState({ listOpen: !this.state.listOpen });
  };

  render() {
    return (
      <div className="currency" onClick={this.openToggle}>
        $
        <img
          src={arrowDown}
          alt=""
          width="6"
          // Turn the dropdown arrow when menu opens
          className={
            this.state.listOpen ? "currency__arrow-reverse" : "currency__arrow"
          }
        />
        {/* When open state is true render list of currencies */}
        {this.state.listOpen ? (
          <ul className="currency__list list">
            {this.props.currencies.map((currency) => {
              return (
                <li
                  key={currency}
                  className="list__item"
                  onClick={(e) => {
                    this.props.currencyChange(e.target.innerText)
                  }}
                >
                  {currency}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Currency;
