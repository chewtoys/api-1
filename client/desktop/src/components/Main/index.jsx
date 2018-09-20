import React from "react";
import { withRouter } from "react-router-dom";
import { OverPack, Link } from "rc-scroll-anim";
import { scroller } from "react-scroll";
import Item from "../Item";
import Cart from "../Cart";
import CrazyButton from "../CrazyButton";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadData } from "./actions/loadData";
import "./styles/tooltip.css";
import "./styles/index.css";
import bgVideoWebm from "./video/bg3.webm";
import bgVideoMp4 from "./video/bg3.mp4";

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

                {data.map((item, i) => {
                    if (item.name === "main") {
                        return (
                            <OverPack
                                key={i.toString()}
                                playScale={[0, 100]}
                                id={item.name}
                                className={"page " + item.name}
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
                            id={item.name}
                            className={"page " + item.name}
                        >
                            <div className="page-title">
                            {item.ru}
                            </div>
                            {item.items.map((sandwich, a) => {
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
                                        price={sandwich.price}
                                        poster={sandwich.poster}
                                        ru={sandwich.ru}
                                    />
                                );
                            })}
                        </OverPack>
                    );
                })}
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
