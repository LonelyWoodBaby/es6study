## 含义
1. ES2017 标准引入了 async 函数，使得异步操作变得更加方便
2. async 函数是什么？一句话，它就是 Generator 函数的`语法糖`。
    - async函数就是将 Generator 函数的星号（*）替换成`async`，将yield替换成`await`，仅此而已。
    - async 函数的实现原理，就是将 `Generator` 函数和`自动执行器`，包装在一个函数里。
3. async函数对 Generator 函数的改进
    - 内置执行器
        - async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行.
    - 更好的语义
        - async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
    - 更广的适用性
        - async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
    - 返回值是 Promise
        - async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作

## 基本用法
- async函数返回一个 `Promise` 对象，可以使用`then方法`添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
````javascript
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
  console.log(result);
});
//上面代码是一个获取股票报价的函数，函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
//指定多少毫秒后输出一个值。
````

## 语法
1. async函数返回一个 Promise 对象
     - async函数内部return语句返回的值，会成为then方法回调函数的参数
     - async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。
````javascript
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)
// Error: 出错了
````
2. async函数返回的 Promise 对象，必须等到内部所有`await命令`后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。
    - 只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
3. 正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个`立即resolve`的 Promise 对象。
4. 只要`一个await`语句后面的 Promise 变为reject，那么`整个async函数`都会中断执行。
    - 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在`try...catch`结构里面
    - 另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
5. 如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。
6. 使用注意点：
    - 最好把await命令放在try...catch代码块中。
        (await somethingThatReturnsAPromise()
            .catch(function (err) {
                console.log(err);
        });)
    - 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
    - await命令只能用在async函数之中，如果用在普通函数，就会报错。
````javascript
let foo = await getFoo();
let bar = await getBar();

// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
````
## 异步遍历器
http://es6.ruanyifeng.com/#docs/async#%E5%BC%82%E6%AD%A5%E9%81%8D%E5%8E%86%E5%99%A8