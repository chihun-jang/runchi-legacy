---
title: HTTP란 무엇인가
date: 2021-02-23T16:30:49.653Z
category:
  - FrontEnd
draft: true
---
# HTTP?

HTML문서같은 자원을 가져올 수 있도록 하는 프로토콜   
web의 데이터교환의 기초이며 Client - Server 사이의 프로토콜 

이때 HTML문서는 text, img, script,css 등 하위 문서들로 구성된다.



Client인 Browser가 전송하는 msg를 requests, SErver에서 응답하는 것을 responses라고 한다.



HTTP는 어플리케이션 계층의 1990년대 설계된 확장가능한 프로토콜로, 신뢰가능한 프로토콜이라면 무엇이든 사용할 수 있지만 

TCP나 암호회된 TCP인 TLS를 통해 전송된다.

HTTP의 확장성 덕에 img, HTML form과 같은 내용을 POST하기위해서도 사용된다.



# HTTP기반 스템 구성요

request는 하나의 개체, user-agent(또는 Proxy)에 의해 전송된다.

일반적으로 user-agent는 browser가 되지만 크롤러의 경우 robot이 될 수도 있다.

뿐만아니라 요청과 응답사이에 gateway 또는 프록시가 있다.

# Client : User-Agent 
사용자 에이전트는 사용자를 대신해 동작하는 도구로,
일반적으로 브라우저에 의해 수행되고 브라우저는 항상 요청을 보내는 개체이다.

# 서버
클라이언트의 요청에 대해 문서를 제공

# 프록시
여러계층으로 이루어진 web stack 구조에서 대부분은 transfer, network 계층에서 동작하며 성능에 큰 영향을 주지만 HTTP계층에서는 눈에 보이지 않는다.

하지만 어플리케이션 계층에서 동작하는 것을 일반적으로 Proxy라고 부른다(눈에 보이기도 안보이기도 함.)

* 캐싱
* 필터링
* 로드 밸런싱
* 인증
* 로깅


# HTTP의 특징

* HTTP는 간단하다.
* 확 가능하다.(HTTP 헤더를 이용)
* HTTP는 stateless하다. -> HTTP cookie로 session을 만든다.

* HTTP는 신뢰할수 있는 연결을 요구, TCP는 신뢰할 수 있지만, UDP는 그렇지 않다.(최근에는 구글에서 신뢰성있고 효율적인 전송 프로토콜을 위해 UDP기반의 QUIC을 냈다.)

client와 server가 HTTP를 교환하기 전 TCP연결을 해야한다. 즉, HTTP/1.0 에서는 request - response 에 대해 별도의 tCP를 여는데 비효율성으로 인해HTTP/1.1부터 파이프라이닝 개념과 지속적인 연결의 개념을 도입했다.( connection header를 사용해서 제어하고, HTTP/2부터는 다중전송을 가능하게 했다)

# HTTP로 제어할 수 있는것

* 캐시 : 캐시되는 방식을 제어할수 있다. server는 대상과 기간을 프록시와 클라에 지시할수 있고, 클라는 캐싱된 문서를 무시하라고 프록시에게 지시할 수 있다.

* origin : 스누핑
(네트워크 상에 떠도는 정보를 몰래 획득, 유사하게 스푸핑-사용자의 시스템 권한을 획득하여 정보를 빼감, 스니핑- 다른 사람들의 패킷교환을 훔쳐보는 행위)
과 프라이버시 침해를 막기위해 웹사이트간의 분리를 강제하는데, 동일한 origin으로 온 page만이 page의 전체정보를 접근할수 잇다. (HTTP header를 통해서 완화시킬 수 있다)

* 인증 : HTTP를 통해 www-Authenticate or 유사 헤더를 사용해 제공 되거나 HTTP 쿠키를 사용할 수 있다.

* 프록시와 터널링 - 실제 주소를 숨기기도 한다.

* 세션 : 쿠키사용은 stateless 프로토콜임에도 session을 만들수 있게 한다.

# HTTP 흐름

1. TCP 연결을 연다.
2. HTTP msg를 전송한다. (HTTP/2이전은 사람이 읽을수 있지만 HTTP/2이상으로는 frame속으로 캡슐화된다)
3. server로부터의 response를 읽는다.
4. 연결을 닫거나 다른 request를 위해 재사용한다.

> 이때 HTTP 파이프라이닝이라는 것은 첫번째 응답을 기다리지않고 여러 요청을 보낼수 있다.
 
# HTTP Msg

HTTP/1.1은 사람이 읽을수 있고, HTTP/2는 이러한 msg를 최적화하였다.

## request

* HTTP method : GET(리소스 가져오기),POST(폼의 Data전송), OPTIONS,HEAD 
* 가져오려는 리소스 경로(프로토콜, 도메인,TCP포트를 제거한 순수 URL)
* HTTP 프로토콜 버전
* 서버에 추가정보를 전달하는 HEADER
* 전송된 리소스를 포함하는 본문

## response

* HTTP 버전
* HTTP 상태코드
* 상태코드의 설명을 적은 메세지
* request 헤더와 비슷한 HTTP 헤더
* 가져온 리소스가 포함된 본문

# HTTP 기반 API

XMLHttpRequest API,Fetch API, Server-Sent Events(SSE)-서버가 요청없이 HTTP를 이용하여 전송 -클라는 HTTP 스트림으로 도착한 msg를 Event객체로 변환하여 이벤트 핸들러나 onmessage 핸들러로 전달한다.

