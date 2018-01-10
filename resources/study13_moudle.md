## 概述
 ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
````javascript
import {stat,exists,readfiles} from "fs";
//上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载
````
## 严格模式
### 严格模式内容：
- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected、static和interface）

## export
模块功能主要由两个命令构成：`export`和`import`。export命令用于规定模块的`对外接口`，import命令用于`输入`其他模块提供的功能。
1. 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取.如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。
````javascript
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
//或者
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
````
2. export命令除了输出变量，还可以输出函数或类（class）。
    - export输出的变量就是本来的名字，但是可以使用`as`关键字`重命名`。
    - export命令规定的是对外的`接口`，必须与模块内部的变量建立一一对应关系。
    - export语句输出的接口，与其对应的值是`动态绑定关系`，即通过该接口，可以取到模块内部`实时的值`。
```javascript
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```
3. export命令可以出现在模块的任何位置，只要处于`模块顶层`就可以,如果处于块级作用域内，就会报错.

## import
1. 使用export命令`定义了模块的对外接口`以后，其他 JS 文件就可以通过`import命令加载`这个模块。
````javascript
import {firstName, lastName, year} from './profile';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
//重命名
import { lastName as surname } from './profile';
//上面代码的import命令，用于加载profile.js文件，并从中输入变量
````
2. import命令接受`一对大括号`，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与`被导入模块（profile.js）对外接口的名称相同`
    - 如果想为输入的变量重新取一个名字，import命令要使用`as`关键字，将输入的变量`重命名`。
3. import后面的`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js后缀可以省略。
    - 如果只是模块名，不带有路径，那么必须有`配置文件`，告诉 JavaScript 引擎该模块的位置。
4. import命令具有`提升`效果，会提升到`整个模块的头部，首先执行`。
    - import命令是`编译阶段`执行的，在代码运行之前。
5. 由于import是`静态执行`，所以`不能使用`表达式和变量，这些只有在运行时才能得到结果的语法结构。
6. 如果多次重复执行同一句import语句，那么只会`执行一次`，而不会执行多次。
    - import语句是` Singleton `模式
