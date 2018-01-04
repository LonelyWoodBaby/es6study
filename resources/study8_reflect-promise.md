## Reflect
### Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个。
1. 将Object对象的一些明显属于`语言内部的方法`（比如Object.defineProperty），放到Reflect对象上.
    - 现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将`只部署`在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。
2.  修改某些Object方法的返回结果，让其变得更合理.
    - `Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回false。
3. 让Object操作都变成函数行为。
    - 某些Object操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。
4. Reflect对象的方法与Proxy对象的方法一一对应，只要是`Proxy对象`的方法，就能在Reflect对象上找到对应的方法。
    - 这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
````javascript
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
````
### 静态方法：Reflect对象一共有 13 个静态方法
1. Reflect.apply(target, thisArg, args)
2. Reflect.construct(target, args)
3. Reflect.get(target, name, receiver)
4. Reflect.set(target, name, value, receiver)
5. Reflect.defineProperty(target, name, desc)
6. Reflect.deleteProperty(target, name)
7. Reflect.has(target, name)
8. Reflect.ownKeys(target)
9. Reflect.isExtensible(target)
10. Reflect.preventExtensions(target)
11. Reflect.getOwnPropertyDescriptor(target, name)
12. Reflect.getPrototypeOf(target)
13. Reflect.setPrototypeOf(target, prototype)
### 具体使用教程
http://es6.ruanyifeng.com/#docs/reflect#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95



## Promise
### 基本含义
1. Promise 是`异步编程`的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
2. 所谓Promise，简单说就是一个`容器`，里面保存着某个`未来才会结束`的事件（通常是一个异步操作）的结果。
3. 从语法上说，Promise 是一个`对象`，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
4. Promise对象特点:
  - 对象的状态不受外界影响。
    - Promise对象代表一个异步操作，有三种状态:
      - pending（进行中）
      - fulfilled（已成功）
      - rejected（已失败）
    - 只有`异步操作`的结果，可以决定当前是哪一种状态，任何其他操作都`无法改变`这个状态
  - 一旦状态改变，就不会再变，任何时候都可以得到这个结果
    - Promise对象的状态改变，只有两种可能：
      - 从`pending`变为`fulfilled`
      - 从`pending`变为`rejected`
    - 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为` resolved（已定型）`
    - 如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果
    - 这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是`得不到`结果的
5. Promise也有一些缺点
  - 无法取消Promise，一旦新建它就会立即执行，无法中途取消
  - 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
  - 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）
6. 如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署Promise更好的选择。

### 基本用法：
1. Promise对象是一个构造函数，用来生成Promise实例
  - Promise构造函数接受`一个函数`作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
  - resolve函数的作用是，将Promise对象的状态从`“未完成”`变为`“成功”`（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
````javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
      resolve(value);
  } else {
      reject(error);
  }
});
````
  - reject函数的作用是，将Promise对象的状态从`“未完成”`变为`“失败”`（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去
2. Promise实例生成以后，可以用`then`方法分别指定resolved状态和rejected状态的`回调函数`
  - then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。
  - 第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。
````javascript
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
````
3. Promise 新建后就会立即执行。
4. 调用resolve或reject并不会终结 Promise 的参数函数的执行。
5. 一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到`then`方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上`return`语句，这样就不会有意外.

### Promise.prototype.then()
1. Promise 实例具有then方法，也就是说，then方法是定义在原型对象`Promise.prototype`上的。它的作用是为 Promise 实例添加状态改变时的回调函数。
  - then方法的第一个参数是`resolved状态`的回调函数，第二个参数（可选）是`rejected状态`的回调函数
2. then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用`链式写法`，即then方法后面再调用另一个then方法。

### Promise.prototype.catch() 
1. Promise.prototype.catch方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。
````javascript
p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err));
// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log("rejected:", err));
````
2. 如果 Promise 状态已经变成resolved，再抛出错误是无效的。
  - Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。
3. Promise 对象的错误具有“冒泡”性质，会`一直向后`传递，直到`被捕获为止`。也就是说，错误总是会被下一个catch语句捕获。
4. 一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。
5. 跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误`不会传递到外层代码`，即不会有任何反应。
6. 一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。
7. 如果没有报错，则会跳过catch方法.跳过了catch方法，直接执行后面的then方法。此时，要是then方法里面报错，就与前面的catch无关了。

## Promise.all()
### Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
````javascript
const p = Promise.all([p1, p2, p3]);
````
1. Promise.all方法接受`一个数组`作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用`Promise.resolve方法`，将参数转为 Promise 实例，再进一步处理。
  - Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
2. p的状态由p1、p2、p3决定，分成两种情况:
  - 只有p1、p2、p3的状态`都变成`fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值`组成一个数组`，传递给p的回调函数
  - 只要p1、p2、p3之中`有一个被rejected`，p的状态就变成rejected，此时`第一个`被reject的实例的返回值，会传递给p的回调函数.
3. 如果作为参数的 Promise 实例，`自己定义了`catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法

## Promise.race()
### Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
````javascript
const p = Promise.race([p1, p2, p3]);
````
1. 上面代码中，只要p1、p2、p3之中`有一个`实例`率先`改变状态，p的状态就跟着改变。那个`率先改变`的 Promise 实例的返回值，就传递给p的回调函数。
2. Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理
````javascript
//应用实例：如果当响应时间超时时，直接抛出异常，令整个状态发生改变
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);
//race中添加两个Promise，第二个作为超时校准器
p.then(response => console.log(response));
p.catch(error => console.log(error));
````

## Promise.resolve()
### 有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。
````javascript
const jsPromise = Promise.resolve($.ajax('/whatever.json'));

Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
````
### Promise.resolve方法的参数分成四种情况
1. 参数是一个 Promise 实例
  - 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、`原封不动`地返回这个实例。
2. 参数是一个thenable对象
  - thenable对象指的是具有then方法的对象.
  - Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
3. 参数不是具有then方法的对象，或根本就不是对象
  - 如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved
4. 不带有任何参数
  - Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
  - 如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve()`方法。
````javascript
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');
//setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。
````

## Promise.reject() 
### Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
### Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。

## 方法实例
### done()方法
````javascript
Promise.prototype.done = function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected)
    .catch(function (reason) {
      // 抛出一个全局错误
      setTimeout(() => { throw reason }, 0);
    });
};
````
- 从上面代码可见，done方法的使用，可以像then方法那样用，提供fulfilled和rejected状态的回调函数，也可以不提供任何参数。但不管怎样，done都会捕捉到任何可能出现的错误，并向全局抛出

### finally() 
- finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。它与done方法的最大区别，它`接受一个普通的回调函数`作为参数，该函数`不管怎样都必须执行`。
````javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
````

## Promise.try() 
### 实际开发中，经常遇到一种情况：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程，用catch方法处理f抛出的错误。
````javascript
const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
// next
// now
//函数f是同步的，但是用 Promise 包装了以后，就变成异步执行了
````
### 两种写法：
1. 用async函数来写
````javascript
const f = () => console.log('now');
(async () => f())();
console.log('next');
// now
// next
````
2. 使用new Promise()
````javascript
const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');
// now
// next
````
3. 现在有一个提案，提供Promise.try方法替代上面的写法。
````javascript
const f = () => console.log('now');
Promise.try(f);
console.log('next');
````
