---
title: "Django RESTful Framework(1)"
date: "2019-09-28"
category: ['멋쟁이사자처럼']
draft : False
---

# REST란?

- **REpresentational State Transfer 의 약자로 HTTP를 이용해 통신하는 네트워크 상에서 정한 약속**

(월드 와이드 웹과 같은 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처의 한 형식)

Representatioional : 자원을 대표하는 식별자로 State Transfer (자원의 상태)를 전송하는 방법

[REST](https://ko.wikipedia.org/wiki/REST)

즉 기존에 HTTP method를 이용해서 통신을 해주고, REST는 기존의 하위호환을 깨지않고 네트워크 생태계가 독립적으로 발전할수 있도록 해준다.

REST의 조건에 대해서는 위의 Wiki를 참고하도록 하자

### REST API요약

[[Network] REST란? REST API란? RESTful이란? - Heee's Development Blog](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)

그리고 그 이외에 REST에 대한 고찰
[논문을 통한 REST에 대한 고찰](https://shoark7.github.io/programming/knowledge/what-is-rest)

REST API는 이대로 괜찮은가?
[https://www.youtube.com/watch?v=RP_f5dMoHFc&t=829s](https://www.youtube.com/watch?v=RP_f5dMoHFc&t=829s)

# **API**란?

**API**(**A**pplication **P**rogramming **I**nterface, 응용 프로그램 프로그래밍 인터페이스) 

응용 프로그램에서 사용할 수 있도록, 운영 체제나 프로그래밍 언어가 제공하는 
**기능을 제어할 수 있게 만든 인터페이스를 뜻한다**(인터페이스는 우리가 접하는 프로그램이라 생각)

### 웹 API

웹 애플리케이션 개발에서 **다른 서비스에 요청을 보내고 응답을 받기 위해 정의된 명세**를 일컫는다. 

예를 들어 블로그 API를 이용하면 블로그에 접속하지 않고도 다른 방법으로 글을 올릴 수 있다.

여기서는 우리가 **Request와 Response로 오가는 구조화된 Data**를 말한다
비유를 해보면 Client가 식당손님, API가 홀직원, Server가 요리사가 된다
그리고 이러한 형식을 기록하고 나타낸게 API document라고 한다

- 부록 : 플러그인이란?
[플러그인](https://ko.wikipedia.org/wiki/%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8)

**따라서 위의 두 내용을 정리해보면 HTTP로 CRUD 등을 구현할 수 있는 API를 REST API라 한다**

하지만 최근에는 JSON을 통해 정보를 주고받기떄문에 REST 가이드라인이 잘 지켜지지 않는다

왜냐면 JSON이라는 것이 각각의 의미하는것이 다르기 때문에 어떤 것이 무엇을 의미하는지

정해져있지않아 애당초 REST의 목적이었던 독립성이 깨어지고 있는 것이다
(content type 및 Header에 추가적으로 우리가 작성을 해주면 되지만 해주지 않는다)

>예) REST의 Uniform interface를 가질조건중 
self-descriptive messages : 메세지는 그 하나만으로 모든것이 설명되어야한다   가 잘 지켜지지않음
HATEOAS도 하이퍼미디어를 통해 전달... 잘 지켜지지 않음

# Restful API in Django

우선 들어가기에 앞서 JSON 직렬화를 Serializer라고 말합니다
그리고 기존에 우리가 Django와 정보를 주고받았던 Form과 비교해서 보도록 합시다

|Django |DRF|
|:---:|---|
|Form/ModelForm | Serializer / ModelSerializer|
|Model로 부터 Field 읽어옴|Model로 부터 Field 읽어옴|
|유효성 검사|유효성 검사|
|HTMLForm |JSON 문자열|

위의 표를 보면 기존의 Form 과 Serializer가 비슷하게 동작한다는 것을 알수 있습니다.

Data를 Serializer해서 넘겨주면 form 과 같이 is_valid를 이용해서 검사하고 처리해주게 됩니다.

## Django REST framework 시작하기

```bash
pip install djangorestframework
pip install django
```

```python
python manage.py startapp <App_name>
```

```python
INSTALLED_APP 에 우리가 만든 'App_name'과 'rest_framework' 를 등록해주자
```

# Model Serializer 생성 & Model 생성

```matlab
from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.TextField(max_length = 100)
    body = models.TextField()
```

```python
from .models import Post
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('title','body','id',) 
        # fields = '__all__'
        # read_only_fields = ('title',) 이렇게 작성해주면 title field가 오직 읽기만 가능해진다
```

### 그리고 언제나 그랬던것 처럼 makemigrations 와 migrate를 해줍시다

### 그리고 이제부터 4가지의 루트있습니다.

- API View
- Mixin
- Generic CBV
- ViewSet

위로갈수록 자유도도 높고 어려운 편이며 
아래로 갈수록 편하게 구현할수 있는 대신 자유도가 덜한면이 있습니다.

# API VIEW

```python
# 데이터 처리 대상
from post.models import Post
from post.serializer import PostSerializer
# status에 따라 직접 Response를 처리할 것
from django.http import Http404 # Get Object or 404 직접 구현

from rest_framework.response import Response
from rest_framework import status
# APIView를 상속받은 CBV
from rest_framework.views import APIView
# PostDetail 클래스의 get_object 메소드 대신 이거 써도 된다
# from django.shortcuts import get_object_or_404

class PostList(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True) # 쿼리셋 넘기기 (many=True인자)
        return Response(serializer.data) # 직접 Response 리턴해주기 : serializer.data
    
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():   # 직접 유효성 검사
            serializer.save()       # 저장
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	#Response(data = None , status = None, template name...._)의 인자들이들어갈수있다

# PostList 클래스와는 달리 pk값을 받음 (메소드에 pk인자)
class PostDetail(APIView):  #각 instance 객체는 url뒤에 auto created 된 pk, id값을 붙여줌으로서 우리가 detail을 확인해 줄 수 있다.
    # get_object_or_404를 구현해주는 helper function
    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        post = self.get_object(pk)
        # post = get_object_or_404(Post, pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    # 위 post 메소드와 비슷비슷한 논리
    def put(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        post = self.get_object(pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

### urls.py

```python
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from post import views

# Default Router 사용 X ==> API ROOT 없음. 

urlpatterns = [
    # 127.0.0.1:8000/post == ListView
    path('post/', views.PostList.as_view()),  
    # 127.0.0.1:8000/post/<pk> == DetailView
    path('post/<int:pk>/', views.PostDetail.as_view()), 
]

#
urlpatterns = format_suffix_patterns(urlpatterns)
```

여기서 잠깐! 
내가 만약 get 이나 post같은 method외에도 put 이나 patch , delete와 같은 method를 만들 수 있는데 이때 put과 patch 의 개념이 헷갈릴 수도 있으니 짚고 넘어가자

* `PUT` : 자원의 전체 교체 → 따라서 모든 필드 필요
* `PATCH` : 자원의 일부 교체 → 따라서 필드의 일부영역 필요


# Mixin
**Mixin 이란? 
: 쉽게 생각하면 다중상속 등에 이용되는 Base Class 를 Mixin Class 라고 한다**

**주의 사항**
```python
class MyClass(ThirdClass, SecondClass, FirstClass)
	pass 
```

**FirstClass → ThirdClass 순서로 상위→ 하위클래스로 작성해줘야 한다는 것이다**
```python
# 데이터 처리 대상 : 모델, Serializer import 시키기
from post.models import Post
from post.serializer import PostSerializer

from rest_framework import generics
from rest_framework import mixins
# mixin 직접 보기 : https://github.com/encode/django-rest-framework/blob/master/rest_framework/mixins.py
# genericAPIView 직접 보기 : https://github.com/encode/django-rest-framework/blob/master/rest_framework/generics.py
class PostList(mixins.ListModelMixin, mixins.CreateModelMixin, 
                generics.GenericAPIView):
    queryset = Post.objects.all()   # 쿼리셋 등록!
    serializer_class = PostSerializer # Serializer 클래스 등록!

    # get은 list메소드를 내보내는 메소드
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    # post는 create을 내보내는 메소드
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class PostDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, 
                mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # DetailView의 get은 retrieve을 내보내는 메소드
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    # put은 update을 내보내는 메소드
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    # delete은 destroy를 내보내는 메소드
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
```

# urls.py

```python
API View와 동일
```

# Generic CBV
```python
from post.models import Post
from post.serializer import PostSerializer
from rest_framework import generics

# rest_framework/generics.py
# https://github.com/encode/django-rest-framework/blob/master/rest_framework/generics.py

# ListCreateAPIView
# https://github.com/encode/django-rest-framework/blob/0e1c5d313232a131bb4a1a414abf921744ab40e0/rest_framework/generics.py#L232

# RetrieveUpdateDestroyAPIView
# https://github.com/encode/django-rest-framework/blob/0e1c5d313232a131bb4a1a414abf921744ab40e0/rest_framework/generics.py#L274

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
```

# urls.py
```python
API View와 동일
```

# ViewSets & Routers
> Decorator란 무엇인가요
```python
def hello_fun(message):
    # 안녕함수가 인사할수 있는 내부로직 구현
    def greeting(name):
        print(f'{message} - {name}!')
    return greeting

    my_hello_fun= hello_fun('Hello')

    my_hello_fun('chichi') # Hello - chichi!
    my_hello_fun('jang') # Hello - jang!
```

위의 코드와 같은게 Decorator라고 느껴보자

# ViewSet

```python

from post.models import Post
from post.serializer import PostSerializer

from rest_framework import viewsets

# @action처리
from rest_framework import renderers
from rest_framework.decorators import action
from django.http import HttpResponse

'''
# ReadOnlyModelViewSet은 말 그대로 ListView, DetailView의 조회만 가능
class PostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
'''
# ModelViewSet은 ListView와 DetailView에 대한 CRUD가 모두 가능

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # @action(method=['post']) #커스텀 method
    @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
		#rerender는  Response를 어떤방식으로 Rendering시킬것인가에 대한 이야기다
		#default는  JSON이랑 BrowsableAPIrenderer를 많이 쓴다
    # 그냥 얍을 띄우는 custom api
    def highlight(self, request, *args, **kwargs):
        return HttpResponse("얍")
```

API서버를 담당하는 백엔드는 HTML관여에 최소화하는게 좋다
customAPI의 default Method는 기본 GET방식이다

# ViewSet Router

```python
from rest_framework.routers import DefaultRouter
from django.urls import include, path
from post import views

# 라우터가 없다면?
router = DefaultRouter()
router.register('post', views.PostViewSet)

urlpatterns = [
    path('', include(router.urls))
]
```

`as_view() `안에 http_method가 오고 그에 해당하는 함수가 와서 원래는 맵핑된다
그런데 우리는 `router`라는 것을 이용하면 이런것들을 자동으로 `register`해줄수 있따