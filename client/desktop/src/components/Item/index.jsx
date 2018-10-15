import React from "react";
import Tween from 'rc-tween-one/lib/TweenOne';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./styles/index.css";

export default class Item extends React.Component {
  state = {
    count: 0,
  };

  onClick = () => {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      }
    })
  }

  render() {
    const { poster, title, price, id, category, scrollPosition } = this.props;
    const { count } = this.state;
    const spicy = title.search(/остр/i);
    

    return (
      <div className="item">
        <div className="item-poster">
          {(spicy !== -1) && <div className="item-poster--spicy"></div>}
          {/* <LazyLoadImage
            className="item-poster--img"
            alt={title}
            scrollPosition={scrollPosition}
            // height="100%"
            src={`https://kfc.laapl.ru${poster}`} // use normal <img> attributes as props
            // width="100%"
          /> */}
          <img className="item-poster--img" src={`https://kfc.laapl.ru${poster}`} />
        </div>
        <div className="item-footer">
          <div className="item-title">{title}</div>
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