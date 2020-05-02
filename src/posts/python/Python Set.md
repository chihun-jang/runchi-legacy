---
title: "Python Set"
date: "2019-01-17"
category: ['python']
draft : False
---



Set은 python 2.3부터 지원되는 자료형으로
list혹은 문자열을 입력받아
*__중복을 제거하고 순서없이 묶어준다__*

따라서 indexing할수 없고
*__편하게 사용하고자 한다면 list , tuple 로 변환후에 사용__*해주면 된다.

```python
mylist = [1,2,2,3,3,4]
myset = set(mylist)
myset ={1,2,3,4}
```

#### 집합의 활용


```python
list(myset) ## myset을 list로 변환시켜준다

myset1 & myset2 #myset1과 myset2의 교집합이다
                            
    myset1 = {1,2,3} , myset2 = {2,3,5,6}
    myset3 = myset1&myset2
    myset3 = {2,3}
 

myset1 | myset2  # myset1과 myset2의 합집합이다
                              
    myset1 = {1,2,3} , myset2 = {2,3,5,6}
    myset3 = myset1 | myset2
    myset3 = {1,2,3,5,6}

myset1 - myset2  # myset1과 myset2의 차집합이다
                               
    myset1 = {1,2,3} , myset2 = {2,3,5,6}
    myset3 = myset1 - myset2
    myset3 = {1}

myset.add(data)   # data를 set에 추가

myset.update([data1, data2, data3 ]) #여러개의 data를 set에 추가

myset.remove(data) # data를 set에서 제거
```