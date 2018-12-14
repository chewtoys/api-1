import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import { Tooltip } from "react-tippy";
// Custom components
import Order from "../Order";
// UI
import { Cart, ScrollArea, Item } from "./ui";
// Actions
import { closeCart } from "./actions/cart";
import { addToCart, removeFromCart, clearCart } from "../Root/actions/loadData";
// Fn
import { formatData, declOfNum } from "../../util";
// Lang
import TextComponents from "../../lang/ru.json";

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
      <Cart.Wrap isOpen={cart.open} id="cart" className="cart">
        <Cart.Title>
          {TextComponents["big.cart.title"]}
          <Cart.Close onClick={closeCart}>
            <use xlinkHref="#closewindow" />
            <rect width="100%" height="100%" fill="transparent" />
          </Cart.Close>
        </Cart.Title>
        <ScrollArea stopScrollPropagation={true} horizontal={false}>
          <Cart.Header>
            <Cart.HeaderInfo>
              {data.length === 0 && TextComponents["big.cart.empty"]}
              {data.length !== 0 &&
                `${count} ${declOfNum(count, [
                  TextComponents["big.cart.product.single"],
                  TextComponents["big.cart.product.case"],
                  TextComponents["big.cart.product.multiple"]
                ])} ${TextComponents["big.cart.sum"]} ${total}₽`}
            </Cart.HeaderInfo>
            {data.length !== 0 && (
              <Cart.HeaderCleat onClick={this.props.clearCart}>
                Очистить
              </Cart.HeaderCleat>
            )}
          </Cart.Header>
          <Cart.Content>
            {data.map((item, i) => {
              const spicy = item.title.search(/остр/i);

              return (
                <Tooltip
                  animateFill={false}
                  key={item.id}
                  position="top"
                  title={item.title}
                >
                  <Item.Wrap bgImage={item.big_img} count={item.count}>
                    <Item.Hover />
                    <Item.Asc onClick={() => addToCart(item.id)}>
                      <Item.Icon>
                        <use xlinkHref="#asc" />
                        <rect width="100%" height="100%" fill="transparent" />
                      </Item.Icon>
                    </Item.Asc>
                    <Item.Desc onClick={() => removeFromCart(item.id)}>
                      <Item.Icon>
                        <use xlinkHref="#desc" />
                        <rect width="100%" height="100%" fill="transparent" />
                      </Item.Icon>
                    </Item.Desc>
                    <Item.Count>{item.count}</Item.Count>
                    <Item.Price>{item.price}₽</Item.Price>
                    {spicy !== -1 && (
                      <Item.Spacy>
                        <use xlinkHref="#chili" />
                        <rect width="100%" height="100%" fill="transparent" />
                      </Item.Spacy>
                    )}
                  </Item.Wrap>
                </Tooltip>
              );
            })}
          </Cart.Content>
        </ScrollArea>
        {count !== 0 && <Order />}
      </Cart.Wrap>
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
        clearCart: clearCart,
        removeFromCart: removeFromCart
      },
      dispatch
    )
)(BigCart);
