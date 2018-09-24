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

        if (!loading && complite) {            
            const item = data
                .filter((category) => category.name === match.params.category)[0].items
                .filter((item) => item.id === match.params.id)[0];
                console.log(item);
                
            this.setState({
                loading: true,
                item
            })
        }
    };

    componentWillUnmount() {
        document.querySelector("body").classList.remove("scroll--disabled");
    }

    render() {
        const { match } = this.props;
        const { item, loading } = this.state;
        
        if (loading) return (
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
                            {item.ru}
                        </div>
                        <Link to={"/" + match.params.category} className="modal-top--close">
                            ×
                        </Link>
                    </div>
                    <div className="modal-body">
                        <div className="modal-body--poster" style={{ backgroundImage: `url(${item.poster})`, width: (window.screen.availHeight - 200) + "px", height: (window.screen.availHeight - 200) + "px" }} />
                        <div className="modal-body--active">
                            <div className="modal-body--price">
                                {item.price}₽
                            </div>
                            <div className="modal-body--pay">
                                В КОРЗИНУ
                            </div>
                        </div>
                        <div className="modal-body--description">
                            {item.description}
                        </div>
                    </div>
                </Scrollbars>
            </div>
        )
        return (
            <div className="modal-wrap">
                <Link to={"/" + match.params.category} className="modal-close">
                    x
                </Link>
                <div className="modal-title">
                    {/* {item.ru} */}
                </div>
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