"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var map = new Map([["f", "1"], ["t", "123"], ["baby", "true"]]);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = map.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        console.log(value);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    for (var _iterator2 = map.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var key = _step2.value;

        console.log(key);
    }
} catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
        }
    } finally {
        if (_didIteratorError2) {
            throw _iteratorError2;
        }
    }
}

var mapToArray = [].concat(_toConsumableArray(map.keys()));

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
    for (var _iterator3 = mapToArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var arr = _step3.value;

        console.log("arr:" + arr);
    }

    //配置Proxy拦截
} catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
        }
    } finally {
        if (_didIteratorError3) {
            throw _iteratorError3;
        }
    }
}

var obj = new Proxy({}, {
    get: function get(target, key, receiver) {
        console.log("getting " + key + "!");
        return Reflect.get(target, key, receiver);
    },
    set: function set(target, key, value, receiver) {
        console.log("setting " + key + "!");
        return Reflect.set(target, key, value, receiver);
    }
});
obj.count = 1;
console.log(++obj.count);

var myObject = {
    foo: 1,
    bar: 2,
    mysym: Symbol("haha"),
    get baz() {
        return this.foo + this.bar;
    }
};

var result1 = Reflect.get(myObject, "foo");
console.log("foo:" + result1);

Reflect.set(myObject, "foo", 3);
console.log("foo:" + Reflect.get(myObject, "foo"));
console.log(Reflect.has(myObject, "bar"));
Reflect.deleteProperty(myObject, "bar");
console.log(Reflect.has(myObject, "bar"));
console.log("bar:" + Reflect.get(myObject, "bar"));
var pros = Reflect.ownKeys(myObject);
for (var item in pros) {
    console.log(item + ":" + pros[item]);
}

//观察者模式的简单实现
var queueObservers = new Set();
var observe = function observe(fn) {
    return queueObservers.add(fn);
};
var observable = function observable(obj) {
    return new Proxy(obj, { set: set });
};

function set(target, key, value, receiver) {
    var result = Reflect.set(target, key, value, receiver);
    queueObservers.forEach(function (observer) {
        return observer();
    });
    return result;
}

var person = observable({
    name: "张三",
    age: 20
});

function print() {
    console.log(person.name + "," + person.age);
}

observe(print);

person.name = "李四";

function timeout(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(3000).then(function (value) {
    console.log(value);
});

// const promise = new Promise(function(resolve,reject){
//     //resolve("hahahah");
//     reject(new Error("error"));
// });

// //promise.then((val) => console.log(val),(val)=>console.log(val));
// promise.catch((val)=>console.log(val));

var thenable = {
    then: function then(resolve, reject) {
        resolve(42);
    }
};

var p1 = Promise.resolve(thenable);
p1.then(function (value) {
    console.log(value); // 42
});