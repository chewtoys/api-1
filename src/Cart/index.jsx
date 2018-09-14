import React from 'react';
import CartSVG from "./icon/cart";
import "./styles/index.css";

export default class Cart extends React.PureComponent {
  render() {
    return(
      <div className="cart">
        <CartSVG />
      </div>
    )
  }
}