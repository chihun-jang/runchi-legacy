---
title: "Python args & python kwargs"
date: "2019-01-28"
category: ['멋쟁이사자처럼','python']
draft : False
---


### *args
```python
def function(*args):

      #내용

      return 값 
```

>args 는 **argument**의 줄임말
`*arg`는 크기가 정해지지 않은 여러개의 인자를 받을 수 있다.


### **kwargs
```python
def function(**kwargs):

        내용

      return 값 
```

>**keyword arguments**의 줄임말   
`**kwargs`는  정해지지 않은 갯수의 인자를 **dictionary**형으로 받는다.
(kwargs 자리에는 key = value 모양이 들어온다)
(그래서 django의 경우 kwargs로 data를 가져오기도 한다.)