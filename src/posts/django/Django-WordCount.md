---
title: "Django Wordcount"
date: "2019-04-27"
category: ['멋쟁이사자처럼','Django']
draft : False
---


지금부터는 본격적으로 단어 계산기를 만들어 봅시다

```html
<body>
<h1>메인페이지&단어계산기</h1>
<form method="GET" action="{%url 'count'%}">
<textarea name="mydata" cols="30" rows="30">    <!--cols 와 rows는 textarea 의 크기를 조정해주기 위해-->
</textarea>
<input type="submit" value="세어줘요!">    <!-- input type submit은 내가 해당 form을 제출하는 버튼을 생성. value는 버튼의 이름을 지어줌-->
</form>
</body>
<!--우리는 단어계산이라는 추가기능을 넣어주고 싶으니 index.html로 돌아가서 조금 수정을 해주도록 하겠습니다.

<body>태그 내에 <form>태그를 새로 추가 해줍시다
-->
```
***

<form> 태그의 속성에 대해서는 조금 설명을 하고 넘어가도록 할께요

> \<form method="GET" action="{%url 'count'%}">

`GET` ? `POST` ?

우리가 서버에 요청을 보낼때 (request 메세지를 보낼떄) 여러 방법으로 보내게 됩니다.
그중 대표적인게 `GET` 과 `POST`인데요

1. URL 입력상자에서 URL입력    - ` GET`
2. 폼 데이터의 submit  (get 의 경우 URI?querystring 형태, 짧은내용)   `GET` & `POST` 가능
3. 하이퍼링크 클릭    - `GET`
이런 경우에 이런 방법을 사용하고 있습니다.

풀어 설명을 해보면
우리가 포털에서 검색을 하면 주소창 뒤에 `?search .. q= 검색한 내용`이 오는 것을 알수 있습니다.
이는 GET방식으로 `request요청`을 한 것입니다.

이처럼 GET방식은 외부에 노출이 되므로 보안상으로 취약합니다.
뿐만아니라 크기가 큰 data는 GET방식으로 요청할수 없습니다.

POST는 반면 **_로그인, 외부로 노출되기 싫은 data의 전송, 크기가 큰 data의 전송 등에 사용할수 있습니다_**( 당장 여러 사이트의 login페이지에 가서 F12를 통해 login을 둘러싼 form을 보면 POST method를 사용하고 있는것을 알수 있습니다)

우리는 일단 GET의 방식으로 작성한 form을 제출하도록 해보겠습니다
(POST는 마지막에 설명할께요)

***

> `action` ?
action은 우리가 form으로 보낸 data가 **어디서 처리되었으면 좋겠는지 경로**를 정해주는 겁니다.

위의 예시에서는  `url 'count'`라는 애가 있는데요
종전에 우리가 프로젝트의 `urls.py`에서 애칭이라고 지어준 이름을 이용해 이처럼 간단하게 사용할수 있습니다
(지금은 `count`라는 애칭을 짓지 않았지만 나중에 지을꺼라서 미리 사용했습니다)


> {% %} ??  `{{ }}` ??

위의 두 문법은 장고의 탬플릿 태그와 탬플릿 변수입니다.

* {% %}는 HTML아 지금부터 내가 적는것은 django문법이야 그러니 장고로 처리해줘

* `{{ }}` HTML아 얘는 그냥 문자가 아니고 django에서 사용하는 변수니까 걔를 보여줘


> 주의! action="{%url 'count' %}" 에서 쌍따옴표 홑따옴표가 같이 사용되었는데

action도 따옴표로 감싼 형태를 사용하고 url로 불러오는 애칭도 문자열이기때문에
이처럼 **두개를 구분해서 사용**해야지 둘다 정상적인 문자로 인식을 할 수 있습니다.

***

```html
<textarea name="mydata" cols="30" rows="30">
```
설명이 너무 길어지고 있지만 얘도 설명을 하고 넘어가겠습니다 ㅠㅠ
우리는 form문의 input태그들 내에서 name을 저렇게 설정해 줄 수 있는데
왜 name을 설정해 주냐면
우리가 보내는 **data에 이름표를 붙여주는 것**입니다.
그럼 나중에 **request로 보내지는 data들 속에서 우리가 작성한 textarea의 text를 식별하고 꺼내올수 있게 되는 거에요**

***

