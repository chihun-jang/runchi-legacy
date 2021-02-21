---
title: "Python String"
date: "2019-01-17"
category: ['Python','멋쟁이사자처럼']
draft : False
---


> 파이썬의 문자열에 대해서 정말 간단하고 필요하다고 생각하는 부분만 정리해봅시다.

### 문자열이란

* str(변수이름) = 'a'

* str2 = "abcd"

* str3 = "ab cd ef"

* str4 = '''여러줄에
        걸친 문자열
        저장가능'''

이렇게 생긴애들이 문자열이다. 


위에서 보는바와 같이 특이하게
'''는 여러줄에 걸친 문자열을 엔터 먹인 형태로 적용시켜 주기때문에
\n라는 개행문자(엔터라고 생각하자)의 사용을 줄여줘 보기 이쁘다


#### 문자열 관련 함수 or 메서드

문자열에는 +연산자와 *연산자를 사용할수 있다
```python
       "abc" + "def" => "abcdef"
       "abc" * 4       => "abcabcabcabc"
```


##### 독자적으로 쓰이는 함수
```python
input()  :  input() #이렇게 입력해주면 console창에서 사용자의 입력을 받는다

#사용자의 입력을 받아서 a에 문자열로 저장 숫자를 입력받아도 문자열로 저장하는것에 유의하자
#숫자로 저장하고 싶으면 a = int(input())이런식으로 입력받은 애를 int로 형변환 해서 저장해주면 된다

len(string)          :     string의 길이를 반환해준다

sorted('string')    :  string을 정렬 하여 새로운 string반환(기존 string에는 영향 X)        

```                                    


##### 문자열.함수() 혹은 문자열변수.함수()로 쓰이는 애들

```python

string.count('x')#string안에 포함된 'x'문자 갯수 세는 함수

string.find('x')#string내에서 'x' 문자의 첫번째 위치 알려주기 (없으면 -1 return)

string.index('x')#find와 같은 기능이지만 없을때 -1이 아닌 error를 리턴

string.upper()#string의 문자열들을 대문자로 변환(영어)
string.lower()#string의 문자열들을 소문자로 변환(영어)

⭐'x'.join(string)#string의 index들 사이에 'x'를 끼워넣어서 string으로 리턴
                         
    "::".join('abc')   ==>   'a::b::c'
                             
    ⭐ join을 통해서 list를 다시 string으로 변환을 시켜줄수도 있는데
        ''.join(['a','b','c']) 이런방식으로 작성을 해주면
        'abc' 이처럼 list의 원소 하나하나가 str으로 return된다
        
string.replace('x','y')# string내 'x'를 모두 'y'로 치환

⭐string.split('x')#string을 string내 'x'를 기준으로 나눠 list로 리턴한다

"ababab".split("a")        ==> [ '' , 'b', 'b', 'b']
"ababab".split("(공백)")   ==> ['ababab']
"ababab".split()           ==> ['ababab']
"ababab".split("c")        ==> ['ababab']
        
⭐만약 string을 list로 만들어 주고싶은데
'abcd'를 ['a','b','c','d']처럼 해주고싶으면
list('abcd')를 해주면 저렇게 원소 하나하나가 분할되어 list에 된다

```