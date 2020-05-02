---
title: "Python mutable,immutable & Deep copy,Shallow copy"
date: "2019-01-28"
category: ['python']
draft : False
---


### mutable & immutable


> 객체는 **mutable(변경가능)**하거나 **immutable(변경불가능)**하다



* mutable 하다는 것은 만들어진 이후에 변경 가능
  * immutable object  :  int, float, str, tuple, bool

* immutable 하다는 것은 만들어진 이후에 변경 불가능
  * mutable :  list, set, dict


>이번 포스트에서 사용하면 좋을 함수들
> id(object) : obejct에 부여된 고유한 id값을 리턴해준다
(unique한 object id를 부여받는다)
id 값이 같다면 두 객체는 동일한 객체이다

>a is b      : a와 b가 같은 객체라면 True리턴



#### immutable
```python
a = 1
b = a 

a is b  ==> true

a = 2

a is b  ==> false
```

> a는 2이고 b는 1이다


위의 상황을 나름대로 이해하기 쉽게 설명해보면

*__b=a는 객체 복사__*를 나타내는데 *__b는 지금 a과 같은 객체__*를 가리키고 있다
(즉 변수는  오른쪽의 데이터를 가리키라는 의미이다)

그런데 a를 강제로 새로운 객체를 보게 하면 **_b는 immutable한 애_**이므로
둘은 떨어져서 *__각각의 독립된 객체를 가리키게 되는 것__*이다



#### mutable
```python
a = [1, 2, 3]

b = a

a is b ==> true


a.append(4)

a is b ==> true
```
> a는 [1, 2, 3, 4]    b도 [1, 2, 3, 4]


*__a의 값을 b에 객체 복사__*를 해줬다. 따라서 a와 b는 같은 객체를 가리키고 있는데
*__mutable한 객체이므로 a의 값을 변경해도 b의 값 또한 따라 변경__*이 되고  
여전히 같은 객체를 가리키게 된다



### Shallow copy & deep Copy

파이썬에서는 module을 이용하여 `shallow, deep copy`를 할수 있다
```python
import copy

a = [1, 2]
b = copy.copy(a)    (shallow copy , 얕은 복사)
c = copy.deepcopy(a)   (deep copy, 깊은 복사)

a ==> [1, 2]   ,    b ==> [1, 2]    ,    c ==> [1, 2]
```
그렇지만 *__id의 값은 모두 다른 객체__*를 가리키게 된다
(즉 객체가 새로 생성)

따라서 *__변수의 값을 변경해도 각각의 객체는 서로 영향을 주지 않는다__*



*하지만 2d list와 같이 mutable안의 원소로 mutable이 들어가는 경우*는 다른데
```python
a = [[1, 2],[3, 4]]
b = copy.copy(a)
c = copy.deepcopy(a)
```
`a, b, c`는 모두 다른 객체를 가리키지만 


>얕은복사(Shallow copy)   
a와 b의 원소 `[1, 2] [3, 4]`는 같은 객체을 가리키고 있게 되고 (원소의 변경사항을 공유한다)


> 깊은 복사 (deep copy)   
a와 c는 `원소들도 다른 객체`를 가리키게 된다 ( 원소의 변경사항이 서로 영향을 안준다)
