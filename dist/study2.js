"use strict";

function fetch(url, _ref) {
    var _ref$body = _ref.body,
        body = _ref$body === undefined ? "" : _ref$body,
        _ref$method = _ref.method,
        method = _ref$method === undefined ? "GET" : _ref$method,
        _ref$headers = _ref.headers,
        headers = _ref$headers === undefined ? {} : _ref$headers;

    console.log(body);
    console.log(method);
    console.log(headers);
}

fetch("http://example.com", {});

//fetch("http://example.com");

console.log(function (a, b) {
    var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
}.length);

var handler = {
    id: "12345",
    init: function init() {
        var _this = this;

        //document.addEventListener("click",event => this.doSomething(event.type),false);

        var result = function result() {
            return _this.doSomething("myType");
        };
        result();
    },
    doSomething: function doSomething(type) {
        console.log("Handing " + type + "for" + this.id);
    }
};

handler.init();

function Fibonacci2(n) {
    var ac1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var ac2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    if (n <= 1) {
        return ac2;
    };

    return Fibonacci2(n - 1, ac2, ac1 + ac2);
}

console.log(Fibonacci2(5));