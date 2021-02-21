---
title: "Django signup,login,logout"
date: "2019-05-18"
category: ['멋쟁이사자처럼','Django']
draft : False
---


### Django signup,login,logout 

안녕하세요!!!

지난 포스팅에서 CRUD를 이용해 아주 기초적인 게시판의 모습을 보았습니다
오늘은 모든 웹사이트에 하나씩 있는 로그인 기능에 대해
정말 심플하게 구현해보도록 하겠습니다.

~~(추후의 포스팅을 통해 로그인 기능을 좀 더 다뤄보도록 할께요)~~

***

1. APP 만들어주기 
-터미널에서


```shell
(myvenv)
jangc@DESKTOP-14NC1CL MINGW64 ~/Desktop/20190509setdjango/setdjango
$ python manage.py startapp accounts
```
우리는 저번시간에 CRUD의 기능을 하는 blog APP에서 작업을 해줬습니다
장고에서는 기본적으로 1가지 기능당 1개의 앱을 만들어 주는 것을 권장하고 있습니다
그래서 계정관련된 기능을 구현해주기 위해 accounts라는 앱을 만들어 줍시다.

1. App을 만들었음을 settings.py에 INSTALLED_APPS 에 알려줍시다. 
-settings.py에서


```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blog.apps.BlogConfig',
    'accounts.apps.AccountsConfig'
]

```
>url,views,template를 따로 추가해주지 않는 이유는 blog의 경우 기본적으로 index.html에 연결시켜줬는데 지금은 accounts의 기능을 하는 앱이므로 sign_up 기능을 구현하면서 같이 해보도록 하겠다


1. sign_up 회원가입 링크 생성하기 
-blog의 index.html에서

```html
<body>
    <h1>메인페이지입니다</h1>
<a href="{%url 'sign_up'%}">회원가입</a> <!-- 회원가입을 하는 url애칭 sign_up을 미리 지어줍시다-->
```

1. sign_up url 처리해주기  
-urls.py에서

```python
from accounts import views as accounts_views   #accounts의 views를 accounts_views로
# 불러주겠다는 의미입니다. blog의 views와 구분하기위해
# 애칭을 지어줬습니다
urlpatterns = [
    path('accounts/sign_up/', accounts_views.sign_up, name="sign_up"),
]   #accounts/sign_up은 acoounts의 sign_up기능이라는 url의미로 사용해준겁니다.
    #  sign_up만 해도 되지만 나중에 app별 url관리 및 login_required 를 생각하여 미리
    #  accounts/sign_up으로 해줬습니다.
```

5.  sign_up과 관련된 view작성해주기 
-accounts의 view에서

```python
from django.shortcuts import render,redirect            #redirect함수를 쓰기위해 추가로 import해줬습니다.
from django.contrib.auth.forms import UserCreationForm  #장고에서 기본적으로 제공해주는 UserCreationForm을 사용합니다
#기본적으로 만들어져있는 User모델에서 User생성을 쉽게 도와주는 모델폼으로 생각합시다.
# Create your views here.
def sign_up(request):

    if request.method =="POST":                       #우리가 유저 가입폼을 작성해서 submit을 해주는 것은 DATA를 수정하는 행위이므로 POST를 이용해 보내게 됩니다.

                                                      #따라서 request.method가 POST이면 해당 if절을 실행시키는데

        sign_up_form = UserCreationForm(request.POST) # signup폼을 그냥 생성하는게 아닌 request.POST로 넘어가는 DATA들 즉 우리가 입력한 ID와 PW를 넣어서 객체를 생성합니다

        if sign_up_form.is_valid:                     #그리고 해당 form의 요구대로 유효한 값이 입력이 되었으면
            sign_up_form.save()                       #데이터를 받은 폼 객체를 저장해주고
            return redirect('index')                  #index라는 애칭의 url요청을 redirect해줍니다.

        else:                                         #유효성 검사가 실패하게 되면

            return redirect('sign_up')                #다시금 sign_up url요청을 보내 페이지를 다시 리로드 해줍니다.

    sign_up_form = UserCreationForm()  #우리가 href link를 누르는 행위는 기본적으로 request get요청을 보냅니다. 따라서 get요청이 들어왔을때는
    #UserCreationForm을 빈 form으로 sign_up_form이라는 유저 생성 폼을 만들어 줍니다.

    return render(request,'registration/sign_up.html', {'sign_up_form':sign_up_form})  #그리고 우리는 유저생성폼을 전달해서 template에 띄워줍니다.
    #LoginView의 login.html과 같은 기능을 하는 template이므로 같은 폴더에 넣어주기 위해 LoginView의 login.html이 위치하는 폴더 밑에 미리 위치
```


6. views에서 띄워줄, 회원가입을 보여줄 template준비하기 -accounts-templates-registration-sign_up.html에서

```html
<body>
    <form method="POST">      <!-- form의 method는 POST로 설정해주고-->
    {%csrf_token%}
    {{sign_up_form.as_p}}   <!--views에서 넘겨받은 sign_up_form을 p 형식으로 보여줍시다-->
    <input type="submit" value="회원가입">   <!--그리고 해당 폼을 전송할수 있는 submit버튼을 만들어 줍시다-->
    <!--submit버튼은 form이 제공되는 것과 상관 없이 항상 있어야 합니다.-->
    </form>
</body>
```

