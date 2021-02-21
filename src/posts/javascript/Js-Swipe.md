---
title: "Vanilla-JS-Swipe"
date: "2020-03-28"
category: ['Javascript','FrontEnd']
draft : False
---

모바일에서 swipe를 구현하기 위해 Stackoverflow를 찾아보니

[Detect a finger swipe through JavaScript on the iPhone and Android](https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android)

이렇게 `touchstart`, `touchmove`를  통해 구현했다.


그런데 이렇게 구현을 하고보니 문제가 있었는데
**`touchmove`를 사용하다보니 `moveevent`가 발생할때마다 function이 여러번 실행되는 상황이 발생**했다.

물론 조건문을 만들어서 제어해줄 수도 있겠지만 조금 더 근-본적으로 해결하고 싶어 JS event를 찾아서직접 작성해보았다.


```javascript

    target.addEventListener("touchstart", touch_start);
    target.addEventListener("touchend", touch_end);

    let change_x_axis = null;
    
    function touch_go(e){
        change_x_axis = e["touches"][0]["screenX"]
    }
    
    function touch_end(e){
    
        if (change_x_axis - e["changedTouches"][0]["screenX"] > 0){
            // console.log("left swipe")
        }else{
            // console.log("right swipe")
        }
    }
```


이렇게 `touchstart`와 `touchend`를 이용해서 Eventlistner를 작성해주면
**터치가 시작될때, 터치가 종료될때의 x좌표를 비교하여 swipe의 방향을 인식**할수 있다.

단점이라면 조금 민감한 정도...?