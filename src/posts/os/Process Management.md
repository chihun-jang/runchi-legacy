---
title: "Process Management"
date: "2020-05-19"
category: ['os']
draft : False
---

# Process Management

***

### 프로세스 생성:

부모프로세스가 자식프로세스 생성(1:n) ==> 트리형태,계층구조로 만들어진다.
이떄 기본적으로 프로세스의 생성은 복제를 통해서 이루어지는데 주소공간(code, stack, data)과 심지어 PC(Program counter)까지 복제한다.

### 자원의 공유
* 부모 자식 모든자원 공유
* 일부 공유
* 전혀 공유 X (일반적인 관계,경쟁관계)

>**_Copy-on-write(COW)_**   
>그대로 복제를 하면 memory에 똑같은게 2개가 올라가기떄문에 비효율적이게 된다. 따라서 리눅스의 경우 일단은 자식이 부모와 같이 사용할수있는 자원은 같이 공유하고 나중에 data나 내용의 변경이 생기면 그때 복제생성을 해준다 (전체를 복사하는게 아니라 code,data,stack중에서 달라진 부분만 복제를 한다)

### Execution
* 부모와 자식은 공존
* 자식이 종료될떄까지 부모가 `wait(blocked)`

***

### 프로세스 생성 동작
자식은 부모프로세스의 주소공간을 복사(`fork`) -> 자식이 그 공간에 새로운 프로그램 올림(`exec`)

1. `fork()` : **시스템콜**이 새로운 프로세스 생성, 부모를 그대로 복사((binary and OS data except PID) ), 주소공간할당
2. `exec()` : 시스템 콜을 통해 새로운 프로그램을 메모리에 올림.(덮어쓰기),실제는 부모프로세스가 OS에 요청함


### 프로세스 종료 동작

- 정상적으로 프로세스가 실행되고 종료되는 경우
프로세스가 마지막 명령을 수행한 후 OS에게 `exit()`시스템콜 알려줌
자식이 죽고 부모에게 **output data**를 보내고 사용하던 자원 운영체제에 반납,

- 프로세스가 종료되기전 비정상적 종료(부모프로세스가 자식의 수행을 종료시킴(`abort()`))
    * 자식이 할당자원 한계치 넘음, 
    * 자식에게 할당된 테스크가 더이상 필요 X
    * 부모가 종료하는경우 - 자식을 다 죽이고 부모가 죽음


***

### fork() 

자식은 부모의 `context`를 복사하기떄문에 정확히는 `PC`를 복제하기떄문에

A-B-C-D 에서 B에서 fork()함수가 실행되면 복제된 자식은 A-B-C-D의 구조를 가지지만 복제된 자식은 C부터 실행된다
fork()를 하면 부모PID와 자식 PID가 다르게 생성되므로 구별할 수 있다.


##### c언어 에서의 fork()
```c
int main()
    { int pid;
        pid = fork()
        if(pid==0) /*this is child" 자식은 pid가 0*/
            print("\n hello i am child\n")
        else if (pid > 0)  /*this is parent" 부모는 pid가 양수*/
            print("\n hello i am parent\n")
}
```


##### c언어 에서의 execlp()
```c
int main()
{ int pid;
    pid = fork()
    if(pid==0) /*this is child"*/
        execlp("/bin/date", "bin/date", (char*)0); 
    else if (pid > 0)  /*this is parent"*/
        print("\n hello i am parent\n")
}
```
c언어에서는 `execlp()`으로 `exec()`를 실행하는데 이 부분에서 프로세스가 덮어쓰이게 된다.

`exec()`으로 덮어쓰고 다시 돌아올수는 없다.(이후의 코드는 실행되지 않느다)
`fork()`를 하지 않고 `exec()`만 해줄수도 있다.


### wait()  (Execution의 두번째모델)
`wait()`시스템콜을 호출하면 잠들러간다. child가 종료될때까지 부모가 `blocked`되고 자식이 죽으면 다시 `ready`상태로 돌아온다()

ex) shell에서 프로그램이 동작하는 동안 input을 할 수 없는게 `wait` 상태


### exit() (프로세스의 종료,(자원반납))

- 자발적 종료 
    - 다 실행되고 exit하는경우 
  
- 비자발적종료
  - 부모가 자식프로세스 죽이는 경우, 
  - 사용자가 강제로 kill,break하는 경우
  - 부모가 종료하는 경우(부모가 종료되기전에 자식을 다 죽이고 죽음)


### 프로세스간 협력: 

원칙적으로 프로세스는 독립적이다.(**independent process**) 다른 프로세스 수행에 영향을 미치지 못한다.

협력프로세스(cooperating process) : 프로세스협력 메커니즘을 통해 하나의 프로세스가 다른 프로세스의 수행에 영향을 미침

#### 프로세스 간 협력 메커니즘 ( IPC : Interprocess Communication)

- 메세지를 전달하는 방법(`message passing`) : **_커널_**을 통해 메세지전달(Message system-프로세스 사이에 공유변수를 사용하지 않고 통신)
  - Direct Communication (통신하려는 프로세스의  이름 명시)
  - Indirect Communication (mailbox ( port)를 통해 전달

- 주소 공간을 공유하는 경우(`Shared memory`)
원래는 자신의 주소공간만 볼수잇는데 Mem에 올라가있는 ProcessA, ProcessB가 물리적 주소공간(일부 주소공간)을 공유하는것, 이 또한 커널이 중간에서 연결을 해줘야한다.

> `thread` : thread는 하나의 프로세스이므로 프로세스간 협력은 아니지만 협력의 관점에서 보면 동일한 process들은 동일한 주소공간을 공유하므로 협력에 용이하다

