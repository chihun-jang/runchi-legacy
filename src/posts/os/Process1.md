---
title: 'Process - (1)'
date: '2020-05-16'
category: ['os']
draft : False
---


* **프로세스** : 실행중인 프로그램
* **context** : 프로세스의 문맥(특정 시점에서 프로그램이 얼마나 실행되었는지)

> 프로세스 실행의 흐름:
> ex) 프로세스가 실행되면 주소공간이 생기는데  program counter가 code 부분을 가리키고, 인스트럭션을 읽어와 이를 register에 등록하고 ALU를 이용해서 해당 연산을 실행한다.


context는 크게 2가지로 나뉘는데

* CPU수행상태를 나타내는 하드웨어 문맥(**register가 어떤 상태를 가지고 잇는지 ,PC**)
* **프로세스의 주소공간(code data,stack)**


> 프로세스 관련 커널자료구조    
> 프로세스가 생성될때마다 운영체제가 PCB자료구조(커널스택 안에 있음)를 만들어준다.  
커널스택 : 함수들로 구성되어있고 code에서 함수호출 후에 return부분을 stack부분에다가 쌓아준다. 따라서 각 **프로세스마다 커널스택도 따로 두고있다**.

>📍 context를 쓰는 이유?
timesharing으로 프로세스별로 CPU를 나눠서 쓰기때문에 알고있어야지 쉐어링후에 **_이어서 처리_**해줄수있다.


### 프로세스의 상태(CPU1개기준)

* **_Running_** : CPU를 잡고 instruction을 수행중인 상태
* **_Ready_** : CPU를 기다리는 상태(**메모리에 올라온 상태**)
* **_Blocked_** (wait , sleep) 당장 CPU를 주어도 실행시킬수 없는 상태(I/O와 같은 오래 걸리는 일을 하고있어서 당장 일을 할수없다.)

New : 프로세스가 생성중인 상태
Treminated 수행이 끝난상태(사실 이미 종료된 상태라면 프로세스가 아니기는 하지만)

```python
new => ready => running => terminated or waiting(blocked) or timerinterrupt(ready)                         
```
마치 놀이기구와 같다. CPU는 아주 빠른데 대기해서 받아야하는게(마치 롤러코스터)

그리고 이러한 것들은 `queue`로 관리되는데 주소공간에 data부분에 queue자료구조를 만들어서 관리해준다.


### PCB의 구성 :

1. OS가 관리상 사용하는 정보(Process state, Process ID, scheduling information, priority)
2. CPU수행관련 (PC, register)
3. 메모리관련 (code data stack)
4. 파일관련 (openfile desc)


### Context Switch 
- **_CPU를 다른 프로세스로 넘겨주는 과정_**
- 프로세스가 CPU를 빼앗길떄 운영체제가 프로세스의 PCB에 찾아가서 저장하고 다음 프로세스 PCB에서 찾아서 CPU memory에 올려 실행한다.

>**system call** , **interrupt**(컨트롤러 같은 장치가 CPU를 제어하기위해)
systemcall이나 interrupt 발생시 반드시 context switch 가 일어나는 것은 아니다(얘들은 프로세스 -> 운영체제로 넘겨주는 것이기때문에)

예시 ) 

* Context Switch X : processA -> ISR(인터럽트 서비스 루틴) , system call - > processA 
* Context Switch O : process A -> timer interrupt , I/O interrupt -> processB


context switch는 **cache memory flush**가 발생하고 이에 overhead가 크다.
이에비해 systemcall과 같은 usermode 에서 kernel mode로 왔다갔다 하는것은 부담이 덜하다


### Process Scheduling Queue
* **Ready queue** : 메모리 내에있으면서 CPU가 실행되기를 기다리는 프로세스
* **Device queue** : I/O 처리를 기다리는 프로세스
* **Job queue** : 모든 프로세스

>queue는 PCB 를 줄세워서 관리한다.

### Scheduler

* Short-term scheduler(CPU스케쥴러)
  - 빠르다 (ms 단위)
  - 프로세스에 CPU를 주는 문제
  - 어떤 프로세스를 다음에 running할지 결정
* Long-term scheduler(job scheduler)
  - 시작 프로세스중 어떤것을 ready queue로 보낼지 결정
  - 프로세스에 memory을 주는 문제
  - **degree of Multiprogramming** 을 제어(시작 프로세스를 몇개나 mem에 올릴것인가)

> 적당한 **degree of Multiprogramming**이 중요하다(일반적인 timesharing system(현대의 운영체제)은 장기스케줄러가 없고(대신 중기스케줄러가 있다) 무조건 memory에 올린다(ready상태))

* Medium-term scheduler (Swapper)
  - **여유공간을 위해 프로세스를 통째로 메모리에서 disk로 쫓아냄**
  - 프로세스에게서 mem을 뺏는 문제,
  - **degree of Multiprogramming** 제어,

>따라서 현대의 운영체제에는 Midium-term scheduler 덕분에 **_suspended_** 라는 **process State** 가 추가되었다.

* **_Suspended_** : **외부적인 이유**로 프로세스 수행이 정지, 통째로 디스크에 swap out이 된다.   
ex) 1.사용자가 프로그램을 일시정지  2. 시스템이 여러이유로 프로세스를 잠시 중지시킴

>**Blocked** vs **Suspended**   
>Blocked : 자신이 요청한 evnet가 만족되면 ready,
>Suspended : 외부에서 resume 해주어야 active 

> 커널모드도 **사용자의 프로세스가 커널모드로 running하고 있다고 하는거지 운영체제가 running하고있는거라고 말하지 않는다**.

> +Suspended상태도 세부적으로는 blocked가 있고 ready가 있는데 CPU를 사용하지 않더라도 프로세스 자체적으로 blocked 에서 IO작업같은게 끝나면 ready상태로 넘어가기도 한다.

