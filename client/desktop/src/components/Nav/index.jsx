import React from "react";
import connect from "react-redux/lib/connect/connect";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
// import Link from "rc-scroll-anim/lib/ScrollLink";
import Tooltip from "antd/lib/tooltip";
import "./styles/index.css";

class Nav extends React.PureComponent {
    onScroll = (e) => {
        if (e.to) this.props.history.replace("/" + e.to);
    };

    render() {
        const { data, settings } = this.props;

        return (
            <nav className="nav">
                {/* <Tooltip
                    text
                    title="Главная"
                    placement="right"
                    mouseLeaveDelay={0}
                    mouseEnterDelay={0.5}
                    key={100}>
                    <Link
                        component="a"
                        to="main"
                        href="main"
                        className="nav-icon main"
                        style={{
                            backgroundImage: `url(https://kfc.laapl.ru${
                                settings.data.filter((item) => item.name === "logo")[0].value
                            })`
                        }}
                        onFocus={this.onScroll}
                    />
                </Tooltip> */}
                {data.data.map((item, i) => {
                    return (
                        <Tooltip
                            text
                            title={item.name}
                            placement="right"
                            mouseLeaveDelay={0}
                            mouseEnterDelay={0.5}
                            key={i.toString()}>
                            <Link
                                component="a"
                                to={item.aliase}
                                // href={item.aliase}
                                className={`nav-icon ${item.aliase} ${this.props.location.pathname === "/" + item.aliase ? "active" : ""}`}
                                style={{ backgroundImage: `url(https://kfc.laapl.ru${item.icon})` }}
                                // onFocus={this.onScroll}
                            />
                        </Tooltip>
                    );
                })}
            </nav>
        );
    }
};

export default withRouter(
    connect((store) => ({
        data: store.data,
        settings: store.settings
    }))(Nav)
);