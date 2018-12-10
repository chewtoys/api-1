import React from "react";
import { OrderContext } from "../Order";

class OrderContact extends React.Component {
  // static contextType = OrderContext;
  // componentDidMount() {
  //   console.log(this.context);
  // }
  render() {
    const zoom = this.context;
    return <div>{zoom.zoom}</div>;
  }
}

OrderContact.contextType = OrderContext;

export default OrderContact;
