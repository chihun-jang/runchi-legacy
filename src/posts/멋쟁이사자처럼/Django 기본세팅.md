---
title: "Django의 기본 셋팅"
date: "2019-04-27"
category: ['멋쟁이사자처럼']
draft : False
---


안녕하십니까 여러분 오랜만에 보충자료를 들고 나타났습니다.
오늘은 Django의 전체적인 흐름과 간단히 단어카운터를 만들어 보겠습니다.

```shell
jangc@DESKTOP-14NC1CL MINGW64 ~/Desktop/django Example
$ python -m venv myvenv
```

일단 우리는 Django로 개발을 하기 위해서 **독립된 개발환경(가상환경)** 을 만들어 줍시다

`python -m venv <내가만들 가상환경이름>` 으로 가상환경을 만들어 줄 수 있습니다.


```shell
jangc@DESKTOP-14NC1CL MINGW64 ~/Desktop/django Example
$ . myvenv/Scripts/activate
(myvenv)
jangc@DESKTOP-14NC1CL MINGW64 ~/Desktop/django Example
```

가상환경을 만들었으니 실행을 하고 Library나 패키지등등을 설치해 줘야겠죠

`. myvenv/Scripts/activate ` 를 이용해 실행해줍시다.(맥은 `Scripts`대신 `bin`을 입력해주세요)

(그리고 `myvenv/` 까지 하고 나면 해당 폴더 내부에는 S로 시작하는게 `Scripts`밖에 없기때문에
S 타이핑하고 tab하면 자동완성 됩니다 `activate`도.. ㅇㅇ)


```shell
jangc@DESKTOP-14NC1CL MINGW64 ~/Desktop/django Example
$ pip install django==2.1.8
```

가상환경을 만들고 실행해줬으니 이제 사용할 애들을 깔아야죠
`pip install django==2.1.8`   명령어로 django를 설치해줍니다.

(해당 글을 작성하는 시점에 Django 2.2version에 에러가 있어서 2.1.8로 강제하여 설치해줍니다)

```shell
Successfully installed django-2.1.8 pytz-2019.1
```
해당 log가 터미널에 떴다면 설치 성공!

```shell
jangc@DESKTOP-14NC1CL MINGW64 ~/Desktop/django Example
$ django-admin startproject myproject
```
Django 설치를 완료했다면 본격적으로 project를 시작해봅시다
`django-admin startproject myproject` 명령어로

장고 관리하는 애야 프로젝트를 시작하고 싶어 이름은 myproject란다 라고 알려줍시다

```shell
jangc@DESKTOP-14NC1CL MINGW64 ~/Desktop/django Example
$ ls
myproject  myvenv
```
그럼 이렇게 프로젝트 폴더가 생긴것을 확인할수 있습니다.

```shell
jangc@DESKTOP-14NC1CL MINGW64 ~/Desktop/django Example
$ cd myproject/
(myvenv)
jangc@DESKTOP-14NC1CL MINGW64 ~/Desktop/django Example/myproject
$ ls
manage.py  myproject
```

우리는 앞으로 프로젝트의 개발을 `manage.py`가 있는 myproject 폴더 내부에서 진행할 겁니다
꼭! `manage.py`가 있는 곳에서 진행해주세요

```shell
jangc@DESKTOP-14NC1CL MINGW64 ~/Desktop/django Example/myproject
$ python manage.py startapp wordcount
```
우리가 생성한 프로젝트는 현재 아무런 기능을 할수 없습니다
그렇기에 우리가 원하는 기능을 할수 있게 app을 추가해줍시다
`python manage.py startapp <앱 이름(일반적으로 기능 관련 단어)>` 를 통해 app을 생성해줍니다.


자 그럼 우리가 app을 만들어 줬으니 해야할것을 알아봅시다

1. app을 만들었으니 만들어졌다고 프로젝트에 알려준다 | `project폴더의 settings.py`에서 진행
2. 사용자에게 보여줄 templates를 준비해둔다  | app폴더 내에 templates 폴더를 만들어서 진행

3. 그 templates를 어떤방식으로 보여줄지 views를 건드려준다   | app내의 views.py에서 진행

4. 해당 views가 작동할수 있도록 url을 연결한다     | project의 urls.py에서 진행

위의 장고 구조와 함께보시면 좀 더 이해가 쉬울 수 있습니다.
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'wordcount.apps.WordcountConfig',
]
```

첫번째로 만들어진 app을 project에 알려주기위해
프로젝트 폴더 내부의 settings.py에
`'<내가만든 app이름>.apps.<내가만든 app이름>Config'`, 를 추가해줍시다
이때 쉼표와 apps 뒤에 단어별 첫글자가 대문자 인것에 유의해주세요

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
</head>
<body>
<h1>메인페이지</h1>
</body>
</html>
```

다음으로 app폴더 내부에 `templates`라는 폴더를 새로 만들고
우리가 보여줄 html 파일을 만들어 줍시다

우리는 일단 main page 즉 root page를 만들어주기위해
`app폴더 - templates(생성) - index.html(생성)`을 하여 간단히 html코드를 작성해주겠습니다.

```python
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request,'index.html')
```

다음으로 해당 template를 보여주기위해(정확히 말하면 보여주기 위한 기능만은 아닙니다)
컨트롤러의 역할을 하는 view를 작성해 보도록 합시다.
`app폴더 - views.py`로 들어가서 index라는 함수를 작성해줍시다.

해석 : `index`함수야 `request`요청이 들어오면 `return`을 해줘라. 해당 request요청에 대해 `index.html`을 랜더해줘라.


```python
from django.contrib import admin
from django.urls import path
from wordcount import views  #wordcount라는 app에 있는 view를 사용하기 위해 import로 끌어왔습니다.

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index , name="index"),
]
```

그리고 마지막으로 views.py를 사용할수 있게 urls.py를 작성해줍시다
일단 우리의 프로젝트폴더 내의 urls.py는 app폴더 내부의 views를 알지 못합니다.
`from wordcount import views` 를 이용해 wordcount로 부터 views를 가져옵시다.
`path('', views.index , name ="index")`,

해석을 해보면
`path(<url뒤에 아무것도 붙지 않으면>, <views안에 있는 index함수를 실행> , <애칭은 index>)` 라는 의미입니다.

```shell
jangc@DESKTOP-14NC1CL MINGW64 ~/Desktop/django Example/myproject
$ ls
manage.py  myproject  wordcount
(myvenv)
jangc@DESKTOP-14NC1CL MINGW64 ~/Desktop/django Example/myproject
$ python manage.py runserver
```
작성이 완료되면 `runserver`를 통해서 확인을 해줍시다.