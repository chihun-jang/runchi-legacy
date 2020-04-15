---
title: "MarkDown 문법"
date: "2020-02-27"
category: Markdown
---


안녕하세요!!

예전에 타 플랫폼에서 md문법에 대해 정리를 했지만 
gatsby에서는 md파일을 이용해 page를 생성하는 만큼 다시 한번 정리를 해봅니다.

(해당 게시글은 [stackedit.io](https://stackedit.io/)를 통해 작성했습니다.  온라인 편집기로 gui기반으로 md 를 작성해볼수도 있고 reference를 제공해주는 등 여러 편리한 기능이 많습니다. )

## 개인적으로 생각하는  md의 장점

+ 여러 플랫폼에서 md파일을 지원한다
	=> 블로그 이전과 같은 상황에 용이 
	
+  코드 편집기에서도 별다른 설정없이 md문법을 이용해 바로 글을 작성할 수 있다.
+ HTML로의 변환이 가능하다
+   수식 지원을 해줘 수식을 작성해야할 경우



## 문법 

자주 사용할 것 같은 애들만 간단히 정리해봅시다

<br>


# 제목1

`제목 사용방법 : # 제목1`
`#의 갯수에 따라 제목1~ 제목6까지의 수준 결정`

<br><br>


개행문자 위에
<br>
개행문자 밑에


`개행문자 사용방법 : 띄어쓰기가 적용되지 않으면 <br>을 사용해줄 수 있다.` 

<br>

---
***

`수평선 사용방법 : ---(3개 이상) or ***(3개 이상)  `

<br>

*emphasize*

`emphasize 사용방법 : *emphasize* or _emphasize_` 

<br>

**Bold**

`Bold 사용방법 : **Bold ** or __Bold __`


<br>

>인용문

`인용문 사용방법 : >인용문 `

<br>

- unordered list1
* unordered list2
	+ unordered list3
		+ unordered list3 

```
ul list 사용방법 : - or * or + 중에 사용해주면 된다 

- unordered list1
* unordered list2
	+ unordered list3
		+ unordered list3 
```
<br>

1. ordered list1
2. ordered list2
	1. ordered list2-1
	
```
ol list 사용방법 : 1. list내용 을 이용한다

1. ordered list1
2. ordered list2
	1. ordered list2-1

```

<br>

구글 : [google](www.google.com)

`링크 사용방법 : 구글 : [google](www.google.com)`

<br>

![이미지 로드 실패시 나타나는 문구](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/1200px-Markdown-mark.svg.png   "tool tip 작성하는 곳" )

`이미지 사용방법 :  ![이미지 로드 실패시 나타나는 문구](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/1200px-Markdown-mark.svg.png "tool tip 작성하는 곳")`

<br>

`print(hello world!)` 

`inline code 사용방법 : ` \`print(hello world!)`
 

<br>

```python
def this_is_python():
	return 'python'
```
`block code 사용방법 : `

 \```python   
def this_is_python():
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return 'python'
\``` 

<br>

설명달기
: 설명은 이렇게 달면 됩니다

`Def list 사용방법 `
`설명달기`
` : 설명은 이렇게 달면 됩니다`

<br>

Escape 문자사용하기

`Markdown 에서 Escape 또한 \를 이용해서 해줄수 있다 `
`사용하고자 하는 문법의 앞에 \를 사용하고 사용해주면 Text로 볼 수 있다`

<br>


### + 수식 작성하기

글씨~아래첨자~

`아래 첨자 사용방법 : 글씨~아래첨자~`

<br>

글씨^위첨자^ 

`위 첨자 사용방법 : 글씨^위첨자^ `

<br>

$\sum_{k=1}^N k^2 = \frac{n(n+1)(2n+1)}{6}$

`수식 사용방법: $\sum_{k=1}^N k^2 = \frac{n(n+1)(2n+1)}{6}$ `

[위키백과 TeX 문법 참고](https://ko.wikipedia.org/wiki/%EC%9C%84%ED%82%A4%EB%B0%B1%EA%B3%BC:TeX_%EB%AC%B8%EB%B2%95)

<br>


