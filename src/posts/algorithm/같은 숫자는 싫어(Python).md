---
title: "#2 알고리즘 연습 - 같은 숫자는 싫어(Python)"
date: "2019-01-09"
category: ['algorithm']
draft : False
---

## 같은 숫자는 싫어

배열 arr가 주어집니다. 배열 arr의 각 원소는 숫자 0부터 9까지로 이루어져 있습니다. 이때, 배열 arr에서 연속적으로 나타나는 숫자는 하나만 남기고 전부 제거하려고 합니다. 
배열 arr에서 제거 되고 남은 수들을 return 하는 solution 함수를 완성해 주세요. 
단, 제거된 후 남은 수들을 반환할 때는 배열 arr의 원소들의 순서를 유지해야 합니다.

예를들면
* arr = [1, 1, 3, 3, 0, 1, 1] 이면 [1, 3, 0, 1] 을 return 합니다.
* arr = [4, 4, 4, 3, 3] 이면 [4, 3] 을 return 합니다.

배열 arr에서 연속적으로 나타나는 숫자는 제거하고 남은 수들을 return 하는 solution 함수를 완성해 주세요.

제한사항
* 배열 arr의 크기 : 1,000,000 이하의 자연수
* 배열 arr의 원소의 크기 : 0보다 크거나 같고 9보다 작거나 같은 정수

입출력 예

|arr|answer|
|-|-|
|[1,1,3,3,0,1,1]|	[1,3,0,1]|
|[4,4,4,3,3]	|[4,3]|

> _**문제풀이 IDEA**_   
연속된 중복수를 제거하는것이 목적이므로
반복문과 조건문을 통해 다음 원소와 같지 않으면 연속된 중복수가 아니라 판단하고
answer 배열에 추가해준다   
예외적으로 arr의 마지막 원소는 다음 원소가 없으므로 비교할수 없기때문에
마지막원소인지 체크하여 answer에 넣어준다   
(이떄 마지막원소를 추가함에 있어 중복이 발생할까 걱정할수 있는데 조건문에서 마지막원소-1 번째가 마지막 원소랑 같으면 answer 에 추가하지 않았으므로 마지막원소는 중복되지 않음이 보장된다)


#### 내 풀이 🏆

```python

def solution(arr):
    answer = []
                                            # [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
    for i in range(len(arr)):   #arr의 i를 기준으로 다음수와 같은수인지 비교하기위해 range를 이용해서 index만큼 count

        if( i == len(arr)- 1):      #마지막 원소의 경우 다음으로 오는 비교수가 없기때문에

                                                #(이전수가 같았더라면 이전수는 append안되었으니) answer 에 추가해준다
            answer.append(arr[i])
        else:
            if (arr[i] != arr[i+1]):   # 다음으로 오는수와 다르다면 같은수가 아니므로

                answer.append(arr[i])    #append해서 list에 추가해준다 

    return answer
```

#### 다른 풀이 🏆
```python
def no_continuous(s):
    a = []                     
    for i in s:                        #i는 int list s의 int값을 순서대로 가진다.
        if a[-1:] == [i]: 
            continue     #a[-1:]는 a리스트의 마지막 값을 가져오는 표현식인데
        a.append(i)                   #이 마지막이란것이 [1 2 3] 이라면 3이되는것이므로 
    return a                            #다를경우 중복되는 숫자가 아니므로 a.append(i)를 해주고
                                        #같은경우에는 continue를 사용하여 a.append를 건너뛰고 다시 for문을 실행

                                        #이때 append를 하면 뒤에 list의 뒤에 append되므로 a[-1:]도 자동 갱신되어 중복방지

                                        #⭐ 그리고 빈 list의 a[-1:]을 해주면 []가 되고 비교값으로 사용할수 있다.
```


### 사용한 Python Syntax

* List comporehension
  
> __result = [x*y for x in range(2,10) for y in range(1,10)]__  
> (구구단을 result 안에 저장)
> 이렇게 list안에 조건문을 넣을수 있는데
List comprehension을 이용하면 좀 더 편리하고 직관적인 프로그램을 만들수있다
연습해두면 list생성에 있어서 도움이 될것 같다



python에서의 list vs array 기본적으로 우리가 사용하는 것은 list이고
 array모듈을 이용해 array도 사용할수 있다
    
* list : 크기가 가변적 , 어떤 원소 타입이던 저장가능 , array에 비해 많은 메모리 사용
* array.array :  같은 타입의 원소만 저장, 적은 메모리 사용
