---
title: "멋쟁이사자처럼 강의자료 - html5"
date: "2019-03-21"
category: ['멋쟁이사자처럼']
draft : False
---

> 멋쟁이사자처럼 강의자료 - html5

안녕하세요!! 😁
멋쟁이사자처럼 7기 여러분 기다리고 기다리던 첫번째 시간입니다.

HTML이란 무엇인가?

`Hyper Text Markup Language` 의 줄임말로 인터넷을 통해 주고 받는 정보들의 구조를 잡아준다.

`client`(사용자)와 `server`(서비스업체)간에 인터넷이라는 네트워크의 통신(요청과 응답)을 통해 html을 주고 받는다

우리가 흔히 말하는 web은 WWW의 약자 혹은 website를 나타냅니다.

>💡 www.blogger.com 에서 www는 웹서버에 붙인 이름이다.
우리가 흔히 알고 있는 worlde wide web 은 프로토콜을 나타내는게 아닌 웹을 설계한 사람이 최초로 만든 browser겸 html editor에 붙인 이름

사실 HTML은 프로그래밍 언어가 아니다
그럼에도 불구하고 HTML을 왜 배우는 걸까?

HTML은 webpage의 뼈대를 만드는 작업이다. 이 뼈대에 따라 우리의 site가 검색시 상단에 위치하게 될 수도 있고 수많은 인터넷 상의 정보들 가운데 우선적으로 노출이 될 수도 있다.

`https://gsnedders.html5.org/outliner/ ` 해당 링크로 들어가 webpage의 URL을 입력하면 어떤 outline을 가지고 있는지 확인 가능하다.


>개발자 도구(크롬 기준)
> * F12 
> * Ctrl + shift + i 
> * 설정 - 도구더보기 - 개발자도구

위의 세방법을 통해서 개발자 도구를 열 수 있다.

우리가 많이 사용할 tab은 Elements 와 Network 부분이므로 Element tab에서
요소를 바꿔보면서 webpage에 어떤 변화가 일어나는지 확인해보자

Network는 우리가 Internet을 통해서 받아오는 file들을 보여준다고 생각하자

그럼 `info.cern.ch` 라는 세상에서 처음으로 만들어진 웹페이지에 들어가서 개발자 도구를 이용해 웹사이트의 구조를 보자.
이처럼 단순하게 html로만 이루어진 website가 오늘 우리가 공부하고 만들어볼 page이다.



### HTML의 기본 구조

```html
<!DOCTYPE html>    <!-- html5으로 작성된 문서임을 알려준다-->
<html lang="en">   
    <!-- html이 어떤 언어로 작성되었는지 표시하는데 시각장애인분들의 보조기구가
        해당 코드를 보고 언어를 인식해 보다 webpage의 해석을 정확하게 한다.-->

<head>             <!-- webpage에는 표시되지 않지만 webpage의 정보를 감싸고 있는 tag-->

<meta charset="UTF-8">  <!-- 문자가 UTF-8로 인코딩 되었음을 표시 -->

<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
<!-- webpage의 크기가 webpage를 여는 device의 가로 길이에 맞춰 열리게 함 initial-scale은 초기 확댓값-->

<meta http-equiv="X-UA-Compatible" content="ie=edge"> <!-- ie를 사용하는 경우 최신버전으로 연다는 태그-->

<title>Document</title>      <!-- 브라우저의 탭에 표시되는 글자 -->

<link rel="stylesheet" type="text/css" href="theme.css"> <!--외부 resource를 참조할때 사용한다 css or js 등..-->

</head>

<body>          <!-- 실제 webpage에 표시되는 내용들이 들어가는 tag-->

</body>

</html>
```

### 자주 쓰는 HTML 태그

