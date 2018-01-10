class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    static say(){
        console.log("hello");
    }
}
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
    }
  
    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}
let myColor = new ColorPoint(12,33,"red");
console.log(myColor);
ColorPoint.say();


// class Math{
//     @log
//     add(a,b){
//         return a+b;
//     }
// }

// function log(target,name,descriptor){
//     var oldValue = descriptor.value;
//     descriptor.value = function(){
//         console.log(`Calling ${name} with`, arguments);
//         return oldValue.apply(null,arguments);
//     };
//     return descriptor;
// }

// const math = new Math();
// math.add(8,7);