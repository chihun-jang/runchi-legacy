---
title: "JS Closure"
date: "2019-05-22"
category: ['javascript']
draft : False
---

## JS Closure

내부함수가 외부함수의 맥락에 접근할수 있는 것,
큰 size의 코드 및 고난이도의 테크닉 사용시 필수


### 내부함수에 사용할 지역변수가 있는 경우

```javascript
function outter(){
    function inner(){          //내부함수(어떤 함수 내에서만 사용되는 경우 정의해준다)
        var title = 'coding everybody';
        alert(title);
    }
    inner();
}
outter();
```
외부함수 안에 내부함수가 선언되어 있고 호출되므로
*외부함수가 호출될때 내부함수도 같이 호출* 된다



### 내부함수에 변수가 없을때
 
```javascript

function outter(){
    var title = 'coding everybody';
    function inner(){     
        alert(title);           //이렇게 내부함수 내에 title이라는 변수가 없으면 외부함수내에서 title이라는 지역변수를 찾아서 사용한다.
    }
    inner();
}
outter();
```

위의 코드는 outter가 호출되면서 inner가 내부적으로 호출되게 되는데 
*이때 title이라는 변수가 inner내에 없으므로 외부함수에 있는 변수를 찾아 사용*해준다.





### 내부함수에서의 클로저 사용
```javascript
function outter(){
    var title = 'coding everybody';
    return function(){     
        alert(title);
    }
}
var inner = outter();
inner();
```

outter 라는 함수의 리턴값을 inner라는 변수에 저장하고
inner를 호출하게되면 *function의 alert가 실행되게 되고 title을 가져와야하는데*
inner에는 `var title`값은 저장이 되어있지 않다.

하지만 *inner가 실행될때는 outter에 있는 title값도 불러서 사용할수 있는것 이게 **클로져***다



### Private variable에서의 Closure

```javascript

function factory_movie(title){             //title은 함수내에서 지역변수로 사용된다
    return {
        get_title : function (){               //내부함수(객체에 포함되어있는)
            return title;
        },
        set_title : function(_title){
            title = _title
        }
    }
}

a_movie = factory_movie('닥터스트레인지');   
//factory_movie를 통해 2개의 객체를 만들고 만들어지는 시점의 context 외부함수의
//지역변수에 접근할수 잇고 유지가 되기때문에 set_title로는 a_movie의 지역변수만을 바꾼다 따라서 안전하게 할수있다
b_movie = factory_movie('엽기적인그녀');

alert(a_movie.get_title());       >>> '닥터스트레인지'
alert(b_movie.get_title());       >>> '엽기적인그녀'

a_movie.set_title('클래식');

alert(a_movie.get_title());      >>>'클래식'
alert(b_movie.get_title());      >>> '엽기적인그녀'
```

코드가 방대해지면 다른사람과의 작업 및 나 자신 조차도 코드를 망가뜨릴 염려가 있다.
따라서 수정을 할때는 set title로 코드 로직의 무결성을 보존해주고 get을 이용해서 가져올 수 있다.

다른 언어의 getter와 setter라고 생각을 해주자



### Closuer를 사용할 때 하기 쉬운 실수

```javascript
var arr = []
for(var i = 0; i < 5; i++){
    arr[i] = function(){
        return i;
    }
}
for(var index in arr) {
    console.log(arr[index]());
}
//이렇게 되면 5만을 5번 return해주게 되는데 그이유는 i라는 것이 내부함수의 인자로 사용되기때문이다


var arr = []
for(var i = 0; i < 5; i++){
    arr[i] = function(id) {
        return function(){
            return id;
        }
    }(i);
}
for(var index in arr) {
    console.log(arr[index]());
}

// 이렇게 바꿔주면 내부함수가 외부함수의 지역변수를 참조하게되고
// 외부함수는 for문이 돌때마다 새로운 인자를 받아서 지역변수로 가지기 때문에
// 결과적으로 for문이 돌때마다 외부함수의 지역변수를 내부함수가 새롭게 가져다 사용하는게 된다.
```
출처 : 생활코딩