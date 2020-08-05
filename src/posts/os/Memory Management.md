---
title: 'Memory Management'
date: '2020-08-05'
category: ['os']
draft: True
---

메모리 관리,

메모리는 주소를 통해서 접근하는 객체

1. 논리적 주소(virtual address)
   프로세스마다 독립적으로 가지는 주소공간
   0번지 부터 시작 **cpu가 보는 주소는 logical address**임
2. 물리적 주소
   메모리에 실제올라가는 위치

주소바인딩 : 주소를 결정하는것

Symbolic Address(프로그래머 입장에서 문자로 이루어진 변수명 같은것을 호출) ==> Logical address(숫자로 이루어진 주소로 변환) ==> Physical address

주소 바인딩 Case

-   Compile time binding(absolute code생성)
    컴파일 시점에 로지컬 어드레스와 같이 물리적 주소도 결정됨.(무조건 로지컬과 같은 주소를 사용하기때문에 비효율적이다, 싱글 프로세스에서 사용하던 옜방식)
-   load time binding(relocatable code)
    프로그램이 시작해서 메모리에 올라갈때 물리적 주소 결정( 당시 비어있는 mem의 주소부터 올리기 시작한다. )
-   Execution time binding(run time binding) -- 현대의 방법
    실행시 주소가 올라가는 것은 같지만 실행 도중에 주솟값이 변경될 수 있음

    CPU가 주소를 참조할때마다 binding을 점검(하드웨어적인 지원 필요, base and limit registers, MMU)

    > MMU Memory-management Unit(참고로 초반의 설명은 프로세스 통째로 Mem에 올라가는 과정을 이야기함)
    > logical address ==> physical address로 매핑해주는 hardware device
    > 프로세스가 CPU에서 수행되며 생성하는 모든 주소값에 baseregister(=relocation register)를 더해서 변환해준다
    > limit register를 이용해서는 악의적인 요청인지, 우리의 프로세스가 가지고 있는 logical address의 boundary안에 있는지 체크한다.
    > (그리고 이때 걸리게 되면 trap을 걸어서 프로세스를 abort하던지 한다.)

    사용자의 프로그램, CPU모두 logical address를 바라본다.

dynamic loading
프로세스 전체를 다 올리는게 아닌, 루틴이 불려질때 메모리에 load하는 것
mem utilization의 향상
오류처리 루틴과 같은 가끔 사용되는 코드의 경우 유용
운영체제의 특별한 지원없이 프로그램 자체에서 구현가능(OS는 lib를 통해 지원가능, 현대의 프로그램이 dynamic하게 올라갔다 내려오는것은 OS의 paging시스템을 이용한것) 따라서 프로그래머가 처리하는 부분을 dynamic loading이라고 하는데 요즘에는 섞어서 쓰기도 한다.

    overlays
    mem에 프로세스에 실제 필요한 정보만을 올리는데
    Manual Overlay라고 해서 초창기 Mem의 크기가 작던때에 프로그래머가 손수 프로그램의 부분부분을 올리고 말고를 설정했었다.

swapping
프로세스를 일시적으로 메모리에서 backing store(swap area) (디스크, 많은 사용자의 processimg 를 담을만큼 빠르고 큰 저장공간)로 쫓아 내는것,

    swap in- swap out
    일반적으로 중기 스케줄러(swapper)에 의해서 swap-out시킬 프로세스 선정
    priority-based CPU scheduling algorithm사용
    우선순위가 낮은 process를 swapped out 시킴

    swapping이 효율적으로 사용되려면 runtime binding이 되는게 동적으로 주소변환도 되고 좋다.

    swaptime의 대부분은 transfer time(swap 되는 양에 비례하는 시간)

요즘에는 process를 일부 구성하는 page만 쫓겨나도 swapping의 말을 쓴다.

Dynamic Linking

Link라는 것은 여러 컴파일파일을 묶어 실행파일로 만드는 것,

Static Linking - Lib가 프로그램의 실행파일 코드에 포함됨(printf함수의 코드가 다 올라가 있는것)
Dynamic Linking - 라이브러리가 실행시 연결, 라이브러리 호출 부분에 도달하면 stub이라불리는 pointer를 따라 library가 어디있는지 찾아간다.
이미 메모리에 있으면 주소로 가고 없으면 disc에서 읽어옴 운영체제의 도움 필요(Shared Lib, DLL이라는 lib의 도움을 받아서 한다.)

Allocation of Physical Mem
Mem의 낮은 부분에는 항상 OS kernel(interrupt vector와 같은)이 상주하고 있고 그 위 높은 주소 영역에는 user process가 있다.

User Process의 영역할당 방법

-   Continuous allocation

    -   Fixed partition allocation 고정분할 방식(분할 갯수를 미리 나눠서함)
        나눠진 분할들에 대해서 process의 size랑 비교해서 할당해준다.
        (만약 분할의 크기가 작아 사용되지않으면 외부조각으로, 분할의 크기가 커서 프로세스가 할당된이후에도 남으면 내부조각으로 분류된다.)

        => 융통성이 없다.

    -   Variable partition allocation 가변분할 방식
        프로그램이 실행될때마다 차곡차곡 메모리에 올리는 방식, Process가 끝나면 새로 들어온 Process가 끝난 공간의 크기보다 크면 이또한 외부조각으로 남게된다.

        => 기술적 관리 기법이 필요하다

        Hole이 메모리 여러 곳에 생긴다(가용 메모리공간) - 운영체제는 다음의 정보를 유지.

        프로세스가 오면 Hole의 어느곳에 할당해 줄것인지 결정해야하는데
        : 가변 분할 방식에서 size n 인 요청을 만족하는 가장 적절한 hole을 찾는 문제

        -   first-fit : n이상중에서 제일 처음 보이는 hole에
        -   bast-fit : n이상중 hole의 크기와 제일 적합한 hole에(시간이 좀더 소요됨)
        -   worst-fit : 가장 큰 hole할당(시간도 오래 걸리고 별로 안좋음)

        Compaction : external-fragment를 해결하는 방법으로 hole을 쫙 밀어서 하나의 큰 hole로 만든다.
        비용이 많이 드는 방법이다. (전체 프로그램의 binding을 생각 해야한다. 그리고 runtime binding시에만 가능)

