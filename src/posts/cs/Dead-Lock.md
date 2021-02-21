---
title: 'Deadlock'
date: '2020-08-03'
category: ['OS','CS']
draft: False
---

# Deadlock

교착상황, 일련의 프로세스들이 서로가 가진 자원을 기다리며 **block**된 상황

> **자원**  
> 하드웨어, 소프트웨어 등을 포함하는 개념
> I/O device, CPU cycle, Memspace, semaphore
> 프로세스가 자원을 사용하는 절차 : request allocate, use Release

## deadlock 발생 조건

-   `Mutual exclusion` : 상호배제, **매 순간 하나의 프로세스만이 자원을 사용할** 수 잇음
-   `No preemption` : 비선점, **프로세스는 자원을 빼앗기지 않음**
-   `Hold and wait` : 보유대기, **자원을 가진 프로세스가 다른 자원을 기다릴 때 보유자원을 놓지않고** 기다림
-   `Circular wait` : 순환대기, 자원을 기다리는 프로세스 간에 **사이클이 형성**

> 데드락이 발생했는지 확인하기 위해서 자원할당 그래프를 그려볼수 있다.
>
> -   그래프 안에 cycle이 없으면 deadlock이 아니고,
>
> *   그래프에 cycle이 있고, 자원안에 instance가 1개만 있으면 데드락, 2개 이상이면 deadlock일수도 있고 아닐수도 있다.

---

## deadlock 처리방법

> 상단에 위치할수록 강한 방법이다.

-   **deadlock prevention**

-   Hold and wait 조건을 방지해준다 ==> 1. Process 시작시 모든 필요한 자원을 할당 받는다 2. 자원이 필요한 경우 자원을 모두 놓고 다시 요청
-   NO Preemption 을 Preemption으로 해준다. State를 쉽게 save하고 restore할수 잇는 자원에서 주로 사용(CPU,Mem)
-   Circular Wait을 막는다 ==> 모든 자원 유형에 할당 순서를 정해 정해진 순서대로 자원을 할당하게 한다.

-   ==> 데드락을 원천적으로 막다보니 **자원의 이용률 문제, 성능 감소, starvation문제가 발생**할 수 있다.(생기지도 않을 문제를 자원의 제한을 통해 막다보니)

-   **deadlock Avoidance**

-   부가정보를 이용해서 deadlock의 가능성이 없는 경우에만 프로세스 할당(safe state일 때만 할당 ==> safe seq 존재, 즉 safe state를 유지.)
        프로세스가 실행될때 평생 쓸 자원의 양을 알고 있으며 deadlock의 가능성이 있는 프로세스는 할당 안해준다.

        **single instance**의 경우에는 `resource allocation Graph algorithm`사용
        (기존의 그래프에서 미리 사용할 resource의 가능성을 점선으로 표시하여 해당 점선으로도 cycle이 만들어 질 우려가 있으면 resource를 할당해 주지 않음)

        **multiple instance** 의 경우에는 `Banker's Algorithm`사용
        `Allocation(할당 자원), Max(최대 사용 자원), Avalable(가용 가능 자원), Need(Max-Allocation 필요자원)` 테이블을 만들어
        Available 테이블과 Need 테이블을 비교하여 만약 Need의 값이 Available보다 커서 데드락이 발생할 수 있으면 자원을 할당해 주지 않는다.
        (만약 프로세스가 최대 요청이 아닌 가용범위 안에서요청을 한다고 하더라도 가용범위가 Max를 넘어가지 않으면 아예 가능성조차 배제하기위해 할당해주지 않음)

        ==> 따라서 프로세스의 할당 순서에 따라서 deadlock이 안 걸릴 seq가 존재한다면 시스템은 safe state이다. 하지만 비효율적이다!

*   **deadlock Detection and recovery**

-   deadlock 발생은 허용하되 detection 루틴을 두어 deadlock발견시 recover
-   signle일때는 그래프(corresponding wait-for graph, 자원을 제거하고 프로세스에 대해서만 그리는 방법)로 판별, 이때의 overhead는 O(n^2)만큼 걸린다.
-   multi일떄는 테이블로(**사실 single instance의 경우에도 table로 그려서 해결하는게 편하다**) 작성하여 낙관적인 예측으로 deadlock이 발생하는지 체크해준다
        (요청 프로세스 이외에는 반환해서 사용할 수 있다고 가정). 그런데 요청에 대해 가용할수 있는 자원이 없어 deadlock이 발생하게 되면
        1. deadlock과 연루된 모든 프로세스를 종료시키거나,
        2. 연루된 프로세스를 하나하나 죽여가며 자원을 돌려받아 safe state로 rollback하여 process restart

    그런데 이때 restart하는 process가 최소화된 비용일 경우 starvation문제로 인해 다시금 deadlock에 걸릴 수 있으므로 cost factor에 rollback횟수도 고려해야한다.

*   `deadlock ignorance` : 현대에는 데드락 방지를 위해 들이는 **overhead**가 크기때문에 만약 발생하게 되면 **_사용자가 직접 해결하는 방향으로 해결한다.(운영체제는 deadlock을 다루지 않는다_**. Unix, window등 대부분의 범용 OS가 채택)
