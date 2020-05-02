---
title: "Django의 Error Note"
date: "2019-01-17"
category: ['멋쟁이사자처럼']
draft : False
---


### Django의 Error Note(초심자 참고용)


본 Error Note는 개인적으로 겪은 Error 및 다른 멋사 회원분들께서 겪은 Error에 대해
정리하고 간편히 보기위한 게시글입니다.

***

> **_Error Note_**를 뒤지기에 앞서서


> ⭐ 오탈자 없는지(, '' 이런것들)  대문자로 적지는 않았는지 꼼꼼히 확인을하자
`<a href="{% url 'count' %}">` 이런거 적을때 `' "` 이런거
url 설정할때 `,` 이런거 빼먹지는 않았는지


#### 💬TemplateDoesNotExist

저의 경우에는 `app/templates`에서 `s`를 빼먹고 folder를 생성해서 찾아 갈수 없었슴다
따라서 `templates/(묶음 diectory)/1.html` 이렇게 사용하는 것은 좋지만 s를 꼭 쓰자


#### 💬  CSS 파일을 편집하고 반영이 되지 않아요.(CSS was not reflected)

CSS파일을 외부링크로 연결후 새로고침을 해도 바로 바로 적용이 되지 않는다면
브라우저에 캐싱된 기존 파일이 남아있어 바뀐 파일이 업데이트 되지 않을수 있다.

1. `<link rel="stylesheet" type="text/css" href="{% static 'css/style.css' %}?v=1.0">`
이런식으로 파일명 뒤에 `version`을 붙여주면 된다.

1. 크롬의 경우에는 `개발자 도구 - 새고로침 우클릭 - Hard Reload`

2. `ctrl + shift + R` 을 해주면 강제 새로고침을 해준다

3. 개발자 도구의 네트워크 부분에 `disabled cache`를 이용해서 캐시 사용을 안해줄수 있다.

#### 💬 UnicodeDecodeError: 'utf-8' codec can't decode byte 

Computer의 이름을 영어로 바꾸는 등 우리가 작업하고자 하는 path중에 한글이 오면 문제가 생길수 있다. 
따라서 웬만하면 영어로 directory 및 path등을 구성하도록하자


#### 💬 VScode를 열면 directory가 아니에요

git bash에서 code . 을 입력해야한다. 
여기서 . 은 현재 directory를 의미 하는 것이다.


#### 💬 myvenv 를 찾을수 없어요 ( myvenv not found) 

python -m venv myvenv가 이상없이 실행되었는데 myvenv가 없다면 
내가 어디서 명령어를 실행했는지 path를 보고 해당 directory를 확인해보자


#### 💬 가상환경을 실행 할수 없어요(No such file or directory)

`source(혹은 . ) myvenv/Scripts/activate` 의 경로가 상대경로로 잘 작성되었나 확인

예를 들어 위와같이 실행을 하기 위해서는 `myvenv`와 현재 내 위치가 같은 directory
myvenv가 현재 directory에 없으면 해당myvenv가 있는 곳까지 찾아서 위처럼 path입력
Mac 의 경우 `Scripts 대신 bin`으로 입력


#### 💬 NameError: name 'appname' is not defined 

`setting.py`에 클래스 추가해줬는지 확인하기
`urls.py` 에 `path`추가와 `import` 해줬는지 확인



#### 💬  python manage.py startapp is not working

현재 위치에 `manage.py` 모듈이 있는지 확인해주자
즉 project 내에서 해당 명령어를 실행해야 한다

이러한 일을 방지하기위해 python man 까지만 치고 tab을 눌러주면 
자동완성 기능이 있기때문에 해당 기능을 이용하면 실수를 줄이고 속도향상가능

tab을 눌렀는데 자동완성이 안 된다면 해당 글자로 시작하는 
파일 및 폴더가 2개이상이란 뜻이고
tab을 두번누르면 해당 글자로 시작하는 유사한 file및 directory들이 보일텐데
이를 보고 작성해주자


#### 💬 python3 manage.py... ?

Mac은 기본적으로 python이 설치되어 있다. 이처럼 이미 python2.x 버전이 
설치 되어 있는 경우 python3 로 명시를 해줘야 사용할수있는데

