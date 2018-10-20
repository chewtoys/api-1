import React from "react";
import connect from "react-redux/lib/connect/connect";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import Item from "../Item";
import "./styles/index.css";

class Content extends React.Component {
    render() {
        const { data, match } = this.props;
        const category = data.data.filter((item) => item.aliase === match.params.category)[0];
        // const Item = import("../Item");
        
        if (!category) return <Redirect exact to="404" />
        return (
            <div className="content">
                <div id={category.aliase} className={"page " + category.aliase}>
                    <div className="page-title">
                        {category.name}
                    </div>
                    {category.items.map((item, a) => {
                        return (
                            <Item
                                key={item.id}
                                {...item}
                                // price={item.price}
                                // poster={item.poster}
                                // title={item.title}
                                // category={category.name}
                                // id={item.id}
                                // description={item.description}
                            />
                        );
                    })}
                </div>
            </div>
        )
    };
};

export default withRouter(
    connect((store) => ({
        data: store.data,
        settings: store.settings
    }))(Content)
);