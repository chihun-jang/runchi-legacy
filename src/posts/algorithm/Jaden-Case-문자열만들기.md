---
title: "#52 알고리즘 연습 - Jaden Case 문자열 만들기(Python)"
date: "2020-05-16"
category: ['Algorithm']
draft : False
---

JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다. 문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.

제한 조건
* s는 길이 1 이상인 문자열입니다.
* s는 알파벳과 공백문자(" ")로 이루어져 있습니다.
* 첫 문자가 영문이 아닐때에는 이어지는 영문은 소문자로 씁니다. ( 첫번째 입출력 예 참고 )

입출력 예

|s	|return|
|-|-|
|3people unFollowed me |	3people Unfollowed Me|
|for the last week	|For The Last Week|

> *__문제풀이IDEA__*
>python에서도 분명히 Capitalize를 지원해주는 module이 있을텐데 이를 사용하지않고 구현을 하려고하니 숫자나 공백이 여러개인 경우가 있어서 내가 좋아하는 flag를 설정해 조건문에 condition을 추가해줬다. 공백이 여러개있을경우 list에도 split으로 나누었다해도 list에 공백이 들어갈수 있으므로 element를 검사해서 다시 합쳐줘야하는데 이경우에도 코드의 길이나 효율성이 꽤나 걸릴것 같아서 flag를 쓰는게 나빠보이지 않는다.



#### 내 풀이 🏆
```python
def solution(s):
    answer = []
    flag = 1
    for i in s:
        if "A" <= i <= "z" and flag == 1:
            answer.append(i.upper())
            flag = 0
        else:
            answer.append(i.lower())
            
        if i == " ":
            flag = 1 
    
    return "".join(answer)
```

string을 하나하나 조회하며 공백인 경우 flag를 다시 동작할수있게 해주고
첫글자일떄는 flag를 0으로 만들어 두번째부터 str을 lower로 변경해주는 식이다.

> 중간에 문제가 여러개 공백이 추가되는 case가 생겼나보다 따라서 다른사람이 푼 풀이를 보면 title()이라던지 단순 split join으로 대문자화 시켜주는게 있었는데 지금 풀때는 적용할수 없고 이런 내장함수가 있다는 것만 참고하고 넘어가자

