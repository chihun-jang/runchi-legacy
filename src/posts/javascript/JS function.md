---
title: "JS apply"
date: "2019-05-26"
category: ['javascript']
draft : False
---

## JavaScript Apply

```javascript
function sum(arg1, arg2){
    return arg1+arg2;
}
alert(sum.apply(null, [1,2])) 
```

이런식으로 `arg1` 과 `arg2`를 전달해 줄수도 있다.

> `sum.apply(null, [1,2])`에서 null부분은 무엇?


```javascript
o1 = {val1:1, val2:2, val3:3}
o2 = {v1:10, v2:50, v3:100, v4:25}
function sum(){
    var _sum = 0;
    for(name in this){
        _sum += this[name];
    }
    return _sum;
}
alert(sum.apply(o1)) // 6
alert(sum.apply(o2)) // 185
```
위의 코드랑 같은 것이

```javascript
function sum(){
    var _sum = 0;
    for(name in this){
 if(typeof this[name] !== 'function')
        _sum += this[name];
    }
    return _sum;
}

o1 = {val1:1, val2:2, val3:3, sum:sum}
o2 = {v1:10, v2:50, v3:100, v4:25, sum:sum}
alert(o1.sum()) // 6
alert(o2.sum()) // 185
```
이렇게 해줄수도 있다.

`apply`를 사용해서 객체를 지정해주는 것은
python 에서 `self`로 `o1 o2` 인스턴스를 전달해주는 것과 비슷하다고 생각해주면 될 것 같다.

따라서 `sum.apply(o1)` 은 `o1.sum` 이거랑 같은 의미를 지닌다고 할수있다.