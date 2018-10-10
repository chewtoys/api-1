import React from "react";
import connect from "react-redux/lib/connect/connect";
import { withRouter } from "react-router-dom";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import Item from "../Item";
import "./styles/index.css";

class Content extends React.PureComponent {
    render() {
        const { data, settings } = this.props;
        const webm = settings.data.filter(item => item.name === "video_url_webm")[0].value;
        const mp4 = settings.data.filter((item) => item.name === "video_url_mp4")[0].value;

        return (
            <div className="content">
                <OverPack
                    key={200}
                    playScale={[0, 0]}
                    id="main"
                    className="page main"
                >
                    <video preload="auto" className="main-bg" muted autoPlay loop>
                        <source src={"https://kfc.laapl.ru" + webm} type="video/webm" />
                        <source src={"https://kfc.laapl.ru" + mp4} type="video/mp4" />
                    </video>
                    <div className="main-bg--color"></div>
                </OverPack>
                {data.data.map((category, i) => {
                    return (
                        <OverPack
                            key={i.toString()}
                            playScale={[0, 0]}
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
                                            y: 5,
                                            playScale: [0, 0],
                                            type: "from",
                                            ease: "easeOutQuart",
                                            opacity: 0
                                        }}
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
        )
    };
};

export default withRouter(
    connect((store) => ({
        data: store.data,
        settings: store.settings
    }))(Content)
);