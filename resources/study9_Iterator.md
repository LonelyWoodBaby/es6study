## Iterator
### Iterator（遍历器）的概念
1. 遍历器（Iterator）就是一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）.
    - JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了Map和Set。这样就有了四种数据集合.
2. Iterator的作用
    - 一是为各种数据结构，提供一个`统一的`、简便的访问接口
    - 二是使得数据结构的成员能够`按某种次序`排列
    - 三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供for...of消费。
3. Iterator的遍历过程
    - 创建一个`指针对象`，指向当前数据结构的`起始位置`。也就是说，遍历器对象本质上，就是一个`指针对象`
    - 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员
    - 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员
    - 不断调用指针对象的next方法，直到它指向数据结构的结束位置。
4. 每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，value属性是`当前成员的值`，done属性是一个布尔值，表示遍历`是否结束`。

### 默认 Iterator 接口
1. Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环.当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
2. 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。
3. ES6 规定，默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要`具有`Symbol.iterator属性，就可以认为是`“可遍历的”（iterable）`。
    - Symbol.iterator，它是一个`表达式`，返回Symbol对象的`iterator属性`，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在`方括号`内
````javascript
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
````
4. 原生具备 Iterator 接口的数据结构如下:
    - Array
    - Map
    - Set
    - String
    - TypedArray
    - 函数的 arguments 对象
    - NodeList 对象
5. 对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，`for...of`循环会自动遍历它们。
6. 一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在`Symbol.iterator`的属性上部署`遍历器生成方法`（原型链上的对象具有该方法也可）
    - Symbol.iterator方法的最简单实现，还是使用`Generator` 函数。
````javascript
//实例
class RangeIterator {
    constructor(start, stop) {
        this.value = start;
        this.stop = stop;
    }

    [Symbol.iterator]() { return this; }

    next() {
        var value = this.value;
        if (value < this.stop) {
            this.value++;
            return {done: false, value: value};
        }
        return {done: true, value: undefined};
    }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}

//另一个例子：
let obj = {
    data: [ 'hello', 'world' ],
    [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
            next() {
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done: false
                    };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
};
````
7. 对于类似数组的对象（`存在数值键名和length属性`），部署 Iterator 接口，有一个简便方法，就是Symbol.iterator方法直接引用`数组的 Iterator 接口`。
````javascript
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// 或者
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
[...document.querySelectorAll('div')] // 可以执行了
````
8. 有了遍历器接口，数据结构就可以用for...of循环遍历，也可以使用while循环遍历。

### 调用 Iterator 接口的场合
有一些场合会默认调用 Iterator 接口（即Symbol.iterator方法），除了下文会介绍的for...of循环，还有几个别的场合。
1. 解构赋值
- 对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。
2. 扩展运算符
- 扩展运算符（...）也会调用默认的 Iterator 接口。
3. yield*
- yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
4. 其他场合
- 由于数组的遍历会调用遍历器接口，所以任何`接受数组作为参数`的场合，其实都调用了遍历器接口

### 字符串的 Iterator 接口
1. 字符串是一个类似数组的对象，也原生具有 Iterator 接口
2. 可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的。

### 遍历器对象的 return()，throw() 
- 遍历器对象除了具有next方法，还可以具有return方法和throw方法。
- 如果你自己写遍历器对象生成函数，那么`next`方法是`必须部署`的，`return方法和throw`方法是否部署是`可选`的。
- return方法的使用场合是，如果for...of循环`提前退出`（通常是因为出错，或者有break语句或continue语句），就会调用return方法。如果一个对象在完成遍历前，`需要清理或释放资源`，就可以部署return方法。
- return方法必须`返回一个对象`，这是 Generator 规格决定的.
````javascript
function readLinesSync(file) {
  return {
    next() {
      return { done: false };
    },
    return() {
      file.close();
      return { done: true };
    },
  };
}
````
- throw方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法

### for...of 循环
1. ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为遍历所有数据结构的`统一`的方法。
2. 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的`Symbol.iterator方法`。
3. for...of循环可以使用的范围包括`数组、Set 和 Map 结构、某些类似数组的对象`（比如arguments对象、DOM NodeList 对象）、后文的 `Generator 对象`，以及`字符串`。
4. JavaScript 原有的`for...in`循环，只能获得对象的`键名`，不能直接获取键值。ES6 提供for...of循环，允许遍历获得`键值`。
5. 对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。但是，这样情况下，for...in循环依然可以用来遍历键名