import React from "react";
import "./styles/index.css";

export class LoadNav extends React.PureComponent {
    render() {
        return (
            <nav className="nav--loading loading">
                <div className="nav-icon--loading active" />
                <div className="nav-icon--loading" />
                <div className="nav-icon--loading" />
                <div className="nav-icon--loading" />
                <div className="nav-icon--loading" />
                <div className="nav-icon--loading" />
                <div className="nav-icon--loading" />
                <div className="nav-icon--loading" />
                <div className="nav-icon--loading" />
                <div className="nav-icon--loading" />
            </nav>
        )
    };
};

export class LoadLogin extends React.PureComponent {
    render() {
        return (
            <div className="login--loading loading" />
        )
    };
};

export class LoadCart extends React.PureComponent {
    render() {
        return (
            <div className="cart--loading loading" />
        )
    };
};

class LoadItem extends React.PureComponent {
    render() {
        return (
            <div className="item">
                <div className="item-poster" />
                <div className="item-title" />
                <div className="item-footer">
                    <div className="item-price" />
                    <div onClick={this.onClick} className="item-pay" />
                </div>
            </div>
        )
    };
};

export class LoadContent extends React.PureComponent {
    render() {
        return (
            <div className="page--loading loading">
                <div className="page-title" />
                <LoadItem />
                <LoadItem />
                <LoadItem />
                <LoadItem />
                <LoadItem />
                <LoadItem />
                <LoadItem />
                <LoadItem />
                <LoadItem />
                <LoadItem />
                <LoadItem />
                <LoadItem />
            </div>
        )
    };
};