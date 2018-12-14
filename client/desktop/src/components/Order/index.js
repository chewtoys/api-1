import React from "react";
import connect from "react-redux/lib/connect/connect";
import axios from "axios";
import moment from "moment";
// Custom Components
import OrderContact from "../OrderContact";
import OrderMap from "../OrderMap";
import OrderAddress from "../OrderAddress";
import OrderTime from "../OrderTime";
// UI
import { Ordering } from "./ui";
// FN
import { formatData } from "../../util";
// Lang
import TextComponents from "../../lang/ru.json";

class Order extends React.PureComponent {
  state = {
    isActive: false
  };

  openOrder = () => {
    this.setState({
      isActive: !this.state.isActive
    });
  };

  nextButtonClick = () => {
    /**
     * @description Создание нового заказа
     * @param {string} phone - номер телефона
     * @param {string} email - email
     * @param {string} name - имя
     * @param {string} lat - latitude
     * @param {string} lon - longitude
     * @param {string} address - адрес
     * @param {string} entrance - номер подъезда
     * @param {string} apartment - номер квартиры
     * @param {string} intercom - домофон
     * @param {datetime} order_datetime - дата и время, на которое заказана доставка
     * @param {string} comment - комментарий к заказу
     * @param {boolean} [remember] - запомнить адрес
     * @param {string} [address_alias] - название адреса
     * @param {array} items - массив с содержимым заказа
     * @param {boolean} [debug] - режим отладки
     */
    const {
      number,
      email,
      username,
      point,
      address,
      entrance,
      apartment,
      domofon,
      time,
      comment
    } = this.props.form.values;
    const { data } = formatData(this.props.data);
    axios({
      method: "POST",
      url: "https://api.laapl.ru/api/orders/create",
      data: {
        phone: number.replace(/ /g, ""),
        email: email,
        name: username,
        lat: point[0],
        lon: point[1],
        address: address,
        entrance: entrance,
        apartment: apartment,
        intercom: domofon,
        order_datetime: moment(time, "HH:mm").format("YYYY-MM-DD HH:mm"),
        comment: comment,
        remember: false,
        items: data.map(item => {
          return { id: item.id, count: item.count };
        })
      }
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    const { isActive } = this.state;

    return (
      <Ordering.Wrap isActive={isActive}>
        <Ordering.Title onClick={this.openOrder}>
          {TextComponents["order.title"]}
          <Ordering.Arrow>
            <use xlinkHref="#arrow" />
            <rect width="100%" height="100%" fill="transparent" />
          </Ordering.Arrow>
        </Ordering.Title>
        <Ordering.Content stopScrollPropagation={true} horizontal={false}>
          <OrderContact />
          <OrderMap />
          <OrderAddress />
          <OrderTime />
          <Ordering.NextButton onClick={this.nextButtonClick}>
            {TextComponents["order.button.next"]}
          </Ordering.NextButton>
        </Ordering.Content>
      </Ordering.Wrap>
    );
  }
}

export default connect(store => ({
  form: store.form,
  data: store.data.data
}))(Order);
