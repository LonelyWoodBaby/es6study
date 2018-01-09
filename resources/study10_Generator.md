## Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。
1. Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个`状态机`，封装了多个内部状态
2. Generator 函数除了状态机，还是一个`遍历器对象生成函数`。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
3. 形式上，Generator 函数是一个普通函数，但是有两个特征
    - 一是，function关键字与函数名之间有一个`星号`；
    - 二是，函数体内部使用`yield表达式`，定义不同的内部状态（yield在英语里的意思就是“产出”）
````javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
//该函数有三个状态：hello，world 和 return 语句（结束执行）。

hw.next()
// { value: 'hello', done: false }
hw.next()
// { value: 'world', done: false }
hw.next()
// { value: 'ending', done: true }
hw.next()
// { value: undefined, done: true }
````
4. Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数`并不执行`，返回的也不是函数运行结果，而是一个指向内部状态的`指针对象`.
5. 下一步，必须调用遍历器对象的`next`方法，使得指针移向下一个状态。也就是说，每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到`下一个yield`表达式（或`return语句`）为止。
    - 换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
    - 如果没有return语句，就执行到函数结束
    - 调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的`next`方法，就会返回一个有着`value`和`done`两个属性的`对象`。value属性表示当前的`内部状态`的值，是`yield表达式`后面那个表达式的值；done属性是一个`布尔值`，表示是否`遍历结束`。
6. ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。一般写法是`星号紧跟在function关键字后面`.

## yield 表达式
- 由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是`暂停标志`。

1. 遍历器对象的next方法的运行逻辑如下。
    - 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
    - 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
    - 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
    - 如果该函数没有return语句，则返回的对象的value属性值为undefined
2. yield表达式后面的表达式，只有当`调用next方法`、内部指针`指向该语句时`才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
3. Generator 函数可以不用yield表达式，这时就变成了一个单纯的`暂缓执行函数`。
4. yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
5. yield表达式如果用在另一个表达式之中，必须放在`圆括号`里面。
    - yield表达式用作`函数参数`或放在`赋值表达式`的右边，可以不加括号。

## 与 Iterator 接口的关系
- 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口

````javascript
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
//Generator 函数赋值给Symbol.iterator属性，从而使得myIterable对象具有了 Iterator 接口，可以被...运算符遍历了。
````
- Generator 函数执行后，返回一个`遍历器对象`。该对象本身也具有Symbol.iterator属性，执行后返回`自身`。

## next 方法的参数
- yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带`一个参数`，该参数就会被当作`上一个`yield表达式的返回值。
- 由于next方法的参数表示上一个yield表达式的返回值，所以在`第一次`使用next方法时，传递参数是`无效`的。V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的
````javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
/*
上面代码中，第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。

如果向next方法提供参数，返回结果就完全不一样了。上面代码第一次调用b的next方法时，返回x+1的值6；第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。
*/
````

## for...of 循环
- for...of循环可以`自动遍历` Generator 函数时生成的Iterator对象，且此时`不再需要调用next`方法。
````javascript
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}

//利用generator和for of实现斐波那契数列
````
- 除了for...of循环以外，`扩展运算符（...）`、`解构赋值`和`Array.from`方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。

## Generator.prototype.throw() 
- Generator 函数返回的遍历器对象，都有一个`throw`方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
- throw方法可以接受一个参数，该参数会被`catch语句`接收，建议抛出`Error对象的实例`。

## Generator.prototype.return()
- Generator 函数返回的遍历器对象，还有一个`return方法`，可以`返回给定的值`，并且`终结遍历` Generator 函数。
- 如果return方法调用时，不提供参数，则返回值的`value属性为undefined`。
- Generator 函数内部有try...finally代码块，那么return方法会推迟到`finally代码块执行完`再执行
````javascript
function* numbers () {
    yield 1;
    try {
        yield 2;
        yield 3;
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
````

## next()、throw()、return() 的共同点
- next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。
- next()是将yield表达式替换成一个值
- throw()是将yield表达式替换成一个throw语句。
- return()是将yield表达式替换成一个return语句。

## yield* 表达式
1. 如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。
2. 需要用到`yield*表达式`，用来在一个 Generator 函数里面执行`另一个` Generator 函数。
````javascript
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}
// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}
for (let v of bar()){
  console.log(v);
}
````
3. 如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上`星号`，表明它返回的是一个遍历器对象。这被称为yield*表达式
4. yield*后面的 Generator 函数（`没有return语句`时），等同于在 Generator 函数内部，`部署一个for...of循环`。
5. 任何数据结构只要有 Iterator 接口，就可以被yield*遍历。

## 作为对象属性的 Generator 函数 
1. 属性前面有一个`星号`，表示这个属性是一个 Generator 函数。
````javascript
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
//等同于
let obj = {
  myGeneratorMethod: function* () {
    // ···
  }
};
````

## 应用
http://es6.ruanyifeng.com/#docs/generator#%E5%BA%94%E7%94%A8
````javascript
//使用generator函数执行逐行读取文件
function* numbers() {
  let file = new FileReader("numbers.txt");
  try {
    while(!file.eof) {
      yield parseInt(file.readLine(), 10);
    }
  } finally {
    file.close();
  }
}
````

