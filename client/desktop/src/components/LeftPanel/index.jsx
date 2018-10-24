import React from "react";
import connect from "react-redux/lib/connect/connect";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
// Styles
import "./styles/index.css";

class LeftPanael extends React.PureComponent {
    render() {
        const { data, settings } = this.props;

        return (
            <div className="left-panel">
                {/* <div className="item--current" /> */}
                <nav className="nav">
                    {data.data.map((cat, i) => {
                        return (
                            <Link
                                key={i.toString()}
                                to={"/" + cat.aliase}
                                className={`nav-icon ${cat.aliase} ${
                                    this.props.location.pathname === "/" + cat.aliase
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <div className="nav-icon--title">{cat.name}</div>
                                {/* <div className="nav-icon--top">
                                    {cat.items.map((prod, a) => {
                                        if (a < 3) return (
                                            <div className="nav-icon--item" key={a.toString()}>
                                                <img className="nav-icon--item-poster" src={`https://kfc.laapl.ru${prod.poster}`} alt={prod.title}/>
                                            </div>
                                        )
                                        return null
                                    })}
                                </div> */}
                            </Link>
                        );
                    })}
                    <div className="nav--hover"></div>
                </nav>
                {/* <FilterSVG /> */}
            </div>
        );
    }
}

const FilterSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100">
        <defs>
            <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
        </defs>
    </svg>
);

export default withRouter(
    connect((store) => ({
        data: store.data,
        settings: store.settings
    }))(LeftPanael)
);
