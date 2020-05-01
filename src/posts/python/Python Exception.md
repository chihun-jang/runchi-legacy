---
title: "Python Exception"
date: "2019-01-22"
category: ['멋쟁이사자처럼','python']
draft : False
---


**파이썬 예외처리는 쉽게 말해서 오류를 다루는 방법이다**


> 오류의 예시

```python
Direcotory안에 없는 파일을 실행

FileNotFoundError: [Errno 2] No such file or directory 
```

```python
0으로 나눌 경우

ZeroDivisionError: division by zero
```

```python
index가 범위를 벗어난 경우

IndexError: list index out of range
```




### 예외 처리기법(exception handling)

`try - except `(try - except - except- .. 도 가능)

```python
try:
    실행내용


except [발생오류 [as 오류메세지 변수]]:  #(except (발생오류1,발생오류2)도 가능)
    실행내용
```

try 블록의 실행 내용을 실행하다가 
예외가 발생하면 except 블록의 내용을 실행

(발생오류가 표기된 경우 발생오류와 일치할때만 except블록 실행)
(오류메세지 변수가 표기된경우 오류메세지의 내용까지 알려준다)

```python
try:
    4 / 0
except ZeroDivisionError as e:
    print(e)
```


### finally
```python
f = open('test.txt' , 'w')

try : 

      실행문

finally:

     f.close()
```

*__finally블록은 예외 발생과 상관없이 항상 수행되는 블록__*이다
일반적으로 사용한 리소스를 close할때 사용




### pass

오류를 발생시키지 않고 지나가고 싶을때는
except 블록에 pass만 넣어서 처리해주자
(pass는 아무것도 실행하지 않고 그냥 흘려보낼때 사용할 수 있다.)




### raise (에러를 강제로 발생)  

raise를 이용해 method overriding강제


>JAVA에서의 interface나 abstract와 비슷하게
부모 클래스를 상속받은 자식클래스에서 반드시 함수 재정의를 강제할때

```python
class ParentClass:
    def myfunction(self):
        raise NotImplementedError
```

**자식 클래스에서 myfunction을 구현하지 않고 myfunction을 사용하게되면 오류**발생




### Custom Error / 내가 만든 에러

1. 
```python
class MyError(Exception):
        def __str__(self):    #__str__메서드는 오류메세지를 print문으로 출력할때 호출
            return "error massage" 
```
2. 
```python
def myfunction(x);
        if x == 'b':
            raise MyError()      #인자로 'b'를 받게되면 MyError를 발생시킨다
        print(x)
```


3. 
```python
try:
        myfunction(a) 
        myfunction(b)   #예외 발생
except MyError as e:  #MyError라는 예외가 발생되었으니 MyError내 __str__에서 e(에러메세지) 리턴 받음
        print(e)    
```