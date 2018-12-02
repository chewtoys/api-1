import React from "react";
import connect from "react-redux/lib/connect/connect";
import { withRouter } from "react-router-dom";
import { Tooltip } from "react-tippy";
// UI
import { Panel, Nav, Background } from "./ui";

const LeftPanael = ({ data, location }) => {
  return (
    <Panel>
      <Nav.Wrap>
        {data.data.map((cat, i) => {
          const url = `https://kfc.laapl.ru${cat.items[0].poster}`;
          return (
            <Nav.Link
              key={i.toString()}
              to={"/" + cat.aliase}
              selected={location.pathname === "/" + cat.aliase}
            >
              <Tooltip position="right" title={cat.name}>
                <Nav.Item bgImage={url} />
              </Tooltip>
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
