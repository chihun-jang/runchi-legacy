---
title: "멋쟁이사자처럼 강의자료 - html5"
date: "2019-03-28"
category: ['멋쟁이사자처럼']
draft : False
---

> 멋쟁이사자처럼 강의 보조자료 CSS

CSS 와 BootStrap

안녕하세요 여러분!!!!!😁😁😁
오늘은 CSS랑 Bootstrap 이라는 프레임워크에 대해서 공부를 해보겠습니다


### CSS?

CSS는 HTML로 작성된 문서에 디자인을 입혀주는 역할을 합니다.
그럼 바로 사용방법에 대해서 알아보도록 하겠습니다.

1. HTML파일 내부에 CSS코드 작성

```html
<head>
     <style>
이곳에 CSS가 들어갑니다
     </style>
</head>
```

> HTML파일 내에 CSS를 작성하는 방법은 좋은 방법이 아닙니다. 분리를 해서 관리해주는 것이 좋습니다.

2. HTML태그의 속성값으로 style지정

```html
<div style="height:30"></div>
```

>하지만 위의 코드는 가독성이 안 좋을 뿐만아니라 생산성측면에서도 좋지 않으므로 지양합니다
>더군다나 HTML문서는 의미만을 지니는 문서로 분리되는 것이 좋습니다.

⭐3. html파일이 아닌 외부에 `style.css` 파일을 만들어 외부에서 참조해주자

```html
<head>
<link rel="stylesheet" type="text/css" href="/css/style.css" />
</head>
```
style.css 파일 내부

```css
div{
}
#id{
}
.class{
}
```

확장자가 css인 파일을 만들어 `<link>` 태그를 이용해 참조해주면 사용할 수 있다.

* `rel` : 연결문서와의 관계 표시(연결문서가 스타일시트이다)

* `type` : 웹의 내용 유형이라고 생각하자(href가 설정될때만 사용) (css의 경우 text/css , js의 경우 text/javascript)

* `href` : 연결할 곳의 주소(파일 경로 및 인터넷 주소(URL)이 올수 있다



### CSS의 작성

참고로 외부 CSS 파일을 만들때에는 `<style> `태그로 안 감싸고 **선택자와 코드**만 입력해주면 된다.

CSS의 문법(?)은 비교적 쉽다. 
하지만 **선택자**라는 것이 등장하여 헷갈리는 부분이 있으므로 선택자에 대해 알아보자

```html
<style>
    div{
        border:1px solid black;
        height:200px;
    }

    #unique_id{
        background:green;
    }

    .many_class{
        border-radius:20px;
    }
</style>
<body>
<div id= "unique_id" class = "many_class" style="height:30"></div>
```

이해를 돕기위해 간단하게 HTML `head`부분에 CSS를 작성하는 방법으로 설명하겠습니다.
선택자라는 것은 우리가 어떤 것을 꾸밀지 선택해주는 애라고 생각하면 되는데

위의 예를 보면 총 3가지의 방법이 존재합니다.

1. `tag` 종류에 따른 선택자 (개인적으로 많이 사용하지 않습니다)

` div{} `는 `div tag`로 이루어진 부분을 다 꾸며주겠다 라는 의미인데
`input{} p{} body{}`등과 같이 특정 종류의 태그를 다~ 꾸미고 싶을때 사용한다

`*`는 전체를 의미하는데  `*{}`해주면 전체 태근ㄴ에 같은 디자인을 입힐수 있다.

2. `id` 값을 이용한 선택자

`id`값을 가져와 선택자로 사용할때는 `#`을 붙여주면 되는데
이때의 **_id값은 우리가 tag에 붙여준 고유이름으로 다른 tag에 ⭐중복된 이름이 없는 경우⭐_**이다
보통 id값을 사용하는 경우는 하나하나 애들을 꾸미고 싶을때 `#idname{}`을 이용하여 꾸며준다


3. `class` 값을 이용한 선택자
`class`는 id와 다르게 **_여러 태그_**에 사용할수 있는 이름으로
`<div class ="myclass">`   `<button class ="myclass">` 이런 태그가 있을때
`.myclass{}` 를 이용하여 디자인을 해주면 `div` 와 `button `태그에 동일하게 디자인이 적용된다


만약 `<div class="" id="">` 의 태그를 여러군데에서 호출해서 사용할때
강력한 순서는 `id > class > tagname` 순서이다. id선택자로 디자인은 입힌게 가장 강력하다

그리고 같은 선택자로 다른 디자인을 먹인경우 **__늦게 적은 코드가 나타난다.__**


#### 💬복수의 선택자 이용

` #myid , .myclass, .myclass2 {} `이렇게 쉼표로 구분해주면 여러개의 선택자에 대해 동일한 디자인을 해줄 수 있다.
(공통적으로 디자인이 들어가야할 부분에 설정을 해주면 좋다)


#### 💬하위 선택자 선택

예를 들어 일반적으로 `<ol> <li> .... </li> </ol>` 이라는 태그와 `<ul> <li> .... </li> </ul>`이 있을때 우리가 ol에 있는 li 만 디자인을 해주고 싶으면

`ol > li {}` 이런식으로 선택자를 적어주면 ol 태그 밑에 있는 li만을 선택해 올 수 있다.


#### (개인적으로) 많이 사용 하는 태그들

다 외우실 필요없습니다
필요한 기능 및 디자인이 있는데 생각이 안나면
google에 키워드로 검색해서 사용하면 됩니다

> ex) CSS vertical text align, CSS box shadow

