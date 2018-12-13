import React from "react";
// Custom Components
import OrderContact from "../OrderContact";
import OrderMap from "../OrderMap";
import OrderAddress from "../OrderAddress";
import OrderTime from "../OrderTime";
// UI
import { WrapOrder, Arrow, Title, OrderScrollArea } from "./ui";

class Order extends React.PureComponent {
  state = {
    isActive: false
  };

  openOrder = () => {
    this.setState({
      isActive: !this.state.isActive
    });
  };

  render() {
    const { isActive } = this.state;

    return (
      <WrapOrder isActive={isActive}>
        <Title onClick={this.openOrder}>
          Оформить заказ
          <Arrow>
            <use xlinkHref="#arrow" />
            <rect width="100%" height="100%" style={{ fill: "transparent" }} />
          </Arrow>
        </Title>
        <OrderScrollArea stopScrollPropagation={true} horizontal={false}>
          <OrderContact />
          <OrderMap />
          <OrderAddress />
          <OrderTime />
        </OrderScrollArea>
        >
      </WrapOrder>
    );
  }
}

export default Order;