그럼 다시 단어 계산기를 만들어 봅시다

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index , name="index"),
    path('count/', views.count, name="count"),
]
```
프로젝트의 `urls.py`로 가서 우리가 지어준 애칭 `count`에 해당하는 `path`를 추가해줍시다.

지금 당장은 `views` 안에 `count`라는 함수가 없지만
우리는 곧 만들것이므로 `views.count`라는 애가
count/ 라는 url요청이 들어오거나 count라는 애칭이 불리면 동작하도록 합시다.

```python
def count(request):
    a = request.GET['mydata'] #아까 우리가 form을 제출하며 전송되는 data들 중에서 'mydata'라는
                        #이름을 가진 data를 가져와서 a라는 변수에 저장해 줍니다.
    b = a.split(" ")    #얘는 파이썬 문법입니다(~~.py안에서 작성된것은 모두 파이썬)
                        #a라는 변수에는 지금 우리가 index.html에서 textarea에 적은 내용이 있습니다.
                        #그 문자열을 띄어쓰기 하나를 기준으로 나누어 list의 형태로 b라는 변수에 저장해줍니다
    c = {}              #단어를 세어주기위해 { 단어1 : 단어1갯수 , 단어2 : 단어2갯수 , 단어3 : 단어3갯수 }이런 형태가 가장 적합하므로
                        #빈 dictionary를 하나 선언해줍니다.

    for i in b:         #지금 b에는 ['안녕하세요','제','이름은','안녕하세요','입니다'] 라는 애가 들어와있슴다  i는 list의 원소를 차례대로 돌아갑니다.

        if i in c:       #만약 i가 c안에 key값으로 이미 있다(==단어를 센적이 있다)
            c[i] += 1    #{'안녕' : 1} 이렇게 있을 단어의 value값에 +1을 해줍니다.

        else:              #i가 dict안에 없다 ==> 단어를 처음 세었다
            c[i] = 1        #{'안녕' : 1, '제이름은' : !} 이렇게 단어와 함꼐 단어의 갯수가 1이라고 key와 value를 추가해줍니다.

    context = {'sendtext' : a, 'splittext': b , 'countdict': c , 'count_item': c.items}
    #context는 page간에 이동하는 data를 context라고 부른다    
    #그리고 django에서 context는 dictionary의 형태로 사용을 해준다

    #위의 context는 우리가 views의 사용에 대해 이해하기 위해 모든 변수들을 각기 다른 key값으로 context에  담아줬다.

    #그리고 c.items 라는 것은 dictionary의 items라는 함수를 사용한것인데 

    #{'안녕' : 1, '해피' : 2} 이런 dictionary를  [('안녕' : 1 ), ('해피' : 2)] 이런식으로 tuple의 형태로 잘라주는 역할을 한다

    #이렇게 사용해주는 이유는 HTMl에서 Django문법으로 mydict[key] 이런식으로 value값을 불러올수 없기때문에

    #애당초 key와 value를 쌍으로 묶어서 보내버리는 것이다.     (사용의 편의성을 위해)

    return render(request,'index.html',context)   #그리고 넘겨줄 데이터 뭉치 context를 render함수의 세번째 인자로 넣어줘 index.html에 넘겨준다

    #이부분에 다른 HTML파일을 입력하면 해당 HTML파일로 context가 넘어간다.

```

그리고 대망의 `views.py`의 코드 작성인데요
views.py의 count함수가 단어를 세는 연산을 하게 되므로 해당 코드를 작성해 줍시다

각 line별로 주석을 달아 설명을 해놓았으니 천천히 읽으면서 내용에 대해 이해하려 해보세요

그런데! 이때 a,b,c 나 sendtext 와 같은 **dictionary의 key값은 마음대로 naming**해주셔도 괜찮습니다.

***

```html
<body>

<h1>메인페이지&단어계산기</h1>

<form method="GET" action="{%url 'count'%}">

<textarea name="mydata" cols="30" rows="30">    <!--cols 와 rows는 textarea 의 크기를 조정해주기 위해-->
</textarea>

<input type="submit" value="세어줘요!">    <!-- input type submit은 내가 해당 form을 제출하는 버튼을 생성. value는 버튼의 이름을 지어줌-->

</form>

{{sendtext}}       <!--우리가 views.py에서 보낸 context안에 sendtext라는 key값으로 text원문을 불러온다-->
{{splittext}}      <!--context안의 splittext라는 key로 단어별로 분리된 list를 보여준다-->
{{countdict}}      <!--count한 dictionary를 그대로 보여준다.-->

{%for k,v in count_item%}   <!-- count_item은 지금 [(단어,횟수) , (단어2,횟수)] 이런식으로 되어있는데 for문을 통해서 전부다 출력-->

<!-- 그리고 k,v는 마음대로 지어준 변수(정확히 변수는 아니지만)이름인데 k는 단어, v는 횟수를 가리킨다-->

단어 : {{k}} --- 횟수 : {{v}}<br>   <!--그리고 그 k와 v라는 변수들을 템플릿 변수로 출력해준다. <br>은 좀더 이쁘게 보여주기 위한 줄바꿈-->

{%endfor%}                 <!--endfor가 오는 이유는 HTML아 여기까지 for문이 끝났다라고 알려주는것, 안알려주면 멍청한 HTML이 for문 끝난줄 모름-->
</body>
```

우리가 `views`에서 context를 `index.html`로 넘겨줬기 때문에 `index.html`로 넘어와서 이처럼 작성을 해주자

그럼 우리가 `textarea`를 통해 `submit`한 data가 `view`에서 가공 되고
그 가공된 data들이 다시금 `index.html`로 와서 `rendering`되는 것을 알수 있다.

지금은 디자인을 하지 않아서 이쁘지 않지만 중간중간 HTML tag와 CSS를 반영해주면
이쁜 결과물을 얻을 수 있다.

지금은 이해를 위해 모든 context의 key를 보여주고 있지만 선택적으로 보여줘도 무방하고
`{{ }}` 로 둘러싼 애가 존재하지 않으면 그저 랜더링 되지 않을뿐 에러가 발생하지는 않는다.


***

> POST를 이용해 넘겨주는 법
```html
<!--<templates - index.html수정>-->

<form method="POST" action="{%url 'count'%}">


{%csrf_token%}

<!-- CSRF TOKEN이라는 것은 악의적인 목적을 가진 사용자가 csrf 공격을 하는것을 방지하기위해
암호화된 token을 우리가 작성한 form과 함께 숨겨주는 것이다

그리고 이를 받는 서버는 이게 암호화된 form이라는 것을 확인하고 안전하게 사용한다.
따라서 우리는 POST방식으로 보내게 될때는 항상 csrf_token을 같이 보내줘야한다는 것을 잊지말자. -->
```

```python
#<views.py - count함수 수정>

def count(request):
    a = request.POST['mydata'] #아까 우리가 form을 제출하며 전송되는 data들 중에서 'mydata'라는

#request.GET에서 GET이 POST로 바뀌었다.
```

***