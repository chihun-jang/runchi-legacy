---
title: 'react에서의 styling'
date: '2020-08-05'
category: ['react', 'css']
draft: True
---

# CSS

CSS는 일반적인 CSS의 사용방법과 유사하다
`import './mycss.css` 와 같이 import해주고,
`<div className="MyClass"> 와 같이 JSX를 작성해주면 된다.

그리고 자식 selector와 같은 계층 구조 또한 className으로 부여되어있음에도 사용 가능하다.

> CSS의 네이밍 규칙중에는 BEM 네이밍 이라는 것도 있는데, 이는 CSS의 TIP과 더불어서 따로 빼서 공부를 해보도록 하자.

# Sass

> Sass(Sytacoca;;y Awesome Style Sheets) , CSS 전처리기로 코드의 재활용 밑 가독성, 유지보수의 이점이있다. (전처리기란 그냥 미리 짠 코드를 컴파일 해서 CSS로 바꾼다는 느낌이다.)

-   sass

```css
$font-stack: sans-serif
$primary-color: #333

body
    font:100% $font-stack
    color:$primary-color
```

-   scss

```css
$font-stack: sans-serif
$primary-color: #333

body {
    font: 100% $font-stack;
    color: $primary-color;
}
```

위에서 보듯 기존의 CSS와 더 익숙한 SCSS를 사용할 예정이다.
