---
title: "Vanila-JS-Swipe"
date: "2020-03-28"
tag: "JS"
---
모바일에서 swipe를 구현하기 위해 Stackoverflow를 찾아보니

[Detect a finger swipe through JavaScript on the iPhone and Android](https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android)

이렇게 touchstart, touchmove를  통해 구현했다.

그런데 이렇게 구현했을 때의 문제는 touchmove를 사용하다보니 move event가 발생할때마다 function이 여러번 발생하는 상황이 발생했다.

물론 특정 flag를 만들어서 방지해줄 수도 있겠지만 조금 더 원론적으로 해결하고 싶어 JS event를 찾아보았다.


```javascript

    target.addEventListener("touchstart", touch_start, false);
    target.addEventListener("touchend", touch_end, false);

    let change_x_axis = null;
    
    function touch_go(e){
        change_x_axis = e["touches"][0]["screenX"]
    }
    
    function touch_end(e){
    
        if (change_x_axis - e["changedTouches"][0]["screenX"] > 0){
            // console.log("왼쪽스왑")
        }else{
            // console.log("오른쪽스왑")
        }
    
    
    }
```

이렇게 위와같이 touchstart와 touchend를 이용해서 eventlistner를 작성해주면

터치가 시작될때, 터치가 종료될때의 x좌료를 비교하여

스와이프의 방향을 알아챌 수 있다.

(아직 iOS까지는 확인하지 못했지만 이벤트가 발생하지 않을까.. 안되면 수정해야겠다 ㅠㅠ)