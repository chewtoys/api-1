import axios from "axios";

const REQ_LOAD_DATA = "main/REQ_LOAD_DATA";
const RES_LOAD_DATA = "main/RES_LOAD_DATA";

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

        default:
            return state;
    };
};

export const loadData = () => {
    return (dispatch) => {
        dispatch({
            type: REQ_LOAD_DATA
        });

        axios({
            url: "https://kfc.laapl.ru/api/Products/getItems",
            method: "GET",
            // withCredentials: true
        }).then(res => {
            dispatch({ type: RES_LOAD_DATA, data: res.data.data });
        });
    };
};