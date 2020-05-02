---
title: "Python List"
date: "2019-01-17"
category: ['python']
draft : False
---

Python에서 List는 다양한 자료형을 담을 수 있는 **datatype**이다

```python
a1 = []
a2 = list()                           #둘다 빈 list를 선언해준 것이다

b = [1, 2, 3]                        #숫자로 이루어진 List
c = ['a','b','c','d']                   #문자로 이루어진 List
d = [1, 2, 'Life', 'is']               #숫자와 문자로 이루어진 List
e = [1, 2, ['Life', 'is']]             #숫자와 List로 이루어진 List
```

### List의 활용

List에서도 +연산과 *연산이 가능하다

```python
[1,2,3] + [4,5,6] ==> [1,2,3,4,5,6]
[1,2,3]*3  ==> [1,2,3,1,2,3,1,2,3]
```

**List**와 **String**은 slicing과 indexing에서 비슷한 부분이 많다

* slicing   :    주어진 자료형을 나누어 부분을 구하는것
* indexing  :    주어진 자료형에서 특정 요소의 위치를 찾는 것


> 단. list의 경우 a[1][2]이런식으로 2차원 list가 존재할수 있다
```python
mylist = [1, 2,[ 3, 4]]
mylist[2][0] ==> 3         
mylist[2][1] ==> 4
mylist[1]    ==> 2
```

#### list관련 함수
```python

len(mylist)# mylist의 길이를 반환해준다

del mylist[index]#mylist에 index에 위치한 값을 삭제해준다
፠ del <객체> 의 형태로 del은 다른 곳에서도 사용할 수 있다

mylist.index(data)#mylist내에서 data가 위치한 첫버째 index를 리턴해준다

mylist.append(data)#data를 mylist의 맨 뒤에 추가해준다

mylist.insert(index, data)#index의 위치에 data를 삽입하고 그 뒤에 index는 한칸씩 민다


mylist.sort()#정렬(오름차순으로 정렬)
[2,4,1,3].sort() ==> [1,2,3,4]

#❕ sorted() 는 sort()와 달리 list가 아닌 iterable(String,tuple,dictionary)한 것에 모두 사용할수 있다                         

#특히 sort()는 원래의 객체를 바꾸어 정렬을 해주지만
#sorted()는 원래의 객체를 건드리지 않고 새로운 결과값을 출력해주기 때문에
#sorted(mylist)를 해도 mylist는 정렬되지 않은 상태로 남아있다.


mylist.reverse()#현재의 mylist를 뒤집기
[1,2,3,4].reverse() ==> [4,3,2,1]


mylist.remove(data)#mylist에서 첫번째로 나오는 data값을 list에서 삭제

mylist.pop()#mylist에서 마지막 원소를 뽑아내서 return해준다
            #mylist에서는 마지막원소를 삭제한다
[1,2,3].pop() ==> 3
[1,2,3]은 [1,2]로 바뀐다

mylist.pop(index)#mylist에서 index위치의 원소를 뽑아내어 return해준다

mylist.count(data)#mylist내에 data가 몇개있는지 세어준다

mylist.extend(mylist2)#mylist 와 mylist2 를 합쳐준다. +연산자와 같은 결과를 낸다
                                    
Alist = [1,2,3] , Blist = [4,5,6]
Alist.extend(Blist)
Alist ==> [1,2,3,4,5,6]

'x'.join(list) #list의 data들 사이에 'x'를 끼워넣어서 string으로 리턴
                                        
#⭐join을 통해서 list를 다시 string으로 변환을 시켜줄수도 있는데
#    ''.join(['a','b','c']) 이런방식으로 작성을 해주면
#    >>> 'abc' 이처럼 list의 원소 하나하나가 str으로 return된다
       

#⭐string.split('x') #string을 string내 'x'를 기준으로 나눠 list로 리턴한다                      
#만약 string을 list로 만들어 주고싶은데 'abcd'를 ['a','b','c','d']처럼 해주고싶으면
#list('abcd')를 해주면 저렇게 원소 하나하나가 분할되어 list에 된다

```