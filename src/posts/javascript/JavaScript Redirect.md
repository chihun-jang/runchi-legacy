---
title: "JavaScript Redirect"
date: "2020-05-30"
category: ['javascript']
draft : False
---

회원가입이 들어가 있는 서비스의 경우에는 `Https`의 사용이 필수적이다.
뿐만아니라 `Https`로 되어있는 사이트들은 구글봇에서도 더 높은 순위로 수집을 해간다고 하니 앞으로 웹을 개발함에 있어 필수 요소로 생각을 해야하겠다.

그런데 최근 외부 API사용으로 인해 `http`로 요청을 해야하는 페이지가 있었고, 그로인해 사이트에 `https`적용을 골머리 앓다가
최근 React 공부를 하며 보았던 `window.location.href`가 생각이 났고 Javascript로 URL을 조작해서 리다이렉트 시켜줄수 없을까생각했다.

```javascript
window.location.href = "https://www.google.com/" 
```
이런식으로 작성을 해주면 해당 page로 url이 변경이 되고

```javascript
 if (window.location.protocol == 'http:') {
        window.location.href = window.location.href.replace('http:', 'https:');
    }
```
위와 같이 작성해주면 **protocol**이 `http`인지 체크해서 http일 경우 `https`로 바꿔 `redirect`시켜주게 된다.

> 물론 조금 더 근본적인 해결책을 찾을 수 있으면 좋겠지만 불과 얼마전만해도 생각하지 못한 부분을 생각할 수 있게 되었고
> 그만큼 성장한 것이 아닐까해서 뿌듯하다.   

### 유의사항
* http로 요청했던, 등록했던 API들을 수정해줘야한다
* `80 port`를 `443 port`(즉 http를 https)로 redirect하게 될시 Javascript로 일부페이지만 http로 protocol설정을 하게 되면 끊임없는 리다이렉트 루프에 빠지게 된다.