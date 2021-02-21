---
title: 'CPU-Scheduling'
date: '2020-06-03'
category: ['OS','CS']
draft: False
---

### CPU Scheduling (CPU스케줄링)

-   CPU burst CPU가 해야할 일을 하는 단계
-   I/O burst IO 프로그램이 해야할일을 하는 단계

이러한 burst가 반복되면서 프로그램이 구동된다.

cpu->cpu->cpu->io : 사용자와 interactive한 프로그램
cpu->io->cpu->io : 행렬의 연산과 같은 프로그램
(위의 두 예시처럼 순서는 상관없다)

I/O bound job(process) : CPU사용 < I/O사용 - (many short cpu burst)
CPU bound job(process) : 계산위주 프로세스 - (few very long CPU bursts)

이렇듯 여러종류의 job(process)이 섞여있으므로 **cpu scheduling**이 필요하다.

> ex) 사용자들은 CPU bound job보다 I/O bound job를 많이 하기때문에 I/O가 너무 오래걸리지않게 스케줄링해야함
> (사람과 많이 상호작용을 하는게 I/O bound job이므로 더 많이 분배해준다던가)

---

### CPU Scheduler & Dispatcher

-   `CPU Scheduler` : 하드웨어나 소프트웨어가 아닌 운영체제안에서 이 일을 하는 코드(ready상태의 프로세스 안에서 이번에 cpu를 줄 프로세스를 고른다)
-   `Dispatcher` : 프로세스를 골랐으면 CPU의 제어권을 선택된 프로세스에 넘겨준다. 넘겨준때 context switch 도 발생한다.

#### CPU스케줄링이 필요한 경우

-   `running` -> `blocked` (ex. I/O Process) 가지고 있어도 일할 수 없을 때
-   `Running` -> `Ready` 계속 일할수없으니 할당시간을 만료시킨다(timer interrupt 를 이용해서 대기 큐로 보낸다)
-   `Blocked` -> `Ready` (I/O가 끝난 직후 interrupt로 CPU가 넘어갈때 prority우선순위에 기반해서 바로 넘어가는 경우도 있다)
-   `Termiate`

`1, 4` ==> `nonpreemptive(비선점형)` (자진반납 - 어쩔수없이)-(한 프로그램이 다쓸때까지 기다려준다)
`2, 3, etc` ==> `preemptive(선점형)` (강제로 빼앗음)-

---

### Scheduling Criteria (성능척도)

CPU Scheduling의 성능척도

-   시스템입장

-   CPU utilization(이용률)(keep the CPU as busy as possible)(CPU의 이용률)

-   Throughput(처리량)( of processes that complete their excution per time unit)(프로세스처리량)

-   프로세스의 입장

-   Turnnaround time : CPU를 다 사용하기까지 걸린 타임(소요시간 or 반환시간)

-   waiting time : 프로세스가 대기큐에서 **전체** 기다린 시간 (대기시간)

-   response time : 레디큐에 들어와서 **처음** 쓰기까지 걸린시간.

> waiting time vs response time
>
> -   waiting time : CPU를 얻었다 뺏겼다 하는 사이사이 대기시간을 다 합친 시간
> -   response time : 제일 처음 CPU를 얻는데 까지 걸린 시간을 말한다

> 중국집비유
>
> -   이용률 : 주방장에게 계속 일을 시키도록 하는 것
> -   처리량 : 주방장이 손님을 많이 받았는가?
> -   소요시간 : 주문을 하고 먹고 나오는데 걸리는 모든 시간,
> -   대기시간 : 손님이 음식을 기다린 시간(코스요리면 사이사이포함)
> -   응답시간 : 손님이 제일 처음 음식을 받기까지 기다린시간

---

### CPU스케쥴링 알고리즘

-   **`First Come First Served(FCFS)`** : 먼저 들어간 Process를 먼저 처리한다
    단점 : CPU burst time이 긴 process가 먼저 도착하면 짧은 단위의 Process라 할지라도 늦게 실행되어 **비효율적이다**.
    (**Convoy effect** : 앞에 long process가 있고 뒤에 short process가 있어서 비효율적인 모습)
    ==> FCFS는 앞에 어떤 Process가 도착하는지에 따라 효율에 큰 차이를 보여준다

    우리의 화장실 사용을 예를 들어서 생각해보자.

---

-   **`SJF(Shortest-Job-First)`** : CPU burst time이 짧은 process를 먼저 스케줄링,가장 사용시간이 짧은 Process를 우선적으로 처리한다
    (각 프로세스의 다음번 CPU burst time을 가지고 스케줄링에 활용)

-   NonPreemptive : CPU를 먼저 사용하고 있으면 그 뒤에 shortest한 process가 오더라고 일단 계속 사용한다.
-   Preemptive : Shortest-Remaining-Time-First(SRTF)(CPU를 쓰고있다 하더라도 더 짧은게 오면 뺏어서 새로운 짧은애한테 준다.)

    프로세싱이 끝났을때 스케줄링을 할것인가 ==> NonPreemptive
    도착했을때 스케줄링을 할것인가 ==> Preemptive

-   장점 : Minimum Average Waiting Time 보장(SRTF)
-   단점 : starvation(long process가 처리가 안되고 계속 미뤄질수도있다.)

    그런데 burst time이 얼마인지 알 수 없으므로는 실제로는 SJF를 사용하기 힘들지만
    (이것은 과거의 CPU burst time을 이용해서 추정하긴한다.(exponentional averaging - 과거의 burst를 통해서라할지라도 최근time에 대해 더 가중치를 두고 averaging을 한다))

