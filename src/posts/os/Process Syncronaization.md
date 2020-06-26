---
title: 'Process Management'
date: '2020-05-19'
category: ['AWS']
draft: True
---

### 프로세스 Syncronization

데이터 접근 순서

1. Data가 저장되어있고
2. 연산할 data를 읽어오고
3. 연산을 하고
4. 연산결과를 반환하고

> 이때 생기는 문제 Storage box 를 두개의 ExecutionBox가 공유하면서 사용하면 어떻게 될까?? => 즉 **_Race Condition_**상태이면 어떻게 해야할까? => 이런부분을 조율해야할 필요성이있다.

| Storage box         | Execution                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------- |
| Memory              | CPU                                                                                       |
| 디스크              | 컴퓨터 내부                                                                               |
| 프로세스의 주소공간 | 프로세스 (이경우에는 문제가 잘 생기지는 않는다 왜냐면 독자적인 주소공간을 사용하기때문에) |

================================

---

멀티프로세서 시스템 혹은 공유메모리를 사용하는 프로세스의 경우에는 **_Race Condition_**문제가 발생해서 해결해줘야한다

### 단일 프로세스

> 🍕 프로세스들은 본인이 실행할 수 없는 부분에 대해 시스템콜을 요청하는데 커널의 코드가 실행되면서 커널의 코드에 접근할수 있다.
> 이를 race condition이라 하는데 이때 발생하는 이유는 커널에서 공유 data를 사용할 수 있기때문이다.(ex. 커널모드 수행중 인터럽트가 들어올 때 공유데이터의 무결함이 깨짐)

ex) 커널의 코드 수행도중 인터럽트가 들어와서 실행되어버리면 context가 save 된 애의 값은 놔두고 인터럽트를 처리해주기때문에 인터럽트에서 기존의 context를 변화시키는 작업이있다하더라도 그 부분은 **반영이 안 될수가있다**.

💡이러한 부분을 막기위해서 **disable interrupt를 사용해서 막아주면된다**

사용자 프로세스가 2개가 실행되고 있는데 만약 사용자 프로세스가 user mode가 아니라 kernel모드로 사용되던 와중에
time sharing으로 CPU가 넘어가버리면 위의 예제와 같이 kernel상에서 변경하던 context때문에 중간에 작업한 내용에 대해서는 반영이 안 될수 있다.
따라서 이러한 부분을 해결하기 위해 커널모드 수행중일때는 **CPU를 _preeempt_ 하지 않는다(뺏어오지않는다)**

---

### 멀티 프로세스

CPU가 여러개 존재하는 경우 CPU가 data에 접근할때 **lock을 걸어야한다** 그리고 사용이 끝나면 unlock이 된다

###### lock의 방법

-   방법1. 커널 전체에 한번에 1개의 CPU만 들어갈수있게(커널 전체에 `lock`이 걸리기에 비효율적)
-   방법2. 커널내부에 공유데이터에 접근할때 data마다 `lock`을 걸어서 보호해준다

_**Process Synchronization**_ 문제

공유데이터에 동시접근할때 데이터의 불일치 문제가발생할수있고
일관성 유지를 위해 프로세스간의 실행순서를 정해주는 과정필요,
Race condition을 막아주기위해

Critical section Problem(임계구역)
공유데이터 안에 들어가는 코드, 그리고 그 코드의 구역에 들어가면 공유데이터 접근을 막아줘야한다

그리고 이러한 critical section을 잘 다루기위해 여러 알고리즘이 요구된다.

cretical section을 막기위한 조건

-   Mutual Exclusion(상호배제) 한 프로세스가 들어가있으면 다른 프로세스가 접근할수없다
-   Progress 아무도 critial section에 없으면 들어갈수있게 허용해줘야한다
-   Bounded Waiting 유한대기, 크리티컬 섹션에 들어가기위해 1,2,3이있을때 1,2만 들어가고 3이 starvation이 들어가면 안된다.

고급언어는 CPU를제어하기위해서 단일 인스트럭션이 아니기때문에 진행하면서 CPU를 빼앗길수있다.

Algorithm1

```c++
do{
    while(turn !=0);
    critical section
    turn = 1;
    remainder section
}while(1);
```

위의 코드는 상호배제는 번갈아가면서 들어가므로 잘 돌아가지만
한 프로세스가 좀더 많이 들어가고 싶어해도 상대방이 들어갔다가 안나오면
들어갈수가 없으므로 진행 조건에 부합하지 않는다

```c++
do{
    flag[i]=true;
    while(flag[j]);
    critical section
    flag[i] = false
    remainder section
}while(1);
```

