---
title: "Django Model"
date: "2019-01-17"
category: ['멋쟁이사자처럼']
draft : False
---

### Django Model (기초)

~~선행지식  :  python Class  👈👈~~


Model이라는건 무엇일까
Model은 data를 보관하는 방이라고 생각을 하자(사실은 아니지만)
Database와 Model을 대응시켜 생각해보면

(이것도 정확한 것은 아니지만 이해를 돕기위해)

| | | |
|---|---|---|
|Database| = |Model| 
|table    |   = |Class|
|data     |   = |Object|


실생활에 빗대어보면 옷방이 Model 이고
양말서랍, 잠옷서랍, 바지서랍 이 Class이면
그안에 들어있는 양말, 양말, 양말, 잠옷, 바지, 바지 가 모두 Object이다

머릿속에 그림을 그려보자


이처럼 Model은 결국 Object 즉 data를 다루는 곳이므로 model.py에서는
data에 대한 유효성검사(제대로 된 애를 받았는가?)와 같은 작업이 이루어지기도 한다

그리고 우리가 쓴 `__str__`은 객체를 표현할때 사용되는 메서드이다.


### Migration

이주라는 뜻의 Migration은 무엇일까

Migration은 DB스키마의 버전 제어 시스템이다
makemigrations [model name(생략시 all)] 이런식으로 사용을 하는데
model의 변경사항(add filed, remove model, etc..)을 바탕으로 구조를 짠다고 생각하면 되겠다

migrate [model name(생략시 all)] 를 해주면 그 구조를 DB에 반영해주는 것이라 생각하자

* 사용법 

```bash
python manage.py makemigration

python manage.py migrate

python manage.py showmigrations #프로젝트의 migration list와 status를 보여줌
```

Django에서 모델을 사용하는 flow(3주차 기준)
 

1. model을 사용하고 싶으니 model.py를 조작해줘야하는데
   model을 구성하는것은 Class랬다. Class를 만들어주자

```python
class Blog(models.Model):
   title = models.CharField(max_length =200)

   pub_date = models.DateTimeField('date published')

   body = models.TextField()
```

   >💬 Field의 종류
       
       
> * `Char Field(max_length = None(default))`:작은 크기의 문자열을 나타내는 필드
> * `Text Filed` :긴 문자열을 받는 필드
> * `Integer Field`: Integer를 받는 필드
> * `DateTime Field(auto_now=Flase(default), auto_now_add=False)`  : 날짜 필드
> * `Email Field(max_length=254)`   : charfield인데 EmailValidator를 이용 이메일인지 검사
> * `Filed Field(upload_to = None <-- 업로드할경로  )`: 파일 업로드하는 필드
> * `Image Field(upload_to = None, height_field=None, width_field)`
> * `URL Field ` : charfiled인데 URLValidator를 이용해 URL을 받았는지 유효성 검사
> * `Binary Field`  : 이진 data를 받는다
> * `Boolean Field`: true와 false를 받는다


2. model안에 Class를 생성해서 model에 변화를 주었으면? DB에 알려 모델의 구조를 등록하자

```python
  python manage.py makemigration

  python manage.py migrate
```


3. 이러한 model들을 관리하기 위한 도구가 필요해서 admin을 이용하고싶다. 관리자 계정을 만들자

`python manage.py createsuperuser`





4. admin계정을 만들었지만 admin으로 관리하기 위해선 모델을 admin과 연결해 줘야하는데?
`admin.py` 에 a`dmin.site.register(Blog)` 로 내 model의 Class를 admin에 등록해주자


그런데 이때! 다른 파일에서 Class를 가져오는 것이므로
`⭐from .model import blog` 잊지말자





5.  이제 Model부분을 만들었으니까 사용을 해야하는데 
( `views에서 model을 사용해줘야하니 import 필수`)
  

**_views.py에서 Blog.objects 와 같이 Blog라는 Class가 가진 객체_**들을 다룰 수 있다

6. 이때 객체들은 QuerySet의 형태로 넘어오는데 QuerySet method를 이용해 조작해줄수 있다.


7. `view`에서 templates로 context(dictionary형태로 넘어가는 data라 생각하자)로 넘어가면 data를 템플릿 태그와 템플릿 변수를 이용해서 사용하자.
       


### ❔ QuerySet 

QuerySet은 모델의 객체들의 집합이라고 생각해주자


> QuerySet method   (**chain처럼 연결해서 사용가능 filter().count()**  )

`filter(조건) `:조건에 부합하는 객체가져옴

`exclude(조건)`:조건에 맞는 객체 빼고 가져옴

`order_by(조건)` :조건에 따라 정렬

* default  : 오름차순
* \-  :  내림차순    
* ?  :  무작위

`reverse()` : 역으로 정렬

`get(조건)`  : 조건에 부합하는 1개의 객체 가져옴

`count(조건)` : 조건에 맞는 객체 갯수 가져옴

`first()/last()`  : 첫번째/마지막 객체 가져옴

`exist(조건) ` : 조건을 만족하는 애가 존재 하는지 true/false로 나타냄

`distinct()` ; 중복된것을 제외한 count ( 예 [1,2,2,3]의 count == 4 distinct == 3)


 
`values(객체,객체)` : 객체에 해당하는 애들만 가져옴
( object가 name, age, gender를 가질 때 value(name, age)하면 name과 age값만 가져옴)