불연속할당
: address binding이 복잡해진다.

-   paging : 하나의 프로세스를 같은크기의 page로 자르고, 물리적 mem도 page가 올라갈수있게 page frame으로 자잘하게 잘라줌
    Process의 virtual mem을 동일한 size의 page단위로 나눔, virtual mem의 내용이 page단위로 noncontiguous하게 저장
    일부ㅠ는 backing storage에 일부는 physical mem에 저장

    방법 :
    물리적 공간의 동일한 크기는 frame, 논리적 공간의 동일한 크기는 page로 나눈다(frame size == page size)
    모든 가용 frame관리,
    page table은 logicaladdress와 physical address를 매핑하여 관리,
    외부조각은 발생하지 않는데 내부조각은 process가 paging되는 과정에서 마지막 조각이 균일하게 안 잘릴 수도 있으므로 해당 과정에서 내부조각이 발생할 수 있다.

-   segmentation : 의미있는 단위로 자르는 것(주소 공간이라는데 code,data,stat으로 구성되는데) 주소공간의 의미단위로 자르거나 함수단위로 자르거나 의미단위로 잘라서 물리적 주소에다가 올린다(크기가 달라지기 때문에 dynamic storage allocation problem발생(hole))

---

Paging:

주소 변환을 위해서 page table이 있다. 논리주소와 물리적 주소의 mapping을 entry로 기록해놓았고 물리적 mem에 올라갈때는 비어있는 page frame에다가 집어넣어주게된다.
페이지 내의 offset부분은 register로 변환해도 변환이 없다.

봍통 page의 크기가 4kb, page table(프로세스마다 존재)은 100만개의 테이블이 필요한데 이를 register에 올리기에는 너무 용량이 크다.
(register는 CPU에들어가있음)
따라서 pagetable은 main memory에 상주

-   Page-table base register(PTBR)가 page table을 가리킴(base)
-   Page-table length register(PTLR)가 table 크기를 보관(limit)
-   모든 mem접근 연산에는 2번의 mem access 필요(page table , data/instruction)
-   속도향상을 위해 associative register, translation look-aside buffer라고 하는(TLB 일종의 캐쉬) mina mem과 CPU사이에 있는 계층
    (주소변환을 위한 cache mem) -TLB는 전체 page table을 담는게 아니라 일부만을 담고있다.
    이때 page number를 탐색하기 위해 TLB에서 전체를 탐색해야하고 그러면 overhead가 크므로 병렬적으로 탐색할수 잇는 associative register를 사용한다. TLB의 정보는 process가 변할때마다 flush해서 비워줘야한다.

이때 탐색시간은 2 + ε - α로 작아진다

Two-level Page Table(시간은 더걸린다. 공간도 1단계의 entry가 더필요하니까 더 드는데 1차 pagetable을 사용하게되면 array의 중간 index를 비워놓고 작성할수 없으니까 크기가 작다하더라도 낭비되는 공간이 있기마련인데 2단계 pagetable을 쓰면 이를 해소 할수 있다.
안쓰는 page에 대해서는 null로 만들어지고, 2단계 table을 생성하지 않는다.)
한번 pagetable을 하는것보다 속도가 줄어들지는 않는다. 공간이 줄어든다.

프로그램마다 가지고 있는 virtual mem의 크기가 maximum얼마까지 가능할까?
32bit adress 를 쓰게 되면 2^32까지 주소의 구분이 가능해진다.(4G)
2^10 = K 2^20 = M 2^30 = G

4G를 4k의 page로 나누게 되면 1M개의 page table entry필요
각 page entry가 4B시 프로세스당 4M의 page table필요, 그렇지만 대부분 process는 극히 일부만 사용한다.==> 공간낭비가 심하다.

Two -level page Table에서 안쪽테이블은 Page Frame과 크기가 같다.
따라서 한개의 안쪽테이블 한개의 크기는 4M인데 그러면 entry를 1k개 만큼 넣을수가 있다.

구성:

-   logical address (on 32-bit machine with 4K page size)
    -   20 bit의 page number
    -   12 bit의 pageoffset(page 번호를 구분하기위해서)
-   page table자체가 page로 구성되기 때문에 page number는 다음과 같이 나뉜다.
    (각 page table entry가 4B)안쪽 page table이 page화 되어서 들어간다. 그렇기때문에 1K개의 entry가 들어가게 되고 이를 구분하기 위해 10bit필요,
    -   10 bit 의 page number
    -   10 bit의 page offset

==>안쪽(오른쪽)부터 bit할당을 나눠오면 알아낼 수 있다.

따라서 logical address는 다음과 같이 구성된다.

| pagenumber | pagenumber | pageoffset |
| ---------- | ---------- | ---------- |
| p1         | p2         | d          |
| 10         | 10         | 12         |
