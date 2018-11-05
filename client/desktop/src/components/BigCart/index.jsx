import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import { Tooltip } from "react-tippy";
// UI
import { Cart, Title, Close, ScrollArea, Item, ItemHover, Image, Count, Add, Remove, Price, Spacy, Order, Arrow, OrderTitle } from "./ui";
// Actions
import { closeCart } from "./actions/cart";
import { addToCart, removeFromCart } from "../Root/actions/loadData";

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

    state = {
        isActive: false
    };

    onClick = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    componentDidMount() {
        document.addEventListener("mousedown", (e) => {
            const ele = e.target.closest(".cart");
            
            if (!ele && this.props.cart.open) {
                setTimeout(() => {
                    this.props.closeCart()
                }, 300);
                
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
        const { isActive } = this.state;
        const { cart, closeCart, addToCart, removeFromCart } = this.props;
        const { data, count, total } = formatData(this.props.data);        

        return (
            <Cart isOpen={cart.open} className="cart">
                <Title>
                    Корзина
                    <Close onClick={closeCart}>×</Close>
                </Title>
                <ScrollArea
                    stopScrollPropagation={true}
                    horizontal={false}
                >
                    {data.map((item, i) => {
                        const spicy = item.title.search(/остр/i);
                        
                        return (
                            <Tooltip key={item.id} position="top" title={item.title}>
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
                                    {spicy !== -1 &&
                                        <Spacy>
                                            <svg xmlns="http://www.w3.org/2000/svg">
                                                <use xlinkHref="#spacy" />
                                                <rect width="100%" height="100%" style={{fill: "transparent"}} />
                                            </svg>
                                        </Spacy>
                                    }
                                </Item>
                            </Tooltip>
                        )
                    })}
                    {data.length === 0 && "Здесь ничего нет"}
                </ScrollArea>
                <Order isActive={isActive}>
                    <OrderTitle onClick={this.onClick}>
                        Оформить заказ
                        <Arrow/>
                    </OrderTitle>
                </Order>
                {/* <input style={{width: "500px"}} ref={this.input} id="suggest" type="text" /> */}
            </Cart>
        );
    };
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
