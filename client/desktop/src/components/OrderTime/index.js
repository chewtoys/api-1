import React from "react";
import connect from "react-redux/lib/connect/connect";
import { bindActionCreators } from "redux";
import moment from "moment";
// UI
import { Block } from "./ui";
// FN
import { formatTimeToWork } from "../../util";
// Actions
import { formChange } from "../Order/actions/formChange";
// Lang
import TextComponents from "../../lang/ru.json";

class OrderTime extends React.PureComponent {
  state = {
    items: [],
    select: 0
  };

  componentDidMount() {
    const { settings } = this.props;

    const time_work = {
      start: moment(
        settings.filter(item => item.name === "start_worktime")[0].value,
        "HH:mm"
      ),
      end: moment(
        settings.filter(item => item.name === "end_worktime")[0].value,
        "HH:mm"
      )
    };

    const items = formatTimeToWork(time_work);

    this.setState({
      items
    });

    this.props.formChange(items[0], "time");
  }

  onSelect = (key, value) => {
    this.setState({
      select: key
    });
    this.props.formChange(value, "time");
  };

  render() {
    const { items, select } = this.state;
    return (
      <>
        <Block.Wrap>
          <Block.Title>
            {TextComponents["form.time.title"]}
            <span>{moment().format("DD.MM.YYYY")}</span>
          </Block.Title>
          {items.map((item, i) => {
            return (
              <Block.Item
                onClick={e => this.onSelect(i, item)}
                select={select === i}
                key={item}
              >
                {item}
              </Block.Item>
            );
          })}
        </Block.Wrap>
      </>
    );
  }
}
export default connect(
  store => ({
    settings: store.settings.data
  }),
  dispatch =>
    bindActionCreators(
      {
        formChange: formChange
      },
      dispatch
    )
)(OrderTime);
