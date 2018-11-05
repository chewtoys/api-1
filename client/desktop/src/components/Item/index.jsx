import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import IronImage from "react-image-lazy-load-component";
import { Tooltip } from "react-tippy";
// Actions
import { addToCart } from "../Root/actions/loadData";
// UI
import {
  ItemWrap,
  Poster,
  Title,
  Front,
  Inner,
  Price,
  Count,
  Info,
  Input,
  Back,
  Pay,
  Close,
  Spicy,
  Mass,
  Energy,
  EnergyValues
} from "./ui";

class Item extends React.PureComponent {
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
      <ItemWrap>
        <Input
          onChange={this.checkedToggle}
          checked={checked}
          type="checkbox"
          aria-hidden
        />
        <Poster>
          <Front>
            <IronImage
              placeholder={`https://kfc.laapl.ru${poster
                .split(".")[0]
                .replace("products", "small")}.webP`}
              src={`https://kfc.laapl.ru${poster}`}
              alt={title}
            />
            <Inner>
              {spicy !== -1 && (
                <Spicy>
                  <Tooltip distance="30" position="top" title="Острое">
                    <svg xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="#spacy" />
                      <rect width="100%" height="100%" style={{fill: "transparent"}} />
                    </svg>
                  </Tooltip>
                </Spicy>
              )}
              <Price>{price}₽</Price>
              <Info onClick={this.checkedToggle} viewBox="0 0 24 24">
                <use xlinkHref="#info" />
                <rect width="100%" height="100%" style={{ fill: "transparent" }} />
              </Info>
              <Count count={count}>{count}</Count>
            </Inner>
          </Front>
          <Back>
            <Mass>{mass} Г</Mass>
            <Energy>{energy_value} ККАЛ</Energy>
            <EnergyValues>
              Б:
              {protein} Ж:
              {fat} У:
              {starch}
            </EnergyValues>
            <Inner>
              <Close onClick={this.checkedToggle}>
                <svg xmlns="http://www.w3.org/2000/svg">
                  <use xlinkHref="#close" />
                  <rect width="100%" height="100%" style={{ fill: "transparent" }} />
                </svg>
              </Close>
            </Inner>
          </Back>
        </Poster>
        <Pay onClick={() => this.props.addToCart(id)}>
          <Tooltip distance="25" title="Добавить в корзину">
            <svg xmlns="http://www.w3.org/2000/svg">
              <use xlinkHref="#cart" />
              <rect width="100%" height="100%" style={{fill: "transparent"}} />
            </svg>
          </Tooltip>
        </Pay>
        <Title>
          <span>{title}</span>
        </Title>
      </ItemWrap>
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
)(Item);
