import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import Tooltip from "rc-tooltip";
// Custom components
import BigCart from "../BigCart";
// Actions
import { removeFromCart } from "../Main/actions/loadData";
// Styles
import "./styles/index.css";
import "rc-tooltip/assets/bootstrap.css";

export default class RightPanel extends React.PureComponent {
    render() {
        return (
            <div className="right-panel">
                <Logo />
                <MiniLogin />
                <MiniCart />
                <BigCart />
            </div>
        );
    }
}

const MiniCart = connect(
    (store) => ({
        data: store.data.data
    }),
    (dispatch) =>
        bindActionCreators(
            {
                removeFromCart: removeFromCart
            },
            dispatch
        )
)((props) => {
    const sortFn = (a, b) => {
        if (a.recentСhange > b.recentСhange) return 1;
        if (a.recentСhange < b.recentСhange) return -1;
    };
    let cartItems = [];
    props.data
        .map((cat) => {
            return cat.items.filter((prod) => prod.count > 0);
        })
        .forEach((item) => {
            cartItems = cartItems.concat(item);
        });
    cartItems.sort(sortFn);
    let count = 0;
    let total = 0;
    cartItems.forEach((item, i) => {
        if (i > 4) {
            count = count + item.count;
        }
        total = total + (item.price * item.count);
    });

    return (
        <>
            <div className="cart-mini--space">
                {cartItems.map((item) => {
                    return (
                        <Tooltip destroyTooltipOnHide={true} key={item.id} placement="left" trigger={['hover']} overlay={item.title}>
                            <div data-count={item.count} className="cart-mini--item">
                                <img
                                    width="100%"
                                    height="100%"
                                    src={`https://kfc.laapl.ru${item.poster}`}
                                    alt={item.title}
                                />
                                <div onClick={() => props.removeFromCart(item.id)} className="cart-mini--item--remove">
                                    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="currentcolor" d="M64,38.55H0V25.45H64Z" />
                                    </svg>
                                </div>
                                <div className="cart-mini--item--count">
                                    {item.count}
                                </div>
                            </div>
                        </Tooltip>
                    );
                })}
                {cartItems.length > 5 && <div className="cart-mini--more">+{count}</div>}
            </div>
            <div data-total={total} className="cart-mini">
                <div className="cart-mini--total">{total}₽</div>
                <svg
                    viewBox="0 0 48 48"
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <polygon
                            points="39.979,8.759 35.75,8.759 32.875,5.697 30.875,48.01 45,44.885  "
                            fill="currentcolor"
                        />
                        <path
                            fill="currentcolor"
                            d="m30.229,6.192c-0.159,-0.889 -0.485,-1.646 -0.893,-2.295c-0.012,-0.021 -0.019,-0.038 -0.03,-0.061c-0.93,-1.782 -2.419,-2.309 -2.864,-2.432c-0.009,-0.002 -0.017,-0.005 -0.024,-0.008c-0.069,-0.018 -0.116,-0.029 -0.116,-0.029l0.01,0.012c-0.38,-0.087 -0.776,-0.113 -1.185,-0.066c-0.595,-0.697 -1.414,-1.201 -2.542,-1.304c-4.542,-0.417 -8.125,6.167 -8.125,6.167s-1.595,3.577 -1.902,5.539l-5.744,1.795l-3.814,29.5l26.812,5l2,-42.313l-1.583,0.495zm-5.562,-1.849c0.292,2.708 0.226,3.516 0.226,3.516l-4.828,1.509c0,0 0.435,-3.274 2.727,-5.066c0.613,-0.479 1.168,-0.776 1.667,-0.952c0.094,0.288 0.167,0.614 0.208,0.993zm-10.137,6.754c0,0 0.512,-3.004 1.887,-5.004s2.875,-3.75 5.333,-4.5c0.391,-0.103 1.034,-0.093 1.622,0.267c-0.924,0.458 -1.832,1.163 -2.622,2.024c-2.075,2.261 -2.498,6.05 -2.498,6.05l0,0l-3.722,1.163l0,0zm10.191,7.841l-1.408,3.634c0,0 -3.312,-1.438 -5.188,-0.438s-1.062,3.188 0,3.813s3.5,2.25 4.25,3.438c0.53,0.84 0.864,2.254 0.976,3.377l0.001,0c0,0 0.897,4.873 -4.04,7.561s-9.688,-1.812 -9.938,-2.5c0.75,-2.062 1.375,-4.062 1.375,-4.062s2.625,2.062 4.312,2s2.555,-1.476 1.94,-2.562c-0.045,-0.08 -0.071,-0.166 -0.087,-0.254c-0.168,-0.394 -0.676,-1.235 -2.229,-2.434c-2.188,-1.688 -3.031,-4.334 -2.737,-6.066c0.003,-0.017 0.011,-0.036 0.014,-0.052c0.193,-2.832 1.784,-5.19 4.66,-6.882c3.188,-1.875 8.812,-0.312 8.812,-0.312l-0.713,1.739zm1.947,-11.633l0,0c0,0 0.142,-2.156 -0.528,-4.126c0.203,0.035 0.373,0.094 0.535,0.154c0.295,0.133 1.003,0.533 1.412,1.446c0.034,0.077 0.066,0.141 0.097,0.196c0.383,0.801 0.686,1.642 0.686,1.642l-2.202,0.688z"
                        />
                        <rect
                            height="28.66434"
                            width="18"
                            y="14.694043"
                            x="9.154134"
                            fill="currentcolor"
                        />
                    </g>
                </svg>
            </div>
        </>
    );
});

