import React from "react";
import connect from "react-redux/lib/connect/connect";
import { withRouter } from "react-router-dom";
// UI
import { Panel, NavBar, NavLink, Background, Title } from "./ui";

const LeftPanael = ({ data, location }) => {
    return (
        <Panel>
            <NavBar>
                {data.data.map((cat, i) => {
                    return (
                        <NavLink
                            key={i.toString()}
                            to={"/" + cat.aliase}
                            selected={location.pathname === "/" + cat.aliase}
                        >
                            <Title>{cat.name}</Title>
                        </NavLink>
                    );
                })}
                <Background />
            </NavBar>
        </Panel>
    )
};

export default withRouter(
    connect((store) => ({
        data: store.data
    }))(LeftPanael)
);
