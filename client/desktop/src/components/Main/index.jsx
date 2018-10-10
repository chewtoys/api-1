import React from "react";
import { withRouter } from "react-router-dom";
import scroller from "react-scroll/modules/mixins/scroller";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
// Custom components
import Nav from "../Nav";
import Content from "../Content";
import MiniCart from "../MiniCart";
import MiniLogin from "../MiniLogin";
import ViewItem from "../ViewItem";
import { LoadNav, LoadLogin, LoadCart, LoadContent } from "../Loading";
// Actions
import { loadData } from "./actions/loadData";
import { loadData as loadSettings } from "./actions/loadSettings";
// Styles
import "./styles/tooltip.css";

class Main extends React.PureComponent {
    componentDidMount() {
        this.props.loadData();
        this.props.loadSettings();
    };

    componentDidUpdate(prevProps) {
        if (prevProps.settingsComplite !== this.props.settingsComplite) {
            const color = this.props.settings.data.filter((item) => item.name === "background")[0].value;
            const html = document.querySelector("html");
            html.style.setProperty("--mainColor", color);
        };
        if (prevProps.dataComplite !== this.props.dataComplite) {
            scroller.scrollTo(this.props.location.pathname.replace("/", ""), {
                duration: 0
            });
        };
    };

    render() {
        const { dataComplite, settingsComplite } = this.props;
        
        if (dataComplite && settingsComplite) return (
            <>
                {/* <ViewItem /> */}
                <Nav />
                <Content />
                <MiniCart />
                <MiniLogin />
            </>
        )
        return (
            <>
                <LoadNav />
                <LoadContent />
                <LoadLogin />
                <LoadCart />
            </>
        )
    };
};

export default withRouter(
    connect(
        (store) => ({
            dataComplite: store.data.complite,
            data: store.data,
            settings: store.settings,
            settingsComplite: store.settings.complite
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
