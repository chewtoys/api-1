import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import { Tooltip } from "react-tippy";
import ScrollArea from "react-scrollbar";
// Styles
import "./styles/index.css";
// Actions
import { closeCart } from "./actions/cart";
import { addToCart, removeFromCart } from "../Main/actions/loadData";

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
        document.addEventListener("mousedown", (e) => {
            const ele = e.target.closest(".cart-big.open") || e.target.closest(".cart-mini");
            
            if (!ele && this.props.cart.open) {
                this.props.closeCart()
            }            
        })
        document.addEventListener("keydown", (e) => {
            const key = e.which;

            if (key === 27 && this.props.cart.open) {
                this.props.closeCart();
            }
        });
        // this.ymaps.ready(() => {
        //     const suggestView = new this.ymaps.SuggestView("suggest", {
        //         results: 5,
        //         offset: [0, 10]
        //     });
        // });
    }

    render() {
        const { cart, closeCart, addToCart, removeFromCart } = this.props;
        const { data, count, total } = formatData(this.props.data);        

        return (
            <div className={`cart-big${cart.open ? " open" : ""}`}>
                <div className="cart-big--title">
                    Корзина
                    <div onClick={closeCart} className="cart-big--close">×</div>
                </div>
                <ScrollArea
                    stopScrollPropagation={true}
                    horizontal={false}
                    className="cart-big--space"
                    // onScroll={(e) => {
                    //     console.log(e);
                    // }}
                >
                    {data.map((item, i) => {
                        const spicy = item.title.search(/остр/i);
                        return (
                            <Tooltip sticky={true} stickyDuration={100} key={item.id} position="top" title={item.title}>
                                <div data-count={item.count} className="cart-big--item">
                                    <div className="cart-big--item--hover" />
                                    <div onClick={e => addToCart(item.id)} className="cart-big--action add">+</div>
                                    <div onClick={e => removeFromCart(item.id)} className="cart-big--action remove">—</div>
                                    <img
                                        width="100%"
                                        height="100%"
                                        src={`https://kfc.laapl.ru${item.poster}`}
                                        alt={item.title}
                                    />
                                    <div data-count={item.count} className="cart-big--item--count">
                                        {item.count}
                                    </div>
                                    <div className="cart-big--item-price">{item.price}₽</div>
                                    {spicy !== -1 && <Spacy />}
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
};

const Spacy = () => {
    return (
        <div className="item-poster--spicy">
            {/* <Tooltip distance="25" position="top" title="Острое"> */}
                <svg viewBox="0 0 16 16" width="100%" height="100%">
                    <path
                        d="M5.415 0c-.108 1.825-.835 3.385-2.18 4.68C1.218 6.622 0 7.757 0 10.776s2.094 5.022 7.368 5.183c-1.217-.367-1.825-1.178-1.825-2.431 0-1.254.588-2.645 1.763-4.174 1.631 1.41 2.447 2.77 2.447 4.075 0 1.306-.673 2.15-2.02 2.53 4.62 0 7.663-1.984 7.745-5.647.055-2.442-1.056-4.774-3.332-6.996.093.88.049 1.571-.132 2.073-.18.503-.533.917-1.056 1.244-.13-1.39-.768-2.689-1.914-3.895C7.897 1.53 6.688.618 5.414 0z"
                        fill="currentColor"
                        fillRule="nonzero"
                    />
                </svg>
            {/* </Tooltip> */}
        </div>
    );
};

export default connect(
    (store) => ({
        data: store.data.data,
        cart: store.cart
    }),
    (dispatch) =>
        bindActionCreators(
            {
                closeCart: closeCart,
                addToCart: addToCart,
                removeFromCart: removeFromCart
            },
            dispatch
        )
)(BigCart);
