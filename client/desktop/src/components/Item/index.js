import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import IronImage from "react-image-lazy-load-component";
import { Tooltip } from "react-tippy";
// Actions
import { addToCart } from "../Root/actions/loadData";
// UI
import { Item } from "./ui";

class Product extends React.PureComponent {
  state = {
    checked: false
  };

  checkedToggle = () => {
    this.setState(prevState => {
      return {
        checked: !prevState.checked
      };
    });
  };

  render() {
    const {
      poster,
      title,
      price,
      id,
      count,
      mass,
      energy_value,
      protein,
      fat,
      starch
    } = this.props;
    const { checked } = this.state;
    const spicy = title.search(/остр/i);

    return (
      <Item.Wrap>
        <Item.Input
          onChange={this.checkedToggle}
          checked={checked}
          type="checkbox"
          aria-hidden
        />
        <Item.Poster>
          <Item.Front>
            <IronImage
              placeholder={`https://laapl.ru${poster
                .split(".")[0]
                .replace("products", "small")}.webP`}
              src={`https://laapl.ru${poster}`}
              alt={title}
            />
            <Item.Inner>
              {spicy !== -1 && (
                <Tooltip
                  animateFill={false}
                  // distance="30"
                  position="top"
                  title="Острое"
                >
                  <Item.Spicy>
                    <use xlinkHref="#spacy" />
                    <rect
                      width="100%"
                      height="100%"
                      style={{ fill: "transparent" }}
                    />
                  </Item.Spicy>
                </Tooltip>
              )}
              <Item.Price>{price}₽</Item.Price>
              <Item.Info onClick={this.checkedToggle} viewBox="0 0 24 24">
                <use xlinkHref="#info" />
                <rect
                  width="100%"
                  height="100%"
                  style={{ fill: "transparent" }}
                />
              </Item.Info>
              <Item.Count count={count}>{count}</Item.Count>
            </Item.Inner>
          </Item.Front>
          <Item.Back>
            <Item.Values.Mass>{mass} Г</Item.Values.Mass>
            <Item.Values.Energy>{energy_value} ККАЛ</Item.Values.Energy>
            <Item.Values.EnergyValues>
              Б:{protein} Ж:{fat} У:{starch}
            </Item.Values.EnergyValues>
            <Item.Inner>
              <Item.Close onClick={this.checkedToggle}>
                <svg xmlns="http://www.w3.org/2000/svg">
                  <use xlinkHref="#close" />
                  <rect
                    width="100%"
                    height="100%"
                    style={{ fill: "transparent" }}
                  />
                </svg>
              </Item.Close>
            </Item.Inner>
          </Item.Back>
        </Item.Poster>
        <Item.Pay onClick={() => this.props.addToCart(id)}>
          <Tooltip animateFill={false} distance="25" title="Добавить в корзину">
            <svg xmlns="http://www.w3.org/2000/svg">
              <use xlinkHref="#cart" />
              <rect
                width="100%"
                height="100%"
                style={{ fill: "transparent" }}
              />
            </svg>
          </Tooltip>
        </Item.Pay>
        <Item.Title>
          <span>{title}</span>
        </Item.Title>
      </Item.Wrap>
    );
  }
}

export default connect(
  store => ({}),
  dispatch =>
    bindActionCreators(
      {
        addToCart: addToCart
      },
      dispatch
    )
)(Product);
