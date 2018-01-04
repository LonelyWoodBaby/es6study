## 数组的扩展
### 扩展运算符
1. 含义：扩展运算符（spread）是三个点`（...）`。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列
````javascript
console.log(...[1, 2, 3])
// 1 2 3

//扩展运算符与正常的函数参数可以结合使用
function f(v, w, x, y, z) { }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);
````
- 如果扩展运算符后面是一个空数组，则不产生任何效果
2. 替代数组的 `apply` 方法
````javascript
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);
````
3. 应用
- 复制数组
````javascript
//ES5中
const a1 = [1, 2];
const a_1 = a1;
const a2 = a1.concat();

a2[0] = 2;
a_1//[2,2]
a1 // [1, 2]
//a1会返回原数组的克隆，再修改a2就不会对a1产生影响

//ES6的复制方法：
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
````
- 合并数组

````javascript
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

// ES5的合并数组
arr1.concat(arr2, arr3);

// ES6的合并数组
[...arr1, ...arr2, ...arr3]
````
- 与解构结合
````javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
````
- 解析字符串
````javascript
[...'hello']
// [ "h", "e", "l", "l", "o" ]
````
- 实现了 Iterator 接口的对象
任何 Iterator 接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。
````javascript
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
//上面代码中，querySelectorAll方法返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator 。
````
## Array.from()
`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象`（array-like object）`和可遍历`（iterable）`的对象（包括 ES6 新增的数据结构 Set 和 Map）。
````javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
````
- 常见的类似数组的对象是 `DOM 操作返回的 NodeList 集合`，以及函数内部的`arguments对象`
    - 所谓类似数组的对象，本质特征只有一点，即必须有length属性
- 只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组
- 如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组
- 对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。
````javascript
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();
````
- Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
````javascript
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
````
- 如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this

### Array.of()
1. Array.of方法用于将一组值，转换为数组。
````javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
````
2. Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。
3. Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组
````javascript
//代码模拟实现
function ArrayOf(){
  return [].slice.call(arguments);
}
````

### 数组实例的 copyWithin()
数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
````javascript
Array.prototype.copyWithin(target, start = 0, end = this.length);

//使用：
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
````
它接受三个参数。
- target（必需）：从该位置开始替换数据。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

### 数组实例的 find() 和 findIndex()
- 数组实例的`find`方法，用于找出`第一个`符合条件的`数组`成员
- 它的参数是一个`回调函数`，所有数组成员依次执行该回调函数，直到找出`第一个`返回值为`true`的成员，然后返回该成员
- 如果没有符合条件的成员，则返回undefined
````javascript
[1, 4, -5, 10].find((n) => n < 0)
````
- 数组实例的`findIndex`方法的用法与find方法非常类似，返回`第一个`符合条件的数组成员的`位置`，如果所有成员都不符合条件，则返回`-1`。
- 这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。
````javascript
[NaN].indexOf(NaN)
// -1
[NaN].findIndex(y => Object.is(NaN, y))
// 0
````

### 数组实例的 fill() 
- fill方法使用`给定值`，填充一个数组,数组中已有的元素，会被`全部抹去`。
- fill方法还可以接受`第二个`和`第三个`参数，用于指定填充的`起始位置`和`结束位置`
````javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]
new Array(3).fill(7)
// [7, 7, 7]
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
````

### 数组实例的 entries()，keys() 和 values() 
1. ES6 提供三个新的方法——`entries()`，`keys()`和`values()`——用于遍历数组
2. 它们都返回一个`遍历器`对象，可以用`for...of`循环进行遍历
3. keys()是对`键名`的遍历、values()是对`键值`的遍历，entries()是对`键值对`的遍历

````javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1
for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
//如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
````
### 数组实例的 includes() 
- Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。
- 该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始
- includes可以判断NaN
````javascript
//用于判断浏览器是否支持includes以及提供一个替代方案
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(['foo', 'bar'], 'baz'); // => false
````

### 数组的空位 
- 数组的空位指，数组的某一个位置没有任何值。
- 空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值

- 在ES5中，对空位的处理方式不一致
    - forEach(), filter(), reduce(), every() 和some()都会跳过空位
    - map()会跳过空位，但会保留这个值
    - join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
- ES6 则是明确将空位转为undefined。
    - Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
    - 扩展运算符（...）也会将空位转为undefined
    - copyWithin()会连空位一起拷贝。
    - fill()会将空位视为正常的数组位置。
    - for...of循环也会遍历空位
    - entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。
- 由于空位的处理规则非常不统一，所以建议避免出现空位。
