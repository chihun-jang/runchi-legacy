---
title: "Django RESTful Framework(2)"
date: "2019-10-10"
category: ['멋쟁이사자처럼','Django']
draft : False
---


### Django RESTful Framework(2)

안녕하세요 열어분,,,
이번시간에는 DjangoRESTframwork를 다 모으고 모아서 ~~숙제를~~
프로젝트를 한번 해보도록 해보겠읍니다.

언제나 그렇듯 Django때 했던것 처럼 Django REST Framework에서도 한번 생각의 흐름을 따라 만들어 나가봅시다

기존의 Django에서 하던 방법은 우리가 웹사이트를 이용하는 순서대로

URL로 접속한다 → URL에서 처리해줄 View를 작성한다 → View에서 Model을 사용해야하면 Model의 Data들을 가져온다. → View에서 처리해준 로직(Data)을 Template에 띄워 준다 로 접근했었습니다.

하지만 이번에는 그렇게 가면 매끄럽게 꼬리에 꼬리를 못 물것 같아서 제 나름대로 재구성을 해보겠습니다

일단! 우리가 Django에서 만들어 주었던 Template부분이 Django REST Framework에서는 다른 애에게 맡기게 될것이므로 View와 Model을 위주로 구성을 하게 될 것이라는것을 알아 둡시다

참 `pip install djangorestframework`이런것들은 생각하겠습니다 

***

# 우리가 다뤄줄 Data들을 위한 Model 작성

우리는 지금부터 3가지 Model을 만들어서 사용할껍니다
- Blog       -    가장 기본적인 글과 text를 위한 model
- BlogPic   -    ImageField를 추가해서 Image추가 기능도 가능하게 변경
- BlogFile  -    FiledField를 통해 File도 추가할 수 있게 해줌

그럼 금방 작성을 해보도록 할께요

```python
# models.py
from django.db import models
from django.conf import settings

class Blog(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete = models.CASCADE)
    title = models.TextField(max_length=100)
    body = models.TextField()

class BlogPic(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete=models.CASCADE)
    myimage = models.ImageField(upload_to='images', default="null")
    desc = models.CharField(max_length= 100)

class BlogFile(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete=models.CASCADE)
    myfile = models.FileField(upload_to='files',blank=False , null = False)
    desc = models.CharField(max_length=100)
```

위의 코드에서 우리가 눈여겨 볼 부분을 체크해봅시다.

* `ForeignKey` : django.conf 에서 settings 를 가져오는것은 그 안에 Django가 기본적으로 Global user 준비를 해놨기 때문이다.

> - ForeignKey란?
한국어로 외래키라고도 불리는데 ForeignKey는    
e.g) User Table과 Comment Table이 있을때  Comment Table 중 field(col)하나가 User Table의 특정 field(col) 을 참조하는 것이다
쉽게 생각하면 우리가 두개 이상의 Table이 있을때 서로 연관성이 있는 경우
이러한 연관성을 표시해줘야하는데 우리는 외래키는 통해서 
저장되는 댓글(Comment)이 특정 User의 것임을 나타낼수있는 ForeignKey Field로 나타내는 것이다.
(이때 참조 대상이 되는 User Table에 있는 field만을 참조할수 있다)

* `default` :  우리의 ForeignKey Field가 따로 입력되지 않으면 1로 되는 것이다

* `on_delete` :  우리가 참조하고 있는 외부모델이 사라지게 되면 따라서 사라지라는 말(예를 들면 jang이라는 유저가 사라졌으면 해당 user가 적은 글도 다 지우는것)

- Model을 만들어 줬으면 언제나 그렇듯 `makemigrations`와 `migrate`
- media 파일을 따로 관리해주기 위해서 BaseDir(우리의 Project폴더 밑에) media 폴더와 각각 image와 file을 따로 관리 할 수 있게 폴더를 각각 만들어주자

```python
Project Dir / media Dir / image Dir, file Dir
```

- 그리고 우리의 `settings.py`에 Media를 관리할수 있게 추가적인 setting을 해주도록 하자

```python
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR,'media')
```

- `MEDIA_ROOT, MEDIA_URL`

`MEDIA_ROOT` 는 우리가 올리는 MEDIA File 의 절대경로라고 생각해주면 된다.

`MEDIA_URL` MEDIA_ROOT로 부터 우리가 올린 media 파일관련한 url 을 제공해준다. 이떄 아무런 값도 제공되지 않으면 우리는 URL 뒤에 `/`  를 붙여 줘야한다.

             

STATIC과의 차이는 뭘까?

`STATIC_ROOT` 가 나오기 이전 `MEDIA_ROOT`에서도 STATIC File을 관리해 줬었는데 이렇게 되면 보안상으로 취약해질수 있다.  따라서 이를 막기위해 유효성검사를 도입.

