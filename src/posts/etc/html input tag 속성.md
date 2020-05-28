---
title: "HTML Input tag"
date: "2020-05-26"
category: ['etc']
draft : False
---

>본 글은 Dropdown작성시 유의사항과 input text type의 required와 readonly에 대한 글입니다. 회사업무중... 특정 **필드값을 필수로 받아서 넘겨줘야한다**는 요청을 받았다.

동작하는 컴포넌트는 Dropdown인데, 서버단에서 처리하는게 아니라 클라이언트단에서 처리를 하고자 하니 간단하게 생각해보면 **required라는 atrribute**를 사용하면 쉽게 해결이 될것 같았다.

그런데! 예전에 만들어 놓은 Dropdown은 input tag들로 구성되어있는 것이 아닌 div로 구성이 되어있기 떄문에 해당 태그들에는 required를 적용시켜줄수가 없었다.(**_과거의 나는 왜 div로 만들었을까,input으로 만들었어야지.._**)

그래서 생각해낸 것이
```html
<input type="text" required readonly>
```
얘를 이용하는 것이다.
드롭다운의 item이 선택되고 -> 선택된 값을 text input에다가 넣어줘
선택을 안하면 text input이 채워지지않아 required 에러를 띄워주는 것이다.(그리고 text input은 CSS로 안보이게 처리하면..?)

### 문제발생

input tag에서 required와 readonly를 같이쓰면 readonly속성덕분에 required속성이 적용되지 않았다. readonly로 textinput을 단순히 보여주는 기능을하게하고 required로 꼭 입력을 받게 하고 싶었는데 안되었던것이다.


### 문제해결
그래서 input text 에 disabled속성도 줘보고
onkeypress 속성도 부여해 입력이 안되게도 해보고,
CSS로 HTML요소를 이용못하게 하면되지않을까 해봤지만
textinput에 readonly의 느낌이 들어가는 순간 읽기가 우선되서 인지
required(쓰기)는 무시되어버렸다.


그래서 두개의 input text를 만들고 
* required 가 필요한 input은 z-index를 내려 사용자에게 노출되지않도록한다.(+ CSS position을 absolute로 줘서 공간을 차지하지 않도록 한다.)
* readonly가 되는 textinput을 전면적으로 내세워 해당 textinput은 사용자에게 보여지도록 잡아준다(이건 div로도 가능)


## 결론
* input type에 required와 readonly를 동시에 사용하면 required가 적용되지 않는다.
* 따라서 이를 해결하기위해서는 required되는 애를 사용자가 보이지 않게 숨기고 display부분을 따로 만들어주자

* 이러한 트릭이 쓰기 싫다면 **_처음부터 dropdown을 radio로 만들어주면 된다_**



> 추신: input text안에 적는 글자색을 바꿔주고 싶다면
> ```css
> input:focus{color:red;} 
> ```
> 이런방식으로 focus선택자를 이용해서 변경해주면 된다
> 그러면 입력하는 글자색 뿐만아니라 깜박이는 cursor까지 변겨오딘다.