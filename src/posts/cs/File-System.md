---
title: 'File System'
date: '2020-08-14'
category: ['OS','CS']
draft: False
---

# File System

> A named collection of related information  
> 일반적으로 비휘발성의 보조기억장치에 저장
> 운영체제는 다양한 저장장치를 file이라는 논리적 단위로 볼 수 있게 함,

-   **_operation_** : `create`, `read`, `write`,`reposition`(lseek, 접근하는 위치를 수정), `delete`, `open` , `close`

*   **_File attribute_** : (File의 metadata)
    파일자체의 내용보다 **_관리하기위한 각종 정보_**들,
    파일이름, 유형, **위치**, size, 접근권한(rwx), 시간(생성,변경,사용), 소유자

---

## File system 이란?

OS에서 파일을 관리하는 부분, file 및 file의 metadata, dir정보 관리, 파일의 저장방법 결정, 파일 보호 등

-   Dir(파일의 한 종류) : **_file의 metadata중 일부(그 dir속한 file의 이름 및 file attr)를 보관하고 있는 file_**

-   Dir의 operation : search, create, delete, list a dir, rename a file, traverse the file sys

---

### Partition (OS가 보는 disk) (==Logical Disk)

하나의 물리적 Disk안에 여러 partition을 두는게 일반적,
여러개의 물리적 Disk를 하나의 partition으로 구성하기도 함
물리적 Disk를 partition으로 구성한 뒤 각각의 partition에 file sys를 깔거나 swapping(swap-area)의 용도로 사용할 수 있음

---

### open('/a/b/c')(시스템 콜)

file discripter
(b의 fd가 Process의 PCB-(per-process file descriptor table) 에 올라가게 되고 open이후에는 해당 file을 참조할때(read, write할때) 다시 metadata를 쌓아가는게(system-wide-open file table에서 (이때 wide라 해도 각 파일이 어디에 접근하는지 알기위해서 offset table을 따로 하나 더 두는게 일반적이다) ) 아니라 바로 fd를 찾아가 b의 metadata로 접근할 수 있다. )

**_file의 내용을 읽어오는 작업을 할때 file의 content를 바로 사용자 메모리영역으로 보내주는게 아니라 커널 메모리 영역(OS) 한켠에 먼저 보관을 해두고 사용자 메모리 영역으로 전달해주게 되는데_**
이는, file sys에서 파일을 읽고 쓰는 과정이 발생할때 sys call이 발생하므로 무조건 OS로 제어권이 넘어가게 되고 보관된 data가 있으면 이를 서빙해준다.
이게 `buffer cache`이고, 이때 OS는 내용에 대해서 다 알고 있으므로 `LRU 알고리즘이나 LFU알고리즘`을 자유롭게 사용 할 수 있다.

---

### file Protection

> 각 파일에 대해서 누구에게 접근을 허락할 것인가?

-   `Access control matrix`(행렬을 사용하면 공간 낭비가 심하므로 아래 포커스에 맞춰서 linked list의 형태로 구현가능)
    `access control list` : (파일별로 누구에게 어떤 접근 권한이 있는지 표시)
    `capability` : 사용자별로 자신이 접근권한을 가진 파일 및 해당 권한 표시

-   **`Grouping`**
    전체 user를 **owner, group, public** 세 그룹으로 구분

> 각 파일에 대해서 세그룹의 접근권한을 3비트씩으로 표시
> ex) `UNIX rwxr--r--`

-   `Password`
    파일마다 pw를 두는 방법(디렉토리 파일에 두는방법도 가능)
    모든 접근 권한에 대해서 password all-or-nothing
    접근 권한별 password문제, ==> 양가문제, 관리문제,

> 서로 다른 partition에 있는 file sys는 `mounting`시스템을 통해서 서로 연결을 해 접근 해줄수 있다.

### Access Method

-   **_순차접근_** : 카세트 테이프처럼 순서대로 접근

-   **_직접접근(random access)_** : LP레코드판과 같이 특정 위치를 바로 접근하는 것이 가능.

매체에 따라서 나뉠수도, 관리하는 방법에 따라서 또 나뉠 수도 있다.

---

## 파일시스템의 Implementations

> Allocation of file data of file data in Disk
> 파일시스템에 저장을 할때는 동일한 `sector`단위로 나눠서 저장한다

-   `Contiguous Allocation`(연속할당)
    각 파일별로 **연속적인 sector**를 차지하고 할당된다

    **단점**

