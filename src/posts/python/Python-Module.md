---
title: "Python Module"
date: "2019-01-20"
category: ['Python','멋쟁이사자처럼']
draft : False
---

파이썬 모듈

모듈이란 *__함수나 변수 또는 클래스들을 모아놓은 파이썬 파일__*이다
즉 **다른 파이썬 프로그램에서 불러와 사용할 수 있게 만들어진 파이썬 파일이다**

***

### 1. 모듈만들기

함수,변수,클래스를 정의하고
mymodule.py과 같이 저장하자 ( 모듈이름.py ) 이렇게

***

### 2. 모듈 가져오기

모듈이 저장된 directory가 다른 파일에서
`import mymodule` 과 같은 방법으로 사용할 수 있다.

(`import는` 모듈을 사용할 수 있게 해주는 명령어)
(현재 디렉토리에 있는 파일이나 python library에 저장된 모듈만 불러올 수 있다)

이 부분은 5.모듈의 경로 에서 자세히 설명

***

### 3. 모듈의 사용
```python

방법①   import mymodule

        mymodule.myfunction    


방법②   from mymodule import myfunction1, myfunction2

        myfunction1   으로 사용
```
    
`*`은 All을 나타내는 기호로 `from mymodule import *`를 해주면 모든함수가 `import`된다


> 클래스의 사용
`myobject = mymodule.MyClass()`
`myobject.myfunction()`  <-- 객체의 메서드 사용
     
***

### 4. 모듈사용의 주의사항

만약 모듈에 `print("blah blah")`이런 실행문이 들어있다면
모듈을 import할때 자동으로 실행될수 있는데

```python
if __name__ =="__main__"
    print("blah blah")       
```
이런식으로 작성해주면 된다.

`__name__`변수는 내부적으로 사용하는 특별한 변수

* **직접 사용** : __name__에 __main__이라는 값이 저장 ==>  참이므로 실행

* **import 의 경우** : __name__변수에는 module이름이 저장 ==> 거짓이므로 실행 X

***


### 5. 모듈의 경로

만약 **다른 directory에 있는 모듈**을 사용하려면 
(command창에서 해주는게 편하겠다)

1. sys모듈을 이용해 경로 설정
   
```python
  import sys    #(파이썬 기본 모듈)
  print(sys.path) #이렇게 하면 라이브러리들이 설치되어있는 directory보여준다
                  #(라이브러리는 기본 모듈이라 생각하자)
  #그럼 우리모듈을 이 경로에 추가하면 import하기 좋지 않을까
  #(sys.path의 값은 List이기때문에)
  #sys.path.append("내가 만든 module의 경로") 이렇게 하면
  #sys.path에 추가되므로
  #다른 directory에서도 import할수 있다
```

2. 환경변수 설정을 통한 경로설정
command에서 `set PYTHONPATH = 내가 만든 모듈의 path`
