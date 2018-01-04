## SET
### ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
1. Set 本身是一个构造函数，用来生成 Set 数据结构。
2. Set 函数可以接受一个`数组`（或者具有 `iterable 接口`的其他数据结构）作为参数，用来初始化
3. 一种去除数组重复成员的方法：[...new Set(array)]
4. 向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。
    - Set 内部判断两个值是否不同，使用的算法叫做“Same-value equality”，它类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。
    - 另外，两个对象总是不相等的。
5. Set 结构的实例有以下属性
    - Set.prototype.constructor：构造函数，默认就是Set函数
    - Set.prototype.size：返回Set实例的成员总数。
6. Set 实例的方法分为两大类：`操作方法（用于操作数据）`和`遍历方法（用于遍历成员）`。
    - 操作方法：
        - `add(value)`：添加某个值，返回 Set 结构本身。
        - `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
        - `has(value)`：返回一个布尔值，表示该值是否为Set的成员。
        - `clear()`：清除所有成员，没有返回值。
     - 遍历方法
        - `keys()`：返回键名的遍历器
        - `values()`：返回键值的遍历器
        - `entries()`：返回键值对的遍历器
        - `forEach()`：使用回调函数遍历每个成员
````javascript
s.add(1).add(2).add(2);
// 注意2被加入了两次
s.size // 2
s.has(1) // true
s.has(2) // true
s.has(3) // false
s.delete(2);
s.has(2) // false
````    
7. Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
````javascript
let set = new Set(['red', 'green', 'blue']);
for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue
for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue
for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
````
8. 扩展运算符`（...）`内部使用`for...of`循环，所以也可以用于 Set 结构。

## WeakSet
### WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
- 首先，WeakSet 的成员只能是对象，而不能是其他类型的值
- 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

1. WeakSet 的成员是不适合引用的，因为它会随时消失
2. WeakSet 不可遍历
3. 特点同样适用后面要介绍的 WeakMap 结构
4. WeakSet 是一个构造函数，可以使用`new`命令，创建 WeakSet 数据结构.
5. WeakSet 结构有以下三个方法
    - WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员
    - WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员
    - WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
````javascript
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false

//实例：
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
//上面代码保证了Foo的实例方法，只能在Foo的实例上调用。
````

## Map
### ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键
### Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
1. 任何具有 `Iterator `接口、且每个成员都是一个`双元素的数组`的数据结构都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map.
````javascript
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
````
2. 如果对同一个键多次赋值，后面的值将覆盖前面的值。
3. 如果读取一个未知的键，则返回undefined。
    - 只有对`同一个对象`的引用，Map 结构才将其视为同一个键。这一点要非常小心。
    - Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题
    - 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键
        - 和-0就是一个键，布尔值true和字符串true则是两个不同的键
        - undefined和null也是两个不同的键
        - 虽然NaN不严格相等于自身，但 Map 将其视为同一个键
4. map的属性和方法
    - size `属性`。size属性返回 Map 结构的成员总数。
    - set(key, value)。set方法设置键名key对应的键值为value，然后返回整个 Map 结构
        - set方法返回的是当前的Map对象，因此可以采用链式写法
    - get(key). get方法读取key对应的键值，如果找不到key，返回undefined。
    - has(key). has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
    - delete(key). delete方法删除某个键，返回true。如果删除失败，返回false。
    - clear(). clear方法清除所有成员，没有返回值.
5. 遍历方法：需要特别注意的是，Map 的遍历顺序就是`插入顺序`
    - keys()：返回键名的遍历器。
    - values()：返回键值的遍历器
    - entries()：返回所有成员的遍历器。
    - forEach()：遍历 Map 的所有成员。
6. Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）
7. 如果所有 Map 的键都是字符串，它可以转为对象
````javascript
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
````

## WeakMap
### WeakMap结构与Map结构类似，也是用于生成键值对的集合。WeakMap与Map的区别有两点。
- 首先WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名.
- 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。

1. 如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。
  - 一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除
````javascript
const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"
````
2. WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。
3. WeakMap 与 Map 在 API 上的区别主要是两个，一是`没有遍历操作`（即没有key()、values()和entries()方法），也`没有size属性`