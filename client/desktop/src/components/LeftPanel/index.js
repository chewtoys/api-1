import React from "react";
import connect from "react-redux/lib/connect/connect";
import { withRouter } from "react-router-dom";
// UI
import { Panel, Nav, Background } from "./ui";

const LeftPanael = ({ data, location }) => {
  return (
    <Panel>
      <Nav.Wrap>
        {data.data.map((cat, i) => {
          return (
            <Nav.Link
              key={i.toString()}
              to={"/" + cat.aliase}
              selected={location.pathname === "/" + cat.aliase}
            >
              <Nav.Item bgImage={`https://laapl.ru${cat.items[0].poster}`} />
            </Nav.Link>
          );
        })}
        <Background />
      </Nav.Wrap>
    </Panel>
  );
};

export default withRouter(
  connect(store => ({
    data: store.data
  }))(LeftPanael)
);
