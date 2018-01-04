"use strict";

var _symbolObj;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var max = Math.max.apply(null, [14, 3, 77]);

Math.max.apply(Math, [14, 3, 77]);
var max2 = Math.max(14, 3, 77);

console.log(max);
console.log(max2);

var dateEs5 = new (Date.bind.apply(Date, [null, 2015, 1, 1]))();
console.log(dateEs5);
var dateEs6 = new (Function.prototype.bind.apply(Date, [null].concat([2015, 1, 1])))();
console.log(dateEs6);

var a1 = [1, 2];
var a2 = [].concat(a1);
console.log(a2);

console.log(Object.is("foo", "foo"));

var obj = {
    foo: 123,
    get bar() {
        return "abc";
    }
};

console.log(Object.getOwnPropertyDescriptor(obj));

var symbolObj = (_symbolObj = {}, _defineProperty(_symbolObj, Symbol('my_key'), 1), _defineProperty(_symbolObj, "enum", 2), _defineProperty(_symbolObj, "nonEnum", 3), _symbolObj);

var symbolnames = Reflect.ownKeys(symbolObj);
for (var name in symbolnames) {
    console.log(symbolnames[name]);
}
var myset = new Set([1, 4, 9]);
myset.forEach(function (value, key) {
    return console.log(key + ' : ' + value);
});