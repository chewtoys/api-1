import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import { Tooltip } from "react-tippy";
import { YMaps, ZoomControl, Placemark } from "react-yandex-maps";
import moment from "moment";
// UI
import {
  Cart,
  Title,
  Close,
  ScrollArea,
  Item,
  ItemHover,
  Image,
  Count,
  Add,
  Remove,
  Price,
  Spacy,
  Order,
  Arrow,
  OrderTitle,
  OrderScrollArea,
  Block,
  OrderNameBlock,
  Input,
  MyMap,
  FindMeBackground
} from "./ui";
// Actions
import { closeCart } from "./actions/cart";
import { addToCart, removeFromCart } from "../Root/actions/loadData";
// Fn
import { formatData, validAddr, createPayLink, documentEvent } from "./util";
// Icon
import pointIcon from "./icon/point.svg";

const Inputs = {
  address: [
    {
      type: "address",
      label: "Адрес",
      placeholder: "улица Можайского, 7, Иркутск",
      id: "suggest"
    },
    {
      type: "entrance",
      label: "Подъезд",
      placeholder: "1"
    },
    {
      type: "apartment",
      label: "Квартира",
      placeholder: "1"
    },
    {
      type: "domofon",
      label: "Домофон",
      placeholder: "Да/Нет"
    },
    {
      type: "comment",
      label: "Комментарий",
      placeholder: "Любая информация, которая поможет найти вас быстрее"
    }
  ],
  contacts: [
    {
      type: "number",
      label: "Телефон",
      placeholder: "7 9XX XXXXXXX"
    },
    {
      type: "email",
      label: "Email",
      placeholder: "example@laapl.ru"
    },
    {
      type: "name",
      label: "Имя",
      placeholder: "Иван Иванов"
    }
  ]
};

const TimeToWork = {
  start: moment("10:00", "HH:mm"),
  end: moment("23:00", "HH:mm")
};

let currTime = moment("11:00", "HH:mm");
const TimeDelivery = [];
// while (TimeToWork.start <= currTime <= TimeToWork.end) {
//   TimeDelivery.push(moment(currTime, "HH:mm").format("HH:mm"));
//   currTime = moment(currTime, "HH:mm").add(30, "m");
// }

console.log(TimeDelivery);

class BigCart extends React.Component {
  state = {
    isActive: false,
    name: "",
    number: "",
    email: "",
    address: "",
    apartment: "",
    entrance: "",
    domofon: "",
    comment: "",
    point: null
  };

  componentDidMount() {
    // Close cart if press miss block
    document.addEventListener("mousedown", e => {
      const ele = e.target.closest(".cart");

      if (!ele && this.props.cart.open) {
        setTimeout(() => {
          this.props.closeCart();
        }, 300);
      }
    });
    document.addEventListener("keydown", e => {
      const key = e.which;

      if (key === 27 && this.props.cart.open) {
        this.props.closeCart();
      }
    });
    console.log(TimeToWork);
  }

  createPoint = (e, obj) => {
    const cords = obj.properties
      .get("metaDataProperty")
      .GeocoderMetaData.InternalToponymInfo.Point.coordinates.reverse();
    e.setCenter(cords, 17);
    this.setState({ point: cords });
  };

  onClick = () => {
    this.setState({
      isActive: !this.state.isActive
    });
  };

  onChange = (e, type) => {
    const value = e.target.value;
    this.setState({ [type]: value });
  };

