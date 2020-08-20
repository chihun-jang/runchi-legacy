---
title: 'Memory Management'
date: '2020-08-05'
category: ['os']
draft: False
---

# Memory Management

메모리는 주소를 통해서 접근할 수 있는 객체이다.

-   논리적 주소(virtual address) : 프로세스마다 독립적으로 가지는 주소공간, **0번지 부터 시작 **cpu가 보는 주소는 logical address**임**
-   물리적 주소 : 메모리에 실제올라가는 위치

Symbolic Address(프로그래머 입장에서 **문자로 이루어진 변수명 같은 것**을 호출) ==>
Logical address(숫자로 이루어진 주소로 변환) ==>
Physical address

---

## 주소 바인딩 CASE (address binding : 주소를 결정하는 것)

-   `Compile time binding`(absolute code생성)
    compile 시점에 **Logical address와 같이 물리적 주소도 결정** 됨.
    (무조건 Logical과 같은 주소를 사용하기때문에 비효율적이다, 싱글 프로세스에서 사용하던 옛 방식)

-   `Load time binding`(relocatable code)
    프로그램이 시작해서 **메모리에 올라갈때 물리적 주소 결정**( 당시 비어있는 mem의 주소부터 올리기 시작한다. )

-   `Execution time binding`(**Runtime binding**) -- 현대의 방법
    실행시 주소가 올라가는 것은 같지만 **실행 도중에 주솟값이 변경될 수 있음**

    CPU가 **주소를 참조할때마다 binding을 점검**
    (하드웨어적인 지원 필요, base and limit registers, MMU)

    > **MMU : Memory-management Unit**
    > (참고로 초반의 설명은 프로세스 통채로 Mem에 올라가는 과정을 가정)
    > `logical address ==> physical address`로 매핑해주는 **hardware device**
    > 프로세스가 CPU에서 수행되며 생성하는 모든 주소값에 `base register`(=relocation register)를 더해서 변환해준다(시작위치를 결정한다)
    > `limit register`를 이용해서는 악의적인 요청인지, 우리의 프로세스가 가지고 있는 logical address의 boundary안에 있는지 체크한다. (그리고 이때 걸리게 되면 trap을 걸어서 프로세스를 abort한다.)

    사용자의 프로그램, CPU모두 logical address를 바라본다.

---

## Dynamic loading

프로세스 전체를 다 올리는게 아니라 **루틴이 불려질때 mem에 load함** -> `mem utilization`의 향상

> 오류처리 루틴과 같은 가끔 사용되는 코드의 경우 유용
> **운영체제의 특별한 지원없이 프로그램 자체에서 구현가능**
> (OS는 lib를 통해 지원가능, 현대의 프로그램이 dynamic하게 올라갔다 내려오는것은 OS의 paging시스템을 이용한것)
> 따라서 **프로그래머가 처리하는 부분을 dynamic loading**이라고 하는데 요즘에는 섞어서 쓰기도 한다.

-   overlays : mem에 프로세스에 실제 필요한 정보만을 올리는데
    Manual Overlay라고 해서 초창기 Mem의 크기가 작던 때에 프로그래머가 손수 프로그램의 부분 부분을 올리고 말고를 설정했었다.

*   `swapping` : 프로세스를 일시적으로 메모리에서 `backing store(swap area)` (디스크, 많은 사용자의 process-img 를 담을만큼 빠르고 큰 저장공간)로 쫓아 내는것,

    -   swap in - swap out
        일반적으로 중기 스케줄러(**swapper**)에 의해서 **swap-out시킬 프로세스 선정**
        priority-based CPU scheduling algorithm사용
        **우선순위가 낮은 process를 swapped out 시킴**

    **swapping이 효율적으로 사용되려면 runtime binding이 되는게 동적으로 주소변환**도 되고 좋다.
    **swaptime의 대부분은 transfer time**(swap 되는 양에 비례하는 시간)

> process를 일부 구성하는 page만 쫓겨나도 swapping이라 한다.

## Dynamic Linking

Link라는 것은 여러 **컴파일파일을 묶어 실행파일로** 만드는 것,

`Static Linking` - Lib가 프로그램의 **실행파일 코드에 포함됨**(printf함수의 코드가 다 올라가 있는것)
`Dynamic Linking` - 라이브러리가 실행시 연결, 라이브러리 호출 부분에 도달하면 **_`stub`이라불리는 pointer를 따라 library가 어디있는지 찾아간다._**
이미 메모리에 있으면 주소로 가고 없으면 disc에서 읽어옴 -> 운영체제의 도움 필요(Shared Lib, DLL이라는 lib의 도움을 받아서 한다.)