```css
div {
/*
    CSS에서의 주석표현입니다
    여러줄 주석 가능 
    그리고 CSS는 기본적으로 속성들 사이에 ;를 적어서 구분한다*/

/*배경 색깔 지정*/
background: blue;     
background: #aaaaaa;  /*색깔 이름 입력 및 HEX코드로 작성*/

/*해당 선택자의 넓이 지정*/
width: 2000px;          /*길이를 나타내는 단위중 px는 픽셀값으로 환경에 상관없이 고정된 값이다*/
width: 50%;             /*%단위는 해당 태그가 위치하고 있는 상위 영역의 넓이 혹은 높이를 기준으로 가져온다 반응형 만들때 주로 쓴다*/
width: 1rem;            /*1rem은 기본적으로 16px을 기준으로 한다.*/

/*높이 지정*/
height: 100px;          

/*display는 해당 태그가 보여지는 형태를 다룬다*/

display: none;          /*none속성은 해당 태그로 감싼부분이 없는것 처럼 페이지를 띄운다*/
display: block;         /*block은 1개의 line에 1개의 태그만 위치하도록 한다(div의 기본속성) + 그리고 margin,width,height설정가능*/

display: inline;        /*inline은 1개의 line에 여러개의 태그가 위치하도록 한다(span의 기본속성) + margin,width,height설정 불가*/
display: inline-block;  /*inline-block은 1개의 라인에 여러개의 block이 올수 있는 것으로 width와 height설정이 가능해 디자인시 자주 사용*/


/*태그가 차지하고 있는 공간(box)관련*/
border:1px solid black;  /*box의 테두리를 그려준다. 굵기, 선종류, 선색깔을 설정하며 순서는 바뀌어도 상관없다.*/
border-radius: 10px;       /*box의 테두리에 곡률을 넣어줄 수 있다.*/

/*폰트 관련 태그*/
font-family: 'Courier New', Courier, monospace; /*font설정을 하는데 해당 폰트가 없으면 ,뒤의 폰트들을 찾아 설정한다*/
font-weight: bold;         /*글자의 굵기를 설정한다 bold를 기본적으로 많이 쓰지만 100단위로 숫자를 설정하여 굵기 조정한다(아마 800이 bold)*/
font-size :1rem;           /*글자 크기를 지정한다*/
color: yellow;           /*글자 색상을 지정*/


/*box의 테두리 기준으로 바깥부분인 margin설정*/
margin: 1px 2px 3px 4px;    /*순서대로 위 오른쪽 아래 왼쪽 방향의 margin나타냄 margin값을 안주고 싶으면 0 을 적어줘야함*/
margin: 10% 4%;             /*위+아래 , 좌+우 순서로 설정*/
margin: 5px;                /*네 방향 모두 설정*/

margin-top: 1px;            /*이처럼 특정 방향을 명시적으로 설정해줄 수도 있다.*/
margin-left:1px;           

/*box의 테두리 기준 내부 영역 padding설정*/
padding: 1px;    

/*태그 내의 text를 가운데 정렬함*/
text-align: center;

/*띄운다는 의미처럼 해당 태그를 문서상에 붕 띄워서 해당 방향으로 위치시키고 싶을때 사용*/
float: left;  /*개인적으로 float left는 listing되는 것들이 왼쪽에서 부터 차례로 정렬 되게 하기 위해 사용 조금 어렵게 얘기를 하면 이후에 나타나는 것과 비교해서 left에 위치한다고 생각해주자*/
clear: both;  /*해당 속성을 가진 tag를 기준으로 float을 끊는다고 생각하면 된다 따라서 box들 사이에 float을 끊고 싶으면 <div class="clear_class"> 이렇게 태그만 만들어 clear속성을 이용할수 있디. */

overflow: scroll; /*정해진 범위를 넘어가는 내용에 대하여 scroll처리함*/
}
```



### CSS초기화 코드
```css
* {
margin: 0 auto;
padding: 0;
}
a {
text-decoration: none;
}
```

> CSS초기화 코드란
디자인을 시작하기에 앞서 정돈해준다고 생각해주자 margin: 0 과 auto를 이용해 모든 요소들의 위아래 마진은 없고 가운데 정렬이 되며 a{ text-decoration : none;} 으로 a 링크를 생성하면 기본적으로 설정되는 파란 글자색이 안 걸리게 된다.

