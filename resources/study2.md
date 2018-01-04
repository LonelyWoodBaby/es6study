## 函数参数的默认值

### 1. ES6 允许为函数的参数设置默认值，即直接写在`参数定义的后面`
````javascript
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
````
````javascript
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

const p = new Point();
p // { x: 0, y: 0 }
````
- 参数变量是默认声明的，所以不能用let或const再次声明。
- 使用参数默认值时，函数不能有同名参数
- 通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
    - 如果传入undefined，将触发该参数等于默认值，null则没有这个效果

### 2. 函数的 length 属性
1. `指定了`默认值以后，函数的length属性，将返回`没有指定默认值`的参数个数。也就是说，指定了默认值后，`length属性将失真`
    - 这是因为length属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了
    - 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了
2. 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在`不设置参数默认值时，是不会出现的`。
````javascript
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1
````

````javascript
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1
````
3. 应用：利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误
````javascript
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
````
另外，可以将参数默认值设为undefined，表明这个参数是可以省略的.
````javascript
function foo(optional = undefined) { ··· }
````

## rest参数
1. ES6 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。
- rest参数搭配的变量是一个`数组`，该变量将多余的参数放入数组中。
````javascript
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
````
- arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组。rest 参数是一个真正的数组，数组特有的方法都可以使用.
- 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
- 函数的length属性，不包括 rest 参数。

## 严格模式
从 ES5 开始，函数内部可以设定为严格模式。ES2016 做了一点修改，规定只要函数参数使用了`默认值、解构赋值、或者扩展运算符`，那么`函数内部`就不能显式设定为`严格模式`，否则会报错。
````javascript
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}
````
两种方法可以规避这种限制
1. 设定全局性的严格模式，这是合法的
````javascript
'use strict';

function doSomething(a, b = a) {
  // code
}
````
2. 把函数包在一个无参数的立即执行函数里面
````javascript
const doSomething = (function () {
  'use strict';
  return function(value = 42) {
    return value;
  };
}());
````

## name属性
1. 函数的name属性，返回该函数的函数名
2. `Function`构造函数返回的函数实例，name属性的值为`anonymous`
```` javascript
(new Function).name // "anonymous"
````

## 箭头函数
### ES6 允许使用“箭头”（=>）定义函数。
1. 简单释义：
````javascript
var f = v => v;
//上面的箭头函数等同于：
var f = function(v) {
  return v;
};
````
2. 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
````javascript
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
````
3. 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
    - 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错.
````javascript
var sum = (num1, num2) => { return num1 + num2; }

// 报错
let getTempItem = id => { id: id, name: "Temp" };
// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
````
4. 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。
````javascript
let fn = () => void doesNotReturn();

const full = ({ first, last }) => first + ' ' + last;
// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}
````

5. 用途： 简化函数
````javascript
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);


//其他例子
const numbers = (...nums) => nums;

numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]
````

6. 使用注意点：
    - 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象
    - 不可以当作`构造函数`，也就是说，不可以使用`new`命令，否则会抛出一个错误
    - 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。
    - 不可以使用`yield`命令，因此箭头函数不能用作 `Generator` 函数。 
        - 上面四点中，`第一点`尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。
    - 除了`this`，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：`arguments`、`super`、`new.target`

### 双冒号运算符
1. “函数绑定”（function bind）运算符，用来取代`call、apply、bind`调用
2. 函数绑定运算符是并排的`两个冒号`（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。
3. 如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面
4. 双冒号运算符的运算结果，还是一个对象，因此可以采用链式写法。
````javascript
// 例一
import { map, takeWhile, forEach } from "iterlib";

getPlayers()
::map(x => x.character())
::takeWhile(x => x.strength > 100)
::forEach(x => console.log(x));

// 例二
let { find, html } = jake;

document.querySelectorAll("div.myClass")
::find("p")
::html("hahaha");
````

## 尾调用优化
### 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的`最后一步`是`调用另一个函数`
- 只要在最后一步上进行了任何一个操作（赋值，计算等）都不算尾调用
- 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。
````javascript
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
/*
上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除f(x)的调用帧，只保留g(3)的调用帧。
*/
````
### 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
- 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

````javascript
//非尾递归的 Fibonacci 数列实现如下。
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 堆栈溢出
Fibonacci(500) // 堆栈溢出

//尾递归优化过的 Fibonacci 数列实现如下。
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
//n=4时
//f(4)=>f(4,1,1)=>f(3,1,2)=>f(2,2,3)=>f(1,3,5) = 5
````
- 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。
    - 柯里化（currying）:将多参数的函数转换成单参数的形式。
    - 采用 ES6 的函数默认值。
````javascript
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
factorial(5) // 120
//计算阶乘改造为尾递归
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) 
````
- ES6 的尾调用优化只在`严格模式`下开启，正常模式是无效的。
- 蹦床函数（trampoline）可以将递归执行转为循环执行。
```` javascript
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
````
### ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。

## catch 语句的参数
### 有一个提案，允许try...catch结构中的catch语句调用时不带有参数
````javascript
//传统的写法是catch语句必须带有参数，用来接收try代码块抛出的错误
try {
  //  ···
} catch (error) {
  //  ···
}
//新的写法允许省略catch后面的参数，而不报错。
try {
  //  ···
} catch {
  //  ···
}
````