7. 회원가입이 끝났으니 Login기능도 구현해봅시다. 
-blog-index.html에서

```html
<h1>메인페이지입니다</h1>
    <a href="{%url 'sign_up'%}">회원가입</a> <!-- 회원가입을 하는 url애칭 sign_up을 미리 지어줍시다-->
    <a href="{%url 'login'%}">로그인</a>
```

8. 보내준 url요청을 처리해줍시다.
-urls.py에서

```python
from django.contrib.auth.views import LoginView,LogoutView  #sign_up기능은 장고가 뷰를 제공해주지 않지만 Login고 Logout은 제공해주므로 가져다 씁시다
    .
    .
    .
    path('accounts/login/',LoginView.as_view(),name="login"),  #login이라는 애칭의 url요청이 들어오면 LoginView안에 있는 as_view()라는 메서드를 실행

    #우리가 지금까지 사용한함수기반뷰가 아니라 클래스 기반뷰입니다 

    #함수기반뷰가 사용하기 쉽고 직관적인반면 클래스기반뷰는 확장성 및 재사용에 용이합니다

```




9. login을 보여줄 template을 준비합시다 
-accounts-templates-registration-login.html에서

LoginView라는 view는 장고가 기본적으로 제공해줘서 url에서 동작하도록 했는데
8번까지 완료후 runserver로 돌려보면 아래와 같은 에러가 뜸을 알수 있습니다.

`django.template.exceptions.TemplateDoesNotExist: registration/login.html`

이러한 template이 LoginView안에 보여줄 기본 템플릿으로 설정이 되어있는데 없다는 의미입니다.
그래서 우리는 만들어 주도록 합시다.

```html
<body>
    <form method="POST">
        {%csrf_token%}
        {{form.as_p}}  <!--LoginView가 제공해주는 form의 이름은 form입니다.-->
        <input type="submit" value="로그인">
    </form>       <!--우리가 기존에 알고있던 form형식과 같습니다.-->
</body>
```

9-2. 그런데 로그인을 하니까 이상한 곳으로 가면서 에러가 뜨죠? 
-settings.py 맨 밑에

LoginView가 자체적으로 로그인이 성공하면 profile이라는 template으로 가도록 설정을 해놓아서 그렇습니다

따라서 우리는 redirect되는 url을 settings.py에서 명시적으로 root page, main page로 설정해줍시다.

```python
LOGIN_REDIRECT_URL = '/'

LOGOUT_REDIRECT_URL = '/'
```

10. 로그인 기능도 구현을 마쳤으니 로그아웃도 넣어줍시다. 
-blog-index.html에서

```html
<a href="{%url 'login'%}">로그인</a>
<a href="{%url 'logout'%}">로그아웃</a>
```

11. 로그아웃 url을 처리해줄 url도 설정해줍시다. 
-urls.py에서

```python
path('accounts/logout/',LogoutView.as_view(),name="logout"), #LogoutView는 url로 요청이 들어오면 LogoutView의 as_view()를 실행시키는데
#이때 따로 template은 필요로 하지 않습니다. 우리가 실제로 로그인은 loginpage가 있는반면
#logout은 logout페이지를 안거치고 내부적으로 처리만 되는 것을 생각하면 이해가 쉬울거에요
```

12. 그런데 문제가 로그인이 되었는지 로그아웃이 되었는지 확인할 길이 없습니다.
우리가 확인을 할 수 있도록 index.html페이지를 조금 손보도록 합시다 
-blog-index.html에서

```html
<h1>메인페이지입니다</h1>
    {% if user.is_authenticated %}                 <!-- 만약 user가 접속중이라면 즉 인증된 사용자라면-->
        안녕하세요! {{user.username}}님!!               <!--user객체의 usernamefield를 가져와 띄워주고-->
        <a href="{%url 'logout'%}">로그아웃</a>     <!--로그아웃 버튼만을 보여줍니다-->
    {%else%}                                       <!--로그인되지 않은 상태라면-->

        <a href="{%url 'sign_up'%}">회원가입</a>        <!--회원가입과 로그인 버튼을 보여줍니다.-->
        <a href="{%url 'login'%}">로그인</a>
    {%endif%}
```

이렇게 바꿔주도록 합시다.


13. 마지막으로 login된 사용자에게만 글쓰기,수정, 삭제 권한을 주면 좀더 완성도가 생기지 않을까요 
-blog-views.py에서

```python
from django.contrib.auth.decorators import login_required   #decorator라는 것은 ... 톡붙여서 해당 기능을 사용할수 있도록 해주는 편리한 녀석들입니다.

@login_required     #이렇게 우리가 로그인 된 상태에서만 실행시키고 싶은 함수바로위에 코드를 적어주도록 합시다.                                                
def new(request):

@login_required
def edit(request,blog_id):

@login_required
def delete(request,blog_id):

```

이렇게 설정을 해주면 로그인 된 상태에서는 글쓰기,수정,삭제를 할수있지만

로그인 되지 않은 상태에서 링크를 누르게 되면
로그인 페이지로 자동으로 유도해주기때문에 편리하게 사용할수 있습니다

(그리고 이때 사용하는 url이 `accounts/login/` 모양입니다)