```html
<!--주석처리 된 부분-->       <!--주석태그(코드이외에 comment 혹은 실행시키고 싶지 않은 code를 주석으로 감싸줄 수 있다.-->

<h1>h1 태그입니다</h1> 
<h2>h2 태그입니다</h2>      <!--  h1 ~ h6 제목 태그-->
<h3>h3 태그입니다</h3>
<h6>h6 태그입니다</h6>


<p>이건 p 태그입니다</p>    <!--  paragraph 태그로 문단의 내용을 작성할때 사용  -->         


<strong>강조해주는 strong</strong>   <!--강조하고픈 내용을 bold처리해준다-->


<br>                      <!--   한줄 띄어쓰기-->
<hr>                       <!--  가로선 1개 -->


<ol>
<li>첫번째 리스트</li>   <!--  ordered list 태그--> 
<li>두번째 리스트</li>     1.첫번째리스트 
<li>세번째 리스트</li>     2.두번째리스트 
</ol>


<ul>
<li>첫번째 리스트</li>     <!--unordered list 태그-->
<li>두번째 리스트</li>     - 첫번째리스트 
<li>세번째 리스트</li>     - 두번째리스트 
</ul>


<div>div태그의 특징</div>      <!--div는 display : block으로 1개의 line에 1개의 div태그-->
<span>span태그의 특징</span>   <!--span은 inline으로 1개의 line에 복수개의 span-->

<form>                   <!--입력form을 작성하는 태그로 action method의 attribute와 함께 사용된다. -->
<input type="hidden" value="hidden value">   <!--input창이 보이지 않고 value값만 넘겨줄때 사용-->
<input type="text" placeholder="글자를 입력하세요" > <!--일반적인 글자입력창 placeholder는 연한글씨의 안내문구-->
<input type ="button" value="type button">   <!--button을 생성-->

<input type="submit" value="type submit ">   <!--submit 버튼은 form을 제출할때 사용하는 버튼-->
<input type="color">   <!--color를 선택할 수 있다.-->

<input type="date" >  <!--날짜를 선택할 수 있다.-->

<input type="email" placeholder="이메일을 입력하세요"><!-- @를 포함한 형식받음-->

<input type="password" value="12345"> <!--입력시 ***처럼 표기된다-->

<input type="file" >  <!--파일 첨부-->
 
<input type="checkbox" value = "체크박스"> <!--체크박스  체크박스는 복수의 선택이 가능한 선택지 -->
<input type="radio">   <!--라디오버튼 radio는 1개만 선택 가능 -->

ex) <input type="checkbox" value="1" name= "checkbox1">
<input type="checkbox" value="2" name= "checkbox2">

<input type="radio"    value="1" name = "radio">
<input type="radio"    value="2" name = "radio">

<!-- 위의 예에서 checkbox의 경우 복수의 선택이 가능하므로 name도 여러개를
설정하여 복수의 value값을 가져올 수 있지만
radio의 경우에는 1개의 선택만 가능하므로 radio라는 동일한 name으로
radio 버튼을 묶어 1개의 선택된 value만 가져오게 된다. -->

<!-- ?) name이란?? 
request의 get 혹은 post에서 value를 낚아챌때(?) 사용하는 요소이다 -->

<select>                                  <!-- 드롭박스를 생성 -->
<option value="volvo">Volvo</option>  <!-- 드롭박스 내부의 요소들을 생성-->
<option value="saab">Saab</option>
<option value="opel">Opel</option>
<option value="audi">Audi</option>
</select><br>

<textarea rows="4" cols="50" placeholder="크기 조절 가능 입력창">  </textarea>             <!--<input type="text"/> 와는 다르게 크기조절 가능하고 복수의 line이 있는 text field라고 생각하면 된다 특이사항은  /textarea로 닫는 태그가 있다는 점-->

</form>

<label for ="label_test">label tag test</label>   
<!-- label 태그는 input태그와 사용되면서 mouse로 label을 클릭해도 input창으로 focus가 맞춰짐 -->
<input type="text" id="label_test" placeholder="label_test">



<a href="https://www.naver.com">링크 태그</a>   
<!-- 많이쓰는 anchor 태그로 href=""부분에 file path, URL등을 입력해 줄수있고 태그로 감싼 요소 클릭시 이동 -->

<!-- a태그 관련 tip : 
가끔 특정 요소에 link를 걸고 싶을때가 있는데 a태그를 가장 바깥쪽으로 감싸주게 되면 보여지는 요소의 box부분의 어느 곳을 클릭하더라도 이동 -->


<button></button> <!-- 얘는 <input type="button">과 달리 img를 감싸서 button의 기능을 하게 할수도 있다.-->
```
***

### Entity Code?
`HTML`상에서 `띄어쓰기` 및` < > `와 같은 기호는 code로 인식이 되거나 우리의 의도처럼 
출력이 안되는 경우가 있다. 이럴때 `Entity Code` 를 이용해주면

< & 와 같은 아이들도 webpage상에 출력해줄 수 있다.

***

### HTML5의 Semantic구조

* ` <header></header>`    : 머릿말, 제목의 역할을 한다
* `<nav></nav>  `         : 네비게이션으로 메뉴와 같은 곳에 사용
* `<section></section>`   : article을 포함하며 컨텐츠가 포함되는 part
* `<article></article>`   : article은 page내의 컨텐츠 하나하나 
* `<footer></footer>  `   : 꼬리말
* `<aside></aside>   `    : 부가적으로 구분되는 아이로 광고와 같은 것들을 포함


>### Semantic을 왜 써야하지?

HTML5에 있어서 div는 꾸미는 용도로 사용을 하고 의미를 지닌 부분에 대해서는
위와 같은 태그를 이용해서 구성하게 된다

그러면 website의 **outline이 효과적으로 생성**이 되고

**_온톨로지_**, **_메타데이터_**(메타 데이터는 우리가 가진 데이터들의 정보)
(온톨로지는 정보들을 상황에 맞게 분류하는 것)와 같은 것들을 이용함에 있어서 
좋은 webpage를 만들 수 있다.

ex) 온톨로지의 예: google에 네이바 라고 잘못 검색하면 google은 상황을 판단해서 네이바를 네이버로 수정하여 검색할수 있는 기능을 제공


#### HTML outline 구성의 예

```html
<h1>제목</h1>
<section>
  <h2>소제목</h2>
.</section>
<article>
    여기는 article
</article>
```
✏✏✏✏✏✏✏✏✏✏✏✏✏✏

1.제목
    1.소제목
    2.Untitled Section

✏✏✏✏✏✏✏✏✏✏✏✏✏✏
```html
<h1>제목</h1>
<h2>소제목</h2>
<article>
     <h3>소제목2</h3>
     <p>본문내용</p>
</article>
````
✏✏✏✏✏✏✏✏✏✏✏✏✏✏

1.제목
    1.소제목
    2.소제목2

✏✏✏✏✏✏✏✏✏✏✏✏✏✏
