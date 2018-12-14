/**
 * @todo Нужен рефокторинг когда. Доделать валидацию полей, оптимизировать ее и добавить анимацию.
 */
import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
// Actions
import { formChange, changePoint } from "../Order/actions/formChange";
// UI
import { Block, Input, Suggest } from "./ui";
// Fn
import { findGeo } from "../../util";

class OrderAddress extends React.PureComponent {
  state = {
    items: [],
    suggestFocus: false,
    validation: {
      address: 2,
      entrance: 2,
      apartment: 2,
      domofon: 2,
      comment: 2
    }
  };

  suggest = e => {
    const { formChange } = this.props;
    const value = e.target.value;
    window.ymaps
      .suggest(value, {
        results: 3,
        boundedBy: [[52.419859, 104.027374], [52.217885, 104.598663]]
      })
      .then(res => {
        this.setState({
          items: res
        });
        // console.log(res);
      });
    formChange(value, "address");
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
    findGeo(window.ymaps, value)
      .then(res => {
        this.props.changePoint(res.coordinates);
        this.setState({
          validation: {
            ...this.state.validation,
            address: 1
          }
        });
        // this.setState({ point: res.coordinates });
      })
      .catch(err => {
        this.setState({
          validation: {
            ...this.state.validation,
            address: 0
          }
        });
      });
  };

  validInput = (value, type) => {
    if (value !== "") {
      this.setState({
        validation: {
          ...this.state.validation,
          [type]: 1
        }
      });
    } else {
      this.setState({
        validation: {
          ...this.state.validation,
          [type]: 0
        }
      });
    }
  };

  render() {
    const {
      address,
      entrance,
      apartment,
      domofon,
      comment
    } = this.props.form.values;
    const { formChange } = this.props;

    return (
      <Block.Address>
        <Input.Wrap type="address">
          <Input.Label>Адрес</Input.Label>
          <Input.Input
            placeholder="улица Можайского, 7, Иркутск"
            value={address}
            onChange={this.suggest}
            type="text"
            onFocus={this.onFocusSuggest}
            onBlur={this.onBlurSuggest}
          />
          <Input.Valid validation={this.state.validation.address}>
            {this.state.validation.address === 1 && <use xlinkHref="#check" />}
            {this.state.validation.address === 0 && (
              <use xlinkHref="#closewindow" />
            )}
            <rect width="100%" height="100%" fill="transparent" />
          </Input.Valid>
          <Suggest.Wrap focus={this.state.suggestFocus}>
            {this.state.items.map((item, i) => {
              return (
                <Suggest.Item
                  onClick={() => this.onSelectSuggest(item.displayName)}
                  key={i.toString()}
                >
                  {item.displayName}
                </Suggest.Item>
              );
            })}
          </Suggest.Wrap>
        </Input.Wrap>
        <Input.Wrap type="entrance">
          <Input.Label>Подъезд</Input.Label>
          <Input.Input
            placeholder="1"
            value={entrance}
            onChange={e => formChange(e.target.value, "entrance")}
            type="text"
            onBlur={e => this.validInput(e.target.value, "entrance")}
          />
          <Input.Valid validation={this.state.validation.entrance}>
            {this.state.validation.entrance === 1 && <use xlinkHref="#check" />}
            {this.state.validation.entrance === 0 && (
              <use xlinkHref="#closewindow" />
            )}
            <rect width="100%" height="100%" fill="transparent" />
          </Input.Valid>
        </Input.Wrap>
        <Input.Wrap type="apartment">
          <Input.Label>Квартира</Input.Label>
          <Input.Input
            placeholder="1"
            value={apartment}
            onChange={e => formChange(e.target.value, "apartment")}
            type="text"
            onBlur={e => this.validInput(e.target.value, "apartment")}
          />
          <Input.Valid validation={this.state.validation.apartment}>
            {this.state.validation.apartment === 1 && (
              <use xlinkHref="#check" />
            )}
            {this.state.validation.apartment === 0 && (
              <use xlinkHref="#closewindow" />
            )}
            <rect width="100%" height="100%" fill="transparent" />
          </Input.Valid>
        </Input.Wrap>
        <Input.Wrap type="domofon">
          <Input.Label>Домофон</Input.Label>
          <Input.Input
            placeholder="Наличие или код"
            value={domofon}
            onChange={e => formChange(e.target.value, "domofon")}
            type="text"
            onBlur={e => this.validInput(e.target.value, "domofon")}
          />
          <Input.Valid validation={this.state.validation.domofon}>
            {this.state.validation.domofon === 1 && <use xlinkHref="#check" />}
            {this.state.validation.domofon === 0 && (
              <use xlinkHref="#closewindow" />
            )}
            <rect width="100%" height="100%" fill="transparent" />
          </Input.Valid>
        </Input.Wrap>
        <Input.Wrap type="comment">
          <Input.Label>Комментарий</Input.Label>
          <Input.Input
            placeholder="Любая информация, которая поможет найти вас быстрее"
            value={comment}
            onChange={e => formChange(e.target.value, "comment")}
            type="text"
            onBlur={e => this.validInput(e.target.value, "comment")}
          />
          <Input.Valid validation={this.state.validation.comment}>
            {this.state.validation.comment === 1 && <use xlinkHref="#check" />}
            {this.state.validation.comment === 0 && (
              <use xlinkHref="#closewindow" />
            )}
            <rect width="100%" height="100%" fill="transparent" />
          </Input.Valid>
        </Input.Wrap>
      </Block.Address>
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
)(OrderAddress);
