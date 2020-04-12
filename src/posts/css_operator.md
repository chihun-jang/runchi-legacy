---
title: "CSS에서 operator사용하기"
date: "2020-03-02"
category: Css
---

# **CSS에서 operator 사용하기**

웹 퍼블리싱을 하다보면

size를 지정할때 100% , px , vw(vh), rem 등과 같은 단위로만 표현이 안될때가 있다.

ex) 글로벌 네브바의 height가 60px인데 

body의 height를 100%가 아닌 글로벌 네브바만큼 빼고 지정하고싶을떄

지금까지는 SCSS에서만 해결되는 줄 알고 대략적으로만 맞춰서 퍼블리싱을 했었는데

혹시나 해서 검색을 해보니 **CSS에서도 연산자를 사용한 높이,너비 지정이 가능하다고 한다.**

**CSS3 이상부터 지원되는 function으로 calc()** 라는것이 있는데

[Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/#search=calc())

Can_I_use 사이트로 알아본 결과 대다수의 웹브라우저에서 지원되는 기능이었다.

웹표준성 측면에서도 나쁘지(?)않아 사용했다.

사용방법은 간단히
```css
height: calc(100% - 160px)
```
calc( a * b ) 와 같이 사용하면 되고 연산자는 사칙연산(+,-,/,*) 모두 사용 가능하다.

이때 **주의해야 할 점은 연산자를 기준으로** 

**앞뒤로 띄어쓰기(white space)가 1개 이상씩 들어가야 정상적으로 인식**한다는 점이다.