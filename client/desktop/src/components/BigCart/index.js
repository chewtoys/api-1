import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import { Tooltip } from "react-tippy";
import { YMaps, ZoomControl, Placemark } from "react-yandex-maps";
import axios from "axios";
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
  MyMap
} from "./ui";
// Actions
import { closeCart } from "./actions/cart";
import { addToCart, removeFromCart } from "../Root/actions/loadData";
// Fn
import validAddr from "./validAddr";
// Icon
import pointIcon from "./icon.svg";

export const formatData = (data, offset = -1) => {
  let cartItems = [];
  let count = 0;
  let total = 0;
  const sortFn = (a, b) => {
    if (a.recentСhange > b.recentСhange) return 1;
    if (a.recentСhange < b.recentСhange) return -1;
  };
  data
    .map(cat => {
      return cat.items.filter(prod => prod.count > 0);
    })
    .forEach(item => {
      cartItems = cartItems.concat(item);
    });
  cartItems.sort(sortFn);
  cartItems.forEach((item, i) => {
    if (i > offset) {
      count = count + item.count;
    }
    total = total + item.price * item.count;
  });
  return { data: cartItems, count, total };
};

class BigCart extends React.Component {
  myMap = React.createRef();
  ymaps = window.ymaps;

  state = {
    isActive: false,
    name: "",
    number: "",
    email: "",
    address: "",
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

    // this.ymaps.ready(() => {
    //   const myMap = new this.ymaps.Map("map", {
    //     center: [52.286387, 104.28066],
    //     zoom: 10,
    //     controls: ["fullscreenControl", "zoomControl"]
    //   });
    //   myMap.behaviors.disable(["scrollZoom"]);
    //   console.log(1);
    // });

    // this.ymaps.ready(() => {
    //     const suggestView = new this.ymaps.SuggestView("suggest", {
    //         results: 5,
    //         offset: [0, 10]
    //     });
    // });
  }

  onClick = () => {
    this.setState({
      isActive: !this.state.isActive
    });
  };

  onChange = (e, type) => {
    const value = e.target.value;
    this.setState({ [type]: value });
  };

  createLink = () => {
    const { data, count, total } = this.props.data;

    axios({
      method: "POST",
      url: "https://securepay.tinkoff.ru/v2/Init",
      headers: { "Content-Type": "application/json" },
      data: {
        TerminalKey: "1540469806401DEMO",
        Amount: (total + 250) * 100,
        OrderId: "14887001",
        Description: "",
        Frame: true,
        Language: "ru",
        DATA: {
          // Email: "laapl@yandex.ru",
          Phone: "79501111756",
          Name: "Борис Хасиков",
          connection_type: "Widget2.0"
        },
        Receipt: {
          Taxation: "usn_income_outcome",
          Phone: "79501111756",
          Items: data
            .map(item => {
              return {
                Name: item.title,
                Price: item.price * 100,
                Quantity: item.count,
                Amount: item.price * item.count * 100,
                Tax: "none"
              };
            })
            .concat([
              {
                Name: "Доставка",
                Price: 250 * 100,
                Quantity: 1,
                Amount: 250 * 100,
                Tax: "none"
              }
            ])
        }
      }
    }).then(res => {
      console.log(res);
    });
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
              <Input
                value={this.state.number}
                onChange={e => this.onChange(e, "number")}
                type="number"
                label="Телефон"
                placeholder="7 9XX XXXXXXX"
              />
              <Input
                value={this.state.email}
                onChange={e => this.onChange(e, "email")}
                type="email"
                label="Email"
                placeholder="example@laapl.ru"
              />
              <Input
                value={this.state.name}
                onChange={e => this.onChange(e, "name")}
                type="name"
                label="Имя"
                placeholder="Иван Иванов"
              />
            </Block>
            <OrderNameBlock>Адрес доставки</OrderNameBlock>
            <Block>
              <Input
                value={this.state.address}
                onChange={e => this.onChange(e, "address")}
                type="address"
                label="Адрес"
                placeholder="Адрес"
                id="suggest"
              />
              <YMaps
                query={{
                  apikey: "94eb5873-7c63-4228-ab82-eea769147415",
                  load: "Map,SuggestView,geocode"
                }}
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
                        this.setState({
                          point: cords
                        });
                      };
                    }
                  }}
                  defaultState={{
                    center: [52.286387, 104.28066],
                    zoom: 11,
                    checkZoomRange: true
                  }}
                  onLoad={e => {
                    const suggestView = new e.SuggestView("suggest", {
                      results: 5,
                      offset: [0, 10]
                    });
                    // console.log(e.Map.setCenter(obj.properties.get("boundedBy")));
                    // suggestView.select(a => console.log(a));
                    suggestView.events.add("select", a => {
                      // console.log(a.originalEvent.item.displayName);
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
                        iconOffset: [-15, -15]
                        // preset: "islands#circleDotIcon",
                        // Задаем цвет метки (в формате RGB).
                        // iconColor: "#ff0000"
                      }}
                    />
                  )}
                </MyMap>
              </YMaps>
            </Block>
          </OrderScrollArea>
        </Order>
      </Cart>
    );
  }
}

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
