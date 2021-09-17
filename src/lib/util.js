const isEmptyObject = (obj) => {
  return !!obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

const isValidDate = (date) => {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    // it is a date
    if (isNaN(date.getTime())) {
      // d.valueOf() could also work
      // date is not valid
      return false;
    } else {
      // date is valid
      return true;
    }
  } else {
    // not a date
    return false;
  }
};

export { isEmptyObject, isValidDate };
