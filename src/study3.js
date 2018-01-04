let max = Math.max.apply(null,[14,3,77]);

Math.max(...[14,3,77]);
let max2 = Math.max(14,3,77);

console.log(max);
console.log(max2);

let dateEs5 = new (Date.bind.apply(Date, [null, 2015, 1, 1]));
console.log(dateEs5);
let dateEs6 = new Date(...[2015, 1, 1]);
console.log(dateEs6);

const a1 =[1,2];
const a2 = [...a1];
console.log(a2);


console.log(Object.is("foo","foo"));

const obj = {
    foo:123,
    get bar(){
        return "abc";
    }
};

console.log(Object.getOwnPropertyDescriptor(obj));

let symbolObj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
};
  
let symbolnames = Reflect.ownKeys(symbolObj);
for(let name in symbolnames){
    console.log(symbolnames[name]);
}
let myset = new Set([1, 4, 9]);
myset.forEach((value, key) => console.log(key + ' : ' + value));