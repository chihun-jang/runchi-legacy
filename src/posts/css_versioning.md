---
title: "WebSite Cache Problem"
date: "2020-02-29"
category: ['deploy','css']
draft : False
---


## CSS 수정사항이 바로 바로 반영되지 않는 경우

- 브라우저(크롬기준)에서 F12로 개발자도구를 실행시켜  Network Tab에 있는 Disable cache를 활성화시켜 사용
- `ctrl + shift + R` 을 이용하면 Disable cache를 하지않더라도 일회용으로 강제 새로고침 가능하다.
- **Static 파일의 versioning을 해준다**

*평상시에 웹 퍼블리싱을 하는 경우 매번 강제새로고침을 하는게 손이 많이가므로   disable cache를 사용해서 개발하고 있다*


그런데 최근 *deploy 한 service를 update 하는 과정에서    이전 버전의 CSS file이 캐싱* 되어
이전 버전의 모습이 사용자들에게 보여졌다.
(사용자들도 강제 새로고침을 하고 cache를 지우면 되지만.. 이건 해결책이 아니다.)


해결방법을 찾아보니 (Django기준) 

- static file storage 변경
- static file versioning

정도가 있었다.


### static file storage 변경

기존의 settings에 있는 `StaticFilesStorage`를    `ManifestStaticFilesStorage`로 바꾸는 방법은
캐싱방지 외의 장점도 있었지만 빠른 적용이 필요했기에 선택하지 않았다.

===
>참고 : [Django 공식페이지](https://docs.djangoproject.com/en/3.0/ref/contrib/staticfiles/#django.contrib.staticfiles.storage.ManifestStaticFilesStorage)
===


### static file versioning

*static file(CSS, JS 등)의 path(경로) 뒤에 `querystring`을 붙여주면   브라우저가 새로운 file로 인식하여 최산화를 시켜준다고 했다.*   
(static 파일을 참조하는 url주소를 다르게하여 캐싱을 막는다고 했다)

```html
<link rel="stylesheet" type="text/css" href="style.css?v=1.0" />
```

위와 같이 `?v=1.0` 을 css 뒤에 붙여주면 되는데   
`v=1.0 `,` v=1.1` 이렇게 업데이트 때마다 변경해주기 번거롭다.   
따라서 사용하는 언어 및 프레임워크를 이용해 이를 자동화 해줄 수 있는데


**Django의 경우**

```html
<link rel="stylesheet" type="text/css" href="{% static 'css/base.css'%}?dt={% now 'U' %}">
```

위처럼 template tag 뒤에 ?와 `querystring`을 작성해주면 된다.   
나는 datetime이라는 뜻의 dt라 표기하고 Django의 내장 템플릿 태그가 제공하는 now를 이용해 'U'로 TimeStamp를 찍어줬다.   

(하루에도 여러번 업데이트를 진행하는 경우가 생겨서 'U' 를 사용했는데    
그렇지 않다면 'Ymd' 와 같은 것을 사용해도 무방하다.)


## 정리

* disabled cache 사용하기
* ctrl + shift + R 사용하기
* querystring으로 css Versioning 하기. (배포시 적용)

**JS file도 위와같이 versioning이 가능하다**