const routeExport = (obj: object) => {
  return {
    ...obj,
    [Symbol.iterator]: function*() {
      let properties = Object.keys(this);
      for (let i of properties) {
        yield this[i];
      }
    },
  };
};

export default routeExport;
