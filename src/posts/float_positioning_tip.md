---
title: "Float를 이용한 positioning Tip"
date: "2020-03-10"
category: Css
---


웹 퍼블리싱을 하다보면 컴포넌트를 적재적소에 배치시키고 싶을때가 아주아주아주 많다.

그럴때 저는 주로 flex, position, float ,text-align 과 같은 속성을 이용해 배치하고 있다.

그 중 float 를 이용하게되면 해당 **컴포넌트가 마치 DOM으로 부터 공중에 붕뜨는 모양**이 되어

**이후에 잡아놓은 컴포넌트들이 흐트러지는 경우**가 많았다 ㅠㅠ

그래서 저는 clear: both 라는 속성을 알고 있었음에도 float를 이용한 positioning 을 지양하고 있었다.

하지만 최근 float와 따라오는 tip 을 배우게 되었고 보다 더 현명하게 float 를 사용할수 있을것 같아 글을 남겨둔다
```CSS
    .mydiv{
    	float:right;
    }
    
    .mydiv::after{
    	content:'';   /*가상선택자를 이용시 필수로 content속성을 작성해줘야한다*/
    	display:block;
    	clear:both;
    }
```
위와같이 float로 positioning을 해준이후에 

::after 라는 가상선택자를 이용해 mydiv 뒤에 block 요소를 하나 생성한다.

그리고 clear:both; 라는 것을 이용해 clear 속성을 끊어주는데

해당 예시에서는 both 대신 clear:right; 를 이용해 이전의 float 속성을 끊어줄수 있다.

요약

key point는 가상선택자를 이용해 display block 요소를 하나 만들고,

그 요소에 clear 속성으로 해제하고 싶은 float 속성을 표기해주는 것이다.