---
title: "Python with 구문과 context manager"
date: "2019-06-11"
category: ['python']
draft : False
---

python code를 보다보면 `with` 를 마주칠때가 있다.

**python 2.5**부터 추가된 기능으로

with 구문이 실행됨에 있어서 내부적으로 `__enter__`와 `__exit__`가
**반드시 실행**되기때문에 효과적으로 코드를 작성할 수 있게 도와준다

이때 **context manager**는 `with`구문에 쓰일수 있는 객체의 타입이고,
이는 **context manager protocol**을 따른다

***

가장 쉽게 볼수 있는 예로 `file handler`가 context manager protocol을 따르는데

```python
with open('example.txt' , 'w' ) as f:
    f.write("my text")
```
이렇게 작성을 해주면` with` 구문이 동작하고 끝나는 시점에서 
`file close`를 수행해주기 때문에 코드를 간편하게 작성해줄 수 있다.

