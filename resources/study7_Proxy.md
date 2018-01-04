## Proxy
### 概念：Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
### Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
1. ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
````javascript
var proxy = new Proxy(target, handler);
````
- Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。
- new Proxy()表示生成一个Proxy实例
- target参数表示所要拦截的目标对象
- handler参数也是一个对象，用来定制拦截行为
2. 要使得Proxy起作用，必须针对`Proxy实例`进行操作，而不是针对`目标对象`进行操作.
3. 一个技巧是将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。
````javascript
var object = { proxy: new Proxy(target, handler) };
````
4. 同一个拦截器函数，可以设置拦截多个操作.对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。
5. Proxy 支持的拦截操作一览，一共 13 种
    - `get(target, propKey, receiver)`：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
    - `set(target, propKey, value, receiver)`：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
    - `has(target, propKey)`：拦截propKey in proxy的操作，返回一个布尔值。
    - `deleteProperty(target, propKey)`：拦截delete proxy[propKey]的操作，返回一个布尔值。
    - `ownKeys(target)`：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
    - `getOwnPropertyDescriptor(target, propKey)`：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
    - `defineProperty(target, propKey, propDesc)`：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
    - `preventExtensions(target)`：拦截Object.preventExtensions(proxy)，返回一个布尔值。
    - `getPrototypeOf(target)`：拦截Object.getPrototypeOf(proxy)，返回一个对象
    - `isExtensible(target)`：拦截Object.isExtensible(proxy)，返回一个布尔值。
    - `setPrototypeOf(target, proto)`：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
    - `apply(target, object, args)`：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)
    - `construct(target, args)`:拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。

## 具体调用说明：
http://es6.ruanyifeng.com/#docs/proxy

## Proxy.revocable()
- Proxy.revocable方法返回一个可取消的 Proxy 实例。
- Proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

## 实例：Web 服务的客户端
### Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。
````javascript
const service = createWebService('http://example.com/data');

service.employees().then(json => {
  const employees = JSON.parse(json);
  // ···
});
//上面代码新建了一个 Web 服务的接口，这个接口返回各种数据。Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。
function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () => httpGet(baseUrl+'/' + propKey);
    }
  });
}
```


