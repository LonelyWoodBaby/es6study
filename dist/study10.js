"use strict";

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
                    return _context.abrupt("return", x + y + z);

                case 8:
                case "end":
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