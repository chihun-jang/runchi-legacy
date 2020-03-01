---
title: "Deploy WebSite Cache Problem"
date: "2020-02-29"
category: deploy,css
---

# CSS versioning (브라우저 캐싱 방지)

**웹 퍼블리싱을 하다보면 CSS 수정사항이 바로 바로 반영되지 않는 경우**가 있다.

그럴 때는 보통 브라우저(크롬기준)에서 F12로 개발자도구를 실행시켜   
Network Tab에 있는 Disable cache를 활성화시켜 사용해왔다

>*사실 퍼블리싱하는 경우가 많기때문에 default로 체크해서 사용중이다*


혹은 disable cache 를 사용하지 않는 사람에게는 일회용으로
**ctrl + shift + R** 을 이용해왔다


그런데 최근 deploy 한 service를 update 하는 과정에서    
이전 버전의 CSS file이 캐싱되어
개발환경과 다른 모습이 사용자들에게 보여졌다.

해결방법을 찾아보니

Django기준으로는 
기존의 settings에 있는 ```StaticFilesStorage```를 ```ManifestStaticFilesStorage```로 바꾸는 방법이 있었는데 적용해보진 못했다.

===
참고 : [Django 공식페이지](https://docs.djangoproject.com/en/3.0/ref/contrib/staticfiles/#django.contrib.staticfiles.storage.ManifestStaticFilesStorage)
===

대신 다른 손쉬운 해결책을 찾아보니    
CSS의 경로뒤에 querystring을 붙여주면 브라우저가 새로운 file로 인식하여 최산화를 시켜준다고 했다.   
(static 파일을 참조하는 url주소를 다르게 하여 캐싱을 막는다고 했다)

>```<link rel="stylesheet" type="text/css" href="style.css?v=1.0" />```

위와 같이 ?v=1.0 을 css 뒤에 붙여주면 되는데   
v=1.0 , v=1.1 이렇게 업데이트 때마다 변경해주기 번거롭다.   
따라서 사용하는 언어 및 프레임워크를 이용해 이를 자동화 해줄 수 있는데

Django의 경우
```<link rel="stylesheet" type="text/css" href="{% static 'css/base.css'%}?dt={% now 'U' %}">```

위처럼 template tag 뒤에 ?와 querystring을 작성해주면 된다.   
나는 datetime을 기준으로 하기위해 dt라 표기하고 기본적으로 제공되는 now를 이용해 'U'로 TimeStamp를 찍어줬다.   

(하루에도 여러번 퍼블리싱이 바뀌는 경우가 생겨서 'U' 를 사용했는데    
그렇지 않다면 'Ymd' 와 같은 것을 사용해도 무방할 것 같다.)

## 정리

* disabled cache 사용하기
* ctrl + shift + R 사용하기
* querystring으로 css Versioning 하기. (배포시 적용)

**JS file도 위와같이 versioning이 가능하다**