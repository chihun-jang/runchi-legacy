---
title: 'React에서 SVG사용하기'
date: '2020-09-17'
category: ['react']
draft: False
---

# SVG 란??

img file을 쓰다보면 png, jpg, svg와 같은 확장자를 많이 볼 수 있다.
정확한 특징은 모르지만 일반적으로

-   jpg가 용량을 적게 차지하고
-   png는 background를 투명하게 할 수 있으며
-   svg는 확대를 하거나 css로도 수정이 가능하다

그래서 오늘은 react에서 svg를 사용하는 방법을 기록해두려한다.
좀 더 자세히 svg를 쓰면 왜 좋은지 W3School에서는 아래와 같이 이야기 하고 있다.

-   SVG images can be created and edited with any text editor
-   SVG images can be searched, indexed, scripted, and compressed
-   SVG images are scalable
-   SVG images can be printed with high quality at any resolution
-   SVG images are zoomable
-   SVG graphics do NOT lose any quality if they are zoomed or resized
-   SVG is an open standard
-   SVG files are pure XML

---

그러면 본격적으로 사용을 해보자!

## 1. `<img>` tag 사용하기

```javascript
<img src={require('경로')} />
```

---

## 2. `<svg>` component 생성하기

```javascript
const svg = {
    edit: 'M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z',
};

const SVG = props => {
    return (
        <svg
            x="0px"
            y="0px"
            width={props.width ? props.width : 'auto'}
            height={props.height ? props.height : 'auto'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill={props.color}
        >
            <path
                // fill={props.color}
                d={svg[props.name]}
            />
        </svg>
    );
};

// component로의 사용
<SVG name="edit" width="20px" height="20px" color="#aaa"></SVG>;
```

위의 방법을 사용하면 이점이 `<SVG>` component를 하나 생성해놓고 props로 name이나 color를 전달해주면 되기때문에 custom및 확장에 있어 용이하다.
지금 글을 쓰는 runchi 블로그도 저렇게 svg를 넣었는데, svg와 react가 낯설다면 진입장벽이 존재하는 방법이라고 생각된다.

---

## 3. `ReactComponent` 이용하기

```javascript
import { ReactComponent as MySvg } from '../../Images/Basic/mysvg.svg';
<MySvg />;

// 그리고 styled component를 쓴다면
const StyledMyIcon = styled(MySvg)`
    color: white;
`;
```

**_위의 방법은 `create-react-app` 을 통해서 react app을 만든경우에만 동작한다고 한다._**

`import`를 할때 간단하게 `ReactComponent`를 이용해서 바로 Component화 시켜줄 수 있는데,
이렇게 Component화 된 svg file을 `styled component`를 이용하면 custom도 손쉽게 해줄 수 있다.
(물론 이때 개발자 도구로 원하는 부분을 찾아서 custom을 해주었다.)

각각의 방법들이 모두 장단점을 지닌만큼 상황에 맞게 선택을 하여 사용을 하면 되겠다.