- 그렇다면 `STATIC_ROOT` 는 뭐지?

배포를 하기위한 `static`파일들을 `collectstatic`을 통해 모을때 사용되는 절대경로 (초기 빈 대상 디렉토리가 되어야한다)

`STATICFILES_DIRS` 얘는 STATIC File들이 위치한 `Directory`들의 목록이고 탐색기가 이를통해서 찾아내서 관리할수 있게 되는 것이다.

[Settings | Django documentation | Django](https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-STATIC_ROOT)


우리의 media에 접근 할수 있도록 `urls.py`에 경로도 추가해줍시다
```python
urlpatterns += static(settings.MEDIA_URL, document_root =settings.MEDIA_ROOT )
```

# Model을 준비했으니 View를 준비해보자!

우리는 View를 `ViewSet`을 이용해서 작성을 해주려고 합니다
그런데 이 과정에서 model 과 serializer를 사용할 예정이므로
model은 위에서 준비했으니 다음으로 serializer를 준비해줍시다

```python
#serializer.py 
from rest_framework import serializers    #serializers를 선언하기위해서 import해줍니다.
from .models import Blog,BlogPic,BlogFile

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Blog
        fields = ('pk', 'title', 'body', 'author',)
        # fields = '__all__'

class BlogPicSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source="author.username")
    myimage = serializers.ImageField(use_url=True)

    class Meta:
        model = BlogPic
        fields = ('pk', 'author', 'myimage','desc')    # 여기서 fields를 해주기 위해서 우리가 위에서 declare를 해줘야한다

class BlogFileSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    myfile = serializers.FileField(use_url=True)      

    class Meta:
        model = BlogFile
        fields = ('pk', 'author', 'myfile', 'desc')
```

이런식의 준비는 `model form`과도 유사한 모양처럼 보입니다.

그런데 위에서 author는 생각해보면 우리가 글을 적게되면 로그인한 사용자의 이름으로 적히는게 일반적인데 만약 A라는 사용자가 접속해서 admin이라는 계정으로 글을 작성하게 되면 혼란이 빚어질수밖에 없겠죠!! 

그래서 `ReadOnlyField`라는 `serializers Field`를 이용해서 author라는 field를 바꿔줍니다

author는 `ReadOnly`일 뿐만아니라 `author.username`을 통해 username을 author로 사용해주겠다고 하고 있습니다.

이렇게 선언한 author를 `Meta Class` 의 field로 적어주고...
`FileField`와 `ImageField`또한 `django.forms.fields.imageField`등에 기반하여 만들어졌는데

위에서 보고 있는 `use_url`속성은 
* True로 지정할시 나중에 나타나는 file의 모양이 url모양
* False로 지정을 하게되면 나타나는 file의 모양이 file name 모양


이제 View에서 ViewSet을 사용할 준비는 마무리 되었습니다.

## View에서 ViewSet을 이용해 작성하도록 합시다
```python
#우리가 만든 App의 views.py
from django.shortcuts import render
from .models import Blog,BlogPic,BlogFile
from .serializer import BlogSerializer,BlogPicSerializer,BlogFileSerializer
from rest_framework import viewsets
# Create your views here.

class BlogViewSet(viewsets.ModelViewSet):

    queryset = Blog.objects.all().order_by('id')   #우리가 pagenation을 사용할 적에는 정렬을 해줘야한다
    serializer_class = BlogSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset()  #원래 ViewSet이 가지고 있던 get_queryset을 가져오자

        if self.request.user.is_authenticated:
            qs = qs.filter(author=self.request.user)
        else:
            qs = qs.none()
        return qs

class BlogPicViewSet(viewsets.ModelViewSet):

    queryset = BlogPic.objects.all().order_by('id')
    serializer_class = BlogPicSerializer

class BlogFileViewSet(viewsets.ModelViewSet):

    queryset = BlogFile.objects.all().order_by('id')    
    serializer_class = BlogFileSerializer

```

위의 코드를 보면 그렇게 어려운 부분은 없는 것 같습니다

이전에 알아봤던것첨 ViewSet이 많은 부분을 미리 준비해놨기때문에 우리는 추가적으로 `queryset`과 `serializer_class` 만 선언해주면 되겠습니다.

이때 우리가 미리 준비해 두었던 model의 object들을 queryset으로 넘겨주고(이때 `order_by`를 이용해 생성순으로 정렬해줍니다. 뒤에 `pagination`을 위함)

- `perform_create` :  우리의 instance가 저장이 되기전에 우리가 명시적으로 수정을 하고 저장을 해줄수 있다. 위에서는 author를 자기자신인 instance가 요청한 request의 user로 설정해준것이다
이처럼 request를 이용해 줄수도 있다.

