---
title: "JS Arguments"
date: "2019-05-26"
category: ['Javascript',"FrontEnd"]
draft : True
---


* 매개변수 : function(parameter) 함수가 받는 자리의 이름

* 인자 : function(1) 함수가 받는 실질적인 data의 이름

```javascript
function sum(){
    var _sum = 0; 
    for(var i = 0; i < arguments.length; i++){     //arguments에는 사용자가 전달한 인자들이 들어가있다.
        document.write(i+' : '+arguments[i]+'<br />');
        _sum += arguments[i];
    } 
    return _sum;
}
document.write('result : ' + sum(1,2,3,4));
```

JS는 *매개변수의 갯수와 인자의 갯수가 달라도 상관 없다*

`aruments.length`를 이용해서 객체가 몇개의 인자를 가지고 있는지
그리고 `arguments[i]`를 이용해서 어떤 값인지 알아낼 수 있다.

> arguments는 사실 배열은 아니다. 실제로는 arguments 객체의 인스턴스다.


### 매개변수의 수 

`function.length` :  매개변수의 길이
`arguments.length` : 직접 전달받은 인자의 길이

```javascript

function zero(){
    console.log(
        'zero.length', zero.length,
        'arguments', arguments.length
    );
}
function one(arg1){
    console.log(
        'one.length', one.length,
        'arguments', arguments.length
    );
}
function two(arg1, arg2){
    console.log(
        'two.length', two.length,
        'arguments', arguments.length
    );
}

zero(); // zero.length 0 arguments.length 0
one('val1', 'val2');  // one.length 1 arguments.length 2
two('val1');  // two.length 2 arguments.length 1

```