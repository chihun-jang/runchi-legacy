---
title: "Django settings 와 requirements"
date: "2019-02-12"
category: ['django']
draft : False
---


### 💻settings 와 requirements 파일

세팅값의 적용은 서버를 재시작해야만 가능하기때문에 개발자들이 서비스 운영중에 임의로 변경할수는 없다

> 💬권장하는 장고의 설정방법

- 버전 컨트롤 시스템으로 모든 설정파일을 관리해야한다 (특히나 운영환경에서 중요)
(세팅 변화에 대한 기록이 반드시 문서화 되어야 한다)
- 반복되는 설정들을 없애야 한다
copy & paste 를 이용하기 보다는 기본 파일로 부터의 상속을 이용하도록 하자
- **__암호나 비밀키 등은 안전하게 보관__**
(보안에 민감한 부분에 대해서는 `gitignore` 등을 이용하여 제외 관리 해줘야 한다)
즉 `SECRET_KEY` 세팅은 장고의 암호화 인증 기능에 이용되는데 repo에서 제외해야한다



#### 💡 버전관리되지 않는 로컬세팅은 피하자

`local_setting.py`으로 세팅을 하게 되면 모든 머신에 기록되지않는 코드가 존재하게 되고

운영환경의 문제점이 로컬환경에서 구현이 안 될수도 있을 뿐아니라 로컬의 버그가 `local_setting.py`모듈에 의한것일수도 있다.

게다가 `local_setting.py`를 팀원끼리 공유하게 되면 copy& paste를 하게 되는 일이므로 옳지 못하다



#### 💡 여러개의 settings 파일 이용하기

한개의 `setting.py`를 이용하기 보다
```python
settings/
        __init__.py
        base.py    #  프로젝트의 모든 인스턴스에 적용되는 공용세팅
        local.py   #  로컬환경에서 작업할때 쓰는 파일, 디버그,로그레벨 등
        staging.py # 운영환경 서버에서 프라이빗버전을 가지고 구동되는
                   # staging 서버를 위함. 코드 완전이전 전에 관리자와 고객 확인을 위함
        test.py    # 테스트 러너, 인메모리 데이터 베이스정의, 로그세팅 등 테스트 위함
        production.py   # 운영서버에서 실제로 운영되는 세팅 파일


#  ci.py 지속적 통합서버에서 쓰이는 파일
```


#### 💡 세팅파일을 이용하여 구동하기

`shell : python manage.py shell --settings = projectname.setting.local`

`server : python manage.py runserver --settings = projectname.setting.local`


`--setting`을 이용하는 대안으로 `DJANGO_SETTINGS_MODULE`과 `PYTHON환경변수 설정`이 있다.

virtualenv의 postactivate 스크립트를 설정하면 옵션없이 자동으로 설정이 적용되어 실행되기도 한다



#### 💡 local setting

`local.py` 세팅파일의 경우  `from .base import *` 구문을 이용한다

로컬을 설정하여 git으로 공유하게 되면 같은 개발 환경이 세팅되게 되고 설정의 편리함을 가져온다
그런데 개개인의 개발환경 셋팅을 어떻게 해주는게 좋을까??

일반적으로 `dev_myname.py`와 같이 여러개의 세팅파일을 생성하여 팀원간의 개발세팅을 참고하여 도움이 되기도 한다


>💬코드에서 설정 분리하기

>local_settings 안티 패턴을 이용했던 이유중 하나는 `SECRET_KEY,API` 키 등 서버에 따라 특별하게 설정된 값들이 세팅 파일에 위치해 있다는 것

>설정은 배포환경에 따라 다르지만 코드는 그렇지 않고 비밀키들은 설정값이지 코드가 아니며
**비밀값은 반드시 남이 알수 없어야하기에 GIT으로 관리할수 없다**

>`PaaS` 환경에서는 독립된 서버에서 코드를 수정하도록 허용하지 않는다



