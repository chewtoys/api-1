import React from "react";
import { withRouter } from "react-router-dom";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import Link from "rc-scroll-anim/lib/ScrollLink";
import scroller from "react-scroll/modules/mixins/scroller";
import Item from "../Item";
import MiniCart from "../MiniCart";
import MiniLogin from "../MiniLogin";
import ViewItem from "../ViewItem";
import Tooltip from "antd/lib/tooltip";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import { loadData } from "./actions/loadData";
import { loadData as loadSettings } from "./actions/loadSettings";
import "./styles/tooltip.css";
import "./styles/index.css";

class Main extends React.Component {
    nav = React.createRef();

    componentDidMount() {
        scroller.scrollTo(this.props.location.pathname.replace("/", ""), {
            duration: 0
        });        
        this.props.loadData();
        this.props.loadSettings();
    };

    onScroll = (e) => {
        if (e.to) this.props.history.push("/" + e.to);
    };

    render() {
        const { data, settings } = this.props;
        
        if (data.complite && settings.complite) return (
            <React.Fragment>
                {/* <ViewItem /> */}
                <nav ref={this.nav} className="nav">
                    <Tooltip text title="Главная" placement="right" mouseLeaveDelay={0} mouseEnterDelay={0.5} key={100}>
                        <Link
                            component="a"
                            to="main"
                            href="main"
                            className="nav-icon main"
                            style={{ backgroundImage: `url(https://kfc.laapl.ru/${settings.data.filter(item => item.name === "logo")[0].value})` }}
                            onFocus={this.onScroll}
                        />
                    </Tooltip>
                    {data.data.map((item, i) => {
                        return (
                            <Tooltip text title={item.name} placement="right" mouseLeaveDelay={0} mouseEnterDelay={0.5} key={i.toString()}>
                                <Link
                                    component="a"
                                    to={item.aliase}
                                    href={item.aliase}
                                    className={"nav-icon " + item.aliase}
                                    style={{ backgroundImage: `url(https://kfc.laapl.ru/${item.icon})` }}
                                    onFocus={this.onScroll}
                                />
                            </Tooltip>
                        );
                    })}
                </nav>
                <div className="content">
                    <OverPack
                        key={200}
                        playScale={[0, 50]}
                        id="main"
                        className="page main"
                    >
                        <video preload="auto" className="main-bg" muted autoPlay loop>
                            <source src={settings.data.filter(item => item.name === "video_url_webm")[0].value} type="video/webm" />
                            <source src={settings.data.filter(item => item.name === "video_url_mp4")[0].value} type="video/mp4" />
                        </video>
                        <div className="main-bg--color"></div>
                    </OverPack>
                    {data.data.map((category, i) => {
                        return (
                            <OverPack
                                key={i.toString()}
                                playScale={[0, 50]}
                                id={category.aliase}
                                className={"page " + category.aliase}
                            >
                                <div className="page-title">
                                    {category.name}
                                </div>
                                {category.items.map((item, a) => {
                                    return (
                                        <Item
                                            key={a.toString()}
                                            animation={{
                                                y: 10,
                                                playScale: [0.2, 0.2],
                                                type: "from",
                                                ease: "easeOutQuart",
                                                opacity: 0
                                            }}
                                            // reverseDelay={200}
                                            price={item.price}
                                            poster={item.poster}
                                            title={item.title}
                                            category={category.name}
                                            id={item.id}
                                        />
                                    );
                                })}
                            </OverPack>
                        );
                    })}
                </div>
                <MiniCart />
                <MiniLogin />
            </React.Fragment>
        )
        return (
            <div />
        )
    }
}

export default withRouter(
    connect(
        (store) => ({
            data: store.data,
            settings: store.settings
        }),
        (dispatch) =>
            bindActionCreators(
                {
                    loadData: loadData,
                    loadSettings: loadSettings
                },
                dispatch
            )
    )(Main)
);
