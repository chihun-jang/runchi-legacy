---
title: 'Process Management'
date: '2020-05-19'
category: ['AWS']
draft: True
---

프로세스 Syncronization

데이터의 접근 :

1. Data가 저장되어있고
2. 연산할 data를 읽어오고
3. 연산을 하고
4. 연산결과를 반홚가ㅗ

이때 생긱는 문제 :
Storage box 를 두개의 ExecutionBox가 공유하면서 사용하면 어떻게 될까
즉 Race Condition상태이면 어떻게 해야할까? -- 이런부분을 조율해야할 필요성이있다.

Storage box - Execution -Box
Memory CPU
디스크 컴퓨터 내부
프로세스의 주소공간 프로세스 (이경우에는 문제가 잘 생기지는 않는다 왜냐면 독자적인 주소공간을 사용하기때문에)

================================
멀티프로세서 시스템에서는 race condition문제가 발생해서 해결해줘야한다
공유메모리를 사용하는 프로세스의 경우,
중요! 프로세스들이 본인이 실행할수없는 부분을 시스템콜을 요청하는데
커널의 코드가 실행되면서 커널의 코드에 접근될수있는데 이러할때 race condition
(ex. 커널모드 수행중 인터럽트가 들어올때)

예제:
커널의 코드 수행도중 인터럽트가 들어와서 실행되어버리면
context가 save 되어진애의 값은 놔두고 인터럽트를 처리해주기때문에 인터럽트에서 기존의 context를 변화시키는 작업이있다하더라도 그부분은 반영이 안될수가있따.

그래서 이러한 부분을 막기위해서 disable interrupt를 사용해서 막아주면된다

사용자 프로세스가 2개가 실행되고 있는데
만약 사용자 프로세스가 user mode가 아니라 kernel모드로 사용되던 와중에
time sharing으로 CPU가 넘어가버리면
위의 예제와 같이 kernel상에서 변경하던 context때문에 중간에 작업한 내용에 대해서는 반영이 안 될수 있다.
따라서 이러한 부분을 해결하기 위해
커널모드 수행중일때는 CPU를 preeempt 하지 않는다(뺏어오지않는다)

CPU가 여러개 존재하는 경우:
CPU가 data에 접근할때 lock을 걸어야한다 그리고 사용이 끝나면 unlock이 된다

방법1. 커널 전체에 한번에 1개의 CPU만 들어갈수있께
방법2. 커널내부에 공유데이터에 접근할때 data마다 lock을 걸어서 보호해준다

Process Synchronization 문제:
공유데이터를 동시접근할때 데이터의 불일치 문제가발생할수있꼬
일관성 유지를 위해 프로세스간의 실행순서를 정해주는 과정필요,
Race condition을 막아주기위해

Critical section Problem(임계구역)
공유데이터 안에 들어가는 코드구역에 들어가면 공유데이터 접근을 막아줘야한다

그리고 이러한 critical section을 잘 다루기위해 여러 알고리즘이 요구된다.
