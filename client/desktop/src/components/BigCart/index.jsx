import React from "react";
// Styles
import "./styles/index.css";

export default class BigCart extends React.Component {
    input = React.createRef();

    componentDidMount() {
        window.ymaps.ready(() => {
            const suggestView = new window.ymaps.SuggestView(this.input.current, {
                results: 5,
                offset: [20, 0],
                boundedBy: [
                    [52.288472, 104.239408],
                    [52.221471, 104.292966],
                    [52.248874, 104.365407],
                    [52.302787, 104.344808]
                ]
            });
        });
    };

    render() {
        return (
            <div className="cart-big">
                <input ref={this.input} id="suggest" type="text" />
            </div>
        )
    }
}