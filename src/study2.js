function fetch(url,{body="",method="GET",headers = {} }){
    console.log(body);
    console.log(method);
    console.log(headers);
}

fetch("http://example.com",{});

//fetch("http://example.com");

console.log(
    (function(a,b,c=2){}).length
);

var handler = {
    id:"12345",
    init : function(){
        //document.addEventListener("click",event => this.doSomething(event.type),false);
        
        let result = () => this.doSomething("myType");
        result();
    },
    doSomething:function (type){
        console.log("Handing " + type + "for" + this.id) ;
    }
};

handler.init();

function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
    if( n <= 1 ) {return ac2;};

    return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

console.log(Fibonacci2(5));