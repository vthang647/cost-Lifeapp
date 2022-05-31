const Helpers = {
  validateMoney: function (money) {
    let result = String(money).replace('$', '');
    return result;
  },
  validateEmptyMoney: function (money) {
    let result = String(money).replace('$', '');
    return result == 0 ? false : true;
  },
  validateEmptyCauses: function (cause) {
    return String(cause).trim() === '' ? false : true;
  },
};

export default Helpers;
