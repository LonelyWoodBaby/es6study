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

function timeout(ms) {
    return new Promise((resolve) => {
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
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
    let i;
    for (i = 0; i < NUM_RETRIES; ++i) {
        try {
            await superagent.get('http://www.baidu.com');
            break;
        } catch(err) {}
    }
    console.log(i); // 3
}

test();

//Generator自动执行器的实现
function spawn(genF) {
    return new Promise(function(resolve, reject) {
        const gen = genF();
        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch (e) {
                return reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(
                function(v) {
                    step(function() {
                        return gen.next(v);
                    });
                },
                function(e) {
                    step(function() {
                        return gen.throw(e);
                    });
                }
            );
        }
        step(function() {
            return gen.next(undefined);
        });
    });
}