위의 코드는 동시에 flag를 들게되면 critical section을 들어갔다가 나와야지
flag가 변경이 되는데 서로 눈치만 보다가 못들어가므로 진행이 안될수있음

-   peterson's Algorithm

```c++
do{
    flag[i]=true;
    turn = j
    while(flag[j]&& turn ==j);
    critical section
    flag[i] = false
    remainder section
}while(1);

```

위는 중간에 어디에서 cpu를 빼앗겨도 3가지 조건을 모두 만족한다.
따라서 해당 문제를 풀기위해서 최적화 되어있다.

문제점: busy Waiting == spin lock (while문 안에 갇혀 계속 CPU와 mem을 쓰면서 wait해서 비효율적)

고급언어는 코드 하나하나가 단일 인스트럭션으로 이루어진게 아니므로
실행중에 CPU를 빼앗길수있는게 그런 경우를 따져줘야하므로 위와같이
lock을 거는게 복잡한 코드의 모양을 가진다.

하드웨어적으로는 아주 쉽게 해결할수있다.
(읽고 쓰는게 하나의 인스트럭션이라면 == Test_and_set(a)
하드웨어적으로 Test&modify를 atomic하게 수행할수 있도록 읽은값에 대해서 1(True)로 setting)

```c++
do{
    while(Test_and_set(lock));
    critical section
    lock = false;
    remainder section
}
```

test and set 인스트럭션을 이용하면 lock의 값을 바꿔주면서 0이면 안들어가있으니 1로 바꾸고 들어가고
lock이 1이면 while문을 실행하면서 기다렸다가 critical section으로 들어가고

### Semaphores

추상자료형 : 정수값과 operation이 있다.
semaphore도 일종의 추상자료형

semaphore S
정수형 : 자원의 갯수(S)
정수형이 5개면 P연산이 5번 일어나서 자원을 사용할수있다.

아래 두가지 atomic 연산에 의해서 접근가능

P연산 -- 자원을 획득하는 과정(while S<= 0 do no-op; S-- )
V연산 자원을 반납하는 과정(S++)

프로그래머 입장에서는 추상자료형으로 제공된 semaphore로 구현해서 사용하면된다
busy-wait (효율적이지 못함 = spin lock )
==> Block & wakeup (=sleep lock)

프로세스가 CPU를 사용하게 하는게 아니고 blocked시켜서 재워 놓는다

block wakeup implementation

> mutex : mutual exclusion

```c++
typedef struct
{
    int value; /*semaphore*/
    struct process *L /*Process wait queue*/
}
```

P(S):

```c++
S.value--;
if(S.value<0)
{   add this process to S.L;
    block();
}
```

V(S):

```c++
S.value++;
 if(S.value<=0){
     remove a process P from S.L;
     wakeup(P)
 };

```

여기서 S.value가 음수라는것은 누군가가 기다리고 있다는 것이기때문에 깨워서 사용한다

일반적으로 Block/wakeup이 낫지만 B/W의 경우에도 overhead가 있기때문에
크리티컬 섹션의 길이가 짧으면 busy waiting을 써도 무방하다

semaphore
0 or 1만 가질수있는 바이너리 세마포어
숫자를 가질수 있는 카운트 세마포어

deadlock
두 프로세스가 2가지 작업을 해야하는데
서로 한개씩 나눠가지고 놓지않아서
작업이 마무리 되지않아 무한히 서로 기다리게 되는경우
(작업의 순서를 맞춘다)

starvation : 프로세스가 영원히 연산을 처리하지 못하고 굶어죽는것

프로세스 synchronization

bounded buffer problem(유한한 버퍼 문제)(생산자 소비자 문제)

전제조건: 프로세스는 생산자와 소비자로 나뉘어 공유 버퍼에 data를 넣고 빼서 쓴다
생산자가 비어있는 버퍼에 data를 넣을떄 lock을 걸고 넣어주고 다른 생산자가 lock이 풀리면 그다음으로 넣는다

소비자 또한 사용할때 lock을 걸고 lock을 풀어서 뺴오고
버퍼의 갯수를 생산자가 다 채우고 나면 소비자가 가져가야지 생산자가 다시금 연산을 할수있다.
따라서 비어있는 버퍼의 수가 자원량이될것이다.

반대로 소비자는 자원이 들어있는 버퍼의 수가 자원이다

즉 해야할일이

-   동시에 생산자, 소비자가 접근할수 없게 lock을 걸어주고
-   가득 찼는지 안찼는지 확인하기 위해 buffer를 세는 count semaphore의 용도로도 사용해줄수 있다.

세마포어 변수는 변수가 비어있는지 차있는지 체크해서 생산자나 소비자에게 준다.
binary
그리고 가용할수있는 buffer가 얼마나있는지 count해준다

