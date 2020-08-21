---
title: 'Virtual Memory'
date: '2020-08-09'
category: ['os']
draft: False
---

# Demand paging

(실제로 대부분은 시스템은 paging기법을 사용한다.)

-   실제로 필요할 때 page를 메모리에 올림

    -   **I/O양의 감소**(실제로 동작하는 코드는 적다, 대다수가 방어적인 코드이기때문에)
    -   **Mem 사용량 감소**
    -   **빠른 응답시간**
    -   **더 많은 사용자 수용**

-   Valid/ Invalid bit 사용
    -   **Invalid => 사용되지 않는 주소영역인 경우, Page가 물리적으로 메모리에 없는 경우**(처음에는 모든 page entry가 invalid로 초기화)
    -   address translation시에 invalid bit이 set되어 있으면
        ==> 'page fault(물리적 mem에 없음)'

> eg. CPU가 주소변환을 하려고 왔는데 invalid인 경우 I/O작업을 해야하고 page - fault 가 발생해서 trap이 발생하게 되고 OS에게 권한이 넘어간다.

-   invalid page를 접근하면 MMU가 trap을 발생시킴(page fault trap)
-   kernel mode로 들어가서 page fault handler가 invoke됨

-   page fault의 처리순서
    -   invalid reference? (eg.bad address, protection violation)=> abort process.
    -   get an empty page frame(없으면 뺏어온다)
    -   해당페이지를 disk 에서 mem으로 가져온다
        -   disk I/O 가 끝나기까지 이 프로세스는 CPU를 preempt 당함
        -   Disk read 가 끝나면 page tables entry 기록, valid표시로 전환
        -   read queue에 process를 insert -> dispatch later
    -   이 프로세스가 CPU를 잡고 다시 running
    -   중단되었던 instruction재개

Page fault의 비율에 따라서 I/O작업이 이루어 지기때문에 demand paging의 퍼포먼스에 큰 영향을 준다. (하지만 대체로 page fault가 잘 나지는 않는다.)

---

> Free frame이 없는 경우(쫓아내는경우)
> page replacement (어떤 프로세스를 mem에서 쫓아내고 mem에 다시 올린것인가를 OS가 관장함)

## replacement algorithm

-   **_`page fault rate` 를 최소화하는 것이 목표_**
-   알고리즘의 평가 : 주어진 page reference string에 대해 **page fault를 얼마나 내는지 조사**
-   만약 대체할 페이지가 **write**가 이루어 졌다면 page를 그냥 mem에서 제거하는 것이 아니라 backing store(swap-area)에 변경사항을 기록해주고 제거해줘야한다.

*   `Optimal Algorithm` (Min Algo, Opt,)
    (미래에 참조되는 page를 다 알고있다고 가정)
    Min(OPT) : 가장 먼 미래에 참조되는 page를 replace

    미래의 참조를 어떻게 아는가? ==> Offline algoritm(실제 시스템에 적용할수 없다)

    **다른 알고리즘의 성능에 대한 `upper bound`제공(아무리 좋게 만들어도 Optimal algorithm보다 좋게 만들수는 없다는 기준점 제시)**

*   `FIFO(First in First Out) Algo`

    먼저들어온 것을 먼저 내쫓음

    ? Belady’s Anomaly : frame이 증가해도 page fault 가 줄어드는게 아니라 증가하는 현상

*   **`LRU (least Recently used) algorithm`**
    가장 오래전에 참조된 것을 지움,

*   **`LFU(Least Frequently Used) Algo`**
    참조횟수가 가장 적은 page를 지움 - 최저 참조함수인 page가 여럿 있는 경우
    (LRU를 반영해서 할 수 있다.)

    **장점** : LRU처럼 직전 참조시점만 보는게 아니라 조금 더 장기적인 시간을 보기때문에 **page의 인기도를 좀 더 정확히 반영**가능,
    **단점** : **참조시점에서 최근성을 반영 못함**, **LRU보다 복잡함**

### 구현

-   `LRU 알고리즘` : LRUPage --- page--- MRU page (linked list형태로 OS가 관리) ==> `O(1) complexity`

-   `LFU 알고리즘` : LFU page --- page --- MFUpage ==> O(n) complexity
    따라서 heap(이진트리)의 구조로 구현하게 된다. (자식하고만 비교를 해준다) ==> `O(logn)`
    (100만개가있을때 100만 vs 10~20으로 큰 폭으로 줄어든다)

> replacement algo는 virtual mem에만 있는게 아니라 caching환경에서 사용되기도 한다

---

## caching

한정된 빠른공간(=cache)에 요청된 데이터를 저장해 두었다가 후속 요청시 cache로 부터 직접 서비스 하는 방식

pageing sys외에도 cahed mem , buffer caching, Web caching등 다양한 분야에서 사용

-   cached mem : CPU - (cache mem) - main mem
-   buffer caching : 파일시스템에 대해서 적용
-   web caching : web page 요청을 할때 동일한 URL에 대해서 다시 보여주는것
    (1,2번은 동일한 시스템이고 web은 서로 다른 두 시스템에 대해서)

### 캐시운영의 시간제약:

> replacement algo에서 삭제할 항목을 결정하는 일에 지나치게 많은 시간이 걸리는 경우 실제 sys에서 사용할 수 없음  
> Buffer Caching이나 web caching의 경우 O(1) ~ O(log n) 정도까지 허용

Paging Sys에서 LRU, LFU 가능한가?