그런데 bootstrap같은 프레임워크를 가져와 사용하거나 특정 디자인을 가져와 사용하는 경우 *{} 이런 전체태그가 영향을 미칠수 있기 때문에 a{}태그 정도만 사용해주자

### 🍕🍕Media Query (반응형웹 처리하기)
```css
@media screen and (min-width:769px){
/*최소 너비 769이상일때 작동(태블릿 및 데스크탑 디자인)*/
}

@media screen and (max-width:768px){
/*최대 너비 768px까지 동작 */
}
```

이처럼 특정 범위를 지정하여 미디어 쿼리를 작성하게 되면 해당 범위 내에서만 CSS가 동작하게 된다.
따라서 범위별로 나누어 미디어 쿼리를 작성해도 되고

기본 default CSS를 작성해놓고 모바일과 같은 size에 대해서만 미디어쿼리를 작성해주는 방법을 이용할 수도 있다.


### BootStrap 이용하기

`bootstrap`은 편히 할 수 있게 template을 제공해주는 것이라고 생각하자
css에 감각이 없어도 Javascript를 알지 못해도 제공해주는 코드를 조금만 수정하면 그럴 듯한 디자인을 할 수 있지만.

bootstrap이 워낙 유명한 탓에 bootstap으로 디자인 한 site는 티가 나기 마련이고
진부한 web uiux 를 가질 수 있으므로 선택적으로 사용을 하는 자세가 필요하다

1. google 에 bootstrap검색하기
2. Get started를 눌러 들어가기
3. Introduction 밑 부분에 starter template코드를 복사하여 우리의 HTML파일에 붙여넣기
(붙여 넣은 다음 <title>이랑 <body>에 원하는 내용으로 수정해주고 <meta>태그도 추가할것이 있으면 추가해주자

그럼 이제 이용할 준비가 끝났습니다
> bootstrap이 제공하는 css와 js파일을 local환경으로 다운로드 받아서 사용해도 되지만
>인터넷이 연결되어있으면 cdn이라는 방법을 통해서 bootstrap 파일을 받아와 사용할수 있으므로 우리는 cdn으로 bootstrap을 받아오겠습니다.
>(cdn은 어렵게 생각하지말고 그냥 인터넷에 위치한 file을 가져온다고 생각해주면 됩니다)


### BootStrap 사용 Tip

💬만약 Bootstrap을 사용함에 있어 바꾸고 싶은 design 및 요소가 있으면
위에 설명한 것 처럼 **id값을 수정하여 새로 디자인요소를 덮어씌워주면 반영**해줄 수 있다.

💬bootstrap의 코드를 가져와서 사용할 때 class로 해당 태그를 디자인 해주는 것이기때문에
속성중 id 나 target 이런 곳에 example 이렇게 작성이 되어있는 부분이 있다.
그런 코드는 본인의 **page의 의미에 맞게 수정**해주자

> 많이 사용하는 Bootstrap요소

* Layout - Overview - Containers 일반적으로 전체 body의 내용을 감싸서 layout을 잡아줄 때 사용한다.

* Layout - Grid - row와 col으로 구성되어있는데 
col-lg-2 이런 방식으로 webpage의 창 크기에 따라 col이 차지하는 크기를 조정해 줄 수 있어 
전체 가로 길이 12를 기준으로 적절히 숫자를 설정해주면 
데스크탑, 모바일, 태블릿 등 크기에 맞춰 변하는 반응형 웹을 손쉽게 만들 수 있다. 
(미디어 쿼리를 직접 짜는 것 보다 훨씬 편하지만 
세세한 부분까지는 설정이 안되어 추가적인 설정이 필요하다)

* Component
  * Alerts : 알림창 
  * Buttons : 버튼디자인
  * Card : card형태의 작은 box 디자인
  * Carousel : 슬라이드쇼
  * Collapse : 클릭하면 확장하며 내용을 띄워줌
  * Dropdowns : 누르면 여러개의 list가 있는 버튼
  * Forms : form 관련 디자인
  * inputgroup : input태그 관련 디자인(사실 form과의 차이는 잘 모르겠다)
  * Modal : 팝업창 디자인(글 작성 할수도 있음)
  * Nav    : 네이게이션 관련
  * Navbar : input창도 있고 좀더 다양한 Navigation의 형태를 보여준다(Nav와 차이 잘 모르겠다)
  * Scrollspy : 스크롤에 따른 메뉴 이동과 같은 부분을 디자인
  * Tooltips  : button등 특정 요소에 마우스를 올리면 뜨는 설명 디자인


참고할 만한 사이트

많이 쓰는 CSS에 대한 설명 : http://ko.learnlayout.com/
CSS 색상 조합 및 선택      https://color.adobe.com/ko/create/color-wheel/
CSS 및 JS으로 한 디자인   : https://codepen.io/