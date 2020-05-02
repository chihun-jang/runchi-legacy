---
title: "Django FBV(Function based View), CBV(Class based View)"
date: "2019-04-01"
category: ['django']
draft : False
---

#### Django 함수 기반 뷰와 클래스 기반 뷰

* 함수기반 뷰(Function based views,FBV) 
* 클래스 기반 뷰 (Class based views, CBV)

일반적으로 CBV를 선호하지만 CBV가 더 복잡한 경우나 커스텀 에러 뷰에대해서는 FBV를 사용
(그런데 Django를 사용하는 어떤 개발자들은 FBV가 좀더 직관적이고 이해하기 좋다는 이유로 FBV를 사용하기도 한다/ 이런경우 CBV는 서브클래스가 필요한 경우에만 이용)


### URLConf로부터 view로직 분리

- 뷰 모둘은 뷰로직을 포함해야한다
- URL모듈은 URL로직을 포함해야한다

왜 view로직과 URLConf를 분리?

뷰와 모델사이에 느슨한 결합으로 뷰의 내용이 재사용이 편해야하며
**__CBV에서도 DRY(Don't repeat Yourself) 의 법칙__**에 따라야 하며
URL들의 무한한 확장성을 지켜야한다(**__CBV는 클래스 상속이 최대 강점__**이다)
그리고 인증절차의 문제에서도 URL에 뷰를 넣으면 엉망이 되므로 분리해야한다


URLConf에서 느슨한 결합 유지하기
이 말은 **기존에 우리가 작성하던대로**views.py파일 따로 urls.py파일 따로 분리해놓는것을 말하는데

- DRY를 방지할 수 있다
- 여러 urls.py에서 뷰를 호출할수 있게 해준다
- URLConf는 URL라우팅만을 담당하기때문에 명확하다
- 다른 클래스에서 뷰를 상속해서 사용할수 있다.
- 뷰에 커스텀 로직이라도 구현가능하다

### URL namespace이용하기

`blog_detail` 이라고 하는 대신 `blog:detail` 이라고 정의하자

정의 방법은 `urls.py`에서

`path(" url ", include('blog.urls', namespace = 'blog'))`, 와 같은 방법으로 정의한다

혹은 위에 `app_name="app_name"` 이라고 정의해주는 방법이 있따.
사용은
`<a href="{% url "blog:detail" blog.id %}">` 와 같은 방법으로 사용한다


#### namespace의 장점

서드파티 라이브러리와의 운영성인데 같은 이름의 앱과 같은경우 URLConf의 수정과 namespace의 사용만으로 간편하게 template에서도 사용가능하다


PEP-8의 측면에서 보더라도
namespace를 이용한 이름이 검색에 용이하고 이는 업그레이드와 리팩토링의 이점을 가져온다


URLConf 에서 views를 문자열로 지목하지 말자

문자열로 하게 되면 views에서 문제가 발생할경우 임의의 작용을 하는 부분에 대해 디버깅하기 어려워진다

`path('' , 'view' ,name = '') 가 아닌 path('', view, name='')` 으로 작성하자



뷰에서 비지니스 로직 분리
뷰에서 표준적으로 이용하는 구조 이외의 **비지니스 로직은 해당 코드를 뷰 밖으로**이동


### 장고의 뷰와 함수

기본적으로 장고의 뷰는 **HTTP를 요청하는 객체를 받아 HTTP를 응답하는 객체로 변경하는 함수처럼 작동**


뷰의 기본 형태들
```python
from django.http import HttpResponse
from django.views.generic import View

#함수 기반 뷰의 기본 형태
def simplest_view(request):
    # 비지니스 로직의 위치
    return HttpResponse("FBV")

#클래스 기반 뷰의 기본 형태

class SimplestView(View):
    def get(self, request, *args, **kargs):
        #비지니스 로직의 위치
    return HttpResposen("CBV")
```

가장 단순한 형태의 뷰를 이해했다는 것은 장고 뷰의 역할을 이해하는데 중요하다
함수기반뷰와 달리 클래스 기반뷰는 **HTTP 메서드의 선언**이 필요하다


넘겨줄 context를 명시적으로 표시하자.

```python
def index(request):
    context = {"1" : 1}
    return render(request, 'index.html', context)
```
이처럼 명시적으로 넘겨줄 context를 표시하는 것이 좋다는 의미이다.
(`context `대신 `dict{ key:value }` 가 와도 상관없지만 `return`구문이 너무 길어지고 보기 불편하므로 context를 사용했다)

그래야지 코드의 가독성 및 유지 보수도 훨씬 좋아진다
