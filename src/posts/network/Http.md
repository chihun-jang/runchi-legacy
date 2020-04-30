---
title: "Http"
date: "2019-01-28"
category: ['network']
draft : False
---


## 🔌Network - HTTP


개요

브라우저에 URL 을 입력하면 브라우저는 URL의 의미에 따라 *request massage*를 만든다
그리고 이 massage를 web server에 보내주게 되는데 메세지를 보내는것은
디지털 데이터를 운반하는 구조인 OS에 내장된 네트워크 제어용 소프트 웨어에 의뢰하여 massage를 server까지 전달한다


> 💡 www.blogger.com 에서 www는 웹서버에 붙인 이름이다.   
우리가 흔히 알고 있는 worlde wide web 은 프로토콜을 나타내는게 아닌 웹을 설계한 사람이 최초로 만든 browser겸 html editor에 붙인 이름

>💡브라우저를 비롯한 네트워크 애플리케이션은 네트워크를 제어하는게 아니라 OS에 의뢰 하여 네트워크를 제어한다




### URL


#### URL입력

URL( uniform Resource Locator )
우리가 흔히 보는 http:// 뿐만 아니라 https:// . file: ,mailto: 등 여러가지가 있다

우리가 사용하는 브라우저는 복합적인 클라이언트 소프트웨어로 URL의 종류에 따라
FTP (파일을 업로드 다운로드 할때 사용하는 Protocol<통신규칙>) 서버에 엑세스, 웹서버에 엑세스 등과 같은것을 선택적으로 사용할 수 있다.

따라서 액세스 대상에따라 URL 맨 앞에 프로토콜 종류가 적혀진다.(정확히는 file:과 같이 네트워크를 사용하지 않는 애들도 있기 때문에 액세스 방법이라고 생각해주자)


#### URL해독

|http:     |        //         |     www.webserver.co.kr  |    /   |  dirc   |/|     file.html|
|-|-|-|-|-|-|-|
|액세스방법 |  다음이서버란걸알려줌  |      웹서버 이름    |   | 데이터의 출처 파일의 경로 ||
                      



웹서버에 저장된 dirc 이라는 directory아래에 있는 file.html을 찾아간다


파일의 경로 부분이 생략될 경우를 대비해 서버측에서는 default 값을 설정해두는데 일반적으로 우리가 많이 쓰는 index.html이 이와같은 방법이다



|http://server.com/direc  |  http://server.com/     |      http://server.com|
|-|-|---:|
|direc 밑에 index찾음   |                root direc 밑에 index찾음||


http://server.com/random   과 같은경우 /가 안 붙어서 file로 보아야하지만 file과 directory 이름은 중복될수 없으므로 file일 경우 file을 불러오고 directory일 경우 directory내 default값



### Requset & Response


#### request : 서버에 요구사항을 보내는 메세지


무엇 = URI (uniform Resource identifier) =  액세스 대상을 통칭

데이터를 저장한 파일의 이름이나 CGI(common gateway interface 웹 서버에서 프로그램 호출할때 규칙) 프로그램의 파일명
뿐만아니라 http로 시작하는 URL을 사용할 수도 있다


어떻게 = Method

* GET : URI로 지정한 정보를 가져온다.(파일의 경우 파일의 내용을, 프로그램의 경우 출력데이터)
   
       request 메세지에 method에 GET이라 쓰고
       URI부분에 파일의 경로를 작성하게 되고 웹서버가 데이터를 추출하여 response해주면
       브라우저가 페이지 데이터를 추출해 화면에 표시


* POST : 클라이언트에서 서버로 데이터 송신 (form에 입력한 data송신)

         폼에 데이터를 웹서버에 송신하는경우에 사용한다
         URI부분에 프로그램 파일명이 들어가는데 index.cgi / index.php 등 처리프로그램이 들어가게되고
         request메세지 안에 송신 data를 포함시켜 웹서버는 해당 data를 프로그램에 전달해주고
         그에 대한 출력 값을 response해준다


* PUT : URI로 지정한 서버의 파일을 치환(파일이 없는 경우에는 새파일 생성)


* DELETE :  URI로 지정한 파일 삭제



#### response : 리퀘스트의 요구에 대한 결과

*(실행 결과에 대한) status code + header file + pagedata*

클라이언트가 response 메세지에서 데이터를 추출하여 표시



#### HTTP(Hyper Text Transfer protocol)프로토콜의 개념

클라이언트와 서버가 주고받는 메세지의 내용이나 순서를 정한것


*Requset massage*
```
<method><공백><URI><공백><HTTPversion>     -- request line
<필드명>:<필드값>
 -                                                            -- massage header (request의 부가정보)
 -                                                               한행에 한개의 header필드

 

 -                                                               여기까지 header
<공백 행>                                               
<메세지 본문>(post만 있음)                        -- 클라이언트 -> 서버로 송신하는 data
```


*request 메세지를 보내는 법*

1. URL 입력상자에서 URL입력    -  GET

2. 폼 데이터의 submit  (get 의 경우 URI?querystring 형태, 짧은내용)   GET & POST 가능

3. 하이퍼링크 클릭    - GET



*Response massage*
```
<HTTPversion> <공백> <status code> <공백> <status massage>
<필드명> : <필드값>
-
-
-
<공백행>
<메세지본문>
```

*Response Status Code*

1xx   :   처리의 결과 상황 등을 통지

2xx   :   정상 종료

3xx   :  무언가 다른 조치가 필요

4xx   : 클라이언트 측의 오류

5xx   :  서버측의 오류



>💡 media는 어떻게 response할까?   
브라우저는 해당 메세지를 분석해 화면에 출력해주게 되는데
영상, 이미지와 같은 태그를 만날경우 해당 부분을 공백처리하고 넘어간 뒤
해당 태그의 URI를 web server에 요청해 response를 받는 작업을 수행한다   
따라서 4개의 media tag를 가진 html 페이지를 불러오기위해서 총 5번의 request를 해야한다( 문장 1번, 미디어 4번(binary형태의 response 메세지본문 수신) )   
web server는 1번의 request 에 대해 1번의 response만 해줄뿐이다.



💭header field type

common

               DATE   :   메세지가 작성된 날짜

               Transfer - Encoding : 메세지 본문의 인코딩 방식


request


               User-Agent   :     클라이언트 소프트 웨어 정보

               Accept    :   클라이언트측이 content-Type으로 받는 데이터의 종류

               Host     :    리퀘스트 받는 서버의 IP 주소와 포트번호


response

               Server    :    서버 소프트웨어의 정보


Entity header

               Allow : 지정한 URI 로 사용가능한 메소드를 나타낸다

               Content-length  :  메세지 본문의 길이를 나타낸다

               Content-type    :   메세지 본문의 데이터 종류

               Last - Modified   : 정보를 최종 변경한 일시

               Content- Location : 메세지 본문이 서버의 어디에 있는지 위치를 나타냄

출처 : 성공과 실패를 결정하는 !%의 네트워크 원리