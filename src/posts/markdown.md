---
title: "MarkDown 문법"
date: "2020-02-27"
category: ['etc']
draft : False
---

지금까지 Markdown은 그저 코드편집기에서 쓰기 편한, 그리고 Github repo에서 README.md 를 작성하는데 사용하는줄 알았다.

그러나 Blog를 gatsby로 migration 하는 과정에서
gatsby는 md 파일을 이용해서 html을 생성하는 플러그인을 지원했고, 
md와 더 친해져야할 필요성이 생겼다.

> 예전에는 [stackedit.io](https://stackedit.io/)를 통해 작성했다
> 온라인 편집기로 gui기반으로 md 를 작성해볼수도 있고 
> reference를 제공해주는 등 여러 편리한 기능이 많았다(심지어 blogger로의 publishing까지 지원해준다.).


## 문법 

자주 사용할 것 같은 애들만 간단히 짚어보고 넘어가자


### 제목

###### 제목6

`제목 사용방법 : # 제목1`
`#의 갯수에 따라 제목1~ 제목6까지의 수준 결정`


### 수평선

---
***

`수평선 사용방법 : ---(3개 이상) or ***(3개 이상)  `


### 강조(기울임)

*emphasize*

`emphasize 사용방법 : *emphasize* or _emphasize_` 


### 굵은 글씨

**Bold**

`Bold 사용방법 : **Bold ** or __Bold __`


### 인용문

>인용문

`인용문 사용방법 : >인용문 `

### 순서 없는 리스트

- unordered list1
* unordered list2
	+ unordered list3
		+ unordered list3 

```
ul list 사용방법 : - or * or + 중에 사용

- unordered list1
* unordered list2
	+ unordered list3
		+ unordered list3 
```

### 순서 있는 리스트

1. ordered list1
2. ordered list2
	1. ordered list2-1
	
```
ol list 사용방법 : 1. 리스트내용 

1. ordered list1
2. ordered list2
	1. ordered list2-1

```


### 하이퍼링크 사용하기

구글 : [google](www.google.com)

`링크 사용방법 : 구글 : [google](www.google.com)`


### 이미지 사용하기

![이미지 로드 실패시 나타나는 문구](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/1200px-Markdown-mark.svg.png   "tool tip 작성하는 곳" )

`이미지 사용방법 :  ![이미지 로드 실패시 나타나는 문구](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/1200px-Markdown-mark.svg.png "tool tip 작성하는 곳")`


### 코드 입력하기(inline)

`print(hello world!)` 

`inline code 사용방법 : ` \`print(hello world!)`
 

### 코드 입력하기(block)

```python
def this_is_python():
	return 'python'
```
`block code 사용방법 : `

 \```python   
def this_is_python():
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return 'python'
\``` 


### Escape 문자사용하기

`Markdown 에서 Escape 또한 \를 이용해서 해줄수 있다 `
`사용하고자 하는 문자 앞에 \를 붙여 사용해주면 Text로 볼 수 있다`


