import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import IronImage from "react-image-lazy-load-component";
import { Tooltip } from "react-tippy";
// Actions
import { addToCart } from "../Main/actions/loadData";
// Styles
import "./styles/index.css";

class Item extends React.PureComponent {
    state = {
        checked: false
    };

    checkedToggle = () => {
        this.setState((prevState) => {
            return {
                checked: !prevState.checked
            };
        });
    };

    render() {
        const { poster, title, price, id, count, mass, energy_value, protein, fat, starch } = this.props;
        const { checked } = this.state;
        const spicy = title.search(/остр/i);

        return (
            <div className="item">
                <input
                    onChange={this.checkedToggle}
                    checked={checked}
                    type="checkbox"
                    className="item-details"
                    aria-hidden
                />
                <div className="item-poster">
                    <div className="item-poster--front front">
                        <IronImage
                            placeholder={`https://kfc.laapl.ru${poster.split(".")[0].replace("products", "small")}.webP`}
                            src={`https://kfc.laapl.ru${poster}`}
                            alt={title}
                        />
                        <div className="item-poster--inner">
                            {spicy !== -1 && <Spacy />}
                            <div className="item-poster--price">{price}₽</div>
                            <BInfo onClick={this.checkedToggle} className="item-poster--details" />
                            <div data-count={count} className="item-poster--count">
                                {count}
                            </div>
                        </div>
                    </div>
                    <div className="item-poster--back back">
                        <div className="mass">{mass} Г</div>
                        <div className="energy">{energy_value} ККАЛ</div>
                        <div className="energy-values">Б:{protein} Ж:{fat} У:{starch}</div>
                        <div className="item-poster--inner">
                            <BClose onClick={this.checkedToggle} className="item-poster--details" />
                        </div>
                    </div>
                </div>
                <BPay onClick={() => this.props.addToCart(id)} className="item-pay" />
                <div className="item-title"><span>{title}</span></div>
            </div>
        );
    };
};

const BPay = (props) => {
    return (
        <div onClick={props.onClick} className={props.className}>
            <Tooltip distance="25" title="Добавить в корзину">
                <svg viewBox="0 0 48 48" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
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
                            fillOpacity="null"
                            strokeOpacity="null"
                            strokeWidth="null"
                            stroke="null"
                            fill="currentcolor"
                        />
                    </g>
                </svg>
            </Tooltip>
        </div>
    );
};

const BInfo = (props) => {
    return (
        <div onClick={props.onClick} className={props.className}>
            <Tooltip title="Подробнее">
                <svg
                    baseProfile="tiny"
                    height="100%"
                    version="1.2"
                    viewBox="0 0 24 24"
                    width="100%"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g>
                        <path
                            fill="currentColor"
                            d="M13.839,17.525c-0.006,0.002-0.559,0.186-1.039,0.186c-0.265,0-0.372-0.055-0.406-0.079c-0.168-0.117-0.48-0.336,0.054-1.4   l1-1.994c0.593-1.184,0.681-2.329,0.245-3.225c-0.356-0.733-1.039-1.236-1.92-1.416C11.456,9.532,11.134,9.5,10.815,9.5   c-1.849,0-3.094,1.08-3.146,1.126c-0.179,0.158-0.221,0.42-0.102,0.626c0.12,0.206,0.367,0.3,0.595,0.222   c0.005-0.002,0.559-0.187,1.039-0.187c0.263,0,0.369,0.055,0.402,0.078c0.169,0.118,0.482,0.34-0.051,1.402l-1,1.995   c-0.594,1.185-0.681,2.33-0.245,3.225c0.356,0.733,1.038,1.236,1.921,1.416c0.314,0.063,0.636,0.097,0.954,0.097   c1.85,0,3.096-1.08,3.148-1.126c0.179-0.157,0.221-0.42,0.102-0.626C14.312,17.543,14.063,17.451,13.839,17.525z"
                        />
                        <circle fill="currentColor" cx="13" cy="6.001" r="2.5" />
                    </g>
                </svg>
            </Tooltip>            
        </div>
    );
};

const BClose = (props) => {
    return (
        <div onClick={props.onClick} className={props.className}>
            <svg
                height="100%"
                viewBox="0 0 1792 1792"
                width="100%"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="currentColor"
                    d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"
                />
            </svg>
        </div>
    );
};

const Spacy = () => {
    return (
        <div className="item-poster--spicy">
            <Tooltip distance="25" position="top" title="Острое">
                <svg viewBox="0 0 16 16" width="100%" height="100%">
                    <path
                        d="M5.415 0c-.108 1.825-.835 3.385-2.18 4.68C1.218 6.622 0 7.757 0 10.776s2.094 5.022 7.368 5.183c-1.217-.367-1.825-1.178-1.825-2.431 0-1.254.588-2.645 1.763-4.174 1.631 1.41 2.447 2.77 2.447 4.075 0 1.306-.673 2.15-2.02 2.53 4.62 0 7.663-1.984 7.745-5.647.055-2.442-1.056-4.774-3.332-6.996.093.88.049 1.571-.132 2.073-.18.503-.533.917-1.056 1.244-.13-1.39-.768-2.689-1.914-3.895C7.897 1.53 6.688.618 5.414 0z"
                        fill="currentColor"
                        fillRule="nonzero"
                    />
                </svg>
            </Tooltip>
        </div>
    );
};

export default connect(
    (store) => ({}),
    (dispatch) => bindActionCreators({
        addToCart: addToCart
    }, dispatch)
)(Item);