---

> **Allocation of Physical Mem**
> Mem의 낮은 부분에는 항상 **OS kernel**(interrupt vector와 같은)이 상주하고 있고 그 위 높은 주소 영역에 **user process**가 있다.

## User Process의 영역할당 방법

-   `Continuous allocation`

    -   `Fixed partition allocation` : 고정분할 방식(분할 갯수를 미리 나눠서함)
        나눠진 분할들에 대해서 process의 size랑 비교해서 할당해준다.
        (만약 분할의 크기가 작아 사용되지않으면 external fragment으로,
        분할의 크기가 커서 프로세스가 할당된 이후에도 남으면 internal fragment으로 분류된다.)

        => **_융통성이 없다._**

    -   `Variable partition allocation` : 가변분할 방식
        프로그램이 실행될때마다 차곡차곡 메모리에 올리는 방식, **_Process가 끝나면 새로 들어온 Process가 끝난 공간의 크기보다 크면 이또한 외부조각으로 남게된다_**.

        => **_기술적 관리 기법이 필요하다_**

        **_Hole이 메모리 여러 곳에 생긴다(가용 메모리공간)_** - 운영체제는 다음의 정보를 유지.

        프로세스가 오면 Hole의 어느곳에 할당해 줄것인지 결정
        : **_가변 분할 방식에서 size n 인 요청을 만족하는 가장 적절한 hole을 찾는 문제_**

        -   `first-fit` : n이상중에서 제일 처음 보이는 hole에
        -   `bast-fit` : n이상중 hole의 크기와 제일 적합한 hole에(시간이 좀더 소요됨)
        -   `worst-fit` : 가장 큰 hole할당(시간도 오래 걸리고 별로 안좋음)

        `Compaction` : **external-fragment**를 해결하는 방법으로 hole을 쫙 밀어서 하나의 큰 hole로 만든다.
        ==> 비용이 많이 드는 방법이다. (전체 프로그램의 binding을 생각 해야한다. 그리고 runtime binding시에만 가능)

*   `noncontinuous allocation` 불연속할당
    : **address binding**이 복잡해진다.

    -   `paging` : **하나의 프로세스를 같은 크기의 page**로 자르고, **physical mem도 page가 올라갈수있게 page frame으로** 자잘하게 잘라줌
        Process의 virtual mem을 동일한 size의 page단위로 나눈다음 **noncontiguous**하게 저장
        일부는 `backing storage`에 일부는 `physical mem`에 저장

        **방법**

        물리적 공간의 동일한 크기는 frame, 논리적 공간의 동일한 크기는 page로 나눈다
        (frame size == page size)
        모든 가용 frame관리, **page table은 logical address와 physical address를 매핑하여 관리**,
        외부조각은 발생하지 않는데 **내부조각은 process가 paging되는 과정에서 마지막 조각이 균일하게 안 잘릴 수도 있으므로 해당 과정에서 내부조각이 발생할 수** 있다.

-   `segmentation` : 의미있는 단위로 자르는 것(주소 공간은 code,data,state으로 구성)
    주소공간의 의미단위로 자르거나 함수단위로 자르거나 의미단위로 잘라서 물리적 주소에다가 올린다(크기가 달라지기 때문에 dynamic storage allocation problem발생(hole))

---

### Paging

주소 변환을 위한 `page table`이 있다. 논리주소와 물리주소의 **_mapping을 entry로 기록_**해놓았고 물리적 mem에 올라갈때는 비어있는 page frame에다가 집어넣어주게된다.
(페이지 내의 offset부분은 register로 변환해도 변환이 없다.)

> 보통 page의 크기는 `4kb`, page table(프로세스마다 존재)은 100만개의 엔트리가 필요한데 이를 register에 올리기에는 너무 용량이 크다.(register는 CPU에들어가있음)
> 따라서 page table은 **main memory에 상주**

