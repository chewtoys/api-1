import React from "react";
import { withRouter, Route } from "react-router-dom";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import Link from "rc-scroll-anim/lib/ScrollLink";
import scroller from "react-scroll/modules/mixins/scroller";
import Item from "../Item";
import Cart from "../Cart";
import CrazyButton from "../CrazyButton";
import ViewItem from "../ViewItem";
import Tooltip from "antd/lib/tooltip";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import { loadData } from "./actions/loadData";
import bgVideoWebm from "./video/bg3.webm";
import bgVideoMp4 from "./video/bg3.mp4";
import "./styles/tooltip.css";
import "./styles/index.css";

class Main extends React.Component {
    nav = React.createRef();

    componentDidMount() {
        scroller.scrollTo(this.props.location.pathname.replace("/", ""), {
            duration: 0
        });        
        this.props.loadData();
    };

    onScroll = (e) => {
        if (e.to) this.props.history.push("/" + e.to);
    };

    render() {
        const { data } = this.props;
        
        return (
            <React.Fragment>
                <Route path="/:category/:id" component={ViewItem} />
                <nav ref={this.nav} className="nav">
                    {data.map((item, i) => {
                        return (
                            <Tooltip text title={item.ru} placement="right" mouseLeaveDelay={0} mouseEnterDelay={0.5} key={i.toString()}>
                                <Link
                                    component="a"
                                    to={item.name}
                                    href={item.name}
                                    className={"nav-icon " + item.name}
                                    style={{ backgroundImage: `url(${item.icon})` }}
                                    onFocus={this.onScroll}
                                />
                            </Tooltip>
                        );
                    })}
                </nav>
                <div className="content">
                    {data.map((category, i) => {
                        if (category.name === "main") {
                            return (
                                <OverPack
                                    key={i.toString()}
                                    playScale={[0, 100]}
                                    id={category.name}
                                    className={"page " + category.name}
                                >
                                    <video preload="auto" className="main-bg" muted autoPlay loop>
                                        <source src={bgVideoWebm} type="video/webm" />
                                        <source src={bgVideoMp4} type="video/mp4" />
                                    </video>
                                </OverPack>
                            )
                        }
                        return (
                            <OverPack
                                key={i.toString()}
                                playScale={[0, 100]}
                                id={category.name}
                                className={"page " + category.name}
                            >
                                <div className="page-title">
                                    {category.ru}
                                </div>
                                {category.items.map((item, a) => {
                                    return (
                                        <Item
                                            key={a.toString()}
                                            animation={{
                                                y: 100,
                                                playScale: [0.5, 0.5],
                                                type: "from",
                                                ease: "easeOutQuart",
                                                opacity: 0
                                            }}
                                            // reverseDelay={200}
                                            price={item.price}
                                            poster={item.poster}
                                            ru={item.ru}
                                            category={category.name}
                                            id={item.id}
                                        />
                                    );
                                })}
                            </OverPack>
                        );
                    })}
                </div>
                <Cart />
                <CrazyButton />
            </React.Fragment>
        );
    }
}

export default withRouter(
    connect(
        (store) => ({
            data: store.data.data
        }),
        (dispatch) =>
            bindActionCreators(
                {
                    loadData: loadData
                },
                dispatch
            )
    )(Main)
);
