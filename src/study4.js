const map = new Map([
    ["f","1"],
    ["t","123"],
    ["baby","true"]
]);

for (let value of map.values()){
    console.log(value);
}

for (let key of map.keys()){
    console.log(key);
}

let mapToArray = [...map.keys()];

for(let arr of mapToArray){
    console.log("arr:" + arr);
}

//配置Proxy拦截

var obj = new Proxy({}, {
    get: function (target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
        console.log(`setting ${key}!`);
        return Reflect.set(target, key, value, receiver);
    }
});
obj.count = 1;
console.log(++obj.count);

var myObject = {
    foo:1,
    bar:2,
    mysym:Symbol("haha"),
    get baz(){
        return this.foo + this.bar;
    },
};

let result1 = Reflect.get(myObject,"foo");
console.log("foo:" + result1);

Reflect.set(myObject,"foo",3);
console.log("foo:" + Reflect.get(myObject,"foo"));
console.log(Reflect.has(myObject,"bar"));
Reflect.deleteProperty(myObject,"bar");
console.log(Reflect.has(myObject,"bar"));
console.log("bar:" + Reflect.get(myObject,"bar"));
let pros =  Reflect.ownKeys(myObject);
for(let item in pros){
    console.log(item + ":" + pros[item]);
}

//观察者模式的简单实现
const queueObservers = new Set();
const observe = fn => queueObservers.add(fn);
const observable = obj => new Proxy(obj,{set});

function set(target,key,value,receiver){
    const result = Reflect.set(target,key,value,receiver);
    queueObservers.forEach(observer => observer());
    return result;
}

const person = observable({
    name : "张三",
    age : 20
});

function print(){
    console.log(`${person.name},${person.age}`);
}

observe(print);

person.name = "李四";

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}
  
timeout(3000).then((value) => {
    console.log(value);
});

// const promise = new Promise(function(resolve,reject){
//     //resolve("hahahah");
//     reject(new Error("error"));
// });

// //promise.then((val) => console.log(val),(val)=>console.log(val));
// promise.catch((val)=>console.log(val));

let thenable = {
    then: function(resolve, reject) {
        resolve(42);
    }
};
  
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
    console.log(value);  // 42
});