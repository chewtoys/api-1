import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import { Tooltip } from "react-tippy";
// Fn
import { formatData } from "../BigCart";
// Actions
import { removeFromCart } from "../Root/actions/loadData";
import { openCart } from "../BigCart/actions/cart";
// UI
import {
  Panel,
  Logo,
  Login,
  Space,
  Item,
  Image,
  Remove,
  Count,
  More,
  Cart,
  Total
} from "./ui";

const RightPanel = ({ settings, open, allData, removeFromCart, openCart }) => {
  const url = settings.filter(item => item.name === "logo")[0].value;
  const { data, count, total } = formatData(allData, 4);

  return (
    <Panel>
      <Logo image={`url(https://laapl.ru${url})`} />
      <Login>
        <svg xmlns="http://www.w3.org/2000/svg">
          <use xlinkHref="#login" />
          <rect width="100%" height="100%" style={{ fill: "transparent" }} />
        </svg>
      </Login>
      <Space open={open}>
        {data.map(item => {
          return (
            <Item key={item.id}>
              <Tooltip
                animateFill={false}
                position="left"
                title={`${item.title} (${item.count} x ${item.price}₽)`}
              >
                <Image
                  src={`https://laapl.ru${item.poster}`}
                  alt={item.title}
                />
                <Remove onClick={() => removeFromCart(item.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg">
                    <use xlinkHref="#remove" />
                    <rect
                      width="100%"
                      height="100%"
                      style={{ fill: "transparent" }}
                    />
                  </svg>
                </Remove>
                <Count count={item.count}>{item.count}</Count>
              </Tooltip>
            </Item>
          );
        })}
        {data.length > 5 && <More>+{count}</More>}
      </Space>
      <Cart total={total} onClick={!open ? openCart : null}>
        <Tooltip
          animateFill={false}
          position="left"
          distance="25"
          title={`${open ? "Зыкрыть" : "Открыть"} корзину`}
        >
          <Total>{total}₽</Total>
          <svg xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref="#cart" />
            <rect width="100%" height="100%" style={{ fill: "transparent" }} />
          </svg>
        </Tooltip>
      </Cart>
    </Panel>
  );
};

export default connect(
  store => ({
    allData: store.data.data,
    open: store.cart.open,
    settings: store.settings.data
  }),
  dispatch =>
    bindActionCreators(
      {
        removeFromCart: removeFromCart,
        openCart: openCart
      },
      dispatch
    )
)(RightPanel);
