export const validAddr = (res, callback) => {
  var obj = res.geoObjects.get(0),
    error,
    hint;

  if (obj) {
    switch (obj.properties.get("metaDataProperty.GeocoderMetaData.precision")) {
      case "exact":
        break;
      case "number":
      case "near":
      case "range":
        error = "Неточный адрес, требуется уточнение";
        hint = "Уточните номер дома";
        break;
      case "street":
        error = "Неполный адрес, требуется уточнение";
        hint = "Уточните номер дома";
        break;
      case "other":
      default:
        error = "Неточный адрес, требуется уточнение";
        hint = "Уточните адрес";
    }
    console.log(
      [
        obj.getThoroughfare(),
        obj.getPremiseNumber(),
        obj.getLocalities(),
        obj.getPremise()
      ]
        .reverse()
        .join(" ")
        .trim()
    );
    callback(obj);
  } else {
    error = "Адрес не найден";
    hint = "Уточните адрес";
  }

  // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
  if (error) {
    console.log(error);
    console.log(hint);
  } else {
    console.log(obj);
  }
};
