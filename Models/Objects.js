const Spend = {
  name: 'Spend',
  properties: {
    _id: 'string',
    moneySpend: 'double',
    cause: 'string',
    timestamp: 'date',
    status: 'bool',
  },
  primaryKey: '_id',
};

const Earned = {
  name: 'Earned',
  properties: {
    _id: 'string',
    moneyEarn: 'double',
    cause: 'string',
    timestamp: 'date',
    status: 'bool',
  },
  primaryKey: '_id',
};

export default {Spend, Earned};
