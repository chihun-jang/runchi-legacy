---
title: "서버에 접속하기"
date: "2019-02-08"
category: ['Network','CS']
draft : False
---

### 🔌서버에 접속


소켓을 만들면 애플리케이션(브라우저)은 `connect`를 호출
그러면 클라이언트의 소켓은 서버측 소켓에 접속하는데 케이블은 항상 접속된 상태이므로

**데이터 송수신이 가능한 상태로 만드는 동작**을 알아보도록 하자


### 접속의 의미는 무엇일까

소켓을 만든 직후엔 아무것도 기록되어 있지 않아 통신상대가 누구인지 알수 없다

브라우저는 IP주소와 포트번호를 조사하여 알고있지만 
**소켓을 만드는 동작으로는 프로토콜 스택에는 아무것도 전달되지 않는다**

즉 *브라우저가 알고있는 서버의 IP주소나 포트번호를 프로토콜 스택에 알리는 동작이 접속동작*의 역할

 
>서버 사이드에서 생각을 해보면 서버측 애플리케이션은 상대도 알수 없기때문에 아무것도 없는 상태인데
이때 **클라이언트에서 클라이언트의 IP와 포트번호를 들고 서버측에 전달을 하게 되는것도 접속 동작**의 역할

즉 **접속동작의 첫번째는 통신상대와 제어정보(클라이언트측의 IP, 포트번호)를 주고받아 소켓에 필요한 정보를 기록하고 데이터 송수신 가능상태로 만드는 것**

이떄 임시저장 메모리영역이 필요한데 '버퍼메모리'라 하고 접속시에 확보된다




>제어정보       
클라이언트가 서버와 주고받는 통신 전체에 필요한 내용 TCP 프로토콜의 사양으로 규정



### 헤더에 기록되는 제어정보

**패킷의 간략한 구조**



|<-- 패킷의 진행방향|||
|-|-|-|
| 이더넷이나 IP의 제어정보 |      TCP의 제어정보       |      데이터 조각         |

접속동작의 단계에서는 **데이터의 송수신이 없으므로 데이터조각이 없는 형태**
패킷의 제일 앞 제어정보가 위치하는 부분을 헤더라고 하는데

각각 이더넷헤더(MAC 헤더), IP헤더, TCP 헤더라고 구분해서 적어준다


```
TCP 헤더의 고정된 항목들

    송신처 포트번호

    수신처 포트번호

    시퀀스 번호 : 패킷 데이터의 맨 앞 데이터가 송신데이터의 몇번째 byte에 위치

    ACK 번호 : 데이터가 몇 byte까지 수신측에 도착했는지 수신측이 송신측에 전달하기 위함

    데이터 오프셋 : 데이터 부분이 어디부터 시작하는지 나타냄 ( 헤더의 길이를 나타냄 )

    컨트롤 비트 : 여러 비트들이 각각 통신 제어상의 의미를 가짐

    윈도우 : 수신측에서 송신측에 윈도우 사이즈(수신확인을 기다리지 않고 묶어서 송신할 수 있는 데이터양)

    체크섬 : 오류 유무를 검사

    긴급 포인터 : 긴급하게 처리해야할 데이터의 위치
```

헤더는 **통신의 성립에 중요한 요소이며 헤더의 이해는 통신 동작의 이해와 연결**된다



### 소켓에 기록되는 제어정보 

프로토콜 스택의 동작을 제어하기 위한 제어정보(메모리영역에 기록)
송,수신 동작의 진행상황 등이 기록되며 프로토콜 스택에 따라 달라진다 **(IP주소나 포트번호는 공통)**

소켓의 제어정보는 상대측에서 볼 수 없는데 헤더의 제어정보로 통신을 하기 때문에
다른 운영체제의 다른 프로토콜 스택에서도 문제없이 가능하다





### 접속동작

애플리케이션(브라우저) : Socket 라이브러리의 `connect` 호출

`connect(<디스크립터> , <서버측의 IP주소와 포트번호 >, ..... )`

프로토콜스택의 TCP 담당부분에 전달, 서버측의 TCP 담당부분과 제어정보 통신

1. **데이터 송수신 동작의 개시**를 나타내는 제어정보 헤더 생성(송,수신처 포트번호 중요)

2. 컨트롤 비트의 `SYN` 비트(**송신측과 수신측의 일련번호를 서로 확인** 하여 접속 동작)를
    1로 만들고 시퀀스 번호나 윈도우 설정

3. IP담당부분에 TCP헤더를 전달하여 송신 의뢰

4. 패킷 송신

5. 서버측 IP담당부분이 받아 서버측 TCP부분으로 전달

6. TCP헤더 조사하여 소켓 매칭(수신처 포트번호 있으니) (`접속동작 진행중`)

7. 서버측 TCP 응답메세지 회신
접속할수 없는 경우에는 `RST`(접속을 강제종료, 이상이 있을시 사용)비트를 1로 만든다.
`ACK` 비트 1 (패킷이 도착함을 알림)로 설정하여 회신

--회신의 절차 또한 송신의 절차와 같다--

8. 응답 메세지의 `SYN`이 1이면 접속 성공이므로 소켓에 서버의 접속완료를 나타내는 제어정보 기록

9. 서버의 응답메세지가 도착한것을 알리기위해 `ACK` 비트를 1로 만든 TCP헤더 반송

10. 접속동작 끝( 데이터 송수신 가능 상태)


>Connection(=Session)을 확립하다 , Connection을 깔다   
연결되어 있는 상태를 connection이라 하고 커넥션이 이루어지면 connect로 넘어갔던 제어가 애플리케이션으로 다시 넘어온다