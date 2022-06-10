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
  getMoney: function (money) {
    let res = String(money).replace('$', '').trim();
    return String(res).replace('.', '');
  },
  setMoney: function (numMoney) {
    let lengthOfString = String(numMoney).length;
    let arrMoney = String(numMoney).split('');
    let sodu = parseInt(lengthOfString) % parseInt(3);
    let result = '';
    if (sodu != 0) {
      // chia du
      let temp = parseInt(0);
      for (let index = 0; index < arrMoney.length; index++) {
        const element = arrMoney[index];
        if (index < sodu) {
          result = result + element;
        } else if (index == sodu) {
          result += '.';
          result += element;
        } else {
          if (temp < 2) {
            result += element;
            temp++;
          } else {
            result += '.';
            result += element;
            temp = 0;
          }
        }
      }
      return result;
    } else {
      arrMoney.reverse();
      for (let index = 0; index < arrMoney.length; index++) {
        const element = arrMoney[index];
        let temp = (index + 1) % 3;
        if (index == arrMoney.length - 1) {
          result += element;
        } else if (temp == 0) {
          result = result + element + '.';
        } else {
          result += element;
        }
      }
      return result.split('').reverse().join('');
    }
  },
};

export default Helpers;
