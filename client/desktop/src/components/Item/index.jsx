import React from "react";
import Tween from 'rc-tween-one/lib/TweenOne';
import { Link } from "react-router-dom";

export default class Item extends Tween {
  state = {
    count: 0
  }

  onClick = () => {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      }
    })
  }

  render() {
    const { poster, ru, price, id, category } = this.props
    const { count } = this.state
    return (
      <div className="item">
        <Link to={"/" + category + "/" + id} className="item-poster">
          <div className="item-poster--img" style={{ backgroundImage: `url(${poster})` }} />
        </Link>
        <div className="item-title">{ru}</div>
        <div className="item-footer">
          <div className="item-price">
            {price}₽
          </div>
          <div onClick={this.onClick} className="item-pay button">
            В КОРЗИНУ
            <div data-count={count} className="item-pay--count">{count}</div>
          </div>
        </div>
      </div>
    )
  }
}