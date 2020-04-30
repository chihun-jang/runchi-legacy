---
title: "#13 알고리즘 연습 - 문자열 내마음대로 정렬하기(Python)"
date: "2019-02-12"
category: ['algorithm']
draft : False
---

문자열로 구성된 리스트 strings와, 정수 n이 주어졌을 때, 
각 문자열의 인덱스 n번째 글자를 기준으로 오름차순 정렬하려 합니다. 
예를 들어 strings가 [sun, bed, car]이고 n이 1이면 각 단어의 인덱스 1의 문자 u, e, a로 strings를 정렬합니다.


제한 조건

* strings는 길이 1 이상, 50이하인 배열입니다.
* strings의 원소는 소문자 알파벳으로 이루어져 있습니다.
* strings의 원소는 길이 1 이상, 100이하인 문자열입니다.
* 모든 strings의 원소의 길이는 n보다 큽니다.
* 인덱스 1의 문자가 같은 문자열이 여럿 일 경우, 사전순으로 앞선 문자열이 앞쪽에 위치합니다.


입출력 예

|strings|	n|	return|
|-|-|-|
|[sun, bed, car]|	1	|[car, bed, sun]|
|[abce, abcd, cdx]|	2	|[abcd, abce, cdx]|


입출력 예 설명

입출력 예 1
sun, bed, car의 1번째 인덱스 값은 각각 u, e, a 입니다. 이를 기준으로 strings를 정렬하면 [car, bed, sun] 입니다.

입출력 예 2
abce와 abcd, cdx의 2번째 인덱스 값은 c, c, x입니다. 따라서 정렬 후에는 cdx가 가장 뒤에 위치합니다. 
abce와 abcd는 사전순으로 정렬하면 abcd가 우선하므로, 답은 [abcd, abce, cdx] 입니다.


>__*문제풀이*__   
문제에서는 n번째 인덱스를 기준으로 sort를 해줘야 한다. 따라서 기존에 sort를 이용하기 위해서는 n번째를 뽑아와서 sorting을 하면 되는데 이때 주의 해야할것이 문제를 보면   
n번째를 비교후 n번째가 같으면 0번째 index부터 비교하여 사전식으로 정렬을 해주게 된다   
따라서 정렬의 기준에 따라 n번째 char + 0번째 ~ n-1번째 char 로 이루어진 새로운 문자열을 만들어서 sorting해준다   
이때 새로운 문자열을 만들면 기존의 문자열과 대응하여 기존의 문자열을 출력해줘야 하므로 dictionary의 key에 새로운 문자열 value에 기존의 문자열을 넣어준다



#### 내 풀이 🏆

```python


def solution(strings, n):
    str_dic = {}                # 정렬에 사용할 문자열 : 기존문자열의 형태로 dic을 만들어 주려한다
                                                  
    for i in strings:                             
        str_dic[i[n]+i[:n]+i[n+1:]] = i         
        # dic의 key값으로 정렬의 기준을 우선순위대로 조합하고
        # value값으로 원래 string값을 넣어주는데
        # 이때 위의 key값을 i[n] + i 이렇게 구성을 해도 어차피 같은 정렬기준을 가지게 된다
        #굳이 위처럼 처음에 index n을 빼서 썼으니 뒤에서 비워두지 않아도 된다는 말

return  [str_dic[i] for i in sorted(str_dic)]  
        # list comprehension을 이용해 dic의 value값을 list의 원소로 넣어주는데
        # 이때 sorted 해주면 dic의 key값이 정렬된 list로 반환된다

```


#### 다른 풀이 🏆
```python

def strange_sort(strings, n):
    return sorted(sorted(strings), key=lambda x: x[n]) 

    #위의 코드는 sorted를 이용해 key값이 lambda식 x의 n번째 
    #즉 strings의 원소들의 n번째 char를 비교하여 정렬을 해주는데
    # 이때 sorted(strings)값을 가져왔기때문에 이 문자열은 일차적으로 사전순서대로 정렬이 되어있고
    # 그다음 n번째 원소끼리 비교하여 정렬하는 결괏 값을 출력해 주게 된다
```


### 알고 넘어갈 것

* sorted 메서드 안에서는 정렬의 편의성을 돕기위해 두번째 인자로  key값을 가질수 있는데
lambda식을 함께 사용하여 원하는 기준에 따라 편리하게 sorted 해줄 수 있다.


