import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import IronImage from "react-image-lazy-load-component";
// import { Tooltip } from "react-tippy";
import axios from "axios";
// Actions
import { addToCart } from "../Root/actions/loadData";
// UI
import { Item } from "./ui";
// Lang
import TextComponents from "../../lang/ru.json";

class Product extends React.PureComponent {
  state = {
    checked: false,
    bgBack: null
  };

  checkedToggle = () => {
    if (!this.state.checked) {
      axios({
        method: "GET",
        url: "https://api.giphy.com/v1/gifs/random",
        params: {
          api_key: "uE0UHNpaKyipyIfRtArmPM4dp4vwMqH0",
          tag: "shook",
          rating: "g"
        }
      })
        .then(res => {
          this.setState({
            checked: true,
            bgBack: res.data.data.fixed_height_downsampled_url
          });
        })
        .catch(err => {
          this.setState({
            checked: true
          });
        });
    } else {
      this.setState({
        checked: false
      });
    }
  };

  render() {
    const {
      big_img,
      title,
      price,
      id,
      count,
      mass,
      energy_value,
      protein,
      fat,
      starch,
      bad_img
    } = this.props;
    const { checked, bgBack } = this.state;
    const spicy = title.search(/стры/i);

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
            <IronImage placeholder={bad_img} src={big_img} alt={title} />
            <Item.Inner>
              {spicy !== -1 && (
                <Item.Spicy>
                  <use xlinkHref="#chili" />
                  <rect
                    width="100%"
                    height="100%"
                    style={{ fill: "transparent" }}
                  />
                </Item.Spicy>
              )}
              <Item.Price>{price}₽</Item.Price>
              {(mass || energy_value) && (
                <Item.Info onClick={this.checkedToggle}>
                  <use xlinkHref="#info" />
                  <rect
                    width="100%"
                    height="100%"
                    style={{ fill: "transparent" }}
                  />
                </Item.Info>
              )}
              <Item.Count count={count}>{count}</Item.Count>
            </Item.Inner>
          </Item.Front>
          <Item.Back bgImage={bgBack}>
            <Item.Values.Mass>
              {mass} {TextComponents["item.gram"]}
            </Item.Values.Mass>
            <Item.Values.Energy>
              {energy_value} {TextComponents["item.kcal"]}
            </Item.Values.Energy>
            <Item.Values.EnergyValues>
              {TextComponents["item.protein"]}
              {protein} {TextComponents["item.fat"]}
              {fat} {TextComponents["item.starch"]}
              {starch}
            </Item.Values.EnergyValues>
            <Item.Inner>
              <Item.Close onClick={this.checkedToggle}>
                <use xlinkHref="#close" />
                <rect
                  width="100%"
                  height="100%"
                  style={{ fill: "transparent" }}
                />
              </Item.Close>
            </Item.Inner>
          </Item.Back>
        </Item.Poster>
        <Item.Pay
          animateFill={false}
          transitionFlip={false}
          title={TextComponents["item.pay.button"]}
          hideOnClick={false}
        >
          <Item.PayIcon onClick={() => this.props.addToCart(id)}>
            <use xlinkHref="#cart" />
            <rect width="100%" height="100%" fill="transparent" />
          </Item.PayIcon>
        </Item.Pay>
        <Item.Title>
          <span>{title}</span>
        </Item.Title>
      </Item.Wrap>
    );
  }
}

export default connect(
  null,
  dispatch =>
    bindActionCreators(
      {
        addToCart: addToCart
      },
      dispatch
    )
)(Product);
