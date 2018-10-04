import React from "react";
import { withRouter, Link } from "react-router-dom";
import connect from "react-redux/lib/connect/connect";
import { Scrollbars } from "react-custom-scrollbars";
// import { bindActionCreators } from "redux";
import "./styles/index.css";

class ViewItem extends React.Component {
    state = {
        loading: false,
        item: null
    };

    componentDidMount() {
        const { data, complite, loading, match } = this.props;

        document.querySelector("body").classList.add("scroll--disabled");
    };

    componentWillUnmount() {
        document.querySelector("body").classList.remove("scroll--disabled");
    }

    render() {
        const { match } = this.props;
        const { item, loading } = this.state;
        
        return (
            <div className="modal-wrap">
                <Scrollbars
                    renderView={() => <div className="modal" />}
                    renderThumbVertical={(props) => <div style={{height: props.height, transform: props.transform}} className="modal--thumb" />}
                    hideTracksWhenNotNeeded={true}
                    autoHide={true}
                    style={{ width: "100%", height: "100%" }}
                >
                    <div className="modal-top">
                        <div className="modal-top--title">
                            Ваш заказ
                        </div>
                        <div to={"/" + match.params.category} className="modal-top--close">
                            ×
                        </div>
                    </div>
                    <div className="modal-body">
                    </div>
                </Scrollbars>
            </div>
        )
    }
};

export default withRouter(
    connect(
        (store) => ({
            data: store.data.data,
            complite: store.data.complite,
            loading: store.data.loading,
        }),
        // (dispatch) =>
        //     bindActionCreators(
        //         {
        //             loadData: loadData
        //         },
        //         dispatch
        //     )
    )(ViewItem)
);;