-   **external fragmentation**(외부조각)
        file grow가 어렵다(file생성시 얼마나 큰 hole을 배당할것인지)

    ==> **grow 가능? 낭비 발생(internal fragmentation)**

    **_장점_**

-   **fast I/O** (한번의 seek/rotation(head의 이동)으로 많은 바이트 transfer)

    *   realtime file용으로 이미 run중이던 process의 swapping(swap-area)용

    *   Direct access(=reandom access)

*   **_Linked Allocation_**

    file의 data를 disk의 빈위치면 아무곳에나 들어가도록 해준다. 그리고 그 data까리 다음 다음 순서로 가리키고 있어서 타고타고 이동한다

    **장점**
    exteranl fragmentation(외부조각) 발생 안함,

    **단점**

-   **_No random access_**(Direct access)
-   Reliability : 한 sector가 고장나 pointer가 유실되면 많은 부분을 잃음
-   pointer를 위한 공간이 block의 일부가 되어 공간효율성을 떨어뜨림

    따라서 변형해서 사용하는데 **_file-allocation table(FAT)_** 파일시스템을 이용한다.
    ==> 포인터를 **별도의 위치에 보관**하여 reliability와 공간효율성 문제해결

*   indexed allocation
    각 블럭의 index 값을 indexed block에 저장해서 찾아간다.

    **장점**

-   external frag가 발생 X
-   direct access 가능

    **단점**

-   small 이라 할지라도 최소 2개의 block이 차지된다(small file의 경우 공간낭비, 실제로 많은 file들이 small인데)
-   Too large file의 경우 하나의 block으로 index를 저장하기에 부족

    해결방안

    1. linked scheme - 인덱스 블럭에 쭈욱 적다가
       인덱스가 끝날때 다시 또 다른 인덱스를 기록한 파일의 위치를 기록
       (물리고 물리고)
    2. multi-level index - index블럭이 바로 가리키는게 아니라 다른 index block을 가리킬수도있다.

> 파일을 disk에 저장하는 방법을 이론적으로 알아보고 그럼 실제파일시스템에서는 어떻게 변형해서 쓰는지 알아보자

---

## UNIX 파일시스템의 구조

-   `partition`(논리적 Disk)에 파일시스템이 설치되어있고
-   `Boot Block`(어떤 file시스템이던 제일 처음에 온다.) : 부팅에 필요한 정보가 들어가있다(bootstrap loader)
-   `super Block` : 파일시스템에 관한 총체적인 정보를 담고있다.(빈것, 사용중)
-   `Inode list` : (**_file의 metadata를 dir는 일부만 들고있고 대다부는 Inode가 file의 metadata를 들고있다_**.)
-   단 **file의 이름은 dir가 직접 들고있고, dir에는 file의 이름과 inode의 번호가 담겨있게 된다**.
-   기본적으로 `indexed allocation`방식을 가지고 구성이 되어있다.
    -   (single, double , triple indirect block을 이용한다.)
-   `Data block` 파일의 실제 내용을 보관

---

### PAT file system

-   `bootblock`
-   `FAT` : file의 metadata중 일부(위치정보)를 FAT에서보관
    나머지 metadata는 data block의 dir가 들고있다. dir에서 block의 위치를 FAT에 저장을 해두고 이렇게 해주면 linked allocation을 이용한것이다.
    직접 접근이 가능해진다. 그리고 FAT에서 위치를 찾아와서
    data block에서 바로 찾아갈수도 있고, 만약 위치정보가 불량 sector가 된다해도 FAT은 중요하니까 2개이상을 가지고 있어서 안정성이 보장된다.

-   `root dir`
-   `data block`

---

### Free-space management

-   `bitmap or bit vector`: 사용중인 data block인지 bitmap으로 맵핑시킴
    bit[i] => 0 free , 1 occupied

Bitmap은 부가적인 공간을 필요로함, **연속적인 n개의 free block을 찾는데 효과적**

-   `Linked List` : 빈 블럭들을 **_pointer_**로 다 연결,(시작점만 우리가 가지고 있다.) bitmap에 비해서 공간낭비는 없지만 연속적인 빈공간을 찾는 것은 쉽지 않다.

-   `Grouping` : `linked list`의 변형 : 첫번째 freeblock이 n개의 pointer
    n-1 pointer는 free data block을 가리킴, 마지막 pointer가 가리키는 block은 또다시 n pointer를 가짐 (연속적인 공간을 찾는데 불편)
    약간 index랑도 결합