const MiniLogin = () => {
    return (
        <div className="login--mini">
            <svg viewBox="0 0 48 48" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <circle
                        strokeMiterlimit="10"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1"
                        stroke="currentColor"
                        fill="none"
                        r="7.26353"
                        cy="19.15045"
                        cx="24"
                    />
                    <path
                        strokeMiterlimit="10"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1"
                        stroke="currentColor"
                        fill="none"
                        d="m19.12193,17.23642c0.48483,-2.4277 2.8459,-4.00272 5.2736,-3.51789"
                    />
                    <path
                        strokeMiterlimit="10"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1"
                        stroke="currentColor"
                        fill="none"
                        d="m11.54175,36.11307c0,-3.88968 3.18246,-7.07214 7.07214,-7.07214l10.77223,0c3.88968,0 7.07214,3.18246 7.07214,7.07214"
                    />
                    <path
                        strokeMiterlimit="10"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1"
                        stroke="currentColor"
                        fill="none"
                        d="m18.98164,18.68699c0,0 -0.10733,0.99282 0,1.44898"
                    />
                    <circle
                        strokeMiterlimit="10"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1"
                        stroke="currentColor"
                        fill="none"
                        r="7.26353"
                        cy="19.15045"
                        cx="24"
                    />
                    <path
                        strokeMiterlimit="10"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1"
                        stroke="currentColor"
                        fill="none"
                        d="m19.12193,17.23642c0.48483,-2.4277 2.8459,-4.00272 5.2736,-3.51789"
                    />
                    <path
                        strokeMiterlimit="10"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1"
                        stroke="currentColor"
                        fill="none"
                        d="m11.54175,36.11307c0,-3.88968 3.18246,-7.07214 7.07214,-7.07214l10.77223,0c3.88968,0 7.07214,3.18246 7.07214,7.07214"
                    />
                    <path
                        strokeMiterlimit="10"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1"
                        stroke="currentColor"
                        fill="none"
                        d="m18.98164,18.68699c0,0 -0.10733,0.99282 0,1.44898"
                    />
                </g>
            </svg>
        </div>
    );
};

const Logo = connect((store) => ({
    settings: store.settings.data
}))((props) => {
    const src = props.settings.filter((item) => item.name === "logo")[0].value;
    return <div style={{ backgroundImage: `url(https://kfc.laapl.ru${src})` }} className="logo" />;
});
