import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import { Tooltip } from "react-tippy";
// Custom components
import Order from "../Order";
// UI
import {
  Cart,
  Title,
  Close,
  ScrollArea,
  Item,
  ItemHover,
  Image,
  Count,
  Add,
  Remove,
  Price,
  Spacy
} from "./ui";
// Actions
import { closeCart } from "./actions/cart";
import { addToCart, removeFromCart } from "../Root/actions/loadData";
// Fn
import { formatData } from "./util";

class BigCart extends React.PureComponent {
  componentDidMount() {
    // Close cart if press miss block
    document.addEventListener("mousedown", e => {
      const ele = e.target.closest(".cart");
      const timeItem = e.target.closest(".time__item");

      if (!ele && !timeItem && this.props.cart.open) {
        setTimeout(() => {
          this.props.closeCart();
        }, 300);
      }
    });
    document.addEventListener("keydown", e => {
      const key = e.which;

      if (key === 27 && this.props.cart.open) {
        this.props.closeCart();
      }
    });
  }

  render() {
    const { cart, closeCart, addToCart, removeFromCart } = this.props;
    const { data, count, total } = this.props.data;

    return (
      <Cart isOpen={cart.open} id="cart" className="cart">
        <Title>
          Корзина
          <Close onClick={closeCart}>
            <use xlinkHref="#closewindow" />
            <rect width="100%" height="100%" style={{ fill: "transparent" }} />
          </Close>
        </Title>
        <ScrollArea stopScrollPropagation={true} horizontal={false}>
          {data.map((item, i) => {
            const spicy = item.title.search(/остр/i);

            return (
              <Tooltip
                animateFill={false}
                key={item.id}
                position="top"
                title={item.title}
              >
                <Item count={item.count}>
                  <ItemHover />
                  <Add onClick={() => addToCart(item.id)}>+</Add>
                  <Remove onClick={() => removeFromCart(item.id)}>—</Remove>
                  <Image
                    src={`https://kfc.laapl.ru${item.poster}`}
                    alt={item.title}
                  />
                  <Count>{item.count}</Count>
                  <Price>{item.price}₽</Price>
                  {spicy !== -1 && (
                    <Spacy>
                      <svg xmlns="http://www.w3.org/2000/svg">
                        <use xlinkHref="#spacy" />
                        <rect
                          width="100%"
                          height="100%"
                          style={{ fill: "transparent" }}
                        />
                      </svg>
                    </Spacy>
                  )}
                </Item>
              </Tooltip>
            );
          })}
          {data.length === 0 && "Здесь ничего нет"}
        </ScrollArea>
        <Order />
      </Cart>
    );
  }
}

export { formatData };

export default connect(
  store => ({
    data: formatData(store.data.data),
    cart: store.cart
  }),
  dispatch =>
    bindActionCreators(
      {
        closeCart: closeCart,
        addToCart: addToCart,
        removeFromCart: removeFromCart
      },
      dispatch
    )
)(BigCart);
