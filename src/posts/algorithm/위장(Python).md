---
title: "#41 알고리즘 연습 - 위장 (Python)"
date: "2019-07-03"
category: ['algorithm']
draft : False
---

스파이들은 매일 다른 옷을 조합하여 입어 자신을 위장합니다.
예를 들어 스파이가 가진 옷이 아래와 같고 
오늘 스파이가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면 
다음날은 청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야 합니다.

|종류|	이름|
|-|-|
|얼굴|	동그란 안경, 검정 선글라스|
|상의|	파란색 티셔츠|
|하의|	청바지|
|겉옷|	긴 코트|


스파이가 가진 의상들이 담긴 2차원 배열 clothes가 주어질 때 
서로 다른 옷의 조합의 수를 return 하도록 solution 함수를 작성해주세요.


제한사항

* clothes의 각 행은 [의상의 이름, 의상의 종류]로 이루어져 있습니다.
* 스파이가 가진 의상의 수는 1개 이상 30개 이하입니다.
* 같은 이름을 가진 의상은 존재하지 않습니다.
* clothes의 모든 원소는 문자열로 이루어져 있습니다.
* 모든 문자열의 길이는 1 이상 20 이하인 자연수이고 알파벳 소문자 또는 '_' 로만 이루어져 있습니다.
* 스파이는 하루에 최소 한 개의 의상은 입습니다.


입출력 예

|clothes	|return|
|-|-|
|[[yellow_hat, headgear], [blue_sunglasses, eyewear], [green_turban, headgear]]	|5|
|[[crow_mask, face], [blue_sunglasses, face], [smoky_makeup, face]]	|3|

입출력 예 설명

예제 #1
headgear에 해당하는 의상이 yellowhat, greenturban이고 
eyewear에 해당하는 의상이 blue_sunglasses이므로 아래와 같이 5개의 조합이 가능합니다.

1. yellow_hat
2. blue_sunglasses
3. green_turban
4. yellow_hat + blue_sunglasses
5. green_turban + blue_sunglasses

 
예제 #2
face에 해당하는 의상이 crowmask, bluesunglasses, smoky_makeup이므로 아래와 같이 3개의 조합이 가능합니다.

1. crow_mask
2. blue_sunglasses
3. smoky_makeup


>__*문제풀이*__   
입력되는 form 이 [의상이름 , 의상종류] 이므로 이를 분리해서 dictionary로 저장한다
그런데 이떄 의상의 종류를 key값으로 이름을 value값으로 하여 종류에 따라 구분지어 볼수 있게 한다.   
그리고 의상종류가 이미 들어와 있으면 해당 key에 대한 value를 갱신해줘야하는데 이때 의상의 이름들을 저장해놓기 위해서 list를 value로 사용했다   
마지막으로 최소 1개 이상의 종류를 입으므로 찾아보면
모자 2개 - 바지3개 일때   
모자의 경우의수 0 1 2 (안 쓸때, 1번모자, 2번모자)
바지의 경우의 수 0 1 2 3 (안 입을때??, 1번바지, 2번바지, 3번바지)   
모자의 경우의수 x 바지의 경우의 수 = > 12개 인데 이때는 모자와 바지를 둘다 안입는 경우도 포함   
따라서 -1을 추가적으로 해줘야한다


#### 내 풀이 🏆
```python
def solution(clothes):
    spy = {}   #spy가 입을 옷들을 담아둘 dictionary를 선언한다
    answer = 1  #결과값의 경우의 수가 곱연산이 이루어져야하므로 1을 초깃값으로 설정한다

    for i in clothes:   #입력받은 list를 돌며
        if i[1] in spy: #list의 두번째값 즉 옷의 종류가 dictionary안에 있는지 확인하여
            spy[i[1]].append(i[0]) #있으면 spy의 key값으로 value list를 불러와 append해주고
        else:
            spy[i[1]] = [i[0]]   #없으면 value값에 옷의 이름을 추가해준다
    for k in spy:       #dictionary의 key값을 가져와
        answer *= len(spy[k])+1   #key에 해당하는 list의 길이 +1 (안입는 경우도 존재하기때문)해서 곱연산해준다
    return answer - 1   #둘다 안 입는 경우는 제외한다
```


#### 다른 풀이 🏆

```python

def solution(clothes):
    from collections import Counter   
    from functools import reduce
    cnt = Counter([kind for name, kind in clothes]) 
    #collections 의 Counter 함수를 이용해서 kind의 갯수를 세어
    #dictionary의 형태로 kind가 각각 몇개인지 반환해준다

    answer = reduce(lambda x, y: x*(y+1), cnt.values(), 1) - 1 #reduce함수를 이용해서 연산을 해줄수 있는데
    #맨뒤의 1은 초깃값으로 설정된 1이고
    #cnt dictionary에 저장되어있는 value들을 가져와
    #갯수 + 1 (안입는 경우는 생각)하여 x에 곱해나가준다
    #그리고 마지막으로 전체값에 -1을 해준다

    return answer
```


#### 보고 넘어갈 말한 개념

reduce는 python 3이상의 version부터 내장함수에서 제외되어 빠졌다

collections 의 counter 함수는 iterable한 애들을 받아 몇개씩 있는지 세어
key(종류)와 value(갯수)를 가진 dictionary로 생성해준다
