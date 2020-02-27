---
title: "Django"
date: "2020-02-27"
---


안녕하세요!!

일 마치고 늦은시간, 그리고 꿀같은 휴일에 수업을 들으시느라 고생많으십니다🙂

HTML, CSS라는 언어,

너무 어렵게 생각하지 마시구 차근차근 해보도록 합시다.

# 1. Django 프로젝트 생성하기

우리는 웹 서비스를 만들기 위해 프로젝트를 생성해줘야 합니다.

---

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ac3e6fde-3c57-4578-b0f7-999f37a1b8a7/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ac3e6fde-3c57-4578-b0f7-999f37a1b8a7/Untitled.png)

    ls  : 현재폴더내부 파일과 폴더를 출력
    ls -al : 현재폴더내부 숨김 파일(폴더) 출력 + 상세정보 출력
    
    python --version  : python의 version확인 환경변수가 설정되어있는지 확인할 겸
    python -m venv <venv name> : 가상환경을 만들어 주기 위한 명령어

venv? 가상환경으로 우리들의 컴퓨터에 여러가지 버전의 프로그램이 깔리게 될껀데
그때 프로그램간의 충돌과 같은 문제가 생길 수 있습니다. 따라서 그러한 문제를 미연에 방지하고자 독립된 가상공간을 만들어 주는 것입니다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a2fea320-1d79-48bf-80d2-8f1599d59106/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a2fea320-1d79-48bf-80d2-8f1599d59106/Untitled.png)

    . myvenv/Scripts/activate  : myvenv와 같은 폴더 내부에서 명령어를 사용해야하며
    	가상환경을 실행해주겠다는 명령어입니다.
    	이때 .(온점) 대신 source도 사용가능합니다.
    
    	❗ mac은 Scripts가 아닌 bin file 일수 있습니다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/de2b3854-63df-400d-8ab5-582b2a26f48f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/de2b3854-63df-400d-8ab5-582b2a26f48f/Untitled.png)

    (myvenv) 가 terminal위에 붙어있는 것으로 보아 가상환경이 실행되고 있습니다.
    
    pip install django  : django를 python package 관리자인 pip를 통해서 설치해주는 명령어

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d2d5bab1-4fd3-4c0d-ba8f-6d8cc5378fb7/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d2d5bab1-4fd3-4c0d-ba8f-6d8cc5378fb7/Untitled.png)

    django-admin startproject <projectname> : django프로젝트를 생성하는 명령어

우리는 앞으로 프로젝트 진행을 대부분 reviewproject내부의 manage.py가 있는 곳에서 진행하겠습니다.

# 간단한 App만들고 Template + View연습하기

### 2019/11/10 수업내용

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ffcda3df-8743-4b95-bfa7-6420cbe7b820/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ffcda3df-8743-4b95-bfa7-6420cbe7b820/Untitled.png)

    cd <목적지> : 목적지로 이동하는 명령어
    	 Tip : . 하나는 현재 내가 위치한 directory, 
    	      .. 두개는 내가 지금 위치한 directory 의 상위 directory
    	
    	 e.g :cd ../.. : 이런식으로 쓰면 상위디렉토리의 상위디렉토리로 두번 이동가능
    
    	python manage.py startapp <appname> : Django project 내에서 App을 생성하는 명령어
    
    	                                      이떄 App은 기능하나하나를 App하나로 만들어야하며
                                            이름도 의미있는 이름으로 naming 

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/73647c3c-636d-45e2-814a-a4861f1a1aba/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/73647c3c-636d-45e2-814a-a4861f1a1aba/Untitled.png)

이렇게 좌측 상단에 보시면 우리가 방금 만든 App folder와 file들이 생성된 것을 확인할 수 있습니다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea4db014-15c9-4f36-ae48-41bd703a96bd/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea4db014-15c9-4f36-ae48-41bd703a96bd/Untitled.png)

우리가 만든 App은 Project 생성 이후에 만들어졌으므로 Project가 모릅니다. 따라서 Project에게 App을 만들었다고 알려줘야 하는데요

    blog(app folder)/apps.py 안에 있는 class name을 복사하여
    
    projectfolder/projectfolder/settings.py 에 있는 INSTALLED_APPS 부분에 적어줍니다.