  render() {
    const { isActive } = this.state;
    const { cart, closeCart, addToCart, removeFromCart } = this.props;
    const { data, count, total } = this.props.data;

    return (
      <Cart isOpen={cart.open} className="cart">
        <Title>
          Корзина
          <Close onClick={closeCart}>×</Close>
        </Title>
        <ScrollArea stopScrollPropagation={true} horizontal={false}>
          {data.map((item, i) => {
            const spicy = item.title.search(/остр/i);

            return (
              <Tooltip key={item.id} position="top" title={item.title}>
                <Item count={item.count}>
                  <ItemHover />
                  <Add onClick={() => addToCart(item.id)}>+</Add>
                  <Remove onClick={() => removeFromCart(item.id)}>—</Remove>
                  <Image
                    src={`https://kfc.laapl.ru${item.poster}`}
                    alt={item.title}
                  />
                  <Count>{item.count}</Count>
                  <Price>{item.price}₽</Price>
                  {spicy !== -1 && (
                    <Spacy>
                      <svg xmlns="http://www.w3.org/2000/svg">
                        <use xlinkHref="#spacy" />
                        <rect
                          width="100%"
                          height="100%"
                          style={{ fill: "transparent" }}
                        />
                      </svg>
                    </Spacy>
                  )}
                </Item>
              </Tooltip>
            );
          })}
          {data.length === 0 && "Здесь ничего нет"}
        </ScrollArea>
        <Order isActive={isActive}>
          <OrderTitle onClick={this.onClick}>
            Оформить заказ
            <Arrow />
          </OrderTitle>
          <OrderScrollArea stopScrollPropagation={true} horizontal={false}>
            <OrderNameBlock>Контакты</OrderNameBlock>
            <Block>
              {Inputs.contacts.map((item, i) => {
                return (
                  <Input
                    key={i.toString()}
                    value={this.state[item.type]}
                    onChange={e => this.onChange(e, item.type)}
                    type={item.type}
                    label={item.label}
                    placeholder={item.placeholder}
                  />
                );
              })}
            </Block>
            <OrderNameBlock>Адрес доставки</OrderNameBlock>
            <Block>
              <YMaps
                query={{
                  // lang: "en_US",
                  apikey: "94eb5873-7c63-4228-ab82-eea769147415",
                  load: "Map,SuggestView,geocode,geolocation"
                }}
                version="2.1-dev"
              >
                <MyMap
                  instanceRef={e => {
                    if (e) {
                      e.behaviors.disable(["scrollZoom"]);
                      this.setCenter = obj => {
                        const cords = obj.properties
                          .get("metaDataProperty")
                          .GeocoderMetaData.InternalToponymInfo.Point.coordinates.reverse();
                        e.setCenter(cords, 17);
                        this.setState({ point: cords });
                      };
                    }
                  }}
                  defaultState={{
                    center: [52.286387, 104.28066],
                    zoom: 11,
                    checkZoomRange: true,
                    duration: 300
                  }}
                  onLoad={e => {
                    e.geolocation.get().then(res => {
                      const currPos = res.geoObjects.position;
                      this.setState({ point: currPos });
                    });
                    const suggestView = new e.SuggestView("suggest", {
                      results: 5,
                      offset: [0, 10],
                      boundedBy: [
                        [52.419859, 104.027374],
                        [52.217885, 104.598663]
                      ]
                    });
                    suggestView.events.add("select", a => {
                      this.setState({
                        address: a.originalEvent.item.displayName
                      });
                      e.geocode(a.originalEvent.item.displayName).then(res =>
                        validAddr(res, this.setCenter)
                      );
                    });
                  }}
                >
                  <ZoomControl />
                  {this.state.point !== null && (
                    <Placemark
                      geometry={this.state.point}
                      options={{
                        iconLayout: "default#image",
                        iconImageHref: pointIcon,
                        iconImageSize: [60, 68],
                        iconOffset: [-20, -25]
                      }}
                    />
                  )}
                  <FindMeBackground />
                </MyMap>
              </YMaps>
              {Inputs.address.map((item, i) => {
                return (
                  <Input
                    key={i.toString()}
                    value={this.state[item.type]}
                    onChange={e => this.onChange(e, item.type)}
                    type={item.type}
                    label={item.label}
                    placeholder={item.placeholder}
                    id={item.id}
                  />
                );
              })}
            </Block>
            <OrderNameBlock>Время доставки</OrderNameBlock>
            <Block>
              <div />
            </Block>
          </OrderScrollArea>
        </Order>
      </Cart>
    );
  }
}

export { formatData };

export default connect(
  store => ({
    data: formatData(store.data.data),
    cart: store.cart
  }),
  dispatch =>
    bindActionCreators(
      {
        closeCart: closeCart,
        addToCart: addToCart,
        removeFromCart: removeFromCart
      },
      dispatch
    )
)(BigCart);
