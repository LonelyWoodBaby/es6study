"use strict";

var _templateObject = _taggedTemplateLiteral(["<p>", " has sent you message</p>"], ["<p>", " has sent you message</p>"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * let语法：
 * 1.let声明的变量只在let命令所在的代码块有效
 *      for循环中的计数器，最好使用let
 * 2.let所声明的变量一定要在声明后使用，否则报错。
 * 3.只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响，称为“暂时性死区”（temporal dead zone，简称 TDZ）
 *      在代码块内，使用let命令声明变量之前，该变量都是不可用的
 *      “暂时性死区”也意味着typeof不再是一个百分之百安全的操作
 * 4.let不允许在相同作用域内，重复声明同一个变量
 *      不能在函数内部重新声明参数
 * 5.外层代码块不受内层代码块的影响
 * 6.ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用
 */

/**
 * const表达式
 * 1.const声明一个只读的常量。一旦声明，常量的值就不能改变。const一旦声明变量，就必须立即初始化，不能留到以后赋值。
 * 2.const的作用域与let命令相同：只在声明所在的块级作用域内有效。
 * 3.const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
 * 4.const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。
 *      const foo = {}
 *      foo.prop = 123;
 *      这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性
 *      想将对象冻结，应该使用Object.freeze方法
 *      const foo = Object.freeze({});
 */

/**
 * ES6拥有6中变量声明方法：
 * 1.ES5 只有两种声明变量的方法：var命令和function命令
 * 2.let命令和const命令
 * 3.import命令和class命令
 */

/**
 * 顶层对象的属性：
 * 1.var命令和function命令声明的全局变量，依旧是顶层对象的属性；
 * 2.let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性
 * 取得顶层对象：
 *  // 方法一
        (typeof window !== 'undefined'
        ? window
        : (typeof process === 'object' &&
            typeof require === 'function' &&
            typeof global === 'object')
            ? global
            : this);

        // 方法二
        var getGlobal = function () {
        if (typeof self !== 'undefined') { return self; }
        if (typeof window !== 'undefined') { return window; }
        if (typeof global !== 'undefined') { return global; }
        throw new Error('unable to locate global object');
        };
 */

/**
 * 数据的解构赋值：
 * ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
 * 1.数组的解构赋值
 *      let [a, b, c] = [1, 2, 3];
 *      这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
 *      如果解构不成功，变量的值就等于undefined。
 *      另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
 *      let [x, y] = [1, 2, 3];
 *      事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
 *      解构赋值允许指定默认值。内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的
 * 2.解构不仅可以用于数组，还可以用于对象
 *      let { foo, bar } = { foo: "aaa", bar: "bbb" };
 *      对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
 *      对象的解构赋值是下面形式的简写：
 *      let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
 *      对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者
 * 3.字符串解构赋值
 *      字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象
 *      const [a, b, c, d, e] = 'hello';
 *      类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值
 *      let {length : len} = 'hello';
 * 4.解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错
 *      解构赋值时，如果等号右边是数值和布尔值，则会先转为对象
 */

/**
 * 字符串操作
 * ES6添加了了三个新方法
 * includes()：返回布尔值，表示是否找到了参数字符串。
 * startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
 * endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
 * 这三个方法都支持第二个参数，表示开始搜索的位置
 * 使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束
 * 
 * repeat()方法：
 * repeat方法返回一个新字符串，表示将原字符串重复n次
 *      'hello'.repeat(2) // "hellohello"
 * 参数如果是小数，会被取整。
 *      'na'.repeat(2.9) // "nana"
 * 如果repeat的参数是负数或者Infinity，会报错。但是，如果参数是 0 到-1 之间的小数，则等同于 0
 * 如果repeat的参数是字符串，则会先转换成数字。
 *      'na'.repeat('na') // ""
 *      'na'.repeat('3') // "nanana"
 * 
 * padStart()，padEnd()
 * ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全
 *      'x'.padStart(5, 'ab') // 'ababx'
 *      'x'.padEnd(5, 'ab') // 'xabab'
 * 如果省略第二个参数，默认使用空格补全长度
 * 可以用于提示字符串格式。
 *      '12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
 *      '09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
 * 
 * 模板字符串
 * 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
 *      let name = "Bob", time = "today";
        `Hello ${name}, how are you ${time}?`
 * 如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。let greeting = `\`Yo\` World!`;
 * 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中，如果不想要想要这个换行，可以使用trim()方法消除它。
 * 模板字符串中嵌入变量，需要将变量名写在${}之中。
 *      大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。
 *      如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法。
 *      如果模板字符串中的变量没有声明，将报错。
*/
//以下为一个模板编译函数，将<%=%>内的JavaScript函数编译为模板语言
var template = "\n<ul>\n  <% for(let i=0; i < data.supplies.length; i++) { %>\n    <li><%= data.supplies[i] %></li>\n  <% } %>\n</ul>\n";
function compile(template) {
    var evalExpr = /<%=(.+?)%>/g;
    var expr = /<%([\s\S]+?)%>/g;
    template = template.replace(evalExpr, "`);\n echo( $1 );\n echo(`").replace(expr, "`); \n $1 \n echo(`");
    template = "echo(`" + template + "`);";

    var script = "(function parse(data){\n        let output = \"\";\n        function echo(html){\n            output += html;\n        }  \n        " + template + "\n        return output;\n    })";

    return script;
}

var parse = eval(compile(template));
div.innerHTML = parse({ supplies: ["broom", "mop", "cleaner"] });

/**
 * 模板可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）
 * alert`123` 等同于  alert(123)
 */

//以下为标签模板的应用之一：过滤非法字符串,并进行加工处理后按照模板方式输出
function saferHTML(templateData) {
    var s = templateData[0];
    for (var i = 1; i < arguments.length; i++) {
        var arg = String(arguments[i]);

        s += arg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        s += template[i];
    }
    return s;
}
var sender = '<script>alert("abc")</script>'; // 恶意代码
var message = saferHTML(_templateObject, sender);
div.innerHTML = message;

/**
 * 字符串的正则方法
 * 字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和split()。
 * ES6为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。
 *      y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
 *      y修饰符同样遵守lastIndex属性，但是要求必须在lastIndex指定的位置发现匹配。实际上，y修饰符号隐含了头部匹配的标志^
 *      与y修饰符相匹配，ES6 的正则对象多了sticky属性，表示是否设置了y修饰符
 *          var r = /hello\d/y;
            r.sticky // true
 * ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符。
 *      // ES5 的 source 属性
        // 返回正则表达式的正文
        /abc/ig.source
        // "abc"

        // ES6 的 flags 属性
        // 返回正则表达式的修饰符
        /abc/ig.flags

 * 正则表达式使用圆括号进行组匹配
 *      const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
 *      上面代码中，正则表达式里面有三组圆括号。使用exec方法，就可以将这三组匹配结果提取出来
 *      const matchObj = RE_DATE.exec('1999-12-31');
        const year = matchObj[1]; // 1999
        const month = matchObj[2]; // 12
        const day = matchObj[3]; // 31
 * 
 * 
 */

/**
 * ES6 在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法
 *
 * 1.Number.isFinite()用来检查一个数值是否为有限的（finite）（有确切的值，整数或小数都是对的，字符串，布尔，以及其他类型均返回false)
 * 
 * 2.Number.isNaN()用来检查一个值是否为NaN。
 * 
 * Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false
 * 
 * 3.ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面
 *      Number.parseInt === parseInt // true
 * 4.Number.isInteger()用来判断一个值是否为整数。
 *      需要注意的是，在 JavaScript 内部，整数和浮点数是同样的储存方法，所以 3 和 3.0 被视为同一个值。
 * 5.ES6 在Number对象上面，新增一个极小的常量Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。
 *      Number.EPSILON实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了
 * 6.ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
 *      JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值
 *      Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内
 * 
 */
//以下在ES5中添加isFinite方法
(function (global) {
    var global_isFinite = global.isFinite;

    Object.defineProperty(Number, "isFinite", {
        value: function isFinite(value) {
            return typeof value === "number" && global_isFinite(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
})(undefined);

//在ES5中部署添加isNaN方法
(function (global) {
    var global_isNaN = global.isNaN;

    Object.defineProperty(Number, 'isNaN', {
        value: function isNaN(value) {
            return typeof value === 'number' && global_isNaN(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
})(undefined);

//利用最小浮点数来完成一个带误差值的计算比较方法
function withinErrorMargin(left, right) {
    return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}
0.1 + 0.2 === 0.3; // false
withinErrorMargin(0.1 + 0.2, 0.3); // true

//保证计算中所有数均为安全整数范围。
function trusty(left, right, result) {
    if (Number.isSafeInteger(left) && Number.isSafeInteger(right) && Number.isSafeInteger(result)) {
        return result;
    }
    throw new RangeError('Operation cannot be trusted!');
}
trusty(9007199254740993, 990, 9007199254740993 - 990);

/**
 * Match对象扩展
 * 1.Math.trunc()；
 *  Math.trunc方法用于去除一个数的小数部分，返回整数部分。
 *  对于非数值，Math.trunc内部使用Number方法将其先转为数值。
 *  对于空值和无法截取整数的值，返回NaN
 * 2.Math.sign()
 *  Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
 *  参数为正数，返回+1；参数为负数，返回-1；参数为 0，返回0；参数为-0，返回-0;其他值，返回NaN
 * 3.Math.cbrt()
 *  Math.cbrt方法用于计算一个数的立方根
 *  对于非数值，Math.cbrt方法内部也是先使用Number方法将其转为数值。
 * 4.Math.clz32()
 *  JavaScript 的整数使用 32 位二进制形式表示，Math.clz32方法返回一个数的 32 位无符号整数形式有多少个前导 0
 * 5.Math.imul() 
 *  Math.imul方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
 * 6.Math.fround()
 *  Math.fround 方法返回一个数的单精度浮点数形式。
 *  对于整数来说，Math.fround方法返回结果不会有任何不同，区别主要是那些无法用 64 个二进制位精确表示的小数。这时，Math.fround方法会返回最接近这个小数的单精度浮点数。
 * 7.Math.hypot()
 *  Math.hypot方法返回所有参数的平方和的平方根
 *  如果参数不是数值，Math.hypot方法会将其转为数值。只要有一个参数无法转为数值，就会返回 NaN
 * 
 * 8.Math.expm1()
 *  Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。
 * 9.Math.log1p()
 *  Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
 * 10.Math.log10()
 *  Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN
 * 
 * 11.Math.signbit()
 *  Math.sign()用来判断一个值的正负，但是如果参数是-0，它会返回-0;因此引入了Math.signbit()方法判断一个数的符号位是否设置了。
 *  如果参数是NaN，返回false；如果参数是-0，返回true；如果参数是负值，返回true；其他情况返回false
 */

//模拟Match.trunc()
Math.trunc = Math.trunc || function (x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
};
//模拟Match.sign()
Math.sign = Math.sign || function (x) {
    x = +x; // convert to a number
    if (x === 0 || isNaN(x)) {
        return x;
    }
    return x > 0 ? 1 : -1;
};
//模拟Math.cbrt()
Math.cbrt = Math.cbrt || function (x) {
    var y = Math.pow(Math.abs(x), 1 / 3);
    return x < 0 ? -y : y;
};
//模拟Math.fround()
Math.fround = Math.fround || function (x) {
    return new Float32Array([x])[0];
};
//模拟Math.expm1()
Math.expm1 = Math.expm1 || function (x) {
    return Math.exp(x) - 1;
};
//模拟Math.log1p()
Math.log1p = Math.log1p || function (x) {
    return Math.log(1 + x);
};
//模拟Math.log10()
Math.log10 = Math.log10 || function (x) {
    return Math.log(x) / Math.LN10;
};

/**
 * ES2016 新增了一个指数运算符（**）
 *  指数运算符可以与等号结合，形成一个新的赋值运算符（**=）。
 *  let a = 1.5;
 *  a **= 2;
 *  // 等同于 a = a * a;
 * 
 * 
 * Integer 数据类型
 *  引入了新的数据类型 Integer（整数），来解决这个问题。整数类型的数据只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示
 *  为了与 Number 类型区别，Integer 类型的数据必须使用后缀n表示
 *  typeof运算符对于 Integer 类型的数据返回integer
 *  JavaScript 原生提供Integer对象，用来生成 Integer 类型的数值。转换规则基本与Number()一致
 *  在数学运算方面，Integer 类型的+、-、*和**这四个二元运算符，与 Number 类型的行为一致。除法运算/会舍去小数部分，返回一个整数。
 *  Integer 类型不能与 Number 类型进行混合运算。
 *  相等运算符（==）会改变数据类型，也是不允许混合使用
 */