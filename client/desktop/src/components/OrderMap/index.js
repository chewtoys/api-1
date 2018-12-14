import React from "react";
import { Tooltip } from "react-tippy";
import { YMaps } from "react-yandex-maps";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
// Actions
import { formChange, changePoint } from "../Order/actions/formChange";
// UI
import { Maps } from "./ui";
// Fn
import { findGeo } from "../../util";
// Lang
import TextComponents from "../../lang/ru.json";

const minZoom = 12;
const maxZoom = 19;

class OrderMap extends React.PureComponent {
  state = {
    zoom: 17,
    locality: TextComponents["form.map.default.value.locality"],
    street: TextComponents["form.map.default.value.street"],
    house: TextComponents["form.map.default.value.house"],
    point: [52.275946, 104.359649]
  };

  ymaps = null;

  findMe = () => {
    this.ymaps.geolocation.get({ mapStateAutoApply: true }).then(res => {
      const currPos = res.geoObjects.position;
      findGeo(this.ymaps, currPos)
        .then(res => {
          this.props.changePoint(res.coordinates);
        })
        .catch(err => console.log(err));
    });
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
    const { zoom, locality, street, house } = this.state;
    const { point } = this.props.form.values;
    return (
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
                  locality: res.address.filter(
                    item => item.kind === "locality"
                  )[0].name,
                  street: res.address.filter(
                    item => item.kind === "street" || item.kind === "district"
                  )[0].name,
                  house: res.address.filter(item => item.kind === "house")[0]
                    .name,
                  items: []
                });
                this.props.changePoint(res.coordinates);
                this.props.formChange(
                  res.address.map(item => item.name).join(", "),
                  "address"
                );
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
            window.ymaps = e;
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
              <Maps.DisplayLocality>{locality}</Maps.DisplayLocality>
              <Maps.DisplayStreet>
                {street}, {house}
              </Maps.DisplayStreet>
            </Maps.DisplayAddress>
            <Maps.Controls>
              <Tooltip
                animateFill={false}
                size="small"
                title={TextComponents["form.map.control.zoom.desc"]}
              >
                <Maps.Zoom onClick={this.descZoom}>
                  <use xlinkHref="#desc" />
                  <rect width="100%" height="100%" fill="transparent" />
                </Maps.Zoom>
              </Tooltip>
              <Tooltip
                animateFill={false}
                size="small"
                title={TextComponents["form.map.control.find_me"]}
              >
                <Maps.FindMe onClick={this.findMe}>
                  <use xlinkHref="#location" />
                  <rect width="100%" height="100%" fill="transparent" />
                </Maps.FindMe>
              </Tooltip>
              <Tooltip
                animateFill={false}
                size="small"
                title={TextComponents["form.map.control.zoom.asc"]}
              >
                <Maps.Zoom onClick={this.ascZoom}>
                  <use xlinkHref="#asc" />
                  <rect width="100%" height="100%" fill="transparent" />
                </Maps.Zoom>
              </Tooltip>
            </Maps.Controls>
          </Maps.Background>
        </Maps.Ymaps>
      </YMaps>
    );
  }
}

export default connect(
  store => ({
    form: store.form
  }),
  dispatch =>
    bindActionCreators(
      {
        formChange: formChange,
        changePoint: changePoint
      },
      dispatch
    )
)(OrderMap);