>**환경변수를 이용하기로 하고 환경변수 패턴이라 부르자 환경변수를 비밀키를 위해 이용하게 되면 걱정없이 세팅파일을 GIT에 추가할수 있다**.

>copy& paste기반의 개개인의 local_Setting을 쓰기보다 Git으로 관리되는 단일 setting/local을 나눠 사용할수 있다.

>파이썬 코드 수정없이 시스템 관리자들이 프로젝트 코드를 쉽게 배치할수 있다.
PaaS가 환경변수를 통해 이용하기를 추천한다




#### 💬환경변수에 비밀키 넣기 

저장되는 비밀정보 관리방법

서버에서 bash가 환경변수와 작용하는 방식에 대한 이해, PaaS이용 여부

>아파치는 독립적인 환경변수 시스템을 가지고 있기때문에 local_setting anti패턴을 이용할수 없다

전체 환경에 환경변수를 profile또는 bash_profile뒤에 키를 넣음으로 적용할수도 있지만
가상환경의 activate스크립트 마지막부분에 넣음으로 환경변수 설정을 적용할수도 있다.

서버환경에 따라 배포도구 문서를 참고하여 환경변수를 설정해줘야하는데

Heroku의 환경변수 세팅
`heroku config:set SOME_SECRET_KEY =`

가져오는 방법
```python
       import os
       SOME_SECRET_KEY = os.environ["SOME_SECRET_KEY"]
```
이렇게 함으로써 모든 코드가 git으로 관리 할 수 있으며 비밀키도 안전하게 유지할수 있다.


만약 비밀키가 없을경우를 대비해 예외처리를 해줘야 디버깅이 쉬워진다

세팅 모듈안에서 장고 컴포넌트 임포트는 금물인데

예외적으로 프로젝트의 예외처리를 위해` ImproperlyConfigured 를 import`해 사용해주게 되면 예외처리를 통해 보기 좋은 에러메세지를 만들수 있다.

❓ 장고 공식문서에 따르면 여러개의 setting파일을 이용하게 되면 manage.py가 아닌 django-admin.py를 이용하라고 되어있는데 manage.py를 사용해도 무방하다



💬환경변수를 이용할수 없는 아파치 웹서버 이용 및 일부 Nginx 기반 환경

비밀 파일패턴을 이용 (장고에서 실행되지 않는 형식의 파일을 git에 추가하지 않고 사용)
- JSON, config, YAML, XML중 한가지 포맷을 선택하여 작성
- 비밀파일을 관리하기 위한 로더 추가
- 비밀파일의 이름을 gitignore에 추가

>ex) JSON이용 : secrets.json 파일을 만들어 비밀키 관련 정보 저장
setting 파일에 `import json`을 이용해` with open("secrets.json) as f:` 이용하여 open
똑같이 예외처리를 하여 return



### 💬여러개의 requirements 파일 이용 (패키지와 버전 번호 표기)

각 세팅파일에 해당하는 `requirements`파일 이용(각각의 환경에 필요한 컴포넌트만 설치)

* 추천 패턴
```
<repo directory>/ requirements/
requirements/
    base.txt
    local.txt
    staging.txt
```
`base.txt ` : 모든 한경이 공통으로 이용할 의존성
`local.txt`  : 개발환경에서 필요한 패키지 (` -r base.txt `(base.txt파일 포함))


requirements 이용하기

`pip install -r requirements/local.txt`


#### ❓ settings에서 파일경로 처리하기

템플릿 및 미디어 파일에 대한 경로에러가 발생 하는 경우가 있는데
**절대로 하드코딩된 절대경로를 사용하지 말자**

이런 문제를 해결하기 위해 **base.py에 root 변수 BASE_DIR**을 만들어 놓았다.
그럼 **from unipath import Path** 모듈을 이용하게 되면

***MEDIA_ROOT = BASE_DIR, child("media")***

이처럼 깔끔하게 설정이 가능하다

우리의 설정들이 기본설정과 비교해 얼마나 다른지 확인 하고 싶으면 콘솔에서 `diffsettings` 명령어를 써보자