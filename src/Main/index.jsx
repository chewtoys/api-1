import React from "react";
import { withRouter } from "react-router-dom";
import { OverPack, Link, Element } from 'rc-scroll-anim';
import { scroller } from "react-scroll";
import Item from "../Item";
import Category from "../Category";
import Cart from "../Cart";
import CrazyButton from "../CrazyButton";
import menu, { sandwichesCat } from "./menu";
import "./styles/index.css";

class Main extends React.Component {
  nav = React.createRef()

  componentDidMount() {    
    scroller.scrollTo(this.props.location.pathname.replace("/", ""), {
      duration: 0,
    })
  }

  onScroll = (e) => {
    if (e.to) this.props.history.push("/" + e.to);
  }

  render() {
    return (
      <React.Fragment>
        <nav ref={this.nav} className="nav">
          {menu.map((item, i) => {
            return (
              <Link
                component="a"
                key={i.toString()}
                to={item.name}
                href={item.name}
                className={"nav-icon " + item.name}
                style={{ backgroundImage: `url(${item.icon})` }}
                onFocus={this.onScroll}
              />
            )
          })}
        </nav>
        
        {menu.map((item, i) => {
          return (
            <OverPack key={i.toString()} playScale={[0, 100]} id={item.name} className={"page " + item.name}>
              {sandwichesCat.map((sandwich, a) => {
                return (
                  <Item
                    key={a.toString()}
                    animation={{
                      y: 100,
                      playScale: [0.5, 0.5],
                      type: 'from',
                      ease: 'easeOutQuart',
                      opacity: 0,
                    }}
                    // reverseDelay={200}
                    price={sandwich.price}
                    poster={sandwich.poster}
                    ru={sandwich.ru}
                  />                       
                )
              })}
            </OverPack>               
          )
        })}
        <Cart />
        <CrazyButton />
      </React.Fragment>
    )
  }
}





export default withRouter(Main);