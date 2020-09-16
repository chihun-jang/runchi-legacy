---
title: 'Django CRUD'
date: '2019-05-12'
category: ['멋쟁이사자처럼']
draft: False
---

### Django CRUD

저만의 흐름으로 기초적인 CRUD의 뼈대를 작성해 나가도록 하겠습니다

---

### C (create)

1. 글쓰기를 위한 버튼 만들기 (index.html)

```html
<!-- index.html 내 코드 -->

<h1>메인페이지입니다</h1>
<a href="{%url 'posting' %}"><h3>글쓰기</h3> </a>

<!-- 메인페이지에서 글쓰기를 하고싶어서 글쓰기라는 글자와 함께 글쓰기 페이지로 갈 수 있게 링크를 걸어줍니다.-->
<!-- 글쓰기를 메인페이지에서 진행할수 있지만 편의를 위해 새로운 글쓰기 페이지를 만들어서 진행합니다-->
<!-- 그리고 그 작업을 처리하는 url의 애칭을 posting으로 해줄 거라고 미리 생각해 둡니다-->
```

2. url요청에 대해 처리해주기(urls.py)

```python
path('posting/',views.posting, name="posting")

#우리가 href를 통해서 posting이라는 url요청을 해주게 되므로 해당 url이 들어왔을때 처리할 url을 만들어주자
# view는 아직 만들지 않았지만 blog views 안에서 posting이라는 함수를 통해 글쓰기 처리를 할것이므로 미리 적어줍니다. 그리고 애칭은 posting
```

3. url요청이 들어왔을때 실행될 views작성해주기 (views.py)

```python
def posting(request):

    #글쓰기 관련된 어떤 내용을 넣어줄 것입니다.

    return render(request,'new.html') #일단 기본적으로 new라는 페이지를 보여주는 return 값을 작성해줍시다.
```

4.  views의 new함수가 처리해줄 new.html templates준비하기 (new.html 생성)

```html
<body>
    <form method="POST">
        {%csrf_token%}

        <!--암호화를 시켜서 넘겨주기 위해 보이지 않는 token을 같이 넘겨줘야한다-->
        <!--저렇게 적어주면 Django가 token을 같이 넘겨준다-->
        <!-- form의 형태가 들어올 자리입니다 -->
        <!-- 원래는 <input type=text name=mytext > -->
        <!-- 이런 애들이 와야하지만 Django에서 제공해주는 ModelForm이라는 것을 이용해서 -->
        <!-- 간편하게 Form을 모델과 연결지어 사용해줄 수 있습니다. -->

        <input type="submit" value="작성" />
        <!-- submit의 value값을 작성으로 해준이유는 버튼이 작성이라는 이름으로 보여지게 하기 위함입니다.-->
    </form>
</body>

<!-- 우리는 글을 작성할때 <form> 태그를 이용해서 다른 페이지로 제출을 해줘야 합니다.
그런데 이때 method를 POST로 해주는 이유는 우리의 글이 길수도 있고, 암호화 되어
넘어갔으면 좋겠다는 이유에서 POST로 해줬습니다. 그리고 action을 따로 처리해주지 않은 것은 현재 url에서 action을 해주겠다는 의미입니다. -->
```

5. 모델폼을 준비해주러 가기(blog(앱 폴더) - forms.py 만들어주기)

```python
from django import forms    #장고가 제공하는 forms 모듈을 가져와서 사용해줍니다
from .models import Blog    #ModelForm을 만들어 주기위해 작성에 사용할 Model도 가져와서 사용해줍시다

class BlogForm(forms.ModelForm):  #ModelForm클래스 이름을 지어주고 forms안에 잇는 ModelForm을 가져와 상속해준다

    class Meta:                   #Meta라는 의미는 대표하는 특징 이런의미로 간단하게 이해하고 넘어가자
                                            #우리가 만들어주는 클래스의 특징을 여기에 규정해준다
        model = Blog              #일단 폼을 만들어줄 대상 모델이 Blog임을 알려주고
        fields = ('title', 'body', )     # 그 모델 안에 있는 field중에서 우리가 form으로 띄워주고 싶은것을 적어준다
                                    # 모델에서는 crate_data 필드가 있었지만 모델폼에서는 넣어주지않아 폼으로 안만들어주겠다라는 의미이다.
                                    #그리고 마지막에 ,로 끝나는 이유는 뒤에 추가로 붙을 애를 대비해서 적어주는 것


#우리가 정의했던 Model과 비교해서 이해해보자

from django.db import models
from django.utils import timezone

# Create your models here.

class Blog(models.Model):
    title = models.TextField(max_length=200)
    body = models.TextField()
    create_date = models.DateField(default = timezone.now)

    def __str__(self):
        return self.title
```

