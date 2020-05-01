---
title: "Python Class"
date: "2019-01-18"
category: ['멋쟁이사자처럼','python']
draft : False
---

클래스는 단어의 첫글자가 대문자 `PythonClass`

파이썬에서는 자바와 다르게 클래스 없이도 프로그램을 만들수 있다

하지만 **클래스를 알고 사용하지 않는 것과 몰라서 사용 못하는 것은 코드 이해 및 편리함에서 차이가 있으므로 간단하게 알아보도록 하자**


### 클래스

많이들 클래스는 설계도면이고
그 설계도면(클래스)로 만들어지는 애들이 객체 라고들 한다

python에서 클래스를 정의

```python
class MyClass:
    클래스 구성
```

```python
#객체 a , b 의 생성
a = MyClass()
b = MyClass()
```


> ※객체 ?   인스턴스?    
*__인스턴스__* : *__관계를 나타낼 때__* 사용   ex) a는 MyClass의 인스턴스
*__객체__* : *__타입__*을 나타낼때 사용    ex) a는 객체

***

### 클래스의 구성요소

메서드  :  함수인데 클래스에 포함된 함수

첫번째 `parameter`로 `self`를 사용한다

```python
class MyClass:
    def mymethod(self, a):
```
>객체를 생성하게 되면 
객체 자기자신이 메서드의 인자로 전달된다

***

#### 메서드를 사용하는 방법

* 클래스.메서드

```python
a = MyClass()  #a 객체 생성
MyClass.mymethod(a, value)   #클래스.메소드를 이용하여 사용
                             #⭐이때 a객체를 꼭꼭 전달해줘야한다
```

* 객체.메서드(권장)

```python
a = MyClassl()   #a 객체 생성
a.mymethod(value)     # 객체.메서드를 이용하여 사용
                      #⭐꼭 a객체를 인자로 전해주지 말자

```

* 객체변수: 객체마다 독립된 변수를 가진다
객체.변수이름 으로 정의한다

```python       
myObject.myvariable1
myObject.myvariable2
myObject.myvariable1
```

* 클래스 변수: 클래스 변수는 객체마다 공유하고 있는 변수
                
```python
class MyClass:
    classvariable = 1

a=MyClass()
b=MyClass()

MyClass.classvariable   ==> 1
a.classvariable         ==> 1
b.classvariable = 2   #클래스 변수를 2로 바꿨다

a.classvariable  ==> 2 #다른 객체라도 2로 변경

# 이런식으로 MyClass로 생성된 객체라면 공유하는 변수

※id(Class.클래스변수)      id(객체.클래스변수)
    #이렇게 해주면 어디에 저장이 되어있는지 주소값이 나오는데
    #같은 주소값이라는 말은 같은 클래스를 쓰고 있다는 말이다
```

* 생성자: 객체를 생성함과 동시에 객체에 대한 설정을 할 수 있다

```python   
class MyClass:
    def __init__(self, value1,value2):
        self.value1 = value1
        self.value2 = value2

#선언을 해주고
a = MyClass(1,2) 

#이렇게 객체를 생성하면

a.value1 => 1      
a.value2 => 2
```
             

* 클래스 상속

클래스를 변경하지 않고 기능 추가, 기존의 기능덮어쓰기 등에 사용한다

```python
class ChildClass(ParentClass):
       def childmethod(self):
```
이런식으로 `ParentClass`의 변수,메서드를 
`ChildClass`는 사용할수 있고
추가적인 메서드 변수를 만들고 사용할수 있다

단! 반대로 ChildClass에서 새롭게 정의된 메소드와 변수는 ParentClass로 만든 객체로는 사용할수 없다


* 메소드 오버라이딩(overriding)

오버라이딩이란 덮어쓴다는 의미로
*__ParentClass에서 사용된 method를 똑같이 ChildClass에서 재정의하고 내용만 바꾸어 사용__*하는 것이다

그럼 *__ParentClass객체에서는 ParentClass의 method가 ChildClass객체에서는 ChildClass의 method를 사용__*할 수 있다.
