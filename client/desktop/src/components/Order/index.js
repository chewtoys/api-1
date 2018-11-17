import React from "react";
import { Tooltip } from "react-tippy";
import { YMaps } from "react-yandex-maps";
import moment from "moment";
import Autocomplite from "react-autocomplete";
// UI
import {
  WrapOrder,
  Arrow,
  OrderTitle,
  OrderScrollArea,
  Block,
  OrderNameBlock,
  Input,
  MyMap,
  FindMeBackground,
  TimeButton,
  TimeSelect,
  Point,
  DisplayAddress,
  DisplayLocality,
  DisplayStreet,
  MapControls,
  Zoom,
  FindMe
} from "./ui";
// Fn
import {
  validAddr,
  createPayLink,
  documentEvent,
  formatTimeToWork,
  findGeo
} from "./util";

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
const TimeDelivery = formatTimeToWork({
  start: moment("10:00", "HH:mm"),
  end: moment("23:00", "HH:mm")
});

const minZoom = 12;
const maxZoom = 19;

console.log(TimeDelivery);

class Order extends React.PureComponent {
  state = {
    isActive: false,
    zoom: 17,
    DisplayLocality: "Иркутск",
    DisplayStreet: "улица Можайского",
    DisplayHouse: "7",
    name: "",
    number: "",
    email: "",
    address: "",
    apartment: "",
    entrance: "",
    domofon: "",
    comment: "",
    point: [52.275946, 104.359649],
    items: []
  };

  ymaps = null;

  openOrder = () => {
    this.setState({
      isActive: !this.state.isActive
    });
  };

  onChange = (e, type) => {
    const value = e.target.value;
    this.setState({ [type]: value });
  };

  findMe = () => {
    this.ymaps.geolocation.get({ mapStateAutoApply: true }).then(res => {
      const currPos = res.geoObjects.position;
      // console.log(res.geoObjects);
      this.setState({ point: currPos });
    });
  };

  suggest = e => {
    const value = e.target.value;
    this.ymaps
      .suggest(value, {
        results: 5,
        offset: [0, 10],
        boundedBy: [[52.419859, 104.027374], [52.217885, 104.598663]]
      })
      .then(res => {
        this.setState({
          items: res
        });
        console.log(res);
      });
    this.setState({ address: value });
  };

  descZoom = () => {
    if (minZoom < this.state.zoom) {
      this.setState({
        zoom: this.state.zoom - 1
      });
    }
  };

  ascZoom = () => {
    if (maxZoom > this.state.zoom) {
      this.setState({
        zoom: this.state.zoom + 1
      });
    }
  };

  render() {
    const { isActive, zoom, point } = this.state;
    
    return (
      <WrapOrder isActive={isActive}>
        <OrderTitle onClick={this.openOrder}>
          Оформить заказ
          <Arrow>
            <use xlinkHref="#arrow" />
            <rect width="100%" height="100%" style={{ fill: "transparent" }} />
          </Arrow>
        </OrderTitle>
        <OrderScrollArea stopScrollPropagation={true} horizontal={false}>
          <OrderNameBlock>Адрес доставки</OrderNameBlock>
          <Block>
            <YMaps
              query={{
                apikey: "94eb5873-7c63-4228-ab82-eea769147415",
                load: "Map,SuggestView,geocode,geolocation,suggest,geoQuery"
              }}
              version="2.1-dev"
              preload={true}
            >
              <MyMap
                onBoundschange={e => {
                  console.log(e.originalEvent.newCenter);
                  findGeo(this.ymaps, e.originalEvent.newCenter).then(res => {
                    console.log(res);
                    this.setState({
                      DisplayLocality: res.address.filter(
                        item => item.kind === "locality"
                      )[0].name,
                      DisplayStreet: res.address.filter(
                        item =>
                          item.kind === "street" || item.kind === "district"
                      )[0].name,
                      DisplayHouse: res.address.filter(
                        item => item.kind === "house"
                      )[0].name,
                      point: res.coordinates
                    });
                    // this.Map.setCenter(res.coordinates, zoom);
                  });
                }}
                state={{
                  center: point,
                  zoom: zoom,
                  checkZoomRange: true,
                  behaviors: ["drag"]
                }}
                options={{
                  yandexMapDisablePoiInteractivity: true,
                  suppressMapOpenBlock: true
                }}
                onLoad={e => {
                  this.ymaps = e;
                }}
              >
                <FindMeBackground>
                  <Point>
                    <use xlinkHref="#point" />
                    <rect
                      width="100%"
                      height="100%"
                      style={{ fill: "transparent" }}
                    />
                  </Point>
                  <DisplayAddress>
                    <DisplayLocality>
                      {this.state.DisplayLocality}
                    </DisplayLocality>
                    <DisplayStreet>
                      {this.state.DisplayStreet}, {this.state.DisplayHouse}
                    </DisplayStreet>
                  </DisplayAddress>
                  <MapControls>
                    <Tooltip size="small" title="Отдалить">
                      <Zoom onClick={this.descZoom}>
                        <use xlinkHref="#desc" />
                        <rect
                          width="100%"
                          height="100%"
                          style={{ fill: "transparent" }}
                        />
                      </Zoom>
                    </Tooltip>
                    <Tooltip size="small" title="Моё местоположение">
                      <FindMe onClick={this.findMe}>
                        <use xlinkHref="#location" />
                        <rect
                          width="100%"
                          height="100%"
                          style={{ fill: "transparent" }}
                        />
                      </FindMe>
                    </Tooltip>
                    <Tooltip size="small" title="Приблизить">
                      <Zoom onClick={this.ascZoom}>
                        <use xlinkHref="#asc" />
                        <rect
                          width="100%"
                          height="100%"
                          style={{ fill: "transparent" }}
                        />
                      </Zoom>
                    </Tooltip>
                  </MapControls>
                </FindMeBackground>
              </MyMap>
            </YMaps>
            {Inputs.address.map((item, i) => {
              if (item.type === "address") {
                return (
                  <Input
                    key={i.toString()}
                    type={item.type}
                    label={item.label}
                    placeholder={item.placeholder}
                    id={item.id}
                    value={this.state[item.type]}
                    onChange={this.suggest}
                  >
                    <div />
                  </Input>
                );
              }
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
          <OrderNameBlock>Время доставки</OrderNameBlock>
          <Block>
            <div>
              В течение
              <Tooltip
                interactive
                animateFill={false}
                hideOnClick={false}
                theme="light"
                html={TimeDelivery.map((item, i) => {
                  return (
                    <TimeSelect className="time__item" key={i.toString()}>
                      {item}
                    </TimeSelect>
                  );
                })}
              >
                <TimeButton>~60 мин.</TimeButton>
              </Tooltip>
            </div>
          </Block>
        </OrderScrollArea>
      </WrapOrder>
    );
  }
}

export default Order;
