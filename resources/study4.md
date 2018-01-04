## 对象的扩展

### ES6的简洁表示法
1. ES6 允许直接写入变量和函数，作为对象的属性和方法
2. ES6 允许方法简写
````javascript
let birth = '2000/01/01';
const Person = {
  name: '张三',
  //等同于birth: birth
  birth,
  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }
};
````
3. 如果某个方法的值是一个 Generator 函数，前面需要加上星号

### 属性名表达式
1. ES6 允许字面量定义对象时，用表达式作为对象的属性名，即把表达式放在方括号内
````javascript
let lastWord = 'last word';
const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};
a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
````
2. 表达式还可以用于定义方法名
````javascript
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
````
3. 注意，属性名表达式与简洁表示法，不能同时使用，会报错。
4. 属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]

### 方法的 name 属性
1. 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性
2. 对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set
3. bind方法创造的函数，name属性返回bound加上原函数的名字；Function构造函数创造的函数，name属性返回anonymous
4. 对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
```javascript
const obj = {
  get foo() {},
  set foo(x) {}
};
obj.foo.name
// TypeError: Cannot read property 'name' of undefined
const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
descriptor.get.name // "get foo"
descriptor.set.name // "set foo"
```

### Object.is()
1. ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
2. 不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
```javascript
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

//ES5 可以通过下面的代码，部署Object.is
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```

### Object.assign()
1. Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
2. Object.assign方法的第一个参数是目标对象，后面的参数都是源对象
3. 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
4. 如果只有一个参数，Object.assign会直接返回该参数。
5. 如果该参数不是对象，则会先转成对象，然后返回
  - 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
  - 如果`非对象参数`出现在`源对象`的位置（即非首参数），那么处理规则有所不同。首先，这些参数`都会转成对象`，如果无法转成对象，就会`跳过`。
  - 这意味着，如果undefined和null不在首参数，就不会报错。
  - 其他类型的值（即`数值、字符串和布尔值`）不在`首参数`，也不会报错。但是，除了`字符串`会以`数组`形式，拷贝入目标对象，其他值都`不会产生效果`
6. Object.assign拷贝的属性是有限制的，只拷贝源对象的`自身属性（不拷贝继承属性）`，也不拷贝`不可枚举的属性`（enumerable: false）。
7. 属性名为 Symbol 值的属性，也会被Object.assign拷贝。
8. Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用
9. 这种嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。
10. Object.assign可以用来处理数组，但是会把数组视为对象。
11. Object.assign方法总是拷贝一个属性的`值`，而`不会拷贝它背后的赋值方法或取值方法`。
```javascript
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
//上面代码中，Object.assign把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1
```
11. Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

### 属性的可枚举性和遍历
#### 可枚举性
1. 对象的每个属性都有一个描述对象`（Descriptor）`，描述对象的`enumerable`属性，称为`”可枚举性“`，如果该属性为`false`，就表示某些操作会`忽略当前属性`。
  - 用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象
  - 有四个操作会忽略enumerable为false的属性
    - for...in循环：只遍历对象`自身`的和`继承的`可枚举的属性
    - Object.keys()：返回对象`自身的`所有可枚举的属性的键名
    - JSON.stringify()：只串行化`对象自身`的可枚举的属性
    - Object.assign()： 忽略enumerable为false的属性，只拷贝`对象自身`的可枚举的属性。
2. ES6 规定，所有 Class 的`原型的方法`都是不可枚举的。
3. 尽量不要用`for...in`循环，而用`Object.keys()`代替

#### 属性的遍历
ES6 一共有 5 种方法可以遍历对象的属性。
1. for...in
  - for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
2. Object.keys(obj)
  - Object.keys返回一个数组，包括对象自身的（`不含继承的`）所有可枚举属性（不含 Symbol 属性）的键名。
3. Object.getOwnPropertyNames(obj)
  - Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
4. Object.getOwnPropertySymbols(obj)
  - Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名
5. Reflect.ownKeys(obj)
  - Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则
1. 首先遍历所有数值键，按照数值升序排列。
2. 其次遍历所有字符串键，按照加入时间升序排列。
3. 最后遍历所有 Symbol 键，按照加入时间升序排列。

