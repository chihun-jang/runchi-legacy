---
title: 리소스와 URI
date: 2021-03-02T00:10:30.445Z
category:
  - FrontEnd
draft: true
---
HTTP 요청대상을 리소스라고 부른다.
리소스는 URI(Uniform Resource Identifier - 균일 자원 식별자, 웹에서 위치를 제공하여 리소스를 식별하는 URL이 가장 일반적이다. URN은  네임스페이스에서 이름으로 리소스 참조)

## URLs

Uniform Resource Locator (URL)로 일반적인 웹주소다.

## URNs

개별적인 네임스페이스 내에서 이름에 따라 리소스 식별
ex) urn:isbn:~~

# URIs의 구문

## 스킴 혹은 프로토콜

data,file,ftp,http(s),mailto,ssh,tel,urn,ws/wss,view-source

## 도메인 이름(authority)

IP address를 찾아가는 도메

## 포트

web server상의 리소스에 접근하는데 사용되는 기술적인 gate를 나타낸다.
(http는 80, https 443을 사용하는 경우 일반적으로 생략된다. 그게 아니라면 필수 입력)

## 경로

웹서버 상의 리소스 경로
(오늘날 서버에 의해 다뤄지는 추상화를 사용한다)

## 쿼리

?key1=value1&key2=value2는 웹 서버에 제공되는 추가적인 parameter이다.
위와 같이 key와 value의 쌍목록이다.

## Fragment

#somewhreINTheDocument리소스 자체의 다른 부분을 가리키는 anchor(리소스 내의 북마크의 한종류,비디오나 오디오에서는 해당 시점ㄷ으로 이동)

이는 서버에 전달되지 않는다.

## URL사용방법

브라우저의 주소표시줄의 URL에는 context가 없으므로 absolute URL(https://developer.mozilla.org/en-US/docs/Learn, //developer.mozilla.org/en-US/docs/Learn
)을 사용해야하는 반면
HTML과 같은 문서내에는 브라우저에서 이미 문서의 URL이 있으므로 relative URL(/en-US/docs/Learn, ../CSS/display

)만으로도 식별할 수 있다.

## 시맨틱 URL

URL을 작성할떄는 시맨틱하게 작성하는 것을 권장한다.

* 조작하기 더 쉽다.
* 사용자가 웹과의 상호작용에 대해 더 명확히 한다
* 일부 검색엔진은 이러한 URL을 이용해 페이지 분류를 개선한다.


# data URIs

data: 스킴이 붙은 URL은 파일을 문서내에 inline으로 embed할 수 있게 해준다.

## 구성
* data : 
* MIME type : 데이터 타입을 가리킨다.  
eg. image/jpeg, text/plain

* base64 토큰 : text가 아닐경우 사용
* data 자체

# MIME 타입

클라이언트에게 response된 문서의 다양성을 알려주기 위함
웹에서는 확장자가 별로 중요한 것이 아니다.

구조 : type/subtype (소문자로 작)

eg. 

* text/plain, text/html
* image/png, image/gif
* audio/webm , video/webm
* application(모든 종류의 이진테이터)/xml, 

* multipart/form-data HTML Forms와 POST에서 사용 되는 for-data
* multipart/byterabges 문서의 하위 집합만 전송

# WWW vs non WWW 

어느것을 사용하던지 우리는 표준 URL로 지정한 Domain으로 리다이렉트 시켜줘야한다.

<link rel="canonical"> 엘리먼트를 통해 정규주소를 알려주고, 동일 페이지를 여러번 인덱싱하는 것을 방지해 SEO상의 불리함을 방지해준다.