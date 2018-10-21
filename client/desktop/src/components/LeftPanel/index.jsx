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
                    {data.data.map((item, i) => {
                        return (
                            <Link
                                key={i.toString()}
                                to={"/" + item.aliase}
                                className={`nav-icon ${item.aliase} ${
                                    this.props.location.pathname === "/" + item.aliase
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <div
                                    // onClick={(e) => this.onClick(e, i)}
                                    // src={`https://kfc.laapl.ru${item.icon}`}
                                />
                            </Link>
                        );
                    })}
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
