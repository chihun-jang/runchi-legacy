---
title: '1.React Native란 무엇일까'
date: '2019-07-20'
category: ['멋쟁이사자처럼', 'reactnative']
draft: False
---

> 해당 자료는 2019 하반기 멋쟁이사자처럼 앱선도대학 커리큘럼을 위해
> 공부를 하며 만든 자료입니다. 따라서 지금보면 부족한부분이 많은점 참고 부탁드리겠습니다. (hooks를 사용하지 않는다던가.., 버전이 안 맞는다던가... ㅠㅠ)

### #1 React Native란 무엇일까

### React Native

> Facebook 에서 만든 Open Source Mobile App Framework

**React( JavaScript 로 만든 UI관련 library)를 이용한 Native App을 개발할수 있는 도구라고 생각하시면 되겠습니다**

### App을 만드는데는 3가지 방법이 있습니다

1. 모바일 웹앱( m.naver.com) - 웹을 모바일 환경에 맞게 디자인
2. 네이티브 앱 - 우리들이 일반적으로 쓰는 App
3. 하이브리드앱 - 웹을 기반으로 앱의 형태로 사용할수 있게함

React Native는 하이브리드의 앱 느낌으로 개발되지만

사용자가 느끼는 UI,UX는 **네이티브 앱과 차이가 없는** 기술 입니다

### **React Native의 장단점**

### **장점**

-   **Android와 iOS 를 동시에 개발할 수 있다**
    JS만 알면 Java,Kotlin,Swift와 같은 언어를 몰라도 두 운영체제에 해당하는 App개발 가능

-   **Hot reload 와 live reload를 제공한다 == 변경사항이 바로 바로 반영된다**
    기존에 Android Studio를 써보신 분들은 아시겠지만 변경사항에 대해
    빌드 및 확인하는 과정이 오래 걸렸습니다. 하지만 RN 은 변경사항이 바로 바로 반영됩니다!

-   **생산성이 좋다**
-   성능에 대해서도 최근 Native App과 비슷해지거나 약간 앞선다

### **단점**

-   한국어 자료가 부족하다
    관련 서적을 찾아봐도 3권밖에 없을 정도로 관련 자료가 부족합니다.
    ~~뿐만아니라 RN개발자도 희귀하다고 봤습니다.~~

-   Native에 비해 가져다 쓸 수 있는 외부 Library가 부족하다
    아무래도 기존의 Native에 비해서 가져다 사용할 수 있는 Library에 제약이 있습니다.

-   빠른 버전 업데이트 및 버전에 대한 불안정성
    현재 2019년 7월 중순 기준 0.60 version이고 2주에 한번씩 update된다고 합니다.
    따라서 버전관련한 불안정성이 있습니다.

## React Native의 동작원리

![bridge](./image/RN_bridge.png)

JS로 이루어진 RN code를 작성하게 되면
**Bridge**를 거쳐 Android or iOS와 같은 Native Code로 바꿔줍니다.
여기서 TMI 를 드리자면 Bridge 왼쪽에 Native Code도 있는데
RN으로 개발중 RN으로 개발이 부족한 부분이 있으면 **Native Code를 덧붙여 확장할 수도 있습니다.**

### **React Native로 만들어진 App**

-   인스타그램, 페이스북, 스카이프, 우버, 디스코드

[React Native · A framework for building native apps using React](https://facebook.github.io/react-native/showcase)
