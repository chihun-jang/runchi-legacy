---
title: "Django 프로젝트 구성"
date: "2019-02-07"
category: ['django']
draft : False
---

💬 프로젝트의 구성
```
<repository_root>/
    <django_project_root>/
        <configuration_root>/
```

### <repository_root>

<repository_root>/ : 최상위 절대 루트, 배포에 필요한 다른파일등 중요한 내용 위치
(어떤 개발자들은 django_project_root 를 repo로 쓰기도 한다)


`.gitignore` : 깃이 처리하지 않을 파일과 디렉터리

`README.md` : 개발자를 위한 프로젝트 문서

`requirements.txt` : 프로젝트에 이용되는 파이썬 패키지 목록


### <django_project_root>

<django_project_root>/ : 모든 파이썬 코드는 이 디렉토리 이하에 위치한다
    (`django-admin.py startproject` 명령어를 repo에서 실행하면 **project** 겸 repo가 된다)

`media/` : media파일이 올라가는 장소

`static` : `CSS, JS,image 등 정적파일`을 위치시키는 곳
(장고 공식문서의 이름인데 assets 또는 다른이름으로 바꿀경우 STATICFILES_DIRS세팅 업데이트)

`templates` : 시스템 통합 템플릿 파일 저장장소



### <configuration_root>

<configuration_root> :` settings` 모듈과 기본 `URL config` 가 저장되는 장소이다

유효한 패키지 형태여야한다(\__init__.py가 존재해야한다는 의미)




### 💬 가상환경

가상환경에서 어떤 버전의 라이브러리가 쓰였는지 확인하려면
pip freeze --local 명령어를 사용하자

**_가상환경까지 repo에 넣어 관리할 필요는 없다_**

프로젝트에서 이용하는 패키지는 requirements.txt에 들어있고 
가상환경안의 파일은 건드리지 않기 때문이다




💬 Startproject 살펴보기

startproject가 생성해주는 구성을 유지하며 템플릿을 구성하면 표준의 역할은 충실히 수행하지만

현업에서 쓰이는 템플릿에 맞추고 유연한 확장성과 편의를 추구하기 위해서는               cookiecutter-django로 제작을 해주는게 좋다
(하지만 일단은 1년이 지난 시점(2020.05.02)에서 startproject를 이용해서 현업에서 개발을 해주고 있다 ..)



💬 Cookiecutter

쿠키커터는 질문을 통해 각종 설정 변수의 내용을 물어본다

입력된 값을 기반으로 프로젝트 표준 코드구성에 필요한 파일 제작
(settings, requirements, 초기문서, 초기 테스트환경)


cookiecutter https://github.com/pydanny/cookiecutter-django

명령어를 통해 쿠키커터를 포크하자