**주소변환에서 OS가 하는 일은 없다**(이미 mem에 있는경우) 하지만 mem에 없는 경우에는 trap이 발생하고 replacement algo를 이용해서 쫓아내고 다시 올리는데 그러면 운영체제는 LRU나 LFU에대해서 어떤 page가 최근에 참조된건지 파악할수 없다.(**page fault가 발생하는 경우에만 관여**하기 떄문에)

O(1)인 list조작 조차 불가능하다.

### Clock algo

LRU 근사(approximation) 알고리즘

-   second chance algorithme
-   NUR(Not Used Recently) or NRU (Not Recently Used)

*   `reference bit`를 사용해서 교체대상 page선정, 마치 시계처럼 page를 참조할때 reference bit을 1로 바꿔주고 진행하는데, OS는 page를 교체할때 시계방향으로 돌며 1인 page는 0으로 만들고 **0인 page를 만나게 되면 해당 page를 교체해주고 1로 바꿔준다(이 말은 bit가 1인 page는 최근에 사용됐다라는 의미와 같다**) 따라서 0은 항상 가장 오래된것은 아니지만 유사한 모습을 보인다.

-   `modified bit`(dirty bit)(최근에 변경된 page) - I/O를 동반하는 페이지로 write가 발생하여 backing store에 변경사항을 기록해야하는 경우 ==> 따라서 modified bit 1인것을 우선적으로 쫓아내서 I/O를 줄여준다.

---

### page frame 의 allocation(최소한을 보장)

**_allocation problem : 각 process에 얼마만큼의 page frame을 할당?_**
allocation의 필요성 : mem 참조 명령어 수행시 명령어, 데이터등 여러 페이지 동시참조

-   **명령어 수행을 위해 최소 할당 frame수가 있음
    loop를 구성하는 page들은 한꺼번에 allocate 되는 것이 유리**함,
    최소한의 **allocation이 없으면 매 loop마다 pagefault**

*   **allocation scheme**

    -   Equal allocation : 모두 똑같은 갯수
    -   proportional allocation : 프로세스 크기에 비례
    -   Priority allocation : 우선순위에 따라

*   `Global Replacement`(경쟁)

    -   Replace 시 다른 process에 할당 된 frame을 빼앗아 올수 있다.
    -   process별 할당량 조절의 또다른 방법
    -   FIFO, LRU, LFU 등의 algo를 global replacement로 사용시에 해당,
    -   그러나 일반적으로는 Working set,PFF 알고리즘 사용

*   `Local replacement`(미리 할당)

    -   자신에게 할당된 frame내에서만 replacement
    -   FIFO,LRU, LFU등의 알고리즘을 process 별로 운영

> **Thrashing** (page-fault가 너무 빈번히 일어나는 경우, 프로세스의 원할한 수행에 필요한 최소의 pageframe 할당이 덜 된 경우)
> ==> degree of multiprogramming 이 상승할수록 CPU utilization이 상승하는데 특정 시점 이후로는 CPU utillization이 낮아지는 경우가 있고 이를 Thrashing이라 한다.

> e.g) `page fault rate ⇪` `CPU utillization ⇩` ⇢ `OS는 MPD(multiprogramming degree)를 높여야 한다고 판단` ⇢ `다른 process가 sys에 추가, (MPD 상승)` ⇢ `프로세스당 할당 frame의 수 ⇩` ⇢ `프로세스는 page의 swap_in - swap_out으로 바쁨` ⇢ `CPU한가함`,

---

### 해결책 algorithm

`Working-set Model`

> **Locality of reference**
> 프로세스는 특정시간 동안 일정 장소만을 집중적으로 참조한다. 집중적으로 참조되는 해당 page들의 집합을 locality set이라 함

> **working-set Model**
> locality에 기반하여 프로세스가 일정시간 동안 원활하게 수행되기 위해 **한꺼번에 mem에 올라와 있어야하는 page들의 집합을 working set이라 정의**함,  
> working-set모델에서는 working set 전체가 mem에 올라와 있어야 수행되고, 그**렇지 않으면 frame을 모두 반납해 swap-out상태가 된다.** (suspend)

> thrashing을 방지함, Multiprogramming degree를 결정함.

#### Working set의 결정

-   과거를 통해서 참고함
-   working set Window(현재로 부터 지난 특정 시간까지)를 통해 알아냄
-   현재-과거 특정시점까지 참조된 서로 다른 page의 집합
-   working set에 속한 page는 mem에 유지, 속하지 않은 것은 버림(즉 page를 특정 시간만큼만 유지)

보장되지 않을때는 `swap-out`시킨다.

---

#### PFF (Page-fault Frequency) scheme

-   pagefault rate의 상한값과 하한값을 둔다
-   page fault rate가 상한선을 넘으면 frame을 더 할당해준다
-   page fault rate가 하한 이하면 할당 frame수를 줄인다

빈 frame이 없으면 일부 프로세스를 swap-out

---

#### Page-size의 결정

**_Page size를 감소시키면 Page수 증가, Page-table크기 증가 internal frag감소, disk transter의 효율성 감소_**

-   Seek/rotation vs transfer  
    (이왕이면 **seek disk head가 이동해서 한번에 많은 page를 읽는 것이 좋다, overhead가 큼**)
    필요한 정보만 메모리에 올라와 메모리 이용이 효율적
    But! locality의 활용 측면에서는 좋지 않음(함수가 실행되면 코드들이 연달아 순차대로 실행되기때문에 page가 큰게 더 좋다 일단 올라오기만 하면 되니까)

요즘에는 page 크기가 큰게 trend라고 한다
