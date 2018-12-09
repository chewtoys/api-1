import React from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import { Route, Redirect, Switch } from "react-router";
import { YMInitializer } from "react-yandex-metrika";
import { ThemeProvider } from "styled-components";
import { darken } from "polished";
// Custom components
import LeftPanel from "../LeftPanel";
import Content from "../Content";
import RightPanel from "../RightPanel";
import BigCart from "../BigCart";
import Footer from "../Footer";
import { Sprites } from "../Sprites";
// UI
import { GlobalStyle, Scroll, Background } from "./ui";
// Actions
import { loadData } from "./actions/loadData";
import { loadData as loadSettings } from "./actions/loadSettings";
// Styles
import "react-tippy/dist/tippy.css";

class Root extends React.PureComponent {
  state = {
    color: null,
    theme: {
      mainColor: "white",
      mainColorDark: "white"
    }
  };

  componentDidMount() {
    this.props.loadData();
    this.props.loadSettings();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settingsComplite !== this.props.settingsComplite) {
      const color = this.props.settings.data.filter(
        item => item.name === "background"
      )[0].value;
      this.setState({
        color,
        theme: {
          ...this.state.theme,
          mainColor: color,
          mainColorDark: darken(0.15, color)
        }
      });
    }
  }

  render() {
    const { dataComplite, settingsComplite, open } = this.props;

    if (dataComplite && settingsComplite)
      return (
        <ThemeProvider theme={this.state.theme}>
          <Scroll contentClassName="content-test" horizontal={false}>
            <Sprites />
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
            <Switch>
              <Redirect exact from="/" to={this.props.data.data[0].aliase} />
              <Route path="/:category" component={Content} />
            </Switch>
            <Footer />

            <LeftPanel />
            <RightPanel />
            <BigCart />
            {open && <Background />}
            <GlobalStyle mainColor={this.state.color} />
          </Scroll>
        </ThemeProvider>
      );
    return null;
  }
}

export default withRouter(
  connect(
    store => ({
      dataComplite: store.data.complite,
      data: store.data,
      settings: store.settings,
      settingsComplite: store.settings.complite,
      open: store.cart.open
    }),
    dispatch =>
      bindActionCreators(
        {
          loadData: loadData,
          loadSettings: loadSettings
        },
        dispatch
      )
  )(Root)
);
