import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import { Tooltip } from "react-tippy";
// Fn
import { formatData } from "../BigCart";
// Actions
import { removeFromCart, addToCart } from "../Root/actions/loadData";
import { openCart } from "../BigCart/actions/cart";
// UI
import { Panel, Background } from "./ui";

const RightPanel = ({
  settings,
  open,
  allData,
  removeFromCart,
  addToCart,
  openCart
}) => {
  const url = settings.filter(item => item.name === "logo")[0].value;
  const { data, count, total } = formatData(allData, 4);

  return (
    <Panel.Wrap>
      <Panel.AppLogo image={`https://laapl.ru${url}`} />
      {/* <Login>
                <use xlinkHref="#login" />
                <rect width="100%" height="100%" style={{ fill: "transparent" }} />
            </Login> */}
      <Panel.Space open={open}>
        {data.map(item => {
          return (
            <Panel.Item key={item.id}>
              <Tooltip
                position="left"
                title={`${item.title} (${item.count} x ${item.price}₽)`}
                hideOnClick={false}
              >
                <Panel.Image src={item.big_img} alt={item.title} />
                <Panel.Hover>
                  <Panel.Desc onClick={() => removeFromCart(item.id)}>
                    <Panel.ActionIcon>
                      <use xlinkHref="#desc" />
                      <rect
                        width="100%"
                        height="100%"
                        style={{ fill: "transparent" }}
                      />
                    </Panel.ActionIcon>
                  </Panel.Desc>
                  <Panel.Asc onClick={() => addToCart(item.id)}>
                    <Panel.ActionIcon>
                      <use xlinkHref="#asc" />
                      <rect
                        width="100%"
                        height="100%"
                        style={{ fill: "transparent" }}
                      />
                    </Panel.ActionIcon>
                  </Panel.Asc>
                  {/* <svg xmlns="http://www.w3.org/2000/svg">
                    <use xlinkHref="#remove" />
                    <rect
                      width="100%"
                      height="100%"
                      style={{ fill: "transparent" }}
                    />
                  </svg> */}
                </Panel.Hover>
                <Panel.Count count={item.count}>{item.count}</Panel.Count>
              </Tooltip>
            </Panel.Item>
          );
        })}
        {data.length > 5 && (
          <Panel.More onClick={!open ? openCart : null}>+{count}</Panel.More>
        )}
      </Panel.Space>
      <Background />
      <Panel.Cart total={total} onClick={!open ? openCart : null}>
        <Tooltip
          position="left"
          distance="25"
          hideOnClick={false}
          title={`${open ? "Зыкрыть" : "Открыть"} корзину`}
        >
          <Panel.Total>{total}₽</Panel.Total>
          <Panel.CartIcon>
            <use xlinkHref="#cart" />
            <rect width="100%" height="100%" style={{ fill: "transparent" }} />
          </Panel.CartIcon>
        </Tooltip>
      </Panel.Cart>
    </Panel.Wrap>
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
        addToCart: addToCart,
        openCart: openCart
      },
      dispatch
    )
)(RightPanel);
