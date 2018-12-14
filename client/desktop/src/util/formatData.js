export const formatData = (data, offset = -1) => {
  let cartItems = [];
  let count = 0;
  let total = 0;
  const sortFn = (a, b) => {
    if (a.recentСhange > b.recentСhange) return 1;
    if (a.recentСhange < b.recentСhange) return -1;
  };
  data
    .map(cat => {
      return cat.items.filter(prod => prod.count > 0);
    })
    .forEach(item => {
      cartItems = cartItems.concat(item);
    });
  cartItems.sort(sortFn);
  cartItems.forEach((item, i) => {
    if (i > offset) {
      count = count + item.count;
    }
    total = total + item.price * item.count;
  });
  return { data: cartItems, count, total };
};
