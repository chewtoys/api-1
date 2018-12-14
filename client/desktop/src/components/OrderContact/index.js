import React from "react";
import axios from "axios";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
// Actions
import { formChange } from "../Order/actions/formChange";
// UI
import { Block, Input, Confirm } from "./ui";

class OrderContact extends React.Component {
  state = {
    confirmOpen: false,
    code: "",
    validation: {
      email: 2,
      username: 2,
      number: 2
    }
  };

  onConfirm = () => {
    const { number } = this.props.form.values;

    this.setState({
      confirmOpen: true
    });
    axios({
      method: "POST",
      url: "https://api.laapl.ru/api/auth/get_code",
      params: {
        phone: number.replace(/ /g, "")
      }
    });
  };

  onChangeConfirm = e => {
    const { number } = this.props.form.values;

    const value = e.target.value;
    if (value.length === 5) {
      this.setState({
        code: value
      });
      axios({
        method: "POST",
        url: "https://api.laapl.ru/api/auth/check_code",
        params: {
          phone: number.replace(/ /g, ""),
          code: value
        }
      }).then(res => {
        const result = res.data.result;
        this.setState({
          validation: {
            ...this.state.validation,
            number: result ? 1 : 0
          }
        });
      });
    }
  };

  setValidValueYes = (value, type) => {
    this.setState({
      validation: {
        ...this.state.validation,
        [type]: 1
      }
    });
  };

  validEmail = value => {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;

    if (reg.test(value) === false) {
      this.setState({
        validation: {
          ...this.state.validation,
          email: 0
        }
      });
    } else {
      this.setState({
        validation: {
          ...this.state.validation,
          email: 1
        }
      });
    }
  };

  validUsername = value => {
    if (value === "") {
      this.setState({
        validation: {
          ...this.state.validation,
          username: 0
        }
      });
    } else {
      this.setState({
        validation: {
          ...this.state.validation,
          username: 1
        }
      });
    }
  };

  render() {
    const { number, username, email } = this.props.form.values;

    return (
      <Block.Contacts>
        <Input.Wrap type="number">
          <Input.Label>Телефон</Input.Label>
          <Input.InputNumber
            placeholder="7 9XX XXXXXXX"
            value={number}
            onChange={e => this.props.formChange(e.target.value, "number")}
            type="text"
            mask="0 000 0000000"
            disabled={this.state.validation.number === 1}
          />
          <Input.Plus>+</Input.Plus>
          {this.state.confirmOpen && this.state.validation.number !== 1 && (
            <Confirm.Input
              onChange={this.onChangeConfirm}
              placeholder="Код"
              verify={this.state.validation.number}
              autoFocus={true}
            />
          )}
          {!this.state.confirmOpen && this.state.validation.number !== 1 && (
            <Confirm.Button
              onClick={this.onConfirm}
              visible={number.length === 13}
            >
              Подтвердить
            </Confirm.Button>
          )}
          {this.state.validation.number === 1 && (
            <Input.Valid validation={this.state.validation.number}>
              <use xlinkHref="#check" />
              <rect width="100%" height="100%" fill="transparent" />
            </Input.Valid>
          )}
        </Input.Wrap>
        <Input.Wrap type="username">
          <Input.Label>Имя</Input.Label>
          <Input.Input
            placeholder="Иван Иванов"
            value={username}
            onChange={e => this.props.formChange(e.target.value, "username")}
            onBlur={e => this.validUsername(e.target.value)}
            type="text"
          />
          <Input.Valid validation={this.state.validation.username}>
            {this.state.validation.username === 1 && <use xlinkHref="#check" />}
            {this.state.validation.username === 0 && (
              <use xlinkHref="#closewindow" />
            )}
            <rect width="100%" height="100%" fill="transparent" />
          </Input.Valid>
        </Input.Wrap>
        <Input.Wrap type="email">
          <Input.Label>Email</Input.Label>
          <Input.Input
            placeholder="email@laapl.ru"
            value={email}
            onChange={e => this.props.formChange(e.target.value, "email")}
            onBlur={e => this.validEmail(e.target.value)}
            type="text"
          />
          <Input.Valid validation={this.state.validation.email}>
            {this.state.validation.email === 1 && <use xlinkHref="#check" />}
            {this.state.validation.email === 0 && (
              <use xlinkHref="#closewindow" />
            )}
            <rect width="100%" height="100%" fill="transparent" />
          </Input.Valid>
        </Input.Wrap>
      </Block.Contacts>
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
        formChange: formChange
      },
      dispatch
    )
)(OrderContact);
