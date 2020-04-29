---
title: "#4 알고리즘 연습 - 완주하지 못한 선수(Python)"
date: "2019-01-12"
category: ['algorithm']
draft : False
---

## 완주하지 못한 선수

수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.
마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 
완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.


제한사항

* 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
* completion의 길이는 participant의 길이보다 1 작습니다.
* 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
* 참가자 중에는 동명이인이 있을 수 있습니다.


입출력 예

|participant|	completion|	return|
|-|-|-|
|[leo, kiki, eden]|	[eden, kiki]|	leo|
|[marina, josipa, nikola, vinko, filipa]|	[josipa, filipa, marina, nikola]|	vinko|
|[mislav, stanko, mislav, ana]|	[stanko, ana, mislav]|	mislav|

입출력 예 설명

예제 #1
leo는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #2
vinko는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #3
mislav는 참여자 명단에는 두 명이 있지만, 완주자 명단에는 한 명밖에 없기 때문에 한명은 완주하지 못했습니다.


> _**문제풀이 IDEA**_
>SORT를 이용해 문제 풀기
참가자와 완주자의 배열은 유사하므로 이를 정렬하게 되면   
> 1. 배열의 시작과 중간에 포기자가 있는 경우 -- 참가자와 완주자의 이름이 다를것   
   예 ) 참가자 [a,a,a,b,c] 완주자 [a,a,b,c] 일경우 index순서대로 비교해 나가다가
   참가자의 두번째 index는 a인데 완주자의 두번째 index는 b이므로
   참가자의 두번째 index a를 포기자로 출력해주면 된다
> 2. 배열의 마지막에 포기자가 있는경우 -- 참가자 배열의 마지막사람을 포기자로 출력   
   예 )   참가자 [a,b,c,d,e]   완주자[a,b,c,d] 이렇게 되면 a,b,c,d까지는 참가자와 완주자가
   같은데 참가자 e같은 경우에는 비교할 완주자가 없기때문에 비교는 불가하다
   하지만 앞서 모든 사람이 완주했는데 완주자 명단에 e가 없다는 것은 포기자이니
   참가자의 마지막 원소를 출력해주면 된다



#### 내 풀이 🏆

```python

def solution(participant, completion):
    answer = ''
    participant.sort()           #참가자 명단을 알파벳순으로 정렬
    completion.sort()             #주자 명단을 알파벳순으로 정렬
    for i, f in enumerate(participant): # 내장함수 enumerate를 이용해서 반복문에서 index와 value를 가져오자

                                        
        if (i < len(participant) - 1):  #인덱스가 참가자명단의 마지막원소 -1 까지 일때

            if (not(f == completion[i])): #f는 여기서 참가자명단의 이름을 가져오므로 참가자의 이름과 완주자의 이름이 달라지는 순간
                answer = f                       #정답에 f를 저장하고 break로 감싸고 있는 반복문 탈출

                break                           #이때 answer = f 와 break를 그냥 return f 로 끝내줘도 프로그램은 f를 반환하고 종료된다

                                          

        else:                                   #참가자명단의 마지막 -1까지 완주자와 같을경우 마지막 남은 참가자가 

            answer = f                     #포기자가 되므로 answer =f 이다 (이때도 return f 로 대체해줄수 있다)
    return answer

```


#### 다른 풀이 🏆

```python

import collections

def solution(participant, completion):
    answer = collections.Counter(participant) - collections.Counter(completion)

    return list(answer.keys())[0]      

    #collection모듈의 counter를 이용해 
    #{참가자이름:이름의 갯수, 참가자이름2:이름2의 갯수}형식으로 변환해주는데
    #- 연산을 통해 공통된 부분을 제거하고 남는 dict부분을 answer에 대입해줬다
    # (여기서 공통된 부분이라 하면 {a :2} - {a :1}일 때 {a : 1} 을 말해준다)

    #그리고 answer은 지금 길이 1짜리 dictionary이므로 
    #그 dictionary의 key값(참가자이름)을 list로 만들고 0번째 index를 리턴해준다

```

#### 다른 풀이2 🏆

```python 

def solution(participant, completion):
    participant.sort()
    completion.sort()
    for p, c in zip(participant, completion):   #zip은 동일한 갯수로 이루어지 자료형을 묶어준다

        if p != c:                               #p와 c는 각각의 pair에서 첫번째원소 두번째 원소를 가르키게 된다

            return p                             
    return participant[-1]                      #만약 비교를 했는데 다 같다면 참가자명단의 마지막 선수를 출력해주자 

```


### 눈여겨 볼만한 개념

* *`collections.counter()`*

collections 모듈은 tuple과 dict에 대해서 확장된 데이터 구조를 준다

* *`zip()`*

예를들어 zip(['a','a','b','c'],['a','b','c'])라면
[('a','a'),('a','b'),('b','c')] 이런식으로 같은 index끼리 묶이고 같은 범위까지 묶음