이때 꼭 복붙을 안하셔도 좋지만 Class이름은 대소문자를 구별해서 작성해주셔야합니다.

그리고 vscode의 경우 열린 파일 상단에 경로가 적혀있으므로 참고해주세요!

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6e1d0bdc-1ec5-4b6d-90a7-aa3db2c2f910/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6e1d0bdc-1ec5-4b6d-90a7-aa3db2c2f910/Untitled.png)

우리의 Appfolder(저의 경우에는 blog)내부에 templates 라는 folder와 그 내부에 index.html도 생성해줍시다.

Template(사용자에게 보여지는 부분)의 준비가 끝났으니 해당 Template을 어떻게 보여줄지 View를 작성하러 가봅시다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4c30fb5a-8aba-489e-9c90-dbd62a7034b9/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4c30fb5a-8aba-489e-9c90-dbd62a7034b9/Untitled.png)

    def index(request):
    	return render(request, 'index.html')
    
    python의function(함수)로
    사용자의 request(요청)라는게 들어왔을 때
    
    반환해주는게 render(보여주는기능)이고
    request요청에 대해 'index.html'이라는
    template을 보여주겠다 라는 의미입니다.

이제 사용자에게 준비한 template을 어떻게 보여줄지도 결정했으므로

project folder 아래에 있는 urls.py만 수정해서

(문을 열어주면) 사용자가 우리가 준비한 template을 볼 수 있게 됩니다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/67259755-4d13-4639-b711-d36bd88c5e9f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/67259755-4d13-4639-b711-d36bd88c5e9f/Untitled.png)

    from django.contrib import admin
    from django.urls import path
    import blog.views  
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('', blog.views.index , name = "index"),
    ]
    
    
    위의 색칠된 코드를 보시면
    우리가 만든 blog라는 app의 views에서 만든 index라는 기능으로
    사용자가 요청하면 일을 하게 하고 싶은데
    
    이때 기능을 사용하기 위해서는 import blog.views를 해서 들고와야합니다
    
    그리고 path() 부분을 작성하게 되는데
    '' 부분은 url(주소창에 적는 인터넷 주소)뒤에 아무것도 안 붙었을때
    
    즉 main page혹은 root page라고 불리우는 요청이 들어오면
    blog라는 app의 views안에 위치한 index라는 함수를 실행시켜주라는 의미입니다.
    
    그리고 그 뒤에 붙는 name = "index" 의 경우 우리가 나중에 django의 문법으로
    해당 url요청을 쉽게 사용할수 있게 하기 위한 애칭정도라
    생각해줍시다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/96b14a57-49d3-4fe6-b043-6ed62b94250a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/96b14a57-49d3-4fe6-b043-6ed62b94250a/Untitled.png)

    python manage.py runserver  : django webserver를 실행시키는 명령어
    
    ctrl + c로 종료한다

# Model생성과 Model의 내용을 template에 띄워주기

### 2019/11/13 수업내용

우리는 앞에서 template과 view를 이용해서

사용자에게 보여지는 부분과 view의 기능을 아주 살짝 경험했습니다.

지금부터는 model을 통해서 사용자로 부터 받는 데이터 혹은 우리가 보여주고 싶은 data들을 저장해놓고

