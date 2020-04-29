---
title: "#11 알고리즘 연습 - 문자열다루기(Python)"
date: "2019-02-02"
category: ['algorithm']
draft : False
---


## 문자열다루기


문자열 s의 길이가 4혹은 6이고, 숫자로만 구성되있는지 확인해주는 함수, solution을 완성하세요.
예를들어 s가 a234이면 False를 리턴하고 1234라면 True를 리턴하면 됩니다.


제한 사항

s는 길이 1 이상, 길이 8 이하인 문자열입니다.


입출력 예

|s|	return|
|-|-|
|a234|	false|
|1234|	true|


#### 내 풀이 🏆
```python
def solution(s):
    if len(s)==4 or len(s)==6:           #길이가 4 혹은 6일때만 true를 리턴해줘야한다
        try:
            return type(int(s)) == int   #코드를 type(int(s))==int로 타입체크까지 했지만
        except:                          #그럴필요없이 int(s)만 해줘도 문자의 경우 Error가 발생해 
            return False                 #except구문으로 넘어갈것
    else:
        return False
```

#### 다른 풀이 🏆

```python
def alpha_string46(s):
    return s.isdigit() and len(s) in (4, 6)   
    #isdigit()는 문자열이 숫자로 이루어져 있는가를 체크하여
    #bool값으로 return해주고 길이가 4 혹은 6인지를 판단해 
    #두개의 bool값을 논리연산자를 이용해줬다
    #튜플안에 존재하는지 확인해준 것 같다.
                                                                                               
```