---
title: "#25 알고리즘 연습 - 제일 작은 수 제거하기(Python)"
date: "2019-05-06"
category: ['algorithm']
draft : False
---


정수를 저장한 배열, arr 에서 가장 작은 수를 제거한 배열을 리턴하는 함수, 
solution을 완성해주세요. 
단, 리턴하려는 배열이 빈 배열인 경우엔 배열에 -1을 채워 리턴하세요. 
예를들어 arr이 [4,3,2,1]인 경우는 [4,3,2]를 리턴 하고, 
[10]면 [-1]을 리턴 합니다.


제한 조건

* arr은 길이 1 이상인 배열입니다.
* 인덱스 i, j에 대해 i ≠ j이면 arr[i] ≠ arr[j] 입니다.


입출력 예

|arr	|return|
|-|-|
|[4,3,2,1]|	[4,3,2]|
|[10]|	[-1]|



>__*문제풀이*__   
배열을 입력받아 제일 작은수를 제거한다면
입력 받은 list에서 min으로 제일 작은 수를 판별해주고 해당 원소를 remove해주면 된다.

#### 내 풀이 🏆
```python
def solution(arr):
    arr.remove(min(arr))          
    # min(arr)로 입력받은 list에서 제일 작은 원소 return
    # remove 메서드를 이용하여 list에서 제거 해준다

    return arr if arr else [-1]    
     #arr가 빈 리스트이 아니면 최솟값을 제거한 arr를 리턴하고 
     #arr가 빈리스트이면 else로 넘어사거 -1을 리턴해준다
     #이때 사용한 것은 if문에서 빈 리스트의 유무에 따라서 bool값 True로 사용될수 있다는 것 

```
