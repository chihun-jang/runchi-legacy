---
title: 'OS-System_Structure2'
date: '2020-05-12'
category: ['OS','CS']
draft : False
---

### CPU와 Memory

CPU + Memory ==> Host영역

**CPU**는 매순간순간 **Memory**에서 기계어를 읽어서 실행하는데
이를 가리키는게 CPU에 **register에 있는 PC**(Program Counter)이다.

Memory에 올라간 기계어는 instruction인데,
instruction 실행도중 중간에 **interrupt가 요청되면 제어권은 CPU**로 넘어가고 interrupt를 처리하고 넘어간다.

> 인터럽트의 처리 ( 인터럽트 벡터 => 처리루틴 )

이와같은 과정은 
권한(I/O Device접근, 메모리주소접근)에 제한이 있는 
modebit 1(사용자모드)가 SystemCall을 요청하게 되면 일어난다

> 인터럽트 종류   
> 하드웨어 : 하드웨어가 직접 interrupt를 검   
> 소프트웨어(Trap) : Syscall , Exception   
>     Timer : 시간이 지나면 다음 프로그램에 cpu의 제어권을 넘겨주기 위해 인터럽트를 건다. 소프트웨어 인터럽트의 종류

### 입출력의 종류(Sync, Async)

* Sync I/O : I/O 작업 End => 사용자 프로그램 실행
  (CPU를 가지고 있든 없든 프로세스가 기다리고 작업결과물을 기다리고 있음)
* Async I/O : I/O 작업 Start => 사용자프로그램 실행
  (CPU를 가지고 인스트럭션을 바로 실행)

위의 두작업 다 종료는 Interrupt를 통해 알려줌


> 동기식 입출력 구현방법(CPU를 가지고 있는지를 기준)
> 1. CPU를 가지고 있음으로써 아무 일도 못하고 있는경우
> 2. 다른 프로세스에 CPU를 넘겨주는 방법(일반적으로 얘기하는 동기식 입출력 구현)

### DMA

DMA : Device Controller가 device의 buffer storage 내용을 memory에 block단위로 전송

###  I/O에 대한 두가지 방법
* instruction: memory 접근  | I/O Device 접근  <== 나뉘어져있다.
* Memory Mapped Instruction : I/O Device 에도 mem 주소를 mapping해서
memory접근 처리(instrunction방식으로 한번에)

### 저장장치 계층구조

| CPU|속도⇧ 저장공간⇩ 휘발성○|
| -|-|
|Register||
|Cache Memory|---여기까지 Primary(Exxcutable)---|
|Main Memory | |
|Disk 등..| |

> Primary 영역 : CPU 가 직접 접근 가능( Byte 단위로 접근한다)
> 아닌경우는 sector단위로 접근하기때문에 CPU가 접근 불가능하다   
> Cache : 재사용을 보다 빠르게 해주기 위해사용

### 프로그램은 어떻게 실행되는가? 

실행파일을 실행하면 Process가 생성되는데
Virtual Mem 을 거쳐 Physical Mem에 올라가게 된다

실행된 Process 는 주소공간을 가지는데

|구조| 설명 |
|-|-|
|code |기계어코드 |
|data |자료구조 |
| stack | data를 쌓고 꺼내가기 위함|

물리적 메모리에 Kernel은 일정부분 상주해있지만
Process는 실행될떄 필요한 부분만 올라감

사용되지 않는 부분은 Swap Area라고 불리우는 Mem 공간의 연장선상으로 쓰이는 disk에 저장된다( 이 disk는 Mem 처럼 휘발된다. )

나중에 하드웨어의 작용으로 인해 Virtual Mem 주소가 Physic Mem 주소로 바뀐다.


#### 커널 주소공간의 내용

* code : 시스템콜, 인터럽트 처리코드, 자원관리 코드
* data : **PCB**(Process Controll Block),CPU 나 Mem등 하드웨어에 따라 자료구조를 준비하지만 우리는 Process를 관리하는 자료구조PCB를 보자.
* Stack : 사용자프로그램마다 따로 스택을 두는데 이유는 시스템콜을 프로그램마다 요청할 수 있기때문


### 함수의 사용

사용자정의함수, 라이브러리함수 등은 사용자 프로그램안에서 자기들끼리 jump할수 있는데
kernel함수는 mem에서 보았듯 따로 virtual 주소공간도 구성하고, 
mem안에서도 따로 분리된 영역에 위치하기때문에 접근불가능 하다.

**따라서 시스템 콜을 통해서 kernel함수를 불러와서 사용한다**


> 프로그램은 Kernel mode ⇄ user mode 의 연속이다.