---
title: "#5 알고리즘 연습 - K번째 수(Python)"
date: "2019-01-13"
category: ['algorithm']
draft : False
---

배열 array의 i번째 숫자부터 j번째 숫자까지 자르고 정렬했을 때, k번째에 있는 수를 구하려 합니다.
예를 들어 array가 [1, 5, 2, 6, 3, 7, 4], i = 2, j = 5, k = 3이라면
array의 2번째부터 5번째까지 자르면 [5, 2, 6, 3]입니다.
1에서 나온 배열을 정렬하면 [2, 3, 5, 6]입니다.
2에서 나온 배열의 3번째 숫자는 5입니다.

배열 array, [i, j, k]를 원소로 가진 2차원 배열 commands가 매개변수로 주어질 때, commands의 모든 원소에 대해 앞서 설명한 연산을 적용했을 때 나온 결과를 배열에 담아 return 하도록 solution 함수를 작성해주세요.


제한사항

* array의 길이는 1 이상 100 이하입니다.
* array의 각 원소는 1 이상 100 이하입니다.
* commands의 길이는 1 이상 50 이하입니다.
* commands의 각 원소는 길이가 3입니다.


입출력 예

|array|	commands|	return|
|-|-|-|
|[1, 5, 2, 6, 3, 7, 4]|	[[2, 5, 3], [4, 4, 1], [1, 7, 3]]|	[5, 6, 3]


입출력 예 설명

[1, 5, 2, 6, 3, 7, 4]를 2번째부터 5번째까지 자른 후 정렬합니다. [2, 3, 5, 6]의 세 번째 숫자는 5입니다.
[1, 5, 2, 6, 3, 7, 4]를 4번째부터 4번째까지 자른 후 정렬합니다. [6]의 첫 번째 숫자는 6입니다.
[1, 5, 2, 6, 3, 7, 4]를 1번째부터 7번째까지 자릅니다. [1, 2, 3, 4, 5, 6, 7]의 세 번째 숫자는 3입니다.


> _**문제풀이 IDEA**_
> 주어진 Array에 대해 command 내부 배열의 원소를 뽑아와 부분배열로 자를수 있었으면 좋겠다. 그럼 그 이후에 부분 배열에서 index를 뽑아오는일은 쉬운 일이지 않을까?


#### 내 풀이 🏆
```python
def solution(array, commands):
    answer = []
    for com in commands:    
        #com 은 commands 의 원소들을 가져오는데 
        #이때는 list를 com으로 가져오게 된다
                             
        answer.append(sorted(array[com[0]-1:com[1]])[com[2]-1])  
        #com으로 가져온 배열의 index로 추출하여 받은배열 slice해주고 
        #sorted해서 오름차순으로 정리해준다음 com의 두번째 index를 이용 추출
                                                  
    return answer


```


#### 다른 풀이 🏆

```python
def solution(array, commands):
    return list(map(lambda x:sorted(array[x[0]-1:x[1]])[x[2]-1], commands)) 
    #내장함수 map과 lambda 함수를 이용해 commands에서  
    #원소인 list를 가져와 lambda  함수의 argument값으로 사용해주고 
    #나온 결과들을 map은 map iterator로 반환한다 
                                                              
```



### 눈 여겨볼 개념

* *`map`*

`map(function, iterable)`에서 iterable의 원소들을 function에 따라 연산하여 iterator로 반환

```python
def myfunc(a, b):
    return a + b


x = map(myfunc, (1, 2, 3), (4, 5, 6))

print(list(x))
>> [5,7,9]
```
python 2.6 에서는 map이 바로 list를 반환해줬는데 왜 3.1 버전부터는 안 그럴까?

Python map return map object-- 속도의 향상을 위해서이고

반복이 목적이라면 list로 안바꿔도 된다


* iterable
  
쉽게 생각하면 반복 가능하다는 말이고
`list, dict, set, str, bytes, tuple, range` 들이 iterable한 type이다

그리고 iterator 객체는

값을 차례대로 꺼낼수있는 객체로 내장함수< iter()> 혹은
iterator의 메서드 <__iter__()> 를 통해 만들수 있으며

꺼낼때에도 내장함수 < next()>혹은 iterator의 메서드<__next__()>를 이용할 수 있다.



* lambda

람다함수는 작은 익명함수로 여러개이 인자를 포함할 수 있지만 한개의 표현식을 가진다

```python
x = lambda a, b : a * b
print(x(5, 6))
```

람다함수를 쓰는이유 : 

functional programming을 지향하는 python에서
람다함수는 함수를 값처럼 전달하게한다.
또한 람다함수는 한번쓰고 heap에서 증발하게 되어 메모리를 절약한다

