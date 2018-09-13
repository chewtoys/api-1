import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { OverPack } from 'rc-scroll-anim';
import Item from "../Item";
import Category from "../Category";
import menu, { sandwichesCat } from "./menu";
import logo from "./icon/logo.svg";
import "./styles/index.css";

class Main extends React.Component {
  nav = React.createRef()

  componentDidMount() {
  }

  isActive = (path) => {
    return (this.props.location.pathname === path) ? true : false
  }

  render() {
    return (
      <React.Fragment>
        <nav ref={this.nav} className="nav">
          <NavLink isActive={() => this.isActive('/')} activeClassName="selected" key="200" to={{pathname:"/", state: {scroll: false}}} className="nav-icon main" style={{ backgroundImage: `url(${logo})` }} />
          {menu.map((item, i) => {
            return (
              <NavLink isActive={() => this.isActive('/' + item.name)} activeClassName="selected" key={i.toString()} to={{pathname:item.name, state: {scroll: false}}} className={"nav-icon " + item.name} style={{ backgroundImage: `url(${item.icon})` }} />
            )
          })}
        </nav>
        <Category className="main" {...this.props} id="">
        </Category>
        {menu.map((item, i) => {
          return (
            <Category key={i.toString()} {...this.props} id={item.name}>
              <OverPack className="page">
                {sandwichesCat.map((sandwich, a) => {
                  return (
                    <Item
                      key={a.toString()}
                      animation={{ y: 0, type: 'from', ease: 'easeOutQuart', opacity: 0 }}
                      reverseDelay={200}
                      price={sandwich.price}
                      poster={sandwich.poster}
                      ru={sandwich.ru}
                    />                       
                  )
                })}
              </OverPack>                  
            </Category>               
          )
        })}
      </React.Fragment>
    )
  }
}





export default withRouter(Main);