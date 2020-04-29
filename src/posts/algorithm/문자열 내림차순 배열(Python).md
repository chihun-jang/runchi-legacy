---
title: "#12 알고리즘 연습 - 문자열 내림차순 배열하기(Python)"
date: "2019-02-06"
category: ['algorithm']
draft : False
---

## 문자열 내림차순 배열하기

문자열 s에 나타나는 문자를 큰것부터 작은 순으로 정렬해 새로운 문자열을 리턴하는 함수, solution을 완성해주세요.
s는 영문 대소문자로만 구성되어 있으며, 대문자는 소문자보다 작은 것으로 간주합니다.


제한 사항

str은 길이 1 이상인 문자열입니다.


입출력 예

|s|	return|
|-|-|
|Zbcdefg|	gfedcbZ|


>__*문제풀이*__   
python에서는 sort함수도 있고
reverse함수도 있기 때문에 이를 이용하면 어렵지 않게
내림차순으로 정렬할수 있겠다.
(단 list와 string에서 사용할 수 있는 것중에 sorted 와 sort를 구분하도록 하자)


#### 내 풀이 🏆

```python

def solution(s):
    sorted_string = sorted(s)     #s를 오름차순으로 정렬하여 저장
    sorted_string.reverse()       #정렬된 문자열을 역순으로 정렬

    return ''.join(sorted_string) #현재 sorted 로 인해서 list의 형태이기때문에 join을 이용하여 문자열로 바꿔준다

```

#### 다른 풀이 🏆

```python

def solution(s):
    return ''.join(sorted(s, reverse=True))    

#여기서 눈여겨 보아야할것은 sorted 함수의 두번째 인자로 reverse = True값이 들어간다는것
```