6. 모델폼을 사용할 준비를 마쳤으니 views를 통해서 templates에 띄워주자(views.py)

```python
from .forms import BlogForm
def posting(request):

    #글쓰기 관련된 어떤 내용을 넣어줄 것입니다.

    blogform = BlogForm()    #import해준 BlogForm class로 객체 blogform을 생성해준다.

    #생성한 blogform객체는 Blog라는 모델을 바탕으로 만들어진 form인데 해당 form객체를 이용하면 template에서 자동으로 form이 만들어진다

    return render(request,'new.html',{'blogform':blogform}) #render함수의 세번째 인자로 만들어 놓은 blogform을 new.html로 전달해준다.
```

7. views애서 넘겨준 form을 templates에서 띄워주자 (new.html)

```html
<form method="POST">
    {%csrf_token%}

    <!--암호화를 시켜서 넘겨주기 위해 보이지 않는 token을 같이 넘겨줘야한다-->
    <!--저렇게 적어주면 Django가 token을 같이 넘겨준다-->

    {{blogform}}

    <!--views에서 넘겨줬던 blogform이라는 객체를 템플릿 변수를 이용해서 띄워주면 form이 뜨게 된다-->
    <!--이때 blogform.as_p   blogform.as_table    blogform.as_ul 이런 다양한 방법으로 보여줄수 있다. -->
    <!--아무 옵션도 주지않으면 기본적으로 as_table 옵션으로 보여지게 된다. -->

    <input type="submit" value="작성" />
</form>
```

8. 그런데 지금 form은 제출을 해도 그 어떠한 일이 일어나지 않는다
   왜냐하면 views에서 띄워주기만 할뿐 저장이라던지 다른 처리가 들어가지 않았기때문이다(views.py)

```python
from django.shortcuts import render,redirect

def posting(request):
    context =dict()            #new.html로 넘겨줄 context를 먼저 빈 배열로 설정해주었다.

    if request.method == "POST":         #request 요청이 POST라는것은 사용자가 글을 작성한 후 제출요청을 보낸것
        blogform = BlogForm(request.POST)   # request.POST로 넘어오는 data를 모델폼에 담아서 생성해주고
        if blogform.is_valid():             #해당 모델폼의 유효성 검사를 해준다.
            blogform.save()                 #만약 모델폼안에 있는 data들이 유효한 값이라고 하면 save를 진행한 후 indexpage로 redirect해준다
            return redirect('index')        #redirect는 url요청을 다시 보내는 것이라고 생각하면 된다.
        else:
            context['blogform'] = blogform  #만약 유효성 검사가 실패했으면 blogform이라는 모델폼은 error도 담고있을텐데
                                            #그 blogform을 context에 'blogform'이라는 get요청을 하면 보여주는 form이랑 일치시켜 넘겨준다
    else:                                   #이렇게 하면 유효성검사에서 Error가 뜬 부분을 확인할 수 있다.
        blogform = BlogForm()               #GET요청이 오면 BlogForm()이라는 빈 모델폼을 만들어서
        context['blogform'] = blogform      #new.html로 전달해주면된다.
    return render(request,'new.html',context)  #if문이나 else문이든 둘다 조건무을 빠져나오면 new.html이라는 page에 context를 보내 render해준다.

```

이렇게 되면 우리가 넘겨준 form으로 글을 작성할수 있고 저장이 된다
그리고 index.html 페이지로 redirect가 되어 추가된 글을 확인해 볼수 있다.

---

### R (Read)

9.  index.html 페이지에서 글을 자세히 볼수있는 페이지 링크를 만들어주자(index.html)

```html
{%for i in blog_all%} <a href="{%url 'detail' i.id %}">{{i.title}}<br /></a>
<!-- 이번에는 해당 글을 자세히 볼수있는 detail page로 url을 연결시켜주는 link를 걸어보도록 하자 -->

{{i.body}}<br />
{{i.create_date}}<br />
<hr />
<hr />
{%endfor%}
```

여기서 눈여겨 봐야할것은 url 뒤에 i.id로 id값을 같이 넘겨주는것인데
우리는 뉴스 및 포스팅 된 글 들을 볼때 글을 누르게 되고 url주소에는 몇번째 글인지 확인할수 있는 id값이 따라오게 된다.

하지만 우리는 id라는 field를 따로 설정해 준적이 없었는데 이때 사용할 수 있는 이유는
id값은 autocreatefield로 만들어 지기 때문이다.

따라서 위에서는 detail이라는 url요청을 보낼때 우리가 보고싶은 글의 번호를 같이 보내준다라고 생각해주자

10. 우리가 보낸 url요청에 대해 처리해주기(urls.py)

```python
path('detail/<int:blog_id>',views.detail, name="detail"),
#detail url요청에 대해 path를 작성해주게 되는데 앞에서 detail요청과 함께 보고싶은 글 번호를 넘겨주었다

#여기서는 <int:blog_id>라는 패스 컨버터를 이용하여 url 뒤에 붙는 값을 blog_id라는 이름의 int로 받아서 처리를 해주겠다라는 의미이다

#blog_id는 글의 id라는 뜻으로 임의로 네이밍 해준 것이다.
```

11. url요청이 들어왔을때 동작할 view작성해주기 (views.py)

```python
from django.shortcuts import render,redirect,get_object_or_404 #get_object_or_404도 가져와서 사용해줘야한다

def detail(request, blog_id):           #지금까지는 함수가 request라는 요청만 인자로 받아줬는데 blog_id라는 url에서 <int:blog_id>로 넘겨준 값을 같이 받아와서 같이 처리해준다

    blog_one = get_object_or_404(Blog, id= blog_id) #get_object_or_404라는 함수를 이용해주는데 이 함수는 1개의 객체만을 가져올때 사용해주는 것이다

    # 해석을 해보면 Blog라는 모델에서 id값이 인자로 들어온 blog_id랑 같은지 확인하여 같은 값을 blog_one에 넣어주라는 말이다

    # 그런데 이때 일치하는 id값이 없거나 Blog에서 객체를 가져올수 없을때는 요청한 값을 서버에서 찾을수 없다는 404에러를 띄워준다

    # 우리가 가끔 웹사이트를 이용하다 보면 마주하게 되는 에러 중 하나이다.
    return render(request, 'detail.html', {'blog_one':blog_one})   #detail 이라는 template을 만들어서 우리가 보고싶어하는 글 1개가 담긴 객체를 넘겨주자
```

12. view가 넘겨준 data를 띄워줄 detail.html을 templates안에 만들어주고 작성해주자(detail.html)

```html
<body>
    {{blog_one.title}}<br />
    <!-- 이때 index랑 다르게{%for i in..%}을 안쓴이유는 1개의 글만 가져와서 보여주기때문에 -->
    {{blog_one.body}}<br />
    <!-- 넘어온 글 1개는 바로 title과 body를 보여줄수 있다 -->
    {{blog_one.create_date}}
    <a href="{%url 'index'%}">홈으로</a>
    <!-- deatil페이지로 들어온다음에 다시 홈으로 가고싶으므로 index라는 애칭의 url요청추가 -->
</body>
```

---

### U (update)

13. index.html에 글 수정하기 버튼을 작성해주자(index.html)

```html
{%for i in blog_all%}
<a href="{%url 'detail' i.id %}">{{i.title}}<br /></a>
{{i.body}}<br />
{{i.create_date}}<br />
<a href="{%url 'update' i.id %}">글 수정하기</a>
<!-- 이번에는 각 글 밑에 각 글을 수정할수 잇는 수정 버튼을 추가해보도록 하자-->
<hr />
<hr />
{%endfor%}
```

이때 update라는 url을 보낼것이기때문에 href를 미리 걸어주고 id값을 넘겨주는 이유는
우리가 글 하나하나에 대해서 선택을 하고 수정을 하기때문이다

따라서 전체 글이 아닌 특정 글에 대해 수정작업이 이루어 져야하므로 id값을 같이 넘겨줘야한다.

14. url 요청에 대해서 처리를 해주도록 하자 (views.py)

```python
path('update/<int:blog_id>',views.update, name="update"),

#detail과 비슷하게 update도 하나의 글에 대해서 처리를 해줘야하므로 url뒤에 blog_id로 받아주는 path converter를 적어줬다.
```

15. views 에서 처리해줄 함수를 만들어주자 (views.py)

```python
def update(request, blog_id): #detail과 같은 원리로 request뿐만 아니라 path converter로 넘겨준 id값을 update함수가 받아서 사용해준다

    context =dict()

    blog_update = get_object_or_404(Blog, id = blog_id)   #detail에서 사용했던 방법으로 1개의 객체를 가져오는 방법 으로 수정할 글을 가져와 blog_update에 저장해준다

    if request.method == "POST":
        blogform = BlogForm(request.POST,instance=blog_update)  #blog_update안에 수정해야할 글이 담겨있는데, 이를 모델폼의 instance요소로 지정해줘
                                                                #특정 글의 내용을 request.POST로 덮어쓰고 이후는 Create 의 과정과 똑같다.
        if blogform.is_valid():
            blogform.save()
            return redirect('index')
        else:
            context['blogform'] = blogform

    else:
        blogform = BlogForm(instance=blog_update)             #GET요청으로 처음에 ModelForm을 보여줄때도 수정기능이기때문에 빈 Form이 아닌
        context['blogform'] = blogform                        #instance지정으로 특정 글을 담은 modelform을 사용자들에게 보여주고 수정할 수 있게 한다.

    return render(request,'new.html',context)
```

---

### D (delete)

16. 글 삭제 버튼을 추가하기 위해 index.html로 가보자 (index.html)

```html
{%for i in blog_all%}
<a href="{%url 'detail' i.id %}">{{i.title}}<br /></a>
{{i.body}}<br />
{{i.create_date}}<br />
<a href="{%url 'update' i.id %}">글 수정하기</a>
<a href="{%url 'delete' i.id %}">글 삭제하기</a>
<!-- 글 삭제 또한 특정 글에 대해서 삭제가 이뤄져야하므로 id값을 넘겨줘서 글을 찾을수 있게 해주자-->
<hr />
<hr />
{%endfor%}
```

17. url요청에 대해서 처리를 해주도록 하자( urls.py)

```python
path('delete/<int:blog_id>', views.delete, name="delete"),
#delete도 특정 글에 대해서 이뤄져야하므로 path converter를 이용해 우리가 삭제하고 싶은 글의 번호를 전해주도록 하자
```

그런데 여기서 주의해야 할게 지금은 우리가 CRUD의 기초적인 내용을 하기때문에
이렇게 단순화 하여 작성을 해주지만 실제로 이러한 방식으로 CRUD를 작성해주게되면
D의 경우 해당 url을 주소창에 입력하고 글번호만 입력하면 자동으로 url요청이 들어가 글이 삭제되므로 아주아주아주 위험할수 있다.

따라서 우리가 이를 실사용 하기위해서는 추가적인 작업이 더 필요함을 알고 있자.

18. view에서 delete처리를 해주도록 하자( views.py)

```python
def delete(request,blog_id):        #삭제를 하기 위해서는 특정 글의 id를 받아와서 처리해줘야한다
    blog_delete = get_object_or_404(Blog, id= blog_id)      #한개의 글만 특정하여 삭제해주고 싶으므로 get_object_or_404를 이용해 삭제하고 싶은 글의 객체를 만들어준다
    blog_delete.delete()                                    #객체가 이미 가지고 있는 method중에 delete라는 method를 이용하여 객체를 삭제해주자
    return redirect('index')                                #삭제한 후에는 index로 url요청을 보내 메인페이지를 띄워줘 삭제된 것을 확인해주자
```

이렇게 기초적인 CRUD의 동작에 대해 알아봤습니다

-끝-
