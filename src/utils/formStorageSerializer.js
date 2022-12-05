import dayjs from "dayjs";

function serialize(value) {
  if (value instanceof Date) {
    return {
      isDate: true,
      date: dayjs(value).format("YYYY-MM-DD"),
    };
  } else {
    return value;
  }
}

function deserialize(value) {
  if (value?.isDate) {
    return dayjs(value.date).toDate();
  } else {
    return value;
  }
}

export default {
  read: (value) => {
    const parsedValue = value ? JSON.parse(value) : null;
    if (parsedValue) {
      for (const key of Object.keys(parsedValue)) {
        if (Array.isArray(parsedValue[key])) {
          parsedValue[key] = parsedValue[key].map(deserialize);
        } else {
          parsedValue[key] = deserialize(parsedValue[key]);
        }
      }
    }
    return parsedValue;
  },
  write: (value) => {
    const preparedValue = {};
    for (const key of Object.keys(value)) {
      if (Array.isArray(value[key])) {
        preparedValue[key] = value[key].map(serialize);
      } else {
        preparedValue[key] = serialize(value[key]);
      }
    }
    return JSON.stringify(preparedValue);
  },
};
