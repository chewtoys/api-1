import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import { Tooltip } from "react-tippy";
import ScrollArea from "react-scrollbar";
// Styles
import "./styles/index.css";
// Actions
import { closeCart } from "./actions/cart";

export const formatData = (data, offset = -1) => {
    let cartItems = [];
    let count = 0;
    let total = 0;
    const sortFn = (a, b) => {
        if (a.recentСhange > b.recentСhange) return 1;
        if (a.recentСhange < b.recentСhange) return -1;
    };
    data
        .map((cat) => {
            return cat.items.filter((prod) => prod.count > 0);
        })
        .forEach((item) => {
            cartItems = cartItems.concat(item);
        });
    cartItems.sort(sortFn);
    cartItems.forEach((item, i) => {
        if (i > offset) {
            count = count + item.count;
        }
        total = total + (item.price * item.count);
    });
    return {
        data: cartItems, count, total
    }
};

class BigCart extends React.Component {
    input = React.createRef();
    ymaps = window.ymaps;

    componentDidMount() {
        // this.ymaps.ready(() => {
        //     const suggestView = new this.ymaps.SuggestView("suggest", {
        //         results: 5,
        //         offset: [0, 10]
        //     });
        // });
    }

    onClick = (e) => {
        // e.preventDefault();
        e.stopPropagation();
    }

    render() {
        const { cart, closeCart } = this.props;
        const { data, count, total } = formatData(this.props.data);        

        return (
            <div className={`cart-big${cart.open ? " open" : ""}`}>
                <div className="cart-big--title">
                    Корзина
                    <div onClick={closeCart} className="cart-big--close">×</div>
                </div>
                <ScrollArea stopScrollPropagation={true} horizontal={false} className="cart-big--space">
                    {data.map((item, i) => {
                        return (
                            <Tooltip key={item.id} position="top" title={item.title}>
                                <div data-count={item.count} className="cart-big--item">
                                    <img
                                        width="100%"
                                        height="100%"
                                        src={`https://kfc.laapl.ru${item.poster}`}
                                        alt={item.title}
                                    />
                                    <div data-count={item.count} className="cart-big--item--count">
                                        {item.count}
                                    </div>
                                </div>
                            </Tooltip>
                        )
                    })}
                    {data.length === 0 && "Здесь ничего нет"}
                </ScrollArea>
                {/* <input style={{width: "500px"}} ref={this.input} id="suggest" type="text" /> */}
            </div>
        );
    }
}

export default connect(
    (store) => ({
        data: store.data.data,
        cart: store.cart
    }),
    (dispatch) =>
        bindActionCreators(
            {
                closeCart: closeCart
            },
            dispatch
        )
)(BigCart);