### Object.getOwnPropertyDescriptors();
1. `ES2017` 引入了Object.getOwnPropertyDescriptors方法，返回指定对象所有自身属性（非继承属性）的描述对象
````javascript
//在不支持的浏览器中提供该方法：
function getOwnPropertyDescriptors(obj) {
  const result = {};
  for (let key of Reflect.ownKeys(obj)) {
    result[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return result;
}
````
2. 应用：复制有赋值方法的对象(assign方法复制赋值方法会undefined);
````javascript

const shallowMerge = (target, source) => Object.defineProperties(
  target,
  Object.getOwnPropertyDescriptors(source)
);

//将对象属性克隆岛一个新对象中
const clone = Object.create(Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj));
// 或者
const shallowClone = (obj) => Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
````

### __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf() 
1. __proto__属性
__proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。目前，所有浏览器（包括 IE11）都部署了这个属性。
- 标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的
- 无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的`Object.setPrototypeOf()（写操作）`、`Object.getPrototypeOf()（读操作）`、`Object.create()（生成操作）`代替。
- 实现上，__proto__调用的是Object.prototype.__proto__
- 如果一个对象本身部署了__proto__属性，该属性的值就是对象的原型
2. Object.setPrototypeOf()
Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法
````javascript
// 格式
Object.setPrototypeOf(object, prototype)
// 用法
const o = Object.setPrototypeOf({}, null);

//例子：
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);
//把proto设置为obj的原型
proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
````
- 如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。
- 由于`undefined`和`null`无法转为对象，所以如果第一个参数是undefined或null，就会`报错`。

3.Object.getPrototypeOf()
该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象
````javascript
function Rectangle() {
  // ...
}
const rec = new Rectangle();
Object.getPrototypeOf(rec) === Rectangle.prototype
// true
Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
````
- 如果参数不是对象，会被自动转为对象
- 如果参数是undefined或null，它们无法转为对象，所以会报错。

### super 关键字
- this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字`super`，指向`当前对象的原型对象`
- super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
  - 只有对象方法的`简写法`可以让 JavaScript 引擎确认，定义的是对象的方法。
- JavaScript 引擎内部，super.foo等同于`Object.getPrototypeOf(this).foo（属性）`或`Object.getPrototypeOf(this).foo.call(this)（方法）`

### Object.keys()，Object.values()，Object.entries() 
1. Object.keys():ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名.
2. ES2017 引入了跟`Object.keys`配套的`Object.values`和`Object.entries`，作为遍历一个对象的补充手段，供`for...of`循环使用。
````javascript
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}
for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}
for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
````
3. Object.values只返回对象自身的可遍历属性。
4. Object.values会过滤属性名为 Symbol 值的属性
5. 如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。
  - 如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组
6. Object.entries的特性和方法与Object.values一致
7. Object.entries方法的另一个用处是，将对象转为真正的Map结构。
````javascript
let obj = { one: 1, two: 2 };
for (let [k, v] of Object.entries(obj)) {
  console.log(
    `${JSON.stringify(k)}: ${JSON.stringify(v)}`
  );
}
const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }
````

## Null传导运算符
1. 有一个提案，引入了`“Null 传导运算符”`（null propagation operator）?.，简化非空判断的写法
````javascript
const firstName = message?.body?.user?.firstName || 'default';
//上面代码有三个?.运算符，只要其中一个返回null或undefined，就不再往下运算，而是返回undefined。
````
2. “Null 传导运算符”有四种用法:
- obj?.prop // 读取对象属性
- obj?.[expr] // 同上
- func?.(...args) // 函数或对象方法的调用
- new C?.(...args) // 构造函数的调用
````javascript
// 如果 a 是 null 或 undefined, 返回 undefined
// 否则返回 a.b.c().d
a?.b.c().d

// 如果 a 是 null 或 undefined，下面的语句不产生任何效果
// 否则执行 a.b = 42
a?.b = 42

// 如果 a 是 null 或 undefined，下面的语句不产生任何效果
delete a?.b
````


