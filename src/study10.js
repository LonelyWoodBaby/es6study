function* foo(x){
    var y = 4 * (yield(x+1));
    var z = yield(y /2);
    return (x + y +z);
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