alias python = python_version 을 이용하면 default 로 사용할수 있는 
python의 버전을 설정할 수 있다.

그리고 가상환경 내에서는 python만 해도 맞는 버전을 알아서 찾아준다고 한다.


#### 💬즉 실행은 잘 되는데 빨간 줄이 뜨는경우(error value is unsubscriptable 등) pylint오류일지 모르니 .vscode 의 settings.json 파일 내부에    
```python
{
"python.pythonPath": "myvenv\\Scripts\\python.exe",
"python.linting.pylintArgs": [
"--load-plugins=pylint-django"
]
}
```

#### 💬  no Such Table 

블로그 글들이 indexing된 게시판으로 이동할때 이러한 에러가 생기고
아마도 정상적으로 DB작성도 되지 않을텐데 이러한 경우에는 `makemigration 및 migrate`를 제대로 해주었는지, 다시 migrate를 해주도록 하자


#### 💬  Views -> Templates context 조작

views에서 templates 로 render 함수를 통해서 넘기는 값은 context로 
dictionary형태의 값인데 value부분에 dictionary.items() 처럼 tuple형태로 분해하여 넘기게 되면
`for key, value in 넘어온 dictionary`값으로 사용을 해줄수 있지만

dictionary 를 그 자체로 넘겨주게 된다면

`for key,value in dictionary.items` 를 templates에서 해주어 사용할수 있다.


#### 💬 class has no objects members

.vscode내의 settings.json 파일을 수정 
```python
"python.linting.pylintArgs": [
"--load-plugins=pylint_django"
],
```

#### 💬  AttributeError: module 'appname.folder' has no attribute 'functionname ' 

appname.folder 부분에 function이 제대로 작성이 되었는지 확인을 해주도록 하자
아마도 높은 확률로 해당 경로에 함수가 작성되어있지 않을 것이다.


#### 💬  name 'function' is not defined

`render,get_object_or_404, redirect` 등의 함수들을 사용할때
import 해주는 습관을 꼭꼭 잊지말도록 하자


#### 💬  Tab Error: inconsistent use of tabs and spaces in indentation

해당 에러가 뜨는 라인부터 Tab을 지우고 엔터를 통한 자동 Indent를 이용하던지 Tab을 이용하던지 하는 방식으로 다시금 Indent해주자


#### 💬  IntegrityError (NOT NULL constraint failed)

해당 field 가 null값을 지원하지 않는 것으로 auto create될수 있게 설정을 해주거나
Blank로 Null값을 대신할수 있도록 지정해주자


#### 💬  object is not reversible 

path name과 비교해서 제대로 url이 연결되어있나 확인해주자 경로 문제인 경우가 있었다.


#### 💬  The ' ' attribute has no file associated with it

filed 에서 null과 blank에 대한 속성 때문일 수 있는데 필드별로 null 과 blank에 대해서 권장하는 설정또한 다르고 {% if  %}  문을 통해 해당 filed의 값이 유효할때만 처리할수있도록 templates에서 처리를 해줄수 있다.



#### 💬  allauth의 signup templates표시 안되는 오류

해당 오류는 내가 실행한 venv상으로 들어가서 allauth Library의 url, setting, templates를 확인해주면 어디로 연결이 되는지 알수 있는데 templates에서 block이 어떤방식으로 네이밍 되어있는지 확인해주는 방법을 통해서 제대로 안 뜨는 templates를 뜨게 할수 있다.


#### 💬  bash:heroku:command not found 

헤로쿠를 다운로드 했는데 헤로쿠 실행이 안된다하면 
헤로쿠를 설치한 계정과 지금 실행하고 있는 계정이 같은지 확인해 주자


#### 💬  heroku로 push할때 Error while running '$ python manage.py collectstatic --noinput
`heroku config:set DISABLE COLLECTSTATIC = 1` 입력하고 
`$ git push heroku master` 한다음 `migrate`


#### 💬 didn't return an HttpResponse object. it returned None instead
해당 Error를 보면 **Response가 없다는 의미**인데 저는 이 Error가 특정 View안에서 
조건문으로 들어갔는데 특정경우에` return`값을 지정해주지 않아 해당 Error가 발생했습니다.
Error가 발생한 곳으로 찾아가 모든 경우 `return`값이 있는지 확인해주자
