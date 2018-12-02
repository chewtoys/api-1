import React from "react";
import connect from "react-redux/lib/connect/connect";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
// Custom Components
import Item from "../Item";
// UI
import { WrapContent, Title } from "./ui";

class Content extends React.PureComponent {
    static contextTypes = {
        scrollArea: PropTypes.object
    };

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            setTimeout(() => {
                this.context.scrollArea.scrollTop();
            }, 50);
        };
    };

    render() {
        const { data, match, open } = this.props;
        const category = data.data.filter((item) => item.aliase === match.params.category)[0];

        // if (!category) return <Redirect exact to="/NotFound" />;
        return (
            <WrapContent open={open}>
                <Title>{category.name}</Title>
                {category.items.map((item, a) => {
                    return <Item key={item.id} {...item} />;
                })}
            </WrapContent>
        );
    };
};

export default withRouter(
    connect((store) => ({
        data: store.data,
        settings: store.settings,
        open: store.cart.open
    }))(Content)
);