// Import React
import React, { PureComponent } from "react";

// Import svg
import arrowDown from "../../svg/arrow_down.svg";

// Import currency symbol
import getSymbolFromCurrency from 'currency-symbol-map';

// Import css
import "./Currency.css";

function currencyName(currency){
  return currency.split(" ")
}

export class Currency extends PureComponent {


  render() {
    const {currencies, currency, currencyChange, openCurrency, openCurrencyToggle, } = this.props;
    return (
      <div className="currency" onClick={() => openCurrencyToggle()}>
        {currency.symbol}
        <img
          src={arrowDown}
          alt=""
          width="6"
          // Turn the dropdown arrow when menu opens
          className={
            openCurrency ? "currency__arrow-reverse" : "currency__arrow"
          }
        />
        {/* When open state is true render list of currencies */}
        {openCurrency ? ( 
          <ul className="currency__list list">
            {currencies.map((currency) => {
              return (
                <li
                  key={currency}
                  className="list__item"
                  onClick={(e) => {
                    currencyChange(currencyName(e.target.innerText))
                  }}
                >
                {getSymbolFromCurrency(currency)} {currency}
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
