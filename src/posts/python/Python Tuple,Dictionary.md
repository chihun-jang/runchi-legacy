---
title: "Python tuple & dictionary"
date: "2019-01-17"
category: ['멋쟁이사자처럼','python']
draft : False
---

### 튜플 자료형(tuple)

tuple은 list와 다르게 ()로 둘러쌓여있고
__*값의 변경이 불가능*__ 하다

```python
tuple1 = ()         #빈 tuple생성
tuple2 = (1,)       #tuple의 element가 1개일때 뒤에 , 붙이자
tuple3 = (1, 2, 3)                 
tuple4 = 1, 2, 3      #괄호생략가능
tuple5 = ('a', 'b', ('ab', 'cd'))   #튜플안에 튜플 넣을 수 있다.
```

이런 애들이 tuple인데 
list와 비교했을때 값의 변경이 불가능하다.
*__심지어 del 로 지울수도 없다__*

그치만 나머지 부분에서는 List랑 동일하게 사용가능
(인덱싱,슬라이싱,+,*)하므로
List부분을 참고하도록 하자


### 딕셔너리(dictionaray)

이런것들을 다른 언어에서는 
Associative array/Hash 이렇게 부르기도 하는데
*__key값과 value로 이루어진 자료형__*이다. 
*__순서가 없다__*.

이때 __*key값은 중복이 되지않고*__ (늦게 추가한 key와 value값으로 바뀐다)
__key값으로 list는 사용하지 못한다__

```python
{ key1 : value1 , key2 : value2, key3:value3}

{'이름' : '옹식', '나이' : 4, '성격' : [ '차분' , '침착' ]}
```

이런식으로 value값으로 여러 자료형을 받을수 있다.


값의 추가 
`dictionaryname[추가할 key] = value` 

```python
mydict = { 1 : 'a' , 2: 'b'}
mydict[3] = 'c' 
mydict = { 1 : 'a' , 2 : 'b' , 3 : 'c'}
```


#### Dictionary method

```python
del mydict[key]# key값에 해당하는 key와 value를 삭제해준다

mydict.keys()
#dict_keys라는 객체를 리턴해준다 (파이썬 3.0 이후에)
#이때 만약 list가 필요하면 list(mydict.keys())를 해주자
#(파이썬 3.0 이전에는 리스트를 리턴한다)
#፠ 이때 객체들은 리스트로 변환안해도 iterable하므로 for문이나 iterate한 구문에 사용할 수 있다

mydict.values()#value객체를 리턴해준다

mydict.items()#key와 value를 튜플로 묶은 객체 반환
# 출력 : dict_items([('key','value'),...])


mydict.clear()#dictionary안의 모든 객체를 지운다 mydict = {}가 된다

mydict.get(key)#key값에 해당하는 value를 리턴한다
               #이때 key값이 없으면 None을 리턴한다

mydict.get(key, default값)#해당하는 key값이 없으면 default값을 리턴

dictionary[key]#key값에 해당하는 value를 리턴하는데
               #key값이 없으면 에러를 리턴한다

#፠ key in dictionary 를 통해서 dictionary안에 key가 있는지 확인 할수 있다
```