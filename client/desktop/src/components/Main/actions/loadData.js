import axios from "axios";

const REQ_LOAD_DATA = "main/REQ_LOAD_DATA";
const RES_LOAD_DATA = "main/RES_LOAD_DATA";
const ADD_TO_CART = "cart/ADD_TO_CART";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";

const initState = {
    loading: false,
    complite: false,
    data: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case REQ_LOAD_DATA:
            return {
                ...state,
                loading: true,
                complite: false
            };

        case RES_LOAD_DATA:
            return {
                ...state,
                loading: false,
                complite: true,
                data: action.data
            };

        case ADD_TO_CART:
            return {
                ...state,
                data: state.data.map((cat) => {
                    return {
                        ...cat,
                        items: cat.items.map(prod => {
                            if (prod.id === action.id) {
                                return {
                                    ...prod,
                                    count: prod.count + 1,
                                    recentСhange: (prod.count === 0) ? Date.now() : prod.recentСhange
                                }
                            } else {
                                return prod
                            }
                        })
                    }
                })
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                data: state.data.map((cat) => {
                    return {
                        ...cat,
                        items: cat.items.map(prod => {
                            if (prod.id === action.id) {
                                return {
                                    ...prod,
                                    count: prod.count - 1,
                                }
                            } else {
                                return prod
                            }
                        })
                    }
                })
            };

        default:
            return state;
    }
};

export const loadData = () => {
    return (dispatch) => {
        dispatch({
            type: REQ_LOAD_DATA
        });

        if (JSON.parse(localStorage["root"]).data.data.length) {
            dispatch({
                type: RES_LOAD_DATA,
                data: JSON.parse(localStorage["root"]).data.data
            });
        } else {
            axios({
                url: "https://kfc.laapl.ru/api/Products/getItems",
                method: "GET"
                // withCredentials: true
            }).then((res) => {
                const data = res.data.data.map((cat) => {
                    const items = cat.items.map((prod) => {
                        return { ...prod, count: 0, recentСhange: Date.now() };
                    });
                    return { ...cat, items };
                });
                dispatch({ type: RES_LOAD_DATA, data });
            });
        }        
    };
};

export const addToCart = (id) => {
    return {
        type: ADD_TO_CART,
        id
    }
};

export const removeFromCart = (id) => {
    return {
        type: REMOVE_FROM_CART,
        id
    }
};