---

-   **`Priority scheduling`**(우선순위 스케줄링)
    (일반적으로 우선순위는 정수로 표현하는데 작은 숫자일수록 우선순위가 높다.)
    (그럼 SJF도 일종의 priority scheduling이다)

-   Nonpreemptive : 우선순위가 높은 process가 도착해도 먼저 작업하던 Process는 보장해준다.
-   Preemptive : 우선순위가 높은애가 도착하면 바로 뺏어서

        단점 : Priority Scheduling도 Starvation에 직면할 수 있다.
        해결책 : Aging(시간이 지날수록 우선순위를 높여서 처리가 가능하도록 해준다)

---

-   **`Round Robin`**(RR)(현대적인 기법)

    preemptive 기법이고 Process에게 동일한 크기의 할당시간(time quantum)을 준다. Context Switch가 가능하기때문에 사용할 수 있다.

    장점: RR은 response time이 짧다

    q(time)를 짧게 잡으면? ==> 대기시간또한 long process는 길어지고 short process는 금방 처리하고 끝나기때문에 짧아지게된다

    **Preformance**
    `q large` ==> FCFS처럼 동작하게 된다.
    `q small` ==> context switch가 빈번히 발생해 overhead가 커진다
    optimal q time : 10~100ms

    RR은 모두 균등하게 나눠가지기때문에 만약 각 Process의 길이가 비슷하다면 모두 같은 시간에 종료가 되므로 오히려 비효율적일수도 있는데
    일반적으로는 긴 Process와 짧은 Process가 섞여있고 bursttime또한 알수 없기에 RR을 사용하는게 response타임도 줄어들고 좋다

    n개 프로세스가 ready queue에 있고 할당 시간이 q time unit인 경우 각 프로세스는 최대 q time unit단위로 CPU시간의 1/n을 얻는다
    ==> 어떤 프로세스도 (n-1)q time unit이상 기다리지 않는다

---

지금부터는 multiline ready queue ⬇ ⬇

-   **`Multilevel Queue`**
    (우선순위에 따라) Multiline으로 나누고 process들을 계급순서대로 처리를한다 (system process부터 처리하고 다음은 interactive)

-   system process (priority high)
-   interactive processes
-   interactive editing processes
-   batch processes
-   lowest priority process

    foreground (user와 interaction하는 부분) / background (user와 interaction하지 않는 부분) 으로 나눌수도 있다.
    각 큐는 독립적인 스케줄링 알고리즘을 가질수있다.(foreground-RR / background - FCFS)

    Fixed Priority가 들어가버리면 starvation이 발생할 수 있으므로 80%를 foreground에 20%를 background에 할당하는 방법도 사용할 수있다.

---

-   **`Multilevel Feedback Queue`**(Multi level Queue의 순위가 변하는 알고리즘)
    제일 처음 들어오는 애는 높은 우선순위를 주고 할당시간 내에 못 끝내면 다음 큐로 보낸다 (우선순위는 낮추고 할당시간은 높게 설정)

    RR만으로는 부족해서 Multilevel Feedback Queue와 같은 방법을 쓸 수도있다

---

---

### 특이한 Case의 스케줄링

-   다중 CPU scheduler (Multi Processor scheduler)
    queue에 한줄로 세워서 프로세서(CPU)가 알아서 꺼내가게 할수있다,
    반드시 특정 프로세서에서 수행되어야 하는 프로세스가 있는 경우에는 문제가 더 복잡해짐.(마치 헤어샵의 디자이너를 찾는 것처러)

-   load sharing 일부 프로세서에 job이 몰리지않게 부하를 적절히 공유하는 메커니즘 필요
    별개의 큐를 두는 방법 vs 공동 큐를 사용하는 방법

-   Symmetric Multiprocessing(SMP): 각 프로세서가 동등하게 스케줄링
-   Asymmetric multiprocessing : 하나의 프로세서가 시스템 데이터의 접근과 공유를 책임지고 나머지는 거기에 따름

-   Real-Time Scheduling(deadline이 있는 job, deadline을 보장해줘야한다)

-   Hard real-time : 반드시 정해진 시간안에 끝내도록
-   soft real-tiem : 정확하게 지키는건 아님, 그래도 soft real-time task 는 일반 process에 비해서 높은 priority를 가짐

-   Thread Scheduling

-   Local Scheduling(User Level Thread) : 사용자 프로그램에서 Thread가 생성되어 운영체제는 스레드를 모른다.
        그럼 프로세스가 CPU를 받아서 사용자 프로세스가 어떤 Thread에 스케줄링할지 결정
-   Global Scheduling : kernel 레벨로 시스템이 알고있기 때문에 시스템 차원에서 스케줄링을 해서 분배해준다

---

---

### 알고리즘 평가

-   **queueing models(이론적)** : 확률분포로 도착률과 처리률이 주어질때 각종 preformance index값을 계산
-   **implementation(구현) & Measurement(성능 측정)** : 실제 시스템에 알고리즘을 구현하여 실제 작업(workload)에 대해서 성능을 측정
-   **Simulation(모의 실험)** : 2번방법으로 평가하기에는 결코 쉬운게 아니고 오랜 시간이 걸리므로 해당 알고리즘으로 돌아가는 프로그램을 짜서 돌려보는 방법이다. 이때 넣는 값을 trace라고 하는데 이 trace값은 마치 알고리즘 문제를 풀때의 test case와 같이 여러 경우를 가져와 trace로 사용하기도 한다
