import React from "react";
import { Tooltip } from "react-tippy";
import { YMaps } from "react-yandex-maps";
import moment from "moment";
import axios from "axios";
import {
  WrapOrder,
  Arrow,
  Title,
  OrderScrollArea,
  Block,
  NameBlock,
  Maps,
  Input,
  TimeButton,
  TimeSelect,
  Suggest,
  Confirm
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
      id: "suggest",
      inputType: "text"
    },
    {
      type: "entrance",
      label: "Подъезд",
      placeholder: "1",
      inputType: "text"
    },
    {
      type: "apartment",
      label: "Квартира",
      placeholder: "1",
      inputType: "text"
    },
    {
      type: "domofon",
      label: "Домофон",
      placeholder: "Наличие или код",
      inputType: "text"
    },
    {
      type: "comment",
      label: "Комментарий",
      placeholder: "Любая информация, которая поможет найти вас быстрее",
      inputType: "text"
    }
  ],
  contacts: [
    {
      type: "number",
      label: "Телефон",
      placeholder: "7 9XX XXXXXXX",
      inputType: "text"
    },
    {
      type: "email",
      label: "Email",
      placeholder: "example@laapl.ru",
      inputType: "text"
    },
    {
      type: "name",
      label: "Имя",
      placeholder: "Иван Иванов",
      inputType: "text"
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
    items: [],
    suggestFocus: false,
    confirmOpen: false,
    code: "",
    verify: {
      code: null
    }
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
      findGeo(this.ymaps, currPos)
        .then(res => {
          this.setState({ point: res.coordinates });
        })
        .catch(err => console.log(err));
    });
  };

  suggest = e => {
    const value = e.target.value;
    this.ymaps
      .suggest(value, {
        results: 3,
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

  onFocusSuggest = () => {
    this.setState({
      suggestFocus: true
    });
  };

  onBlurSuggest = () => {
    setTimeout(() => {
      this.setState({ suggestFocus: false });
    }, 300);
  };

  onSelectSuggest = value => {
    findGeo(this.ymaps, value).then(res => {
      this.setState({ point: res.coordinates });
    });
  };

  onConfirm = () => {
    this.setState({
      confirmOpen: true
    });
    axios({
      method: "POST",
      url: "https://api.laapl.ru/api/auth/get_code",
      params: {
        phone: this.state.number.replace(/ /g, "")
      }
    });
  };

  onChangeConfirm = e => {
    const value = e.target.value;
    if (value.length === 5) {
      this.setState({
        code: value
      });
      axios({
        method: "POST",
        url: "https://api.laapl.ru/api/auth/check_code",
        params: {
          phone: this.state.number.replace(" ", ""),
          code: value
        }
      }).then(res => {
        const result = res.data.result;
        this.setState({
          verify: {
            ...this.state.verify,
            code: result
          }
        });
      });
    }
  };

  render() {
    const { isActive, zoom, point } = this.state;

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
          <NameBlock>Контакты</NameBlock>
          <Block.Contacts>
            {Inputs.contacts.map((item, i) => {
              if (item.type === "number")
                return (
                  <Input.Wrap key={item.type} type={item.type}>
                    <Input.Label>{item.label}</Input.Label>
                    <Input.InputNumber
                      placeholder={item.placeholder}
                      value={this.state[item.type]}
                      onChange={e => this.onChange(e, item.type)}
                      type={item.inputType}
                      mask="0 000 0000000"
                    />
                    <Input.Plus>+</Input.Plus>
                    {this.state.confirmOpen && (
                      <Confirm.Input
                        onChange={this.onChangeConfirm}
                        placeholder="Код из СМС"
                        verify={this.state.verify.code}
                      />
                    )}
                    {!this.state.confirmOpen && (
                      <Confirm.Button
                        onClick={this.onConfirm}
                        visible={this.state.number.length === 13}
                      >
                        Подтвердить
                      </Confirm.Button>
                    )}
                  </Input.Wrap>
                );
              return (
                <Input.Wrap key={item.type} type={item.type}>
                  <Input.Label>{item.label}</Input.Label>
                  <Input.Input
                    placeholder={item.placeholder}
                    value={this.state[item.type]}
                    onChange={e => this.onChange(e, item.type)}
                    type={item.inputType}
                  />
                </Input.Wrap>
              );
            })}
          </Block.Contacts>
          <NameBlock>Адрес доставки</NameBlock>
          <Block.Address>
            <YMaps
              query={{
                apikey: "94eb5873-7c63-4228-ab82-eea769147415",
                load: "Map,SuggestView,geocode,geolocation,suggest,geoQuery"
              }}
              version="2.1-dev"
              preload={true}
            >
              <Maps.Ymaps
                onBoundschange={e => {
                  findGeo(this.ymaps, e.originalEvent.newCenter)
                    .then(res => {
                      // console.log(res);
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
                        point: res.coordinates,
                        address: res.address.map(item => item.name).join(", "),
                        items: []
                      });
                      // this.Map.setCenter(res.coordinates, zoom);
                    })
                    .catch(err => console.log(err));
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
                <Maps.Background>
                  <Maps.Point>
                    <use xlinkHref="#point" />
                    <rect
                      width="100%"
                      height="100%"
                      style={{ fill: "transparent" }}
                    />
                  </Maps.Point>
                  <Maps.DisplayAddress>
                    <Maps.DisplayLocality>
                      {this.state.DisplayLocality}
                    </Maps.DisplayLocality>
                    <Maps.DisplayStreet>
                      {this.state.DisplayStreet}, {this.state.DisplayHouse}
                    </Maps.DisplayStreet>
                  </Maps.DisplayAddress>
                  <Maps.Controls>
                    <Tooltip animateFill={false} size="small" title="Отдалить">
                      <Maps.Zoom onClick={this.descZoom}>
                        <use xlinkHref="#desc" />
                        <rect
                          width="100%"
                          height="100%"
                          style={{ fill: "transparent" }}
                        />
                      </Maps.Zoom>
                    </Tooltip>
                    <Tooltip
                      animateFill={false}
                      size="small"
                      title="Моё местоположение"
                    >
                      <Maps.FindMe onClick={this.findMe}>
                        <use xlinkHref="#location" />
                        <rect
                          width="100%"
                          height="100%"
                          style={{ fill: "transparent" }}
                        />
                      </Maps.FindMe>
                    </Tooltip>
                    <Tooltip
                      animateFill={false}
                      size="small"
                      title="Приблизить"
                    >
                      <Maps.Zoom onClick={this.ascZoom}>
                        <use xlinkHref="#asc" />
                        <rect
                          width="100%"
                          height="100%"
                          style={{ fill: "transparent" }}
                        />
                      </Maps.Zoom>
                    </Tooltip>
                  </Maps.Controls>
                </Maps.Background>
              </Maps.Ymaps>
            </YMaps>
            {Inputs.address.map((item, i) => {
              if (item.type === "address")
                return (
                  <Input.Wrap key={item.type} type={item.type}>
                    <Input.Label>{item.label}</Input.Label>
                    <Input.Input
                      placeholder={item.placeholder}
                      value={this.state[item.type]}
                      onChange={this.suggest}
                      type={item.inputType}
                      onFocus={this.onFocusSuggest}
                      onBlur={this.onBlurSuggest}
                    />
                    <Suggest.Wrap focus={this.state.suggestFocus}>
                      {this.state.items.map((item, i) => {
                        return (
                          <Suggest.Item
                            onClick={() =>
                              this.onSelectSuggest(item.displayName)
                            }
                            key={i.toString()}
                          >
                            {item.displayName}
                          </Suggest.Item>
                        );
                      })}
                    </Suggest.Wrap>
                  </Input.Wrap>
                );
              return (
                <Input.Wrap key={item.type} type={item.type}>
                  <Input.Label>{item.label}</Input.Label>
                  <Input.Input
                    placeholder={item.placeholder}
                    value={this.state[item.type]}
                    onChange={e => this.onChange(e, item.type)}
                    type={item.inputType}
                  />
                </Input.Wrap>
              );
            })}
          </Block.Address>
          <NameBlock>Время доставки</NameBlock>
          <Block.Time>
            <Input.Wrap type="time">
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
            </Input.Wrap>
          </Block.Time>
        </OrderScrollArea>
        >
        {/* <OrderScrollArea stopScrollPropagation={true} horizontal={false}>
          <NameBlock>Адрес доставки</NameBlock>
          <NameBlock>Контакты</NameBlock>
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
          <NameBlock>Время доставки</NameBlock>
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
        </OrderScrollArea> */}
      </WrapOrder>
    );
  }
}

export default Order;