- `get_queryset` : view에서 다루는 `queryset`을 overriding을 통해 조작해주는데 지금은 `super()`를 통해 `ViewSet`이 상속하는 `genericView`가 기본적으로 가진 `get_queryset`을 통해서 queryset을 가져오고 if 문을 통해서 `authenticated`된  user일 경우 접속한 user랑 동일한 queryset만 화면에 띄워 주겠다는 것이다.

# 그리고 마지막 URL을 연결시켜 주면 끝

```python
#project의 urls.py

from django.contrib import admin
from django.urls import path,include
from blog import urls
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import urls    #이거 api-auth로 관리자페이지에서 간단하게 로그인아웃 할수있음

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls'))
]

urlpatterns += static(settings.MEDIA_URL, document_root =settings.MEDIA_ROOT )   #얘를 입력 안해주니까 우리가 MEDIA file이 올라 가는데 우리가 그 파일을 요청할때 url pattern을 찾을수 없다
```
include를 통해서 app의 urls에서 관리할수 있게 해주었고, rest_framework.urls로 보내는것은 RESTframework 의 page에서 쉽게 login, logout을 할수 있는 기능을 추가한것입니다.

```python
#App의 urls.py

from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('Blog', views.BlogViewSet)

router.register('BlogPic', views.BlogPicViewSet)

router.register('BlogFile', views.BlogFileViewSet)

urlpatterns = [
    path('',include(router.urls)),
]
```

include를 통해서 app의 url로 들어온 요청은 `ViewSet`의 `Router`를 통해서 처리를 해줬습니다

`DefaultRouter`로 router를 생성해주고 해당 router에 `prefix`와 함께 해당 요청이 들어오면 실행시켜줄 views의 `callable`객체까지 표시해줬습니다.

그럼 우리의 기본적인 backend API구성이 끝났습니다.
그런데 추가적으로 PageNation 및 Authentication, Permission과 같은 설정을 넣고싶으면 `settings.py`에 몇줄의 코드만 작성해주면 기본적으로 작성이 됩니다.

물론 추가적으로 customize하는것은 각각의 View에도 손을 대줘야하지만

```python
#settings.py

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 5,
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAuthenticated',
    ],
}
```

위에 보면 REST_FRAMEWORK 에서 추가적으로 줄수있는 옵션을 settings에 설정해주고 있습니다.

제공해주는 pagenation이나 authentication , permission을 추가해준 모습입니다.

물론 위의 코드는 기본적으로 제공해주는 base값이지 우리가 custom하기위해서는 View에서도 추가적인 코드를 입력해줘야합니다.

```python
from django.shortcuts import render
from .models import Blog,BlogPic,BlogFile
from .serializer import BlogSerializer,BlogPicSerializer,BlogFileSerializer

from rest_framework import viewsets

from rest_framework.filters import SearchFilter
from rest_framework.pagination import PageNumberPagination   #이건 커스텀 하기위해서 가져와서 overriding해준것  

# from rest_framework.parsers import FormParser,MultiPartParser  #파서의 역할이 먼지 알아보자 사실 없어도 나는 file이 동작하는데
# from rest_framework.response import Response
# from rest_framework import status

# Create your views here.

class BlogViewSet(viewsets.ModelViewSet):

    queryset = Blog.objects.all().order_by('id')   #우리가 pagenation을 사용할 적에는 정렬을 해줘야한다
    serializer_class = BlogSerializer
    filter_backends = [SearchFilter]
    search_fields = ('title',)
    #pagination_class = Mypagination 이 뷰셋에만 커스텀 하고싶으면 이렇게 해도 된다
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset()  #원래 ViewSet이 가지고 있던 get_queryset을 가져오자

        if self.request.user.is_authenticated:
            qs = qs.filter(author=self.request.user)
        else:
            qs = qs.none()
        return qs

class BlogPicViewSet(viewsets.ModelViewSet):
    queryset = BlogPic.objects.all().order_by('id')
    serializer_class = BlogPicSerializer

class BlogFileViewSet(viewsets.ModelViewSet):

    queryset = BlogFile.objects.all().order_by('id')    
    serializer_class = BlogFileSerializer
    #API를 HTTP -> get Post로 함

    #이것의 필요이유??????
    # parser_classes = (MultiPartParser,FormParser)

    # def post(self, request, *args, **kwargs):
    #     serializer = BlogFileSerializer(data = request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status= HTTP_201_CREATED)

    #     else:
    #         return Response(serializer.error, status= HTTP_400_BAD_REQUEST)

class Mypagination(PageNumberPagination):
    page_size = 100   # 이렇게 number를 우리가 custom해서 viewSet을 커스텀해줄수 있다 , 따라서 이부분을 따로 file로 빼주고 import해서 사용해줄수 있다.
```
위의 코드를 보면 settings.py에서 추가적으로 셋팅해준 값 이외에도 search와 같은 기능을 추가적으로 view에 구현해서 사용해주고 있는 것을 알수 있습니다.