보여주는 연습을 해보도록 합시다

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ac82f9d9-0684-43a9-aeb3-66dcf3c69398/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ac82f9d9-0684-43a9-aeb3-66dcf3c69398/Untitled.png)

    from django.db import models
    from django.utils import timezone
    # Create your models here.
    class Post(models.Model):
        title = models.TextField(max_length=30)
        body = models.TextField()
    
        create_at = models.DateField(default = timezone.now)
    
        def __str__(self):
            return self.title
    
    
    위의 코드를 보면 class Post라고 우리가 사용할 model을 하나
    생선언하고 있습니다. 이떄 뒤에 따라오는 (models.Model)은 우리의 Post
    라는 class가 Model의 역할을 할 수 있게
    model의 피를 이어 받았다고 생각해주시면 되겠습니다!
    
    그리고 밑에 오는 title,body, create_at 부분은 
    우리가 어떤 data들을 받을지 정해주는 작업입니다
    
    저는 Post라는 data꾸러미에 title이라는 정보와 body라는 정보를 담을 예정입니다.
    그리고 그것들은 각각 Text의 속성을 가지고 있기 때문에 TextFie
    
    
    def __str__(self):
    	return self.title 
    
    위의 코드는 Model안에 미리 __str__이라는 이름으로 정의되어있는 애를 덮어쓰는 코드인데
    대표적으로 보여지는 값을 self(우리가 쓴 글 하나하나)의 title로 설정해 주겠다는 코드입니다.

from django.utils import timezone

우리가 글을 작성함에 있어 언제 쓰는지 하나하나 설정하기에는 손이 많이 가므로 create_at 이라는 요소의 default 값을 설정해주려고 합니다.

그때 django가 제공해주는 간단한 꿀팁(?) 같은 util프로그램을 가져와서 
timezone.now를 통해 default값을 추가해 주는 것입니다.

그럼 이제 Data를 저장할수 있는 model을 작성했으니 컴퓨터에게 알려줍시다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2dfb8b42-4027-44a1-bcc6-c22a5fa34782/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2dfb8b42-4027-44a1-bcc6-c22a5fa34782/Untitled.png)

    python manage.py makemigrations : 우리가 만든 모델의 구조를 
    																컴퓨터가 알아들을 수 있게 번역하는 작업입니다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c16204c9-fe0e-4fb2-9f65-f2641da2fa07/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c16204c9-fe0e-4fb2-9f65-f2641da2fa07/Untitled.png)

    python manage.py migrate : 우리가 만든 모델의 구조도(migrations)를 
    													컴퓨터에게 진짜로 적용시켜 주는 과정입니다.

그럼 모델 생성을 완료했으니 이제 모델 관리를 해봅시다

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/15fb6ec7-da91-469e-8d06-239f2a9c77c3/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/15fb6ec7-da91-469e-8d06-239f2a9c77c3/Untitled.png)

    우리의 Appfolder의 내부에 있는 
    admin.py 내부에
    
    from django.contrib import admin
    from .models import Post
    # Register your models here.
    admin.site.register(Post)
    
    이와 같이 추가해줍니다.
    
    from import는 이전에 해준것처럼 가져와서 사용해주기 위해 사용했고
    admin.site.register(Post)는 Post라는 model을 admin site에 register해서
    내가 관리하겠다 라는 의미정도로 생각해 주시면 되겠습니다.
    

그럼 다시

    python manage.py runserve

Django 서버를 실행시켜 주고

아래의 admin page로 접속해봅시다

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/457e32b0-8f01-43e0-a5f2-7bbc95c34c59/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/457e32b0-8f01-43e0-a5f2-7bbc95c34c59/Untitled.png)

그러면 위와같이 /admin을  URL뒤에 붙여서 접속할 수 있는데 우리는 계정같은것을 만든 적이 없으니 만들러 갑시다.

    ctrl + c 로 서버를 꺼주시고

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8ef0c786-98c1-44b0-b1d4-da5a5c3c395b/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8ef0c786-98c1-44b0-b1d4-da5a5c3c395b/Untitled.png)

    python manage.py createsuperuser : 관리자 계정을 만드는 명령어입니다.

그럼 계정도 만들었으니 다시 admin site로 접속해서 글을 써 봅시다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/781dae41-4fd9-4aa5-b32a-dccb95c0b759/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/781dae41-4fd9-4aa5-b32a-dccb95c0b759/Untitled.png)

로그인을 하고 admin site에 있는 Post를 눌러 들어오면 위와같이 ADD POST버튼이 보이는데 해당 버튼을 눌러 우리의 글을 여러개 추가해봅시다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/77379aea-c4a7-4325-9136-0608c76d6fdb/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/77379aea-c4a7-4325-9136-0608c76d6fdb/Untitled.png)

