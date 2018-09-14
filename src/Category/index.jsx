import React from "react";
import { Element } from "rc-scroll-anim";

export default class Category extends React.PureComponent {
  render() {
    return (
      <Element playScale={[0,0]} id={this.props.id} className={this.props.id }>
        {this.props.children}
      </Element >
    )
  }
}