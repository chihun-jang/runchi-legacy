---
title: "Git Basic"
date: "2019-06-24"
category: ['git']
draft : False
---

### Git 분산버전관리시스템 - Basic 

> **Local Repository**와 **Remote Repository**


### GIT 

컴퓨터 파일의 **변경사항을 추적**하고
여러명의 사용자들 간에 **해당 파일들의 작업을 조율하기 위한 분산 버전 관리 시스템**

이때 버전이라는 것은 작업을 함에 있어서 특정 **check point or save point** 를 만들어 두는것이라 생각하자

이를 통해 변경된 이력을 쉽게 확인할 수 있고,
특정 시점에 저장된 버전과 비교하거나 특정 시점으로 돌아갈 수도 있다.


### Git의 저장소

* 원격 저장소(Remote Repository) : 파일 원격 저장소 전용 서버에서 관리, 협업 등에 이용한다.
* 로컬 저장소(Local Repository) : 내 PC에 파일이 저장되는 저장



### Local Part

|   |   |   |    |
|---|---|---|---|
|명령어  | `git init`|  `git add <대상> `| ` git commit -m "commit massage"`|
|위치   |작업트리(작업폴명)| index(staging area) | Local repository|


위의 흐름에 따라 순서대로 알아보도록 하자



1. `git init`

```shell
$ git init   #git을 시작하는 명령어, 명령어를 실행한 directory가 작업 트리가 된다.
           
$ ls -al    #.git이 생성되었는지 확인해주자.
```


2. ` git status`


```shell
$ git status  # git의 현재 상태를 확인 할수 있는 명령어, 중간중간 git status로 add 여부와 commit 여부를 확인
        
        # untracked : git이 아직 추적하지 못하는 파일
        
        # changes not staged for commit ( modified ) : 변경사항이 있지만 아직 staging되지 않은 파일
        
        # changes to be committed ( new file ) : 변경 사항이 staging 되어 commit 할 준비가 된 파일
```

3. `git add`

```shell
$ git add <filename1> <filename2> ...   #index영역(staging area)에 올리고자하는 file을 추가한다.
$ git add . # 현재 directory 내부의 모든 변경사항을 index로 올리게 된다.
```

 

index영역에 등록하는 것은 변경사항중에서 원하는 것만 선별해서 commit 을 할수 있도록 해주기 위함이다.


4. `git commit `

```shell
$ git commit -m "commit massage" #index영역(staging area)에 등록된 변경사항을 local repository로 commit한다.
       
# Commit : 파일 및 폴더의 의미있는 변경사항을 버전으로 저장함(시간순으로 저장됨)

            # Commit massage의 권장 형식 
            #    "1번째 줄 : Commit 내의 변경 내용 요약
            #     2번째 줄 : 빈 칸
            #     3번째 줄 : 변경 이유"

            # 그런데 실제로 사용하다보니 팀간의 약속을 통해서 정하는게 제일 좋은것 같다.
```
> #### git config 
>⭐⭐그런데 이때! git config 관련 message가 뜨면서 commit이 안될 때가 있는데
>`$ git config --global user.name "name"`
>`$ git config --global user.email "email@address"`
>그럴때는 위의 명령어를 입력한 후에 다시 commit을 해주자
>
>위의 명령어는 local에서 commit을 할때 사용하는 정보를 셋팅하는 과정이다.


***

### Remote Part

1. Remote 연결

```shell
$ git remote add origin <원격 저장소 url>.git

  #원격 저장소와 local 저장소 연결 (origin 이라는 이름으로 add 해주겠다)

$ git remote -v   

  #remote로 연결되어있는 저장소 목록을 보여줌
```

>❔ console로 작업할때 push나 pull에서 원격 저장소 이름을 생략하면 origin으로 default생성 되기때문에 origin이라는 이름을 쓴다


2. `git push`


```shell

$ git push origin master    

#   origin 이라는 이름으로 추가되어있는 원격 저장소에 master branch의 commit사항을 push(업로드) 해준다

#  이때 git push -u 옵션을 주면 origin repository와 연결지어 재사용시 git push 명령어만 입력해줘도 된다 (upstream 설정)

#  위의 예시에서는 master branch를 push해줬는데 우리가 push 하고싶은 branch를 push 해주면 원격 repo에 반영이 된다.
```


3. `git clone`

```shell
$ git clone <원격 저장소 url>.git  

#   원격저장소를 local로 복제하는 것으로 통째로 복제하기때문에 원격 저장소의 commit 사항까지 참조할 수 있다.

#   뿐만 아니라 원격저장소에서 복제해 온 것이므로 자동으로 복사한 원격 저장소랑 remote로 연결이 되어있다. 
```

4. `git pull`

```shell
$ git pull
#   협업 등을 하는 이유로 인해 원격 저장소에 변경사항이 있으면 local에서 push를 하는 경우 덮어쓰게 될 수 있다.

#   따라서 이를 방지하기 위해 push를 하면 reject처리를 해주는데

#   원격저장소에 있는 최신 변경이력을 local로 가지고 오는것이 git pull 이다.
```



### Merge 와 conflict

>이렇게 코드가 합쳐지는 과정을 병합(merge)라고 한다
>일반적으로 merge를 하면 Git에서 자동으로 해주지만   
>원격과 로컬에서 **같은 파일의 같은 부분을 서로 다르게 변경**한 경우
>Git은 어느 것으로 병합해줘야 할지 판단 하지 못해 conflict를 발생시킨다   
>따라서 이런경우에는 수동으로 **conflict**코드를 수정하여 commit 해줘야한다.



```shell

\<<<<<<<<<<<<< HEAD

code 1 

=============

code 2

\>>>>>>>>>>>>> commit number
```
code 1과 code 2 가 충돌하고 있으므로 수동으로 변경해준다음 << ,>> 부분을 삭제하고 다시 커밋해줘야한다.




