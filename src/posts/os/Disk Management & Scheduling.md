---
title: 'Disk Management & Scheduling'
date: '2020-08-19'
category: ['os']
draft: False
---

# Disk 구조

-   `logical block`
    디스크의 외부에서 보는 디스크의 **_단위 정보 저장 공간_**들 주소를 가진 **1차원 배열처럼 취급** (정보를 전송하는 최소단위)

*   `sector`
    **logical block이 물리적인 disk에 매핑된 위치**
    **sector 0은 최외곽 실린더의 첫 트랙에 있는 첫번째 섹터**이다.
    (0번 sector는 부팅과 관련되어있다.)

> 디스크를 관리하는 최소단위는 sector
> sector에 data를 읽고 쓰는것은 disk controller가 해준다.

---

-   `Physical formatting(Low-level formatting)`

디스크를 컨트롤러가 읽고 쓸 수 있도록 sector들로 나누는 과정
각 섹터는 `header + 실제 data(보통 512byte) + trailer`로 구성
header와 trailer는 sector number, ECC(Error-Correcting Code)(데이터를 작게 요약한 code , (hash함수를 적용한) ECC.) 등의 정보가 저장되며 controller가 직접 접근 및 운영

> eg. ECC는 축약본이기 때문에 모든 Error를 잡을수는 없지만 사용 범위에 따라서 data의 수정까지 할 수도 있다.

---

-   `partitioning`

    디스크를 하나 이상의 실린더 그룹으로 나누는 과정 OS는 이것을 독립적 disk로 취급(logical disk)

*   `logical formatting`

    파일시스템을 만드는것 (FAT , inode , free sapce) 등의 구조 포함

*   `Booting`

    ROM에 있는 small bootstrap loader의 실행(ROM은 mem에 전원이 꺼져있어도 정보가 남아있는 공간인데 CPU는 mem에 ROM에 접근해서 부팅을 진행해준다.)

    sector 0 (boot block)을 load하여 실행

    sector 0 은 full Bootstrap loader program(운영체제 커널의 위치를 찾아서 실행해라) OS를 disk에서 load해서 실행

---

## Disk접근 type

**Access Time 의 구성**

-   `seek time`
    헤드를 해당 실린더,트랙로 움직이는데 걸리는 시간

-   `Rotational Latency`
    헤드가 원하는 섹터에 도달하기까지 걸리는 회전 지연시간 (seek time의 1/10 수준)

-   `Transfer time`
    실제 데이터의 전송시간

==> 따라서 실제로 disk를 읽는 시간의 **상당수는 Seek Time이 차지**한다.

> 트랙이 모여서 실린더

---

-   `Disk bandwidth`:
    단위시간당 전송된 바이트의 수 ==> 성능의 지표.

*   `Disk Scheduling`:
    **_seek time을 최소화 하는 것이 목표_** Seek time == seek distance

## Disk Scheduling Algorithm

이 알고리즘 구현장소가 Disk가 아니기때문에
정확한 Disk의 위치는 모를수있지만 논리번호를 가지고 scheduling하면 sector랑 맞아떨어지므로 이런식으로 해결한다.
(disk 내부에서 구현하는 경우도 있지만 지금은 실린더 번호로 한다고 가정하자

-   `FCFS(first Come First Service, 먼저들어온 순으로 처리)`
    ==> **_overhead가 크다_**

-   `SSTF (Shortest Seek Time First, 가까은 실린더 번호순으로 처리)`
    ==> **_starvation문제_**,

-   `SCAN`

    disk arm이 **끝에서 끝으로 이동하며 길목에 있는 요청 처리,
    그리고 이는 반대로 향하고 그리고 반복**한다.(arm의 경로는 비교적 공평하다)
    ==> 실린더 위치에 따라 대기시간 달라짐

-   `C-SCAN(circular scan)`
    헤드가 한쪽끝에서 다른쪽 끝으로 이동하는 사이 모든 요청 처리
    그리고 도착했으면 **_다시 출발점으로 이동하는데 이때는 요청처리없이 바로 이동만한다_**
    ==> 균일한 대기시간을 제공한다

-   `N-SCAN`
    head가 이동하기 시작한 이후 들어온 요청에 대해서는 처리해주지않고 arm이 탐색전에 들어온 애들만 처리를 해주는데 **기본적인 SCAN에 비해서 대기시간이 약간 더 평준화됨**

-   `Look and C-LOOK (ELEVETER scheduling)`
    SCAN이나 C-SCAN은 헤드가 시작하면 끝까지 이동하는데
    **_진행방향으로 더 이상 요청이 없으면 끝을 찍는게 아니라 바로 다시 돌아옴_**

> 현대의 disk시스템은 SCAN을 기반한 알고리즘을 많이 쓰고, **_LOOK, C-LOOK이 일반적으로 disk I/O가 많은 시스템에서 효율적_**이라고 한다.  
> file의 할당방법에 따라서 disk요청이 영향 받음  
> disk 스케줄링 algo는 필요한경우 교체할수있께 OS의 별도 모듈로 작성하는 것이 바람직

`SWAP-space management`

**하드디스크(DISK, 보조기억장치)를 사용하는 두가지 이유**

-   **mem의 volatile한 특성(휘발성)** -> file sys으로 보완
-   **프로그램 실행을 위한 mem공간 부족**-> swap sapce(swap area)용도로 사용

    **_Swap-space(디스크 관점)_**

    virtual mem sys에서는 disk를 mem의 연장공간으로 사용
    file시스템 내부에 둘수도 있으나 별도 partition사용이 일반적

    -   공간효율성보다는 **속도 효율성**이우선(어차피 시스템이 끝나면 사라질 정보들임)
    -   일반 파일 보다 **_훨씬 짧은 시간만 존재하고 자주 참조_**됨,
    -   따라서 **_block의 크기 및 저장 방식이 일반 file sys와 다르다_**.

#### RAID(redundant Array of independent Disks)

: 여러개의 디스크를 묶어서 사용, 물론 방법도 여러가지가 있다.

> RAID의 사용목적: 디스크 처리 속도 향상

-   여러 디스크에 **block의 내용을 분산저장**
-   **_병렬적으로 읽어옴 (interleaving, striping)_**

    ==> 신뢰성(reliability)향상

-   **_동일정보를 여러디스크에 중복저장_**
-   **_하나의 디스크가 고장(failure)시 다른 disk에서 읽어옴
    (mirroring, shadowing)_**

    > 단순한 중복저장이 아니라 일부 디스크에 parity를 저장하여 공간의 효율성을 높일수 있다.
