// const ISODateFromString = inputStr => new Date(inputStr.slice(0,4)+"-"+inputStr.slice(4,6)+"-"+inputStr.slice(6));
const ISODateFromString = inputStr => new Date(inputStr.slice(0,4),inputStr.slice(4,6),inputStr.slice(6)).toISOString();

module.exports = ISODateFromString;
