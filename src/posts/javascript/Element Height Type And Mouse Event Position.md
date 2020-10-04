---
title: 'Element Height Type And Mouse Event Position'
date: '2020-10-04'
category: ['javascript']
draft: False
---

JS로 HTML element를 다루다보면 `clientHeight`, `offsetHeight`과 같은 것을 마주할 때가 있다. 더 나아가 event를 다룰때는 screenX, pageX와 같은 좌표값을 보게 되는데 이에 대해 간단히 정리를 해보자.

---

## HTML element

### Client Height

content + padding ==> **_실제로 현재 browser에서 보이는_** 부분

### offset Height

content + padding + border + scrollbar ==> 영역의 border나 심지어 **_scrollbar영역까지 포함한 부분_**(client + scrollbar + border라고 생각)

### Scroll Height

content가 가진 높이로 **_scroll을 내려서 봐야하는 부분까지_**(현재는 안 보이는 부분) 포함한 부분을 말한다

---

## Event에서의 position

### screen X

스크린이라는 말 그대로 사용자가 보는 스크린을 기준으로 좌표를 가져온다. **_뷰포트를 기준으로 가져온다고 생각_**하면 되겠다.

### client X

client라는 단어가 의미하는 것처럼 **_사용자가 보는 client프로그램 즉, browser를 기준으로 위치_**를 가져온다.

### page X

html document를 기준으로 위치를 가져오는데 height가 길어서 scroll이 생기면 생기는대로 **_html문서의 전체 높이와 너비를 기준으로 위치를 가져온다_**

> 따라서 일반적으로 HTML문서의 가로 너비는 브라우저와 동일한 경우가 많아서 pageX와 clientX가 같은 경우가 많다.

### offset X

우리의 특정 이벤트가 일어나는 **_대상 element target을 기준으로 위치를 가져온다_**

> 예를 들면 우리가 누른 div 내에서 x로 얼마만큼, y로 얼마만큼 떨어져있는지를 의미한다.
