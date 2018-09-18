import axios from "axios";
import data, { sandwichesCat } from "../menu";
import sandwiches from '../icon/sandwiches.png';
import flatDreadSandwiches from '../icon/flatDreadSandwiches.png';
import chicken from '../icon/chicken.png';
import basket from '../icon/basket.png';
import snacks from '../icon/snacks.png';
import sauces from '../icon/sauces.png';
import salads from '../icon/salads.png';
import desserts from '../icon/desserts.png';
import drinks from '../icon/drinks.png';
import hotDrink from '../icon/hotDrink.png';
import breakfast from '../icon/breakfast.png';
import hits from '../icon/hits.png';
import combo from '../icon/combo.png';
import logo from '../icon/logo.svg';


const REQ_LOAD_DATA = "REQ_LOAD_DATA";
const RES_LOAD_DATA = "RES_LOAD_DATA";

const initState = {
    loading: false,
    complite: false,
    data: [
        {
            ru: "Главная",
            icon: logo,
            name: "main",
            items: []
        },
        {
            ru: "Бургеры",
            icon: sandwiches,
            name: "burgers",
            items: [
            ]
        },
        {
            ru: "Сэндвичи в лепешках",
            icon: flatDreadSandwiches,
            name: "flatDreadSandwiches",
            items: []
        },
        {
            ru: "Курица",
            icon: chicken,
            name: "chicken",
            items: []
        },
        {
            ru: "Баскеты",
            icon: basket,
            name: "basket",
            items: []
        },
        {
            ru: "Снэки",
            icon: snacks,
            name: "snacks",
            items: []
        },
        {
            ru: "Соусы",
            icon: sauces,
            name: "sauces",
            items: []
        },
        {
            ru: "Салаты",
            icon: salads,
            name: "salads",
            items: []
        },
        {
            ru: "Десерты",
            icon: desserts,
            name: "desserts",
            items: []
        },
        {
            ru: "Напитки",
            icon: drinks,
            name: "drinks",
            items: []
        },
        {
            ru: "Горячие напитки",
            icon: hotDrink,
            name: "hotDrink",
            items: []
        },
        {
            ru: "Завтрак (до 11:00)",
            icon: breakfast,
            name: "breakfast",
            items: []
        },
        {
            ru: "Комбо",
            icon: combo,
            name: "combo",
            items: []
        },
        {
            ru: "Хиты по 50 руб.",
            icon: hits,
            name: "hits",
            items: []
        },
    ]
};

export default (state = initState, action) => {
    switch (action.type) {
        case REQ_LOAD_DATA:
            return {
                ...state,
                loading: true,
                complite: false
            }

        case RES_LOAD_DATA:
            return {
                ...state,
                loading: false,
                complite: true,
                data: action.data
            }

        default:
            return state
    }
};

export const loadData = () => {
    return (dispatch, store) => {
        console.log(store())
        dispatch({
            type: REQ_LOAD_DATA
        })
        setTimeout(() => {
            dispatch({
                type: RES_LOAD_DATA,
                data: data.map(item => {
                    return {
                        ...item,
                        items: sandwichesCat
                    }
                })
            })
        }, 500);
    }
}