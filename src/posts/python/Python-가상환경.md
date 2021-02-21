---
title: "Python 가상환경 실행하기"
date: "2019-01-16"
category: ['Python','멋쟁이사자처럼']
draft : False
---


## ⭐가상환경

파이썬에서는 **한 라이브러리에 대해 하나의 버전만 설치 가능**하다
작업을 바꿀때마다 다른 버전의 라이브러리를 설치해야한다고 하면
여러개의 프로젝트를 진행하게되면 문제가 생길 수 있다.

이러한것을 방지하기 위해 *독립된 가상환경*을 제공하고
일반적으로 프로젝트마다 다른 가상환경을 생성한 후에 작업을 시작한다
이러한 가상환경을 설치할때 주의할점은 특수문자가 없는 path상에 설치하도록 하자


## ⭐python에서의 가상환경

python에서의 가상환경은 여러개가 있다.

* `venv` : python 3.3 이후부터 기본모듈에 포함됨
* `virtualenv` : python 2부터 사용되어 3에서도 사용가능
* `conda` : Anacoda Python을 설치하면 사용할수 있는 모듈
* `pyenv` : 파이썬 버전관리 툴임과 동시에 가상환경을 제공
          conda와 venv와 중복이용시에 에러가 뜰수 있다.

선택적으로 이용하면 되지만 개인적으로는 venv를 사용하겠다.


### 가상환경 명령어

> ⭐git bash 기준 설명입니다.

여기서 bash란 `Bourne-again shell` 여러 유닉스 셸종류들의 하나,
그리고 shell이라는것은 `command line`으로 불리는 명령어 입력 인터페이스입니다.


`⭐python -m venv` 

`python -m venv [가상환경 name`] 은 venv모듈의 스크립트를 실행해주는 역할입니다
(python -m 부분이 모듈을 실행시켜주는 명령어)

그럼 `venv`로 가상환경이 만들어집니다.

>위의 명령어를 사용하기 위해서는 python설치시 환경변수를 설정줍니다

### 실행과 종료 

* 실행 `source (가상환경이름)/Scripts/activate`(대소문자 구분 X)

* 종료 `deactivate`(그냥 deactivate만 입력하면 된다)

위의 코드는 `file(여기서는 activate)`을 읽어서 bash에서 사용할수 있는 명령을 실행
~~(source 는 환경변수 파일 수정시 재로그인 필요없이 바로 사용할수 있게 해주는 명령어)~~

이때 가상환경을 실행하는 위치가 중요한게 아니라 
**내가 만든 가상환경이 위치한곳의 path를 따라가 activate**를 하는게 중요하다

그리고 가상환경을 실행시켜주면 실행시킨 위치가 아닌 다른곳으로 이동해도
가상환경내에서 파일을 생성하게 되고 이외의 환경에는 영향을 안 미치고 작업을 해줄 수 있다.


* P.S 1 Scripts파일이 없을때는 bin folder를 찾아주자

* P.S 2 이때 source 명령어는 bash 내부명령어로 bash쉘이 작동중일때만 사용가능하고
. 로 사용할수도 있다  ( . 은 bash가 아닌곳에서도 사용할수 있다.)

* P.S 3 bash가 아닌 window powershell에서 
'이 스크립트는 이 시스템에서 실행되지 않습니다'라는 오류가 뜨면
관리자권한으로 powershell을 실행해주고 
C:\WINDOWS\system32> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
를 먼저 적용후에 가상환경을 실행해주도록하자


> 이때 환경변수란 ??
> ### ⭐환경변수
>환경변수는 프로세스(프로그램으로 생각하면 됩니다)가 컴퓨터에서
>동작하는 방식에 영향을 미치는 동적인 값들의 모임이다.
>
>그중 우리가 자주쓰는 path의 경우엔 설정을 해주게 되면 
>command창(termial,git bash, shell등)에서 
>굳이 **해당 파일의 directory의 위치, file의 위치까지 안 들어가도 사용**할수 있다.


