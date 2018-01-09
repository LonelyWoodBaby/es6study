'use strict';

var _marked = /*#__PURE__*/regeneratorRuntime.mark(foo);

function foo(x) {
    var y, z;
    return regeneratorRuntime.wrap(function foo$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return x + 1;

                case 2:
                    _context.t0 = _context.sent;
                    y = 4 * _context.t0;
                    _context.next = 6;
                    return y / 2;

                case 6:
                    z = _context.sent;
                    return _context.abrupt('return', x + y + z);

                case 8:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

var a = foo(10);

console.log(a.next());
console.log(a.next());
console.log(a.next());

var a = foo(10);

console.log(a.next());
console.log(a.next(8));
console.log(a.next(12));
// x = 10
// y = 32
// z = 12 

function timeout(ms) {
    return new Promise(function (resolve) {
        console.log(resolve);
        setTimeout(resolve, ms);
    });
}

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}

asyncPrint('hello world', 500);

//ping 百度测试网络连接
var superagent = require('superagent');
var NUM_RETRIES = 3;

async function test() {
    var i = void 0;
    for (i = 0; i < NUM_RETRIES; ++i) {
        try {
            await superagent.get('http://www.baidu.com');
            break;
        } catch (err) {}
    }
    console.log(i); // 3
}

test();

//Generator自动执行器的实现
function spawn(genF) {
    return new Promise(function (resolve, reject) {
        var gen = genF();
        function step(nextF) {
            var next = void 0;
            try {
                next = nextF();
            } catch (e) {
                return reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(function (v) {
                step(function () {
                    return gen.next(v);
                });
            }, function (e) {
                step(function () {
                    return gen.throw(e);
                });
            });
        }
        step(function () {
            return gen.next(undefined);
        });
    });
}