---
title: "Python 내장함수"
date: "2019-03-22"
category: ['Python','멋쟁이사자처럼']
draft : False
---


> python의 내장함수 중 개인적으로 많이 사용될 것 같은 것들만 추려서 정리합니다

```python
1. abs() # 입력받은 숫자의 절댓값을 돌려준다

2. chr() # 아스키코드를 입력받아 코드에 해당하는 문자 출력
    chr(97)  >>> 'a'    
    chr(48) >>> '0'


3. dir() #객체가 자체적으로 가지고 있는 변수나 함수를 보여준다
    dir([1,2,3,])  >>> ['append', 'count', 'extend', 'index', 'insert', 'pop', ...]


4. enumerate() # list, tuple, string을 받아 index와 함께 return

    for i, name in enumerate(['a', 'b', 'c']):
        print(i , name)
         
        >>>
        0 a
        1 b
        2 c

5. eval() # 실행가능한 문자열을 입력받아 문자열의 실행값을 리턴

eval('1+2')   >>> 3
eval("'a'+'b'") >>> 'ab'
       

* filter()# 예를 통해서 바로 알아보자
list(filter(lambda x: x>0, [1,-3,2,0,-5,6]))     >>>   [1, 2, 6]


6. id() # 객체를 입력받아 객체의 고유 주소값을 리턴하는 함수이다
a = 3 , b = a
id(3) >>> 1234567    
id(a) >>> 1234567   
id(b) >>> 1234567

#여기서 우리가 짐작 할 수 있는 사실은 a, b와 같은 변수는 
#해당 값이 저장된 주솟값을 가르키는 역할을 한다는 것


7. input()# 얘를 쓰면 사용자가 입력할 수 있다.

a = input() #이렇게 실행을 시킨다음
#hi 라고 입력을 하면 a에 hi가 들어가게 된다.


8. int() #소수점 형태의 수를 소수점을 제외하고 정수로 반횐 / 문자형태의 숫자를 숫자로 반환

#'3'은 문자열이지만 int('3')은 3이라는 정수
# int(3.4) >>> 3 으로 소수점을 뗴고 정수의 형태로 출력해준다.


9. isinstance(object, class) #인수로 받은 instance가 인수로 받은 class의 인스턴스인지 확인하여 boolean값 반환

# Django에서 model의 instance 인지 구분할때도 사용할수 있는 함수


10. len() #입력값의 길이,갯수를 리턴하는 함수

len("python")  >>> 6
len((1,'a')) >>> 2


11. list() #iterable 한 자료형을 list로 만들어서 리턴하는 함수

list("python") >>> ['p', 'y', 't', 'h', 'o', 'n']


12. map() #예로 확인하자

list(map(lambda a: a*2, [1, 2, 3, 4]))   >>> [2, 4, 6, 8]

map(<function>, <iterable object>) 
#자료형을 함수에 넣어서 출력된 값은 iterable한 object로 반환하는데 list로 변환해준 것

#filter와의 차이는 filter는 조건을 거쳐서 true인 값을 가져오는거고 map은 연산값을 대응 시킨다


13. max(), min() # iterable한 자료형을 받아서 최댓값과 최솟값을 리턴해준다


14. open(filename,[mode]) #파일 이름과 읽기 방법을 받아 파일객체로 return
                          #default는 r(읽기모드)
         
# w : 쓰기모드   r : 읽기모드    a : 추가모드   b : 바이너리 모드

15. ord() # 문자의 아스키코드값을 리턴


16. pow(a,b) # a의 b제곱한 결과값을 리턴
# a**b와 같은 함수다

17. range() # 입력받은 숫자를 iterable(반복가능)객체로 리턴한다

range(5) >>> (0,1,2,3,4)
range(5,10) >>> (5,6,7,8,9)
range(1,10,2) >>> (1,3,5,7,9)

18. round() # 숫자를 입력받아 반올림을 해준다(두번째 인수로 자연수를 입력하면 소수점 2번째까지 반올림)

19. sorted(iterable) # 입력값을 정렬하여 결과값을 list로 리턴

#list의 sort랑의 차이는 sort는 객체의 정렬상태를 변환시키고 sorted는 list를 새로 리턴

20. str() # 입력받은 것을 문자열 형태로 리턴

21. sum() # 입력받은 list or tuple의 요소를 합해서 리턴

22. type(object) # 입력받은 object가 어떤 자료형인지 알려주는 함수이다
```