-   `Page-table base register(PTBR)`가 page table을 가리킴(base)
-   `Page-table length register(PTLR)`가 table 크기를 보관(limit)
-   모든 mem접근 연산에는 2번의 mem access 필요(page table , data/instruction)
-   속도향상을 위해 `associative register, translation look-aside buffer`라고 하는(TLB,일종의 cache) main mem과 CPU사이에 있는 계층을 구성 (주소변환을 위한 cache mem)
    **TLB는 전체 page table을 담는게 아니라 일부**만을 담고있다.
    이때 page number를 탐색하기 위해 TLB에서 전체를 탐색해야하고 그러면 overhead가 크므로 병렬적으로 탐색할수 잇는 associative register를 사용한다. **TLB의 정보는 process가 변할때마다 flush해서 비워줘야한다.**

    탐색시간은 2 + ε - α정도이다.(궁금할시 TLB를 이용한 탐색시간을 검색해보자)

#### Two-level Page Table

시간은 더걸린다. 공간도 1단계의 entry가 더 필요하니까 낭비라 생각할수 있는데 1차 page table을 사용하게되면 array의 중간 index를 비워놓고 작성할수 없으니까 크기가 작다하더라도 낭비되는 공간이 있기마련인데 2단계 page table을 쓰면 이를 해소 할수 있다.

안 쓰는 page에 대해서는 null로 만들어지고, 2단계 table을 생성하지 않는다.
1단계 page table보다 속도는 줄어들지는 않는다. 공간이 줄어든다.

> 프로그램마다 가지고 있는 virtual mem의 크기가 maximum얼마까지 가능할까?
> 32bit adress 를 쓰게 되면 2^32까지 주소의 구분이 가능해진다.(4G)
> 2^10 = K , 2^20 = M , 2^30 = G

> 4G를 4k의 page로 나누게 되면 1M개의 page table entry필요
> (page entry size 가 4KB면 이렇다는얘기)
> e.g) 각 page entry가 4Byte라면 프로세스당 4M의 page table 크기가필요,
> 그렇지만 대부분 process는 극히 일부만 사용한다.==> 공간낭비가 심하다.

> Two-level page Table에서 안쪽 테이블(두번째 테이블)은 Page Frame과 크기가 같다.

---

#### 구성(그림을 찾아서 같이 확인을 해보자)

-   logical address (on 32-bit machine with 4K page size)

    -   20 bit의 page number
    -   12 bit의 page offset(page 번호를 구분하기위해서)

    -   page table자체가 page로 구성되기 때문에 page number는 다음과 같이 나뉜다.
        (각 page table entry가 4B)안쪽 page table이 page화 되어서 들어간다.
        그렇기 때문에 1K개의 entry가 들어가게 되고 이를 구분하기 위해 10bit필요,
        -   10 bit 의 page number
        -   10 bit의 page offset

안쪽(오른쪽)부터 bit할당을 나눠오면 계산하기 쉽다.

따라서 logical address는 다음과 같이 구성된다.

| pagenumber | pagenumber | pageoffset |
| ---------- | ---------- | ---------- |
| p1         | p2         | d          |
| 10         | 10         | 12         |

페이지 테이블을 2단계만 쓰는게 아니라 다단계로 쓸수 있다.
프로그램의 주소공간이 넓기 떄문에 여러 단계로 사용할 수 있는데, 그러면 테이블을 위한 공간을 줄일 수 있지만, 여러 테이블을 거쳐야하고 메모리도 그만큼 여러번 접근해야한다. ==> 오버헤드가 크다

4단계 table을 사용하는 경우에도 **_TLB 캐시메모리를 통해서 시간을 단축_** 할수 있다.
(이떄 TLB를 통해서 탐색을 하는 비율이 크면 클수록 탐색에 걸리는 시간은 그 TLB의 탐색시간과 가까워지는데, 이 계산에서 유의해야할 점은 TLB에 주소가 없는 경우에도 탐색후에 결정해야하기때문에 탐색 시간이 같이 계산된다는 점이다..)

---

### Memory Protection

Page Table의 각 entry마다 아래의 bit를 둔다

-   `Protection bit`
    : page에 대한 접근 권한(read / write / read-only) - 해당 page에 대해서 연산권한을 나타내기 위해서

*   `Valid-invalid bit`
    : valid 는 해당 주소의 frame에 그 프로세스를 구성하는 유효한 내용이 있음,
    invalid는 해당주소의 frame에 유효한 내용이 없음(**해당 페이지가 메모리에 올라와 있지 않고 swap area에 있는 경우**) 을 뜻함

> **Valid / Invalid Bit in a Page Table**
> page Table에는 Bit 표시로 Valid invalid를 나타낼수 있는데 이는 Page영역이 사용되지 않거나, 메모리에 올라가 있지 않은 경우를 구분해 줄수 있다.

---

### Inverted Page Table

> Page table이 매우 큰 이유
>
> -   모든 process별로 그 logical address에 대응하는 모든 page에 대해 page table entry가 존재
>
> *   대응하는 page가 메모리에 있든 아니든 간에 page table에는 entry로 존재

따라서 시스템안에 page table이 딱 1개 존재하는데, **물리적인 mem의 frame 갯수만큼 entry가 존재하게 된다**. entry에 들어가는 주소는 물리적 mem의 위치에 들어가는 logical mem의 주소를 1:1로 적어준다.

이떄 탐색하는 방법은 logical address가 주어지면 page table에서 위에서부터 아래로 순서대로 일치하는 주소를 다 찾아봐야한다. 따라서 공간적인 이점은 있을지 몰라도 시간적인 이점은 사라진다.

그리고 추가적으로 **process id도 같이 저장을 해주어 어떤 process의 logical address인지를 page table에 적어주고 그 뒤에는 physical address의 위치를 작성해야한다**.

따라서 이때 오래 걸리는 시간을 줄이기 위해서 associative register를 사용해서 병렬적으로 탐색한다.(비쌈)

---

### Shared Page

(Re - entrant Code ( = Pure code))
**다른 프로세스와 공유할수 있는 page**가 있다.
프로그램마다 code의 내용이 같을 수도 있을텐데, 그러면 **같은 Frame으로 맵핑**시켜서 올려 놓는다

page들을 read-only로 셋팅하고 하나의 code만 메모리에 올림,
(eg. text editors, compilers, widow systems)

**Shared code는 모든 프로세스의 logical address space 에서 동일한 위치**에 있어야 함,

Private code and date

shared code와는 다르게 private code and data는 독자적으로 mem에 올린다.
Private data는 logical address의 아무곳에나 위치해도 무방하다.

---

### Segmentation

프로그램은 의미단위인 여러개의 segment로 구성, 일반적으로 code, data,stack부분이 하나씩의 segment로 정의됨

#### Segmentation Architecture

Logical address 는 다음과 같이 구성,

-   segment table
    base : 물리적 주소의 시작위치
    limit : segment의 길이,(의미 단위로 자른거라서 균일하지 않다.)

    -   Segment-table base register (STBR)
        : 물리적 메모리에서의 segment table의 위치
    -   Segment-table length register (STLR)
        : 프로그램이 사용하는 segment의 수
        segment number s is legal if s < STLR

**장점**

-   각 segment 별로 protection bit가 있음,
-   Each entry : valid bit = 0 => illegal segment
-   Read/Write/Execution 권한 bit을 부여해주기 쉽다.

*   Sharing
    shared segment
    same segment number
    segment는 의미 단위이기땜에 공유와 보안에 있어 paging보다 훨씬 효과적이다

**단점**

-   의미단위의 분할 : 중간중간 사용하지 않는 조각이 발생하고 first fit이나 best fit기법을 이용해야한다.

-   external fragmentation 발생
    (가변분할방식과 동일한 문제 발생)

> segment table의 경우에는 segment의 갯수만큼 entry가 만들어진다.
> segment의 주소가 떨어져있는 거리가 limit보다 작아야지 주소변환을 해주고 아니게 되면 boundary를 넘어선게 되므로 trap을 발생시켜준다(addressing error)

---

### Segment vs Paging

의미단위로 할때는 seg가 유리하고, 동일한 크기로 작업을 할 경우에는 paging이 유리
(왜냐면 external frag가 발생하기때문에)

table의 메모리 낭비는 seg가 더 적다

Sharing of Seg
(paging과 유사한 방법으로 진행된다.)

---

### Seg + Paging = Paged Segmentation

세그먼트 하나가 여러개의 page로 구성 된다.

**segment-table entry 가 segment의 base address 를 가지고 있는 것이 아니라, segment를 구성하는 page table의 base address를 가지고있다.**
==> 따라서 메모리에 올라갈때 **allocation**문제가 없다.

**의미단위로 공유나 보안은 seg단위에서 하므로 이또한 유리**하다
페이지별로 물리적 mem에 다른 위치로 올라가게된다.

> **_Mem manage에서 OS의 역할은 없다_**

> 이 모든 것들은 하드웨어가 해주는 역할이다.
> 프로세스가 CPU를 점유 하고있었으면 주소변환을 할때마다 OS에 접근하는 것은 말이 안된다.
> 물론 I/O 장치의 접근은 OS가 관여한다.
