## symbol数据类型
1. 一种新的原始数据类型Symbol，表示独一无二的值。
2. 它是 JavaScript 语言的`第七种`数据类型，前六种是：`undefined`、`null`、`布尔值（Boolean）`、`字符串（String）`、`数值（Number）`、`对象（Object）`。
3. `Symbol`值通过Symbol函数生成。这就是说，对象的属性名现在可以有`两种`类型，一种是原来就有的`字符串`，另一种就是新增的Symbol类型
4. Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个`原始类型`的值，不是对象
5. Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分
````javascript
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"

//上面代码中，s1和s2是两个 Symbol 值。如果不加参数，它们在控制台的输出都是Symbol()，不利于区分。有了参数以后，就等于为它们加上了描述，输出的时候就能够分清，到底是哪一个值。
````
6. 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
7. Symbol函数的参数只是表示对当前 Symbol 值的描述，因此`相同参数`的Symbol函数的`返回值`是`不相等`的。
8. Symbol 值不能与其他类型的值进行运算，会报错.
9. Symbol 值可以显式转为字符串,也可以转为布尔值，但是不能转为数值。
10. 每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性
````javascript
let mySymbol = Symbol();
// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';
// 第二种写法
let a = {
  [mySymbol]: "Hello"
};
// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
````

11. Symbol 值作为对象属性名时，不能用点运算符.因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值.
12. 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
13. Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。
14. Symbol 作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回
15. 获取symbol属性内容，需要用Object.getOwnPropertySymbols方法。
16. 另一个新的 API，`Reflect.ownKeys`方法可以返回所有类型的键名，包括`常规键名`和 `Symbol 键`名

### symbol函数
1. `Symbol.for()`：它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就`返回这个 Symbol` 值，否则就`新建并返回`一个以该字符串为名称的 Symbol 值。
2. `Symbol.keyFor()`: Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
3. Symbol.for为 Symbol 值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值.

### symbol的11个内置参数