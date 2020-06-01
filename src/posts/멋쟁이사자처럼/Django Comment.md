---
title: "Django Comment"
date: "2020-06-02"
category: ['멋쟁이사자처럼','Django']
draft : False
---

> 해당글은 기존에 modelForm을 기반으로 한 CRUD까지 했다고 가정을 하고 작성했습니다.
👉[CRUD를 이용한 게시판만들기](https://runchi.dev/%EB%A9%8B%EC%9F%81%EC%9D%B4%EC%82%AC%EC%9E%90%EC%B2%98%EB%9F%BC/Django%20CRUD/)

게시판 기능만 있고 댓글 기능이 없으면 공허한 외침일뿐이다. 글을 적어도 아무런 반응이 없다면 얼마나 슬픈일인가 ㅠㅠ
(여기는 댓글 기능이 있어도 댓글을 안 달아준다.)

그래서 오늘을 댓글기능을 한번 구현해보도록 하자.
들어가기에 앞서 본 글은 입문자를 대상으로 하고 있기 때문에 간단한 개념 짚고 넘어가자.

* Primary Key : 고유식별값으로 각 Data마다 부여된 unique한 값이다.(예를 들어 사람이라는 Table(Model Class)이 있으면 Primary Key는 주민등록번호가 될수있다)
* Foreign Key : 외래키라는 뜻인데 쉽게 생각하면 외부로 부터 가져온 값을 의미한다.(좀 억지스러운 예라도 들어보면 사람으로 치면 부모님의 유전자를 받아 나의 일부를 구성하고 있으르모 외래키라 할 수 있다.)

오늘 구현할 댓글기능은 **_특정글_**에 종속되어있는 *글*이라고 볼 수 있으므로 위의 FK(Foreign Key)를 가져와서 사용할 예정이다.

***


### 댓글 Model 만들기(Models.py)

```python

...

class Comment(models.Model):
    post = models.ForeignKey(Jasoseol, on_delete=models.CASCADE)
    #댓글이 달릴 글은 Jasoseol이라는 Model의 객체이므로 ForeignKey로 Jasoseol을 참조한다. 그리고 on_delete옵션은 여러가지가 있는데
    #일반적으로 CASCADE옵션을 주게되면 글이 삭제될때 FK로 참조하고있었던 댓글들도 같이 삭제가 된다.
    body = models.CharField('댓글',max_length=150)  #제일 첫번째 parameter로 '댓글'을 추가해주면 해당 field의 label값으로 body가 아닌 '댓글'이 붙게 된다.
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body
```
우리는 Model을 만들었으니
```python
python manage.py makemigrations
python manage.py migrate
```
두 명령어를 입력하며 모델의 변경사항을 반영시켜주도록하자

***

### Model Admin에 등록하기(admin.py)

```python
from .models import Jasoseol,Comment

admin.site.register(Jasoseol)
admin.site.register(Comment)
```
위와같이 Comment모델도 register해주자(이 과정은 관리자페이지에서 댓글을 확인하기 위한 용도이다.)

***

### ModelForm을 통해 댓글을 입력받을 준비하기(forms.py)

```python
class CommentForm(forms.ModelForm):

    
    class Meta:
        model = Comment
        fields = ('body',)
```
이전에 CRUD를 위해서 작성했던 model form 밑에 `Comment form class`를 저렇게 선언해주자
그런데 지금은 다른 field입력이 필요없으므로(일반적으로 댓글은 댓글 내용만 입력받는다) body만을 작성해주었다.
그리고 model = Comment를 해주는데 Comment모델을 사용하겠다 라는 것이므로... 모델을 사용하기 위해서는?
`import`도 해주도록하자

***

### CommentForm을 사용자가 입력할수있게 보여주기(views.py)

```python
def detail(request, jss_id):
    ...
    
    mycom_form = CommentForm()
    context = {'comment_form':mycom_form, 'jss':jss}
    return render(request, 'detail.html',context)
```
기존에 detail페이지의 역할은 특정글의 상세내용을 보여주는 역할이었다.
그런데 우리는 일반적으로 특정글의 상세내용을 보고 그 밑에 댓글을 다는 프로세스가 익숙하므로, detail이 해줄 역할이 하나더 늘었다.
특정글을 가져와서 보여주는 역할뿐만 아니라, 비어있는 ModelForm인 CommentForm을 만들어 사용자들이 댓글을 작성할수 있도록 하는 것이다.


***

### CommentForm HTML에 띄워주기(detail.html)

```html

 <!-- 중략 -->

 <form method="post" action="{% url 'create_comment' jss.id %}">
        {%csrf_token%}
        {{comment_form}}
        <input type="submit">
    </form>
```

model_form을 이용해서 만들어준 Comment form을 view에서 넘겨주면 template(HTML파일)에서 받아서 보여주면 되는데
입력을 받고 제출을 해서 Create기능을 해야하므로 form 태그와 input 태그를 추가해주었다.

그리고 method를 post로 했기때문에 아래에 `csrf_token` 을 추가했고 댓글 작성은 action을 현재 페이지내(detail)에서 처리 하는것이 아닌 `create_comment`라는 새로운 url요청을 보내면서 처리를 해주기 위해 action부분을 추가로 작성해주었다. 그리고 뒤에 `jss.id`를 붙여 해당 우리가 작성하고자하는 댓글이 어떤 글에 달리는 것인지를 식별할수 있도록 해주었다.

> 이렇게 하고 runserver로 실행해보면 에러가 뜨는데 그 이유는 아직 우리가 url을 만들어주지 않아서 그렇다. action뒷 부분을 잠시 제거하고 실행해보면 잘 될꺼다.

***

### create_comment url 만들기(urls.py)

```python
    # 기존 코드

    path('create_comment/<int:jss_id>', create_comment , name="create_comment")
```
이렇게 댓글 작성하려는 url요청을 받아줄 녀석을 추가해주자 그리고 `create_comment`는 아직 만들지 않았지만 views.py안에 만들어줄 것이므로 미리 `import`도 하고 사용할것이라고 적어주자


***

### create_comment 함수 만들기(views.py)

```python
def create_comment(request, jss_id):
    filled_form = CommentForm(request.POST) #post 요청으로 넘어온 form data들을 CommentForm양식에 담아서 filled_form으로 저장

    if filled_form.is_valid():    
    #정상적인 값들이 입력이 되었으면 if문 안으로 들어가서 save()작업을 할꺼고 
    #만약 유효성 검사에 실패해도 다시 입력을 받아야하므로 return redirect를 if문 밖으로 빼서 모든 경우에 detail로 돌아가게했다.
        temp_form = filled_form.save(commit=False)  
        
        #그런데 modelform이 입력받는 값은 body에 대한 값 밖에 없으므로 어떤글에 해당하는 댓글인지 아직 모른다. 
        #그래서 어떤 글인지를 지정해서 저장해야하므로 commit= False옵션을 주고 잠시 저장을 미룬다.
        # 그리고 그 저장을 미룬 상태의 값을 temp_form에 저장했다.
        temp_form.post = Jasoseol.objects.get(id = jss_id) #어디에 적힌 글인지 지정해줘야하는데 단순히 글 번호만 알려주는게 아닌
        #진짜 어떤글인지를 알려줘야한다( 단순히 숫자만을 알려주는게 아니라 진짜 어떤글인지 객체를 지정해줘야한다는 말)
        #그리고 그 객체는 우리가 넘겨받은 jss_id를 통해서 댓글을 적은 글을 찝어서 가져올수있다.
        temp_form.save() #저장!
    
    return redirect('detail', jss_id) #redirect('애칭', parameter) 해주면 google.com/1 이런식으로 뒤에 붙는 값을 지정해줄수있다.
```
***

### 저장한 댓글 보여주기 (detail.html)

```html
    {% for i in jss.comment_set.all %}

    <p>-> {{i}}</p>
    <hr>
    {%endfor%}
```
위와같이 추가해주면 detail페이지의 특정 글(`jss`)이 가진 댓글모음(`comment_set`) 전체(all)를 볼수 있고
for문을 통해서 하나하나 보여주고 잇는 모습니다.

comment model이 jss model을 FK로 참조하는데 각각의 jss가 가진 comment들은 comment_set.all 로 불러올수있다(그렇게 약속이 되어있다. comment_set을 바꿔주고 싶으면 comment model의 FK field에 related_name옵션을 주면 해당 이름으로 comment_set부분을 대체할 수 있다.)

***

### 다른방법으로 댓글을 작성하는 방법(forms.py)

```python
class CommentForm(forms.ModelForm):

    
    class Meta:
        model = Comment
        fields = ('body','post')
```

### 다른방법으로 댓글을 작성하는 방법(detail.py)

```html
  <form method="post" action="{% url 'create_comment' jss.id %}">
        {%csrf_token%}
        {%for i in comment_form%}
            {%if i.label != 'Post' %}
            {{i.label}} : {{i}}
            {%endif%}
        {%endfor%}
        <input type="hidden" name="post" value={{jss.id}}>
        <input type="submit">
    </form>
```
위에서 보면 `{{comment_form}}`으로 해주던 modelform의 rendering을 for문을 통해서 분해해서 해주고 있다.
그리고` if문`으로 i의 label을 체크해서 만약 Post를 입력받는 field의 경우에는 html에 띄우지 않고
나머지 label이 'Post'가 아닌경우에만 label과 함께 form을 띄워주자는 의미이다.

그리고 밑에 `input type="hidden"`으로 작성해준 태그는 `value를 {{jss.id}}`로 받고있기때문에 현재 페이지의 글 id가 사용자에게는 보이지않는 hidden으로 들어가있고, 넘겨주는 name은 field이름인 post로 넘겨주고 있다.

### 다른 방법으로 댓글을 작성하는 방법(views.py)

```python
def create_comment(request, jss_id):
    filled_form = CommentForm(request.POST) 

    if filled_form.is_valid():
        filled_form.save()
    
    return redirect('detail', jss_id)
```
`CommentForm`에는 post를 입력받는 field또한 생성되어있는데 `request.POST`로 넘어오는 data에는 우리가 인위적으로 만들어준
`input hidden tag의 name = post` 인 값도 포함되어있따.
그리고` name=post`로 해줬기때문에 CommentForm은 이를 사용자가 입력한 data라고 인식을 하게 되고 `is_valid`검사후에 바로 save를 해줄수 있는 것이다.



***

## 댓글 삭제기능 구현하기

### 댓글 삭제 버튼 만들기(detail.html)

```html
    {% for i in jss.comment_set.all %}

    <p>-> {{i}} <a href="{% url 'delete_comment' i.id jss.id %}">삭제</a></p>
    <hr>
    {%endfor%}
```
댓글을 listing해주던 for문 안에 각 댓글별로 삭제할수있는 버튼을 만들어주자
buttun 태그가 아니긴 하지만 각 댓글을 form으로 감싸 button을 만들어 post로 요청할수도 있겠지만, 어떤 data를 주고 받는 것이 아닌 지우는 행위만 하면 되므로 get 요청을 보내는 anchor 태그로 만들어 줬다.

그리고 눈여겨 볼것은 delete_comment 뒤에 i.id 와 jss.id 두개의 parameter를 추가해줬다. 지금까지 1개의 param만 추가해주던 것과 비교해서 보자.

i.id는 삭제할 댓글의 id를 알기위해, jss.id는 삭제하고 다시 detail page로 가기 위함이다.


***

### 댓글 삭제 url 작성하기(urls.py)

```python
    path('delete_comment/<int:com_id>/<int:jss_id>',delete_comment , name="delete_comment"),
```
위에서 param을 2개를 넘겨주고 있으므로 path_converter도 2개로 받아주면 되겠다.

***

### 댓글 삭제 함수 만들기(views.py)

```python
def delete_comment(request, com_id,jss_id):
    mycom = Comment.objects.get(id = com_id)
    mycom.delete()
    return redirect('detail', jss_id)
```
댓글 삭제 기능은 delete 메서드를 통해서 비교적 간단하게 구현할수있다.
전달받은 com_id값으로 삭제할 특정 comment 객체를 가져오고 `delete()`를 이용해서 삭제해준다음 jss_id를 이용해 다식므 detail page로 찾아간다.

> 🔒그런데 실제로는 이렇게 간단하게 삭제하면 안된다. 지금은 누구나 댓글을 적을수 있고 누구나 댓글을 삭제할수 있으며 단순히 주소창에 url을 입력하는 것만으로도 삭제할수 있다. 따라서 실 서비스에서 댓글삭제와 같은 부분을 구현하기 위해서는 요청을 하는 user와 댓글 작성자가 같은지 확인해주거나 post요청으로만 삭제할수 있게하는 등 여러 부분들이 보완되어야 할것이다.


> 댓글 수정은.. 굳이.. 안하겠습니다 짧은글인만큼 삭제하고.. 다시 댓글 작성합시다 
> 대신 대댓글까지 한번 해보도록 합시다

***

## 대댓글 기능 구현하기

### 대댓글 모델 만들기(models.py)

```python
class ReComment(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    body = models.CharField('대댓글',max_length=150)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body
```
대댓글은 특정 글이아닌 **특정 댓글**에 종속되어야 하므로 FK를 글이 아닌 Comment로 해서 참조하고있습니다.
그리고 `makemigrations`과` migrate`를 해줍시다.

***

### 대댓글 form만들기(forms.py)

```python
class ReCommentForm(forms.ModelForm):

    
    class Meta:
        model = ReComment
        fields = ('body','comment')
```
Recomment모델을 사용하고 있으니 위에 import도 해줍시다. 그리고 modelform에 한번에 comment field까지 만들어줍시다.
(위에 댓글작성 2번 방법임)

***

### 대댓글 form 넘겨주기(views.py)

```python
#detail 함수
    mycom_form = CommentForm()
    myrecom_form = ReCommentForm()
    context = {'comment_form':mycom_form, 'jss':jss,'recomment_form':myrecom_form}
    return render(request, 'detail.html',context)
```
detail함수에서 넘겨주는 form에 Recomment(대댓글) form도 추가해서 context로 넘겨줍시다


***

### 대댓글 작성하는 form보여주기(detail.html)

```html
    {% for i in jss.comment_set.all %}

    <p>-> {{i}} <a href="{% url 'delete_comment' i.id jss.id %}">삭제</a></p>
 
        <form method="post" action="{% url 'create_recomment' jss.id %}">
            {%csrf_token%}
            {%for recom_form in recomment_form%}
                {%if recom_form.label != 'Comment' %}
                {{recom_form.label}} : {{recom_form}}
                {%endif%}
            {%endfor%}
            <input type="hidden" name="comment" value={{i.id}}>
            <input type="submit">
        </form>
     
    <hr>
    {%endfor%}
```

다소 복잡해보일수도 있는데 차근차근 보면 comment와 거의 같은 프로세스이다.
create_recomment라는 새로운 url 요청을 보내주고, 이때 `jss.id`를 param으로 넘겨주는 이유는 `comment_id`는 우리가` hidden input`의 value로 form에 담아서 제출하고있기때문에 대댓을 작성한후에 다시금 `redirect`시켜줄 위치, 즉 글의 id값만 넘겨주고 있는 것이다.

그리고 comment작성할때와 마찬가지로 label이 Comment인 field를 제외하고 model form을 랜더링 해주고, hidden tag의 name를 comment로 지정해줘 마치 사용자가 모델폼에 comment.id를 입력한것처럼 fake를 써주고 있다.


***

### 대댓글 생성요청 url작성해주기(urls.py)

```python
    path('create_recomment/<int:jss_id>',create_recomment , name="create_recomment"),

```
물론 이때도 views에서 create_recomment라는 함수를 쓸 예정이므로 미리 위에다가 import해주도록 하자

***

### 대댓글 생성하는 함수 작성하기(views.py)

```python
def create_recomment(request, jss_id):
    filled_form = ReCommentForm(request.POST) 

    if filled_form.is_valid():
        filled_form.save()
    
    return redirect('detail', jss_id)
```
modelform으로 넘겨받을때 input hidden으로 comment_id로 채워서 받아주고 있으므로 valid검사를 해준후에 바로 저장을 해주면 된다.

***

### 대댓글 보여주는 부분 작성하기(detail.html)

```html
 <p>-> {{i}} <a href="{% url 'delete_comment' i.id jss.id %}">삭제</a></p>
 
        <form method="post" action="{% url 'create_recomment' jss.id %}">
            {%csrf_token%}
            {%for recom_form in recomment_form%}
                {%if recom_form.label != 'Comment' %}
                {{recom_form.label}} : {{recom_form}}
                {%endif%}
            {%endfor%}
            <input type="hidden" name="comment" value={{i.id}}>
            <input type="submit">
        </form>
        <!-- 이부분 추가함 -->
        {%for recom in i.recomment_set.all%}
        ↪{{recom}}<br>
        {%endfor%}
        <!--여기 이부분  -->
    <hr>
    {%endfor%}
```

**recomment과 comment의 가장 큰 차이점**은 comment의 경우 글당 1개가 있기때문에 입력 form도 글당 1개만 있으면 되었던 반면 대댓글의 경우 댓글마다 종속되어있으므로 댓글마다 대댓입력 form이 생성되고(이부분은 나중에 JS를 쓰게 되면 효율적으로 할수있다.)대댓글을 리스팅하는 부분또한 댓글 1개마다 생성이 존재해야한다

따라서 가장 큰 for문(댓글모음을 순회하면서 리스팅해주는)안에서 작은 for문(해당 댓글의 대댓글 모음을 리스팅)이 동작하면서 댓글과 그 밑에 딸린 대댓글을 보여주고 있는 구조이다.


> 🙂 지금은 모든 댓글의 form이 보이고 대댓글또한 보이고 있는데 우리가 일반적으로 사용하는 서비스들을 생각해보면 대댓글쓰기, 대댓글보기 와 같은 버튼을 따로 만들어 필요할때만 띄워서 사용하고 숨기는 경우가 많다. 이러한 부분은 JS와 CSS를 조금더 공부하면 구현할 수 있다.

대댓글의 구현또한 댓글과 크게 다르지는 않지만, 종속되는 대상이 글이 아닌 comment라는 차이가 있다는 것을 유의하면서 delete또한 비슷한 방법으로 구현하면 된다.


#### 지금은 댓글모델의 FK를 글만 참조하여 작성했지만, FK Field를 하나 더 만들어 User Model을 참조하게 되면 댓글의 작성자또한 나타낼 수도 있다. 화이팅!!!🔥🔥🔥
