import React from "react";
import connect from "react-redux/lib/connect/connect";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import $ from "jquery";
import { TweenMax, Elastic, Power1, Power4 } from "gsap";
// Styles
import "./styles/index.css";

class LeftPanael extends React.PureComponent {
    cur = React.createRef();
    state = {
        spacing: 0,
        halfSpacing: 0,
        startPos: 0,
        itemsSpacing: 450,
        lastItem: 0,
        lastItemR: 0,
        lastTime: Date.now(),
        pos: 0,
        key: 0
    };

    test = {

    }

    componentDidMount() {
        const items = document.querySelectorAll(".nav-icon");
        const startPos = document.querySelector(".nav-icon").getBoundingClientRect().top;
        // var distance = second.offsetTop - first.offsetTop - first.offsetHeight;
        const spacing =
            parseFloat(document.querySelector(".nav-icon").getBoundingClientRect().height) +
            (parseFloat(window.getComputedStyle(document.querySelector(".nav-icon"))["margin-top"]) *
                2);
        // const temp1 = parseFloat($dots.css("width")) + (parseFloat($dots.css("marginLeft")) * 2)
        this.setState({ spacing: spacing, startPos: startPos, halfSpacing: spacing / 2 });
        console.log(spacing);
        $(this.cur.current).data("pos", { y: startPos });
        // TweenMax.to($(this.cur.current).data("pos"), 0.6, {
        //     y: this.state.startPos + dest,
        //     onUpdate: this.updatePos,
        //     onComplete: this.updatePos,
        //     // ease: Ease
        //     ease: Power4.easeOut,
        //     easeParams: [1.1, 0.6]
        // });
        // this.cur.current.dataset.y = startPos;
        // console.log(parseFloat(window.getComputedStyle(document.querySelector(".nav-icon"))["margin-top"]) * 2);
        const key = this.props.data.data.forEach((item, i) => {
            if ("/" + item.aliase === this.props.location.pathname) {
                setTimeout(() => {
                    this.onClick(null, i);
                }, 50);
            }
        });
    };

    updatePos = () => {
        const pos = $(this.cur.current).data("pos").y - this.state.startPos;
        // console.log(this.cur.current.dataset.y - this.state.startPos);

        let scale = pos % this.state.spacing;
        if (scale > this.state.halfSpacing) {
            scale = this.state.halfSpacing - (scale - this.state.halfSpacing);
        }
        scale = 1 - (scale / this.state.halfSpacing) * 0.35;

        TweenMax.set($(this.cur.current), {
            y: pos + this.state.startPos,
            scale: scale * 1.6,
            force3D: true
        });

        const curItem = pos / this.state.spacing;
        const curItemR = Math.round(curItem);

        const now = Date.now();
        const diff = now - this.state.lastTime;
        const deltaTime = diff / (1000 / 60);

        if (this.state.lastItemR !== curItemR) {
            const $bounceDot = $(".nav-icon").eq(this.state.lastItemR);

            TweenMax.to($bounceDot, 0.1, {
                y: 60 * ((curItem - this.state.lastItem) / deltaTime),
                ease: Power1.easeOut,
                onComplete: function() {
                    TweenMax.to($bounceDot, 1, {
                        y: 0,
                        ease: Elastic.easeOut,
                        easeParams: [1.1, 0.5]
                    });
                }
            });
        }
        this.setState({
            lastItem: curItem,
            lastItemR: curItemR,
            lastTime: now
        });
    };

    onClick = (e, key) => {
        const dest = key * this.state.spacing;
        
        TweenMax.to($(this.cur.current).data("pos"), 0.6, {
            y: this.state.startPos + dest,
            onUpdate: this.updatePos,
            onComplete: this.updatePos,
            ease: Power4.easeOut,
            easeParams:[1.1,0.6]
        });
    };

    render() {
        const { data, settings } = this.props;

        return (
            <div className="left-panel">
                <div ref={this.cur} className="item--current" />
                <nav className="nav">
                    {data.data.map((item, i) => {
                        return (
                            <Link
                                key={i.toString()}
                                to={item.aliase}
                                className={`nav-icon ${item.aliase} ${
                                    this.props.location.pathname === "/" + item.aliase
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <div
                                    onClick={(e) => this.onClick(e, i)}
                                    // src={`https://kfc.laapl.ru${item.icon}`}
                                />
                            </Link>
                        );
                    })}
                </nav>
                {/* <FilterSVG /> */}
            </div>
        );
    }
}

const FilterSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100">
        <defs>
            <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
        </defs>
    </svg>
);

export default withRouter(
    connect((store) => ({
        data: store.data,
        settings: store.settings
    }))(LeftPanael)
);