Synchronization var

```c++
/*Producer*/

do{
    P(empty);
    P(mutex);
    add x to buffer
    V(mutex);
    V(full);
}while(1);


/*Consumer*/
do{
    P(full)
    P(mutex);
    remove an item from buffer to y
    V(mutex);
    V(empty)
}while(1)
```

-   Reader-Writers Problem
    읽는 process와 쓰는 Process 공유 DATA는 DB
    read는 동시에 여럿이 해도 된다.
    Writer는 block을 걸고 작업을 해준다

shared data

-   DB 자체
-   readcount

Synchronization variables

-   mutex : 공유변수(readcount의 mutual exclusion을 보장하기위해)
-   db : Reader와 writer가 공유 db자체를 올바르게 접근하게 하는 역할

```c++
/*Writer*/
P(db);
writing DB is performed
V(db);


/*Reader*/
P(mutex) /*얘는 readcount를 조작하는 과정에서도 동시에 조작이 되면 안되므로 mutex에 lock을 걸어주는 모양*/
readcount++;
if (readcount ==1) P(db);  /*만약 처음으로 읽으러 들어오면 DB에 lock을 걸어준다.*/
V(mutex)

reading DB is performed

P(mutex);
readcount--;
if (readcount ==0) V(db);
V(mutex)
```

위의 코드는 Reader가 사용하는 와중에 Reader가 계속 도착하면 Reader가 추가될수있으므로 그렇게 되면
Writer는 starvation이 될수있다.
하지만 이런 부분을 보완하기 위해 우선순위 큐와같은것을 이용해줄수 있따.

-   철학자 원탁문제
    철학자가 하는일 : 생각하기, 먹기

그런데 밥을 먹기위해서는 본인의 양쪽 젓가락을 집어서 먹어야하는데

```c++
do{
    P(chopstick[i]);
    P(chopstic[(i+1)%5]);
    ...
    eat()
    V(chopstick[i]);
    V(chopstic[(i+1) % 5]);
    ...
    think()
}white(1);
```

하지만 위에서는 deadlock이 생길수있다.왜냐하면 각자 오른쪽 젓가락을 다 집어버리면 다른 젓가락을 집을때까지 작업을 하지 않아 아무도 밥을 먹지 못한다

해결방안 :
4명의 철학자만 원탁에 앉도록 한다
젓가락 두개를 모두 잡을수 있을때만 젓가락을 잡게한다
비대칭- 짝수(홀수)철학자는 왼쪽(오른쪽)젓가락부터 집도록 한다

semaphore와 Monitor
세마포어 뿐만아니라 모니터를 이용해서 우리가 해결해줄수도 있다.

semaphore
P연산과 V연산을 통해서 쉽게 해줄수있었지만
기본적으로 코딩이 힘들다
정확성의 입증이 어렵다
자발적 협력이 필요하다
한번의 실수가 시스템에 치명적이다(V->P로 사용, P->P사용)

모니터: 프로그래밍 하이레벨 싱크로나이제이션 컨스트럭트(프로그램 언어차원에서 해서 프로그래머의 편의를 더 줌)

모니터 내부에공유데이터에 대해서 선언을 해놓고
프로시저를 통해서만 해당 공유데이터에 접근이 가능하게하는데
이때 프로시저를 동시에 실행안되도록 모니터 차원에서 막아주게되면
락을 안걸어줘도 되는것이다.
프로세스가 모니터 안에서 기다릴수 있도록 하기위해
condition var사용
`condition x,y;`
condition var은 wait와 signal연산으로만 접근가능

모니터의 condition variable
`x.wait()`
`x.signal()`

프로세스 싱크로 나이제이션
(프로세스 동기화)
concurrency control
(병행 제어)

추상적으로 되어있고, 객체지향에서 많이씀

condition variable

```c++
monitor bounded_buffer
{
    int buffer[N]
    condition full,empty:
    /*condition var은 값을 가지지 않고 자신의 큥[ 프로세스를 매달아서 sleep시키거나 queue에서 프로세스를 깨우는 역할만 함*/

    void produce(int x)
    {
     if there is no empty buffer
        empty.wait();
        add x to an empty buffer
        full.signal();
    }
    void consume(int *x)
    {
     if there is no full buffer
            full.wait();
        remove an item from buffer and store it to *x
        empty.signal();
    }

}
```

signal은 잠들어있는것을깨우는거라서 수치의 변경 이런것은 없다.

목적이 sema는 프로그래머차원에서 lock을 걸어주기 위해
monitor는 monitor차원에서 해주기 위해
