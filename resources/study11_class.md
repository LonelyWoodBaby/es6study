## 简介：
ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已
````javascript
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
````
1. 类的数据类型就是`函数`，类本身就指向`构造函数`
2. 构造函数的`prototype`属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面
3. 类的内部所有定义的方法，都是`不可枚举的（non-enumerable）`。
4. 类和模块的内部，`默认`就是`严格模式`，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。
5. constructor方法是类的`默认方法`，通过`new`命令生成对象实例时，自动调用该方法。
6. 一个类必须有constructor方法，如果没有显式定义，一个`空的constructor方法`会被`默认添加`。
    - constructor方法默认返回`实例对象（即this）`，完全可以指定返回另外一个对象。
7. 类`必须使用new`调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
8. 类不存在`变量提升（hoist）`，这一点与 ES5 完全不同
    - 必须保证子类在父类之后定义。
9. ES6 不支持私有属性和私有方法，目前，有一个提案，为class加了私有属性。方法是在属性名之前，使用`#`表示。
10. 类的方法内部如果含有this，它默认指向类的`实例`。
11. 类的name属性总是返回紧跟在class关键字后面的类名。
12. 与 ES5 一样，在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。存值函数和取值函数是设置在属性的 `Descriptor` 对象上的
13. class的遍历可以覆盖该类的`Symbol.iterator`方法.for...of循环将自动调用本方法进行循环遍历
````javascript
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
````
14. 

## class表达式
1. 与函数一样，类也可以使用表达式的形式定义。
````javascript
//定义类
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
//需要注意的是，这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
````
2. 采用 Class 表达式，可以写出立即执行的 Class。
````javascript
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
````

## Class 的静态方法
类相当于实例的`原型`，所有在类中定义的方法，都会被`实例继承`。如果在一个方法前，加上`static`关键字，就表示该方法`不会`被实例继承，而是`直接通过类来调用`，这就称为`“静态方法”`。
````javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
````
1. 如上述代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（`Foo.classMethod()`），而不是在Foo类的实例上调用。
2. 如果静态方法包含this关键字，这个this指的是`类`，而不是实例
3. 父类的静态方法，可以被子类继承。
4. 静态方法也是可以从`super`对象上调用的
5. class也粗在静态属性，静态属性指的是 `Class 本身`的属性，即`Class.propName`，而不是定义在实例对象（this）上的属性。
````javascript
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
//只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。
````

## new.target 属性
new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个`new.target`属性，该属性一般用在`构造函数`之中，返回new命令作用于的那个`构造函数`。如果构造函数不是通过new命令调用的，new.target会返回`undefined`
````javascript
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
//上面代码确保构造函数只能通过new命令调用。
````
1. Class 内部调用new.target，返回当前 Class。
2. 子类继承父类时，new.target会返回子类。
3. 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
````javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
// Shape类不能被实例化，只能用于继承。
````

## 继承
1. Class 可以通过`extends`关键字实现继承，这比 ES5 的通过`修改原型链`实现继承，要清晰和方便很多。
````javascript
class Point {
}
class ColorPoint extends Point {
}
````
2. 子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类`没有自己的this对象`，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
3. ES5 的继承，实质是`先创造子类的实例对象this`，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先`创造父类的实例对象this`（所以必须先调用super方法），然后再用子类的构造函数修改this
4. 在子类的构造函数中，`只有调用super之后，才可以使用this关键字`，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
5. 父类的静态方法，也会被子类继承。
6. `Object.getPrototypeOf`方法可以用来从子类上获取父类.可以使用这个方法判断，一个类是否继承了另一个类。
````javascript
Object.getPrototypeOf(ColorPoint) === Point
````
7. `super`这个关键字，既可以当作`函数`使用，也可以当作`对象`使用
    - 第一种情况，super作为函数调用时，代表父类的`构造函数`。
        - 注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super()在这里相当于`A.prototype.constructor.call(this)`。
        - 作为函数时，super()只能用在`子类的构造函数`之中，用在其他地方就会报错。
    - 第二种情况，super作为对象时，在普通方法中，指向父类的`原型对象`；在`静态方法`中，指向`父类`。
        - ES6 规定，通过super调用父类的方法时，`方法内部的this指向子类`。
    - 使用super的时候，必须`显式指定`是作为函数、还是作为对象使用，否则会报错。
    - 由于对象总是继承其他对象的，所以可以在`任意一个对象`中，使用super关键字。

8. ES5 实现之中，每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype属性`。Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在`两条继承链`。
    - 这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。
9. extends关键字后面可以跟多种类型的值。
````javascript
class B extends A{}
````
- 上面代码的A，只要是`一个有prototype属性的函数`，就能被B继承。由于`函数都有prototype属性`（除了Function.prototype函数），因此A可以是`任意函数`
10. 三种extends的特殊情况
    - 第一种特殊情况，子类继承Object类。这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例.
    - 第二种特殊情况，不存在任何继承.这种情况下，A作为一个基类（即不存在任何继承），就是一个`普通函数`，所以直接继承Function.prototype。但是A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性。
    - 第三种特殊情况，子类继承`null`。
    这种情况与第二种情况非常像。A也是一个普通函数，所以直接继承Function.prototype。但是，A调用后返回的对象不继承任何方法，所以它的__proto__指向Function.prototype
11. ES6 允许`继承原生构造函数`定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。
````javascript
//ES5中实现一个自定义Array
function MyArray() {
  Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    writable: true,
    configurable: true,
    enumerable: true
  }
});

//ES6中通过继承实现一个自定义Array
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

````


