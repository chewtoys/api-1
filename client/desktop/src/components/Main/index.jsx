import React from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import { Route, Redirect, Switch } from "react-router";
import { YMInitializer } from "react-yandex-metrika";
// Custom components
import LeftPanel from "../LeftPanel";
import Content from "../Content";
import RightPanel from "../RightPanel";
import FilterSVG from "../FilterSVG";
// Actions
import { loadData } from "./actions/loadData";
import { loadData as loadSettings } from "./actions/loadSettings";

class Main extends React.PureComponent {
    componentDidMount() {
        this.props.loadData();
        this.props.loadSettings();
    };

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        };
        if (prevProps.settingsComplite !== this.props.settingsComplite) {
            const color = this.props.settings.data.filter((item) => item.name === "background")[0].value;
            const html = document.querySelector("html");
            html.style.setProperty("--mainColor", color);
        };
    };

    render() {
        const { dataComplite, settingsComplite } = this.props;
        
        if (dataComplite && settingsComplite) return (
            <>
                <YMInitializer 
                    accounts={[50403535]}
                    options={{
                        webvisor: true,
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true
                    }}
                    version="2"
                />
                {/* <ViewItem /> */}
                <Switch>
                    <Redirect exact from="/" to={this.props.data.data[0].aliase} />
                    <Route path="/:category" component={Content} />
                </Switch>
                
                <LeftPanel />
                <RightPanel />
                <FilterSVG />
            </>
        )
        return null
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
