export const findGeo = (ymaps, props) => {
  return new Promise((resolve, reject) => {
    ymaps
      .geocode(props)
      .then(res => {
        const obj = res.geoObjects.get(0);
        const data = obj.properties.get("metaDataProperty.GeocoderMetaData");
        console.log(obj);
        const address = data.Address.Components.filter(
          item =>
            item.kind === "locality" ||
            item.kind === "street" ||
            item.kind === "district" ||
            item.kind === "house"
        );
        const coordinates = data.InternalToponymInfo.Point.coordinates.reverse();
        const answer = {
          address,
          coordinates
        };
        if (obj) {
          switch (data.precision) {
            case "exact":
              resolve(answer);
              break;
            case "number":
            case "near":
            case "range":
              reject("Уточните номер дома");
              break;
            case "street":
              reject("Уточните номер дома");
              break;
            case "other":
            default:
              reject("Уточните адрес");
          }
        } else {
          reject("Уточните адрес");
        }
      })
      .catch(e => {
        reject(e);
      });
  });
};
