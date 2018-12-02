import React from "react";
import connect from "react-redux/lib/connect/connect";
import { withRouter, Link } from "react-router-dom";
// UI
import { Panel, Nav, Background, Title } from "./ui";

const LeftPanael = ({ data, location }) => {
  return (
    <Panel>
      <Nav.Wrap>
        {data.data.map((cat, i) => {
          const url = `https://kfc.laapl.ru${cat.items[0].poster}`;
          return (
            <Nav.Link key={i.toString()} to={"/" + cat.aliase}>
              <Nav.Item
                selected={location.pathname === "/" + cat.aliase}
                bgImage={url}
              >
                <Title>{cat.name}</Title>
              </Nav.Item>
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