-   `Counting` : 프로그램들이 여러개의 연속적인 block을 할당하고 반납한다는 성질에 착안, **first free block, # of contiguous free blocks**) 을 표시

---

### Directory implementation

-   `linear list`
-   filename, file의 metadata의 list
-   구현이 간단
-   디렉토리 내에 file이 있는지 찾기위해서는 linear search 필요
-   `Hash Table`(해쉬함수를 적용하고 해당 entry에 바로 접근해서 찾음)
-   linear list + hashing
-   hash table은 file name을 이 파일의 linear list의 위치로 바꿈
-   search time없앰
-   collision 발생 가능

> **file의 metadata보관위치**  
> 파일내 직접보관, 디렉토리에 포인터를 두고 다른곳에 보관 (inode,FAT)

> **long file name의 지원**  
> filename, file의 metadata의 list에서 entry는 일반적으로 고정 크기, 따라서 file name이 고정크기의 entry길이보다 길경우 entry의 마지막 부분에 이름의 뒷부분이 위치한 곳의 포인터를 두고 찾아간다.  
> 이름의 나머지는 동일 dir의 file에 존재한다.

-   `VFS (virtual file system)`
    사용자가 file sys에 접근할때 sys call이 발생하는데 file sys의 종류가 많은만큼 혼란이 야기될수 있다. 따라서 서로다른 다양한 file sys에 대해서 동일한**_ system call interface (API)_**를 통해서 접근할수 있게 하는 **_OS의 layer_**

-   `NFS(Network File System)`

-   분산 시스템에서는 **network를 통해 file이 공유될 수 있음**
-   **NFS는 분산 환경에서의 대표적인 file공유 방법**
-   외부 컴퓨터(서버컴퓨터와 같은것에)에 접근할때
-   그러면 해당 **_외부컴퓨터로 가서 VFS요청을 하고 다시 가져_**오게된다.

*   `Page Cache and Buffer Cache`

-   `Page Cache` : **_virtual mem의 paging sys에서 사용하는 page frame을 caching의 관점에서 설명하는 용어,(swap -area와 소통)_**
-   **_mem-mapped I/O를 쓰는 경우 file의 I/O에서도 page cache사용_**
-   **_mem-mapped I/O_**
-   **_file의 일부를 virtual mem에 mapping시킴_**
-   **매핑시킨 영역에 대한 메모리 접근 연산은 파일의 입출력을 수행**하게함

    *   `Buffer Cache`
-   파일시스템을 통한 **_I/O연산은 메모리의 특정영역인 buffer cache사용_**
-   **file사용의 locality 활용**
    -   한번 읽어온 block에 대한 후속 요청시 buffer cache에서 즉시 전달.
-   **모든 process가 공용으로 사용**
-   **replacement algo필요(LRU,LFU)**

최근에는 buffer cache가 page cache에 통합되어 관리되는데 (**Unified Buffer cache**) 합쳐졌기 때문에 **buffer에서도 512byte(sector)가 아니라 4KB의 blcok단위로 관리**함. (**swap영역은 빠르게 올리고 내려야** 하므로 4KB단위로 block관리함)

---

### 기존 file I/O

파일 open read write(syscall)

**_mem-map I/O_**
file sys - buffer cache- page cache 파일의 입출력이 mem에 접근해서 읽고 쓰는것이다.

이 방법에서는 파일 입출력시에는 OS를 무조건 거치고,
만약 **_page에다가 캐싱해놓으면 이때는 커널의 도움 없이_** 가져오게 되는데

`Unified Buffer cache`의 경우에는 위의 두 경우 모두 buffer cache를 거쳐서 온다

프로세스의 주소영역에서 코드부분은 실행하게 되면 물리적 mem에 올라갔다가 swap-area로 빠져서 swap에서 찾아오는게 아니라 바로 file sys에 있는 실행파일을 찾아오기때문에 이 예시가 file sys랑 mem이랑 mapping된 예 이다.

그리고 프로그램 살행도중에 데이터 파일을 시키면

mem map-io의 경우 **_physical mem에 올라가있는 data를 바로 참조하기때문에 좀 더 빠른 장점이 있다.overhead도 없다_**. (얘는 다른 프로세스와 mem에 있는 data를 같이 참조하기때문에 일관성 문제가 발생할 수 있다.)

그런데 **_다른 프로그램이 read-write동작을 하면 buffer cache에서 찾아서 사용하고 해당 mem에서 해당 data를 복제해와서 사용_**하게 된다(이때는 복제해왔기때문에 공통의 data가 아니고 일관성 문제와 무관하다.)
