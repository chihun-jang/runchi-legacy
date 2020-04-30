---
title: "JS 기본개념"
date: "2019-03-31"
category: ['javascript']
draft : False
---


> 본 글은 1년전 JS를 처음 시작할 무렵 적었던 포스팅에서 추려서 Migration 한 부분입니다.


###  JS의 변수 

var a = 1; 과 같은 방법으로 변수를 선언한다
(var를 생략할수 있는데 생략하면 유효범위에 영향을 미친다)

==> 지금은 ECMA2015 이후로 let과 const 를 더 많이 사용하는 추세다.


### ;(세미콜론)   
JS의 경우 한줄에 여러 명령어를 칠때 ;로 구분을 할 수 있는데 
이때 ;를 안 써도 개행문자를 만나면 명령의 끝으로 간주를 한다


### JS의 연산자

==(동등연산자) 과 ===(일치연산자)   
    1. 표현하는 값이 같으면 동등 연산자는 true
    2. 동등연산자 + 자료형도 일치 ==> 일치연산자

```javascript
    null == undefined    true
    null === undefined  false
    true == 1               true
    true === 1             false
    true == '1'              true
    true === '1'            false
    NaN === NaN         false
```

*null은 값이 없음을 명시, undefined는 값이 정의되지 않은 상태*
*NaN은 0/0과 같은 연산의 결과로 만들어지는 숫자가 아닌 데이터형*

!=와 !== 도 정확히 다른가에 따라 다른 bool값을 보여준다
따라서 일반적으로 ===, !==를 사용하도록 하자


 && : and의 의미

 ||    : or의 의미

 !     : not


### JS의 함수

JS에서 함수는 객체로 취급이 되기때문에
변수에 담거나, 객체에 담거나, arg로 사용하거나 return 값으로 반환하거나... 할수 있다.

이러한 속성 덕분에 CallBack 함수라는 다른 함수의 인자로 함수를 넣는것도 가능한데
일반적으로 동기적인 작업을 위해서 callback 함수를 사용한다.


### JS의 함수 호이스팅(var를 사용함으로 발생하는 문제)


function으로 그냥 정의하는 것을 *선언식*이라고 한다

```javascript

function 함수이름 ( arg ){
   내용
   return값
}
```

변수에 넣는것을 *표현식*이라한다

```javascript

var myfunction  = function (){
}

```

함수 호이스팅으로 인해 표현식의 경우에 에러가 발생할수 있는데 다음의 경우를 알아보자
(호이스팅이란 JS 에서 실행콘텍스트가 어떻게 동작하는가에 대한 생각, 
**위치가 이동하는 것으로 생각하지만 함수 및 변수의 위치는 코드의 위치 그대로 있는 상태에서 동작만 다르게 하는것** )

```javascript
myfunction1()
myfunction2()

myfunction1() {}

var myfunction2 = function() {}
```

위의 코드를 실행하면
myfunction1 은 아래의 함수의 정의가 위로 올라와 실행이 제대로 되는데
myfunction2 는 var myfunction2가 위로 올라오게 되고 function(){}으로 정의된 부분 호출된 부분의 밑에 그래도 남아있어 ~ is not a function 에러가 발생하게 된다
따라서 **함수와 변수는 코드 상단부에 선언을 해주게 되면 호이스팅으로 인한 scope꼬임 현상을 방지** 할수 있다.*(혹은 let과 const를 사용해주도록 하자)*

즉 위의 예에서 함수(`myfunction1`)는 그 자리 그대로 위치 하여 실행되므로 호이스팅에 영향을 받지 않는다.



### JS의 배열

array.length    :  배열의 길이


method
```javascript
array.forEach()  : 배열의 항목들을 순환하며 처리(loop구문과 비슷하다고 생각해주면 되겠다.)
array.push(항목)      : 배열의 끝에 항목 추가하기
array.pop()       :  배열의 끝에 있는 항목 제거
array.shift()       :  배열의 앞에 있는 항목 제거
array.unshift()    :  배열의 앞에 추가
array.concat()     : 배열에 복수의 원소를 추가
array.indexOf()   :  항목의 인덱스 찾기 
array.splice(index, number) : array의 index항목부터 number까지 제거
array.slice()       : 해당 array의 사본 생성
array.sort()        : 오름차순으로 정렬
array.reverse()    : 역순으로 정렬
```


### JS의 객체

**객체를 만드는 법**

```javascript
1. let objects = { 'first'  : 1 , 'second' : 2};

2. let objects = {};
   objects['first'] = 1;
   objects['second'] = 2;

3. let objects = new Objecst();
    objects['first'] = 1;
    objects['second'] = 2;

```

**객체 가져오기**

```javascript
1 . object['first'] = 1
2 . object.first    = 1
```

**객체에는 객체를 담을 수도 있고 함수도 담을 수 있다.**

```javascript
var object = {
    'list'  :  { 'first' : 1, 'second' : 2},

    'function' : function(){
          for(var key in this.list){
           alert( key + ':' + this.list[key] + "<br / >");
              }
        }
};

object.function();
```