이렇게! 준비해주시면 되겠습니다.

그럼 우리는 model의 준비가 끝났으니!!!
model을 control할 수 있다던 view로 가봅시다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/60dc5fcd-6349-4be3-aef3-22d9b310556e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/60dc5fcd-6349-4be3-aef3-22d9b310556e/Untitled.png)

    from django.shortcuts import render
    from .models import Post
    # Create your views here.
    
    def index(request):
    
        all_post = Post.objects.all()
    
        context = {'take_all_post' : all_post}
        return render(request,'index.html', context)

    from import는 가져와서 붙여주는 역할을 하고 있습니다.
    
    all_post = Post.objects.all() : 우리의 Post라는 모델에서 objects라는 것은 글 하나하나를 말하는데
    .all() 이라는 애로 전체 글을 불러와 all_post라는 것 안에 저장하는 것입니다.
    
    context = {'take_all_post' : all_post} : context라는 것은 page에 전달해주는 정보(data)정도로 생각해줍시다
    'take_all_post' 는 우리가 넘겨주는 context라는 꾸러미안에서 all_post라는 내용을 찾기위한
    라벨, 태그, 이름 정도로 생각해줍시다
    
    그리고 context로 정성스레 포장한 내용을 render의 세번째 인자로 index.html에 넘겨주고 있습니다.
    

**위와 같이 우리는 view에서 model의 내용을 불러와 template으로 전달해주는 것 까지 했습니다.**

그럼 마지막으로 template에 전달한 model의 data를 보여주도록 합시다

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5b0804dc-7e74-452c-ad18-798f9b765d86/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5b0804dc-7e74-452c-ad18-798f9b765d86/Untitled.png)

    <body>
        <h1>메인페이지입니다.</h1>
    
        {%for i in take_all_post%}
            {{i.title}}<br>
            {{i.body}}<br>
            <hr><hr>
        {% endfor %}
    
    </body>

    {% for i in take_all_post %}
    	...
    {% endfor %}
    
    위의 코드는 프로그래밍에서 반복적으로 같을 일을 수행하도록
    하는 반복문을 작성한 것인데
    i 라는 의미없는(이떄 i대신 one_post이렇게 해주셔도 됩니다!)
    all_post 내에는 우리가 지금 model에서 작성했던 전체 글을 불러와 담아놨고
    for 문이 첫번째글.. 두번째글.. 세번째글.. 하면서 all_post의 글 전체를
    방문하는 것입니다.
    그리고 그 글들 하나하나가 i라는 애에 잠시 저장되어
    for문 안에서 동작하게 되는거죠!
    
    **특히나 HTML안에서 python문법을 쓰기위해서
    우리는 {%%} 라는 장고의 템플릿 태그와 
    {%endfor%}라는 닫는 태그까지 사용해준 점**에 유의해줍시다.
    
    {{i.title}}
    {{i.body}}
    
    위의 코드에서 i는 지금 첫번째글, 두번째 글이 들어가게되는
    임시 저장소(변수)이므로 글의 title과 글의 body를 보여주고 싶어서
    i.title
    i.body라는 식으로 작성을 하였고
    
    이떄 python으로 가져오는 data이므로
    {{}} 감싸서 표현했습니다.

그리고 확인해보면 끝!

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/016b988f-88d0-40e7-8eec-bd57613fdafa/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/016b988f-88d0-40e7-8eec-bd57613fdafa/Untitled.png)

# 마치며

수고많으셨습니다!!!

하나하나 설명한다고 스크린샷과 코드 그리고 설명을 조금 달았는데 이해에 도움이 되셨는지 모르겠습니다 😥

너무 어렵다고 포기하지마시구 
**저도 처음에는 수강생 여러분들보다 더 어려워하고 이해하지 못했던 시절이 있습니다.**

제가 열심히 서포트도 하고 응원할테니

어렵거나 도움이 필요하신 사항이 있으시면 

Slack DM , 혹은 010-9406-7621 혹은 jang.chihun@gmail.com 으로 언제든지 편하게 문의주세요!

그럼 화이팅!!!!