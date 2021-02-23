---
title: JWT를 공부해보자
date: 2021-02-22T05:32:02.590Z
category:
  - FrontEnd
draft: true
---
# JWT란?

Json Web Token의 줄임말로 client - sevrer or service - service 사이에서 인가(Authorization,인가)을 위해 사용하는 Token


인증 : 식별가능한 정보로 서비스 등록된 유저의 신원을 확인

인가 : 권한에 대한 허가, 즉 인증된 사용자에 대한 자원 접근권한 확인

URL에 대해 문자열로 구성되어있기에 HTTP의 어디든 위치할수 있다.

구조 : 
HEADER.PAYLOAD.SIGNAURE (이와같이 세부분을 . 으로 구분한)


## HEADER 

JWT를 증하는 정보를 가진 JLSON은 BASE64 URL - Safe 인코딩 된 문자열이다.
```javascript
{
 'alg':"ES256",
"kid" : "key ID"
}
```

이 객첸를 문자열로 직렬화 한후 UTF-8과 Base64~ 로 인코딩하면

Base64URLSafe(UTF-8('{"alg": "ES256","kid": "Key ID"}')) ->eyJhbGciOiJFUzI1NiIsImtpZCI6IktleSBJRCJ9

이렇게 된다.

## PAYLOAD

JWT의 내용으로 속성들을 Claim Set이라 부른다.
JWT에 대한 내용(token 생성자의 정보나 생성일시) 혹은 cli-server간 주고받기로 한 값으로 구성된다.

## Signature

.을 구분자로 해서 Header + Payload를 합친 문자열을 서명했다.
서명은 Header의 alg에 정의된 alg과 Secret key를 이용해 생성하고, 인코딩은 똑같이 한다.

Base64URLSafe(Sign('ES256', '${PRIVATE_KEY}', 'HEADER.PAYLOAD
')))
 
JWT는 위의 세개를 다 합친것=> alg kid속성과 공개키를 이용해서 검증한다.

## 구현 프로세스
1.  Pub, Private KEy생성, JWT 생성과 검증에 필요한 Key를 알고리즘으로 생성한다.
2.JWT 생성 : HEADER와 PAYLOAD를 인코딩하고 한친 문자열을 비밀키로 서명
3. 검증은 공개키로 검증

JWT는 사실 JWS의 추상화 클래스... 이고 이를 보편적으로 부르는 말이긴 한데..
뭐 그렇다.
그러면 서명말고 데이터 암호화는 언제 하는가 생각을 해보면 TLS라는 통신시 암호화를 하고있기때문에 따로 암호화 할 필요가 없다.

Base UPRL-Safe != Base64 

Safe로 인해서 +가 -로 /가 _로 대체되어서URL,Cookie, Header등 사용의 범용성을 가지게 되었다.

HEADER는 Base64이전 UTf-8로 인코딩되어야하는데JSON의 기본 인코딩이 UTF-8이기 때문이다.
반면 Payload는 굳이 JSON이 아니어도 상관없다.


============
server는 JWT생성시 JWT검증이나 권한 인가시 필요한 값을 넣으면 되기때문에 따로 상태관리를 안해도 된다.

서명: 비밀 키를 가진 극소수(주로 한명)만 데이터에 서명할 수 있다. 공개 키를 가진 아무나 데이터의 서명을 검증할 수 있다.


암호화: 공개 키를 가진 아무나 데이터를 암호화할 수 있다. 비밀 키를 가진 극소수만 데이터를 복호화 해 확인할 수 있다.
