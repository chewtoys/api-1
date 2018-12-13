const CHANGE = "form/CHANGE";
const CHANGE_POINT = "form/CHANGE_POINT";

const initStore = {
  email: "",
  username: "",
  number: "",
  address: "",
  entrance: "",
  apartment: "",
  domofon: "",
  comment: "",
  time: "",
  point: [52.275946, 104.359649]
};

export default (store = initStore, action) => {
  switch (action.type) {
    case CHANGE:
      return {
        ...store,
        [action.key]: action.value
      };

    case CHANGE_POINT:
      return {
        ...store,
        point: action.value
      };

    default:
      return store;
  }
};

export const formChange = (value, key) => {
  return {
    type: CHANGE,
    key,
    value
  };
};

export const changePoint = value => {
  return {
    type: CHANGE_POINT,
    value
  };
};
