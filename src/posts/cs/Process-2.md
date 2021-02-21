---
title: 'Process - (2)'
date: '2020-05-17'
category: ['OS','CS']
draft : False
---

### Thread
프로세스 내부에 **_CPU수행단위_**가 여러개 있는것

프로세스는 만들어질때 `code data stack`로 구성된 주소공간이 만들어지고 **PCB라는 자료구조**를 가지는데
**동일한 일**을 하고있는 프로세스가 여러개있으면 주소공간을 여러개 생성하는게 아니라
**_1개_**만 생성하고 PCB내부에 PC(와 같은 CPU수행과 관련 정보)를 여러개를 두고 함수를 실행,
그리고 실행 결과를 담아놓기위한 stack도 주소공간에 여러개를 가지고 있다.

**CPU수행과 관련된 정보는 구분**하지만 나머지 자원은 같이 사용한다.


> **Multi-Thread(lightweight process)**    
> **Thread가 구분하는 것**: PC, register set, stack space 
> **Thread가 공유하는 것**(task) : code section, data section, OS resources    
> Single-Thread (heavyweight process )전통적인 개념의 스레드   
> `Multi-Thread`로 구성한 task 구조에서는 하나의 Thread의 상태가 `Blocked`여도 동일한 task내의 다른 `Thread`가 실행(`running`)되어 빠른 처리를 할 수있다.

동일한 일을 하는 Process가 여러개 생성되면 주소공간이 많아져서 **메모리 낭비**가 심한데,
하나의 Process 안에 **Multi-Thread**로 처리하면 성능향상이나 자원을 절약할 수 있다. 높은 처리율(throughput)

특히 CPU가 여러개인경우 Thread를 사용하면 병렬성을 높일수 있다.
(서로 다른 CPU가 Multi-Thread를 사용하여 빠르게 처리할수 있다.)

***

`Thread` 사용의 장점:

* `Responsiveness`(응답성) : 
ex) 웹브라우저가 멀티스레드 인경우 html을 기준으로 보면 html요청 후 추가적인 img 태그 같은 경우에 요청이 다시 한번 더 들어가는데 이때 기다렸다가 보여주는게 아닌 다른 Thread를 이용하여 display를 먼저 해준다. 
이때의 입출력은 html전체를 읽어오는 것은 오래걸리지만 **읽어오는 것은 남겨두고 일단 보여주므로 비동기식 입출력**

* `Resource Sharing`: 1개의 주소공간으로 자원을 효율적으로 쓸수있따.

* `Economy`(빠르다) : Process하나를 만드는 것은 시간이 오래 걸리지만 Thread를 만드는 것은 overhead가 크지 않다. 또한 context switch 할 때도 아껴줄수 있는데 Thread 를 생성하고 cpu switching을 하면 훨씬더 경제적이다
> Solaris OS의 경우 **create는 30배 switching은 5배 overhead가 차이난다**

* `Utilization of Architectures`(멀티 프로세서) : 각각의 Thread가 멀티프로세스에서 병렬적으로 일을 할 수 있으므로 보다 효율적인 처리가 가능하다


### Thread구현방법

* `kernel threads`(kernel) : 커널이 생성하는 것으로 threads가 여러개 있다는 것을 알고있음,따라서 스케줄링 하듯이 thread를 이동시킴.
* `user threads` (library가 구현) : 유저프로그램이 만들어서 지원하기 때문에 커널은 모르고있음
* `real-time thread`

