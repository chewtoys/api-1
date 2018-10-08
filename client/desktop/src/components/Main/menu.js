import uuid from "uuid/v4";
import sandwiches from './icon/sandwiches.png';
import flatDreadSandwiches from './icon/flatDreadSandwiches.png';
import chicken from './icon/chicken.png';
import basket from './icon/basket.png';
import snacks from './icon/snacks.png';
import sauces from './icon/sauces.png';
import salads from './icon/salads.png';
import desserts from './icon/desserts.png';
import drinks from './icon/drinks.png';
import hotDrink from './icon/hotDrink.png';
import breakfast from './icon/breakfast.png';
import hits from './icon/hits.png';
import combo from './icon/combo.png';
import logo from './icon/logo.svg';
import sandwiche_1 from "./posters/product_844_922670555.png"
import sandwiche_2 from "./posters/product_684_911563647.png"
import sandwiche_3 from "./posters/product_1014_671781511.png"
import sandwiche_4 from "./posters/product_712_1704734500.png"
import sandwiche_5 from "./posters/product_1015_676056153.png"
import sandwiche_6 from "./posters/product_860_1512905571.png"
import sandwiche_7 from "./posters/product_1241_1219892668.png"
import sandwiche_8 from "./posters/product_1240_1022773019.png"
import sandwiche_9 from "./posters/product_267_982096271.png"
import sandwiche_10 from "./posters/product_1124_763426707.png"
import sandwiche_11 from "./posters/product_614_836467336.png"

export default [
  {
    ru: "Главная",
    icon: logo,
    name: "main"
  },
  {
    ru: "Бургеры",
    icon: sandwiches,
    name: "burgers"
  },
  {
    ru: "Сэндвичи в лепешках",
    icon: flatDreadSandwiches,
    name: "flatDreadSandwiches"
  },
  {
    ru: "Курица",
    icon: chicken,
    name: "chicken"
  },
  {
    ru: "Баскеты",
    icon: basket,
    name: "basket"
  },
  {
    ru: "Снэки",
    icon: snacks,
    name: "snacks"
  },
  {
    ru: "Соусы",
    icon: sauces,
    name: "sauces"
  },
  {
    ru: "Салаты",
    icon: salads,
    name: "salads"
  },
  {
    ru: "Десерты",
    icon: desserts,
    name: "desserts"
  },
  {
    ru: "Напитки",
    icon: drinks,
    name: "drinks"
  },
  {
    ru: "Горячие напитки",
    icon: hotDrink,
    name: "hotDrink"
  },
  {
    ru: "Завтрак (до 11:00)",
    icon: breakfast,
    name: "breakfast"
  },
  {
    ru: "Комбо",
    icon: combo,
    name: "combo"
  },
  {
    ru: "Хиты по 50 руб.",
    icon: hits,
    name: "hits"
  },
];

export const sandwichesCat = [
  {
    ru: "Темный Бургер Ржаной",
    poster: sandwiche_1,
    description: "Бургер с нежнейшим мясом бедра цыпленка, с соусом барбекю, свежими овощами, сыром чеддер и эмменталер, маринованными огурчиками и халапеньо на ароматной ржаной булочке.",
    price: 169,
    id: uuid()
  },
  {
    ru: "Двойной Темный бургер",
    poster: sandwiche_2,
    description: "Невероятно большой бургер с нежнейшим мясом бедра цыпленка:  два филе на ароматной ржаной булочке с соусом барбекю, свежими овощами, сыром чеддер и эмменталер, маринованными огурчиками и халапеньо.",
    price: 259,
    id: uuid()
  },
  {
    ru: "Шефбургер",
    poster: sandwiche_3,
    description: "Попробуйте новый уникальный бургер от шефа! Нежный сливочный соус, сочное филе в оригинальной  панировке, салат айcберг и помидоры на пшеничной булочке  с черно-белым кунжутом.",
    price: 99,
    id: uuid()
  },
  {
    ru: "Чизбургер",
    poster: sandwiche_4,
    description: "Пряный горчичный соус, кетчуп, сочные стрипсы в оригинальной панировке, лук, сыр Чеддер, огурцы на пшеничной булочке с кукурузной посыпкой.",
    price: 69,
    id: uuid()
  },
  {
    ru: "Острый Шефбургер",
    poster: sandwiche_5,
    description: "Попробуйте новый уникальный бургер от шефа! острая курочка в панировке Hot&spicy, сочные листья салата, пикантные маринованные огурчики, лук, фирменный соус «Бургер» и булочка с черно-белым кунжутом.",
    price: 99,
    id: uuid()
  },
  {
    ru: "Чизбургер Де Люкс",
    poster: sandwiche_6,
    description: "Пряный горчичный соус, кетчуп, сочное филе в оригинальной панировке, лук, сыр Чеддер, огурцы на пшеничной булочке с кукурузной посыпкой, свежий салат и ломтики помидора.",
    price: 124,
    id: uuid()
  },
  {
    ru: "Острый Шефбургер Де Люкс",
    poster: sandwiche_7,
    description: "Острый бургер от шефа  теперь де Люкс! острое филе в хрустящей панировке, салат айсберг,  маринованные огурцы, лук, фирменный соус «Бургер», булочка с кунжутом, ломтик сыра и два ломтика бекона.",
    price: 144,
    id: uuid()
  },
  {
    ru: "Шефбургер Де Люкс",
    poster: sandwiche_8,
    description: "Бургер от шефа теперь Де Люкс! Сочное филе в оригинальной панировке, томаты, салат айсберг, соус Цезарь, аппетитная булочка, ломтик сыра и два ломтика бекона.",
    price: 144,
    id: uuid()
  },
  {
    ru: "Хот-дог Куриный",
    poster: sandwiche_9,
    description: "Хот-дог с куриной колбаской с травами, сладким горчичным соусом, кетчупом, маринованными огурчиками и халапеньо.",
    price: 79,
    id: uuid()
  },
  {
    ru: "Лонгер Русс",
    poster: sandwiche_10,
    description: "Ароматный Лонгер с сочной оригинальной курочкой, сметанно-луковым соусом, маринованными огурцами и луком.",
    price: 50,
    id: uuid()
  },
  {
    ru: "Лонгер BBQ",
    poster: sandwiche_11,
    description: "Сочная курочка, маринованные огурчики и аппетитный соус барбекю! Спешите попробовать!",
    price: 50,
    id: uuid()
  },
]