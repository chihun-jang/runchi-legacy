---
title: "JS scope"
date: "2019-05-16"
category: ['javascript']
draft : False
---

> 본 글은 1년전 JS를 처음 시작할 무렵 적었던 포스팅에서 추려서 Migration 한 부분입니다.
> var를 사용하는 등의 약간의 차이가 있을 수 있습니다.

### JS 유효범위(Scope)

지역변수 :  함수내부에서 만들어진 변수, 함수 밖에서 사용할 수 없다
전역변수 :  JS 전체에서 사용가능

일반적으로 JS에서 var라는 것은 local variable을 나타내는데

```javascript
var myvar1 = 'global'

function myfunc(){
 var myvar1 = 'local';
 myvar1 = 'local';
}
myfunc()
alert(myvar1)
```

global을 할당해준 부분은 함수 밖에서 전역 변수로 선언을 해주었고

함수안에서도 `var myvar1`을 이용해서 local을 할당해주었는데
함수안에서 선언되었으므로 local variable이 된다

그리고 밑에 따라온 myvar1 또안 var를 붙이지 않았지만
*이 경우 같은 함수내에 local variable이 있으므로 해당 variable을 찾아가서 변경*시켜준다
그래서 `alert(myvar1)`의 값은 그대로 global이다

*만약 같은 함수내에 `var myvar1`이 없었으면   `myvar1 = 'local'` 이 global variable에 영향을 미쳐 `alert(myvar1)`의 값은 local이 될것이다.*


따라서 우리는 특별한 이유가 아니라면 함수밖에서 전역변수를 사용하는것을 자제해주는게 좋다
==> 왜냐면 단순히 변수를 전역변수로 사용해주게 되면 나중에 코드가 꼬일 수도 있고 에러를 발생시킬수 있다.


그래서 JS에서는

```javascript
(function(){
}())
```

이런식으로 익명함수로 코드를 둘러싸 형태로 모듈마다 변수를 사용해줄수 있다.



> 만약 전역변수를 사용하려면?


```javascript

var MyObject= {}

MyObject.calculator={
    'first': null,
    'second' : null
}

```
이런식으로 하나의 객체를 전역변수로 만들어서 사용하고 객체를 세부적으로 나누어 사용해줄 수 있다.


### 유효범위의 대상(var한정)

JS에서는 for나 if안에서 선언해준것은 전역변수이다
즉 다른언어처럼 블록으로 묶였다고 해서 지역변수인게 아니다
오직 함수내에서만 쓰인 변수만 지역변수이다

```javascript
function a (){
    i = 0;
}
for(i = 0; i < 5; i++){
    a();
    document.write(i);
}
```

이렇게 하면 for문 안에서 선언된 i가 전역변수이고 for문이 돌때마다 a()가
i의 값을 0으로 초기화 시켜서 무한루프를 돌게 된다


#### static scoping(lexical scoping)
사용될때가 아닌 정의된 시점의 전역변수가 사용된다

```javascript
var i = 5;

function a(){
    var i = 10;
    b();
}

function b(){
    document.write(i);
}

a();

브라우저에는 5가 쓰여진다
```

이런 코드가 있을때 b()가 쓰이는 곳에따라서 다른 i를 가지게 된다면 이는 동적 유효범위일텐데
b()가 선언되는 순간 정의되기때문에 이는 정적 유효범위라고 해준다
