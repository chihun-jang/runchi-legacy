---
title: "Git 명령어(심화)"
date: "2019-06-26"
category: ['Co-work','Git']
draft : False
---

Git 심화편을 시작하기 이전에 Remote repo부분을 간단하게 보고 넘어가겠습니다.


### 원격 저장소와의 작업

### `pull`

원격에서 가져오는 경우도 branch와 같은 원리로 `pull`이 진행된다

1. local의 변경사항이 없으면 그냥 **fast-forward** 되고
2. local의 변경사항이 있고 원격저장소의 변경사항도 있으며 둘의 충돌이 없으면
그냥 병합커밋이 만들어지고
3. 충돌이 있으면 수동으로 해결한다음 `commit`해줘야한다


### `fetch`   

pull과 달리 **병합과정을 거치지 않고 원격 저장소의 내용만 확인**하고 싶은 경우 fetch를 사용한다

fetch를 실행하면 FETCH_HEAD라는 이름의 branch로 가져오기때문에
`git branch checkout FETCH_HEAD` 로 확인해볼 수 있다.

즉 ``fetch + merge 는 pull``이다


### `push`

local에서 원격으로 push 할때는 `fast-forward`로 처리하도록 해줘야한다
(즉 로컬이 원격보다 commit이 앞서고 있는 경우)

**임의로 원격저장소의 커밋을 바꾸면 그 원격 저장소와 동기화 된 다른 저장소의 커밋에도 영향**을 주니 주의하자



### `Tag`
커밋을 참조하기 쉽도록 이름을 붙이는것

> 🔖일반 태그 ( Lightweight tag )
이름만 붙일 수 있다

>🔖주석 태그 ( Annotated tag )
* 이름을 붙일 수 있다
* 태그에 대한 설명 포함 가능
* 서명도 넣을 수 있다
* 이 태그를 만든 사람의 이름, 이메일과 태그를 만든 날짜 정보 포함 가능


일반적으로 release branch에서는 주석태그를 사용하여 상세한 정보를 포함하고
topic branch에서는 일반태그로 이름만 표시
태그 이름을 지정하여 checkout 하거나 reset할때 간단히 과거의 상태로 되돌릴수 있다.


-사용방법-
commit 후 최신 commit에 대해 사용해준다


* 🔖일반 태그

```shell
$ git tag <tag name> #commit 에 tagname을 붙여준다 (여러번 달아줄 수 있다)
                        
$ git tag            # tag 목록을 볼 수 있다.
$ git log --decorate # tag 정보까지 포함한 이력을 확인 할 수 있다. (그런데 git log만으로도 보인다)
```

* 🔖주석태그

```shell
$ git tag -a <tag name> #tag name으로 만들어진 tag에 내용을 추가할 수 있다             
$ git tag -am "git tag 내용" <tag name>  #한번에 처리 가능하다
```

* 태그 삭제

```shell
$ git tag -d <tag name> 
```


### Commit --amend
--amend 옵션을 지정하여 commit을 하면 같은 브랜치 상에 이전 커밋내용을 수정할수 있다

```shell
$ git commit --amend

    #commit 에 amend옵션을 주게되면 최근 commit 내용이 뜨는데
    #commit massage를 수정해 줄 수 있다.
```
이때 add를 하고 commit --amend를 해주게 되면 index에 올라간 내용과 이전의 commit을 합쳐 새로운 commit을 만들어주는 것이 되자만

**index에 올라간 변경사항 없이 그냥 commit --amend를 실행**해주면 이전 commit massage에 대해 변경이 가능하다



### revert

**_commit 덮어쓰기_**

**rebase -i 나 reset을 이용해 삭제 할수 있지만 이미 공개된 경우에는 하기 힘들다**
(안전하게 삭제하자)

따라서 해당 commit의 변경사항을 되돌리는 commit을 만들어서 해결한다
`A -> B -> C -> B'`

```shell
$ git revert HEAD
    #HEAD는 지금 branch의 최신 commit을 가리키기 때문에 해당 commit을 지우는 commit을 생성한다
    #⭐이때 HEAD~ 의 경우에는 ~ 1개당 1단계 전의 commit을 의미한다 즉 HEAD~~은 전전 commit을 의미한다
    #⭐ HEAD~7 이렇게 사용해줄 수도 있다.
```

### reset
**필요없어진 commit 삭제**

> 📋 reset의 종류( default는 mixed이다 )


|      |  HEAD의 위치    |     인덱스     |       작업트리     |       사용|
| - | - | - | - | - |
|soft   |  변경함       |      변경 안함    |     변경 안 함  |    커밋만 되돌릴때|
|mixed | 변경함         |      변경함      |     변경 안 함   |   변경한 인덱스를 원래대로|
|hard  |  변경함             |  변경함      |       변경함    |     최근 커밋을 완전히 버리고 이전으로|

```shell
$ git reset --hard HEAD~~ #전전의 commit 으로 완전히 돌아가라는 의미이므로 작업트리뿐만아니라 index도 다 변경되었다
                         
$ git reset --hard ORIG_HEAD #만약 실수로 reset을 하여 지워진 경우 reset 실행전의 상태로 돌아가게 하는 명령어 ORIG_HEAD가 reset 전의 commit을 참조한다
```             
                
### cherry-pick

다른 브랜치의 특정 커밋을 복사해 현재 브랜치로 가져올 수 있다.

```shell
$ git cherry-pick <특정 commit 번호>
  # 지금 HEAD가 위치한 branch에 특정 commit이 추가된다. commit 번호는 git log로 확인할 수 있다
```

#### rebase -i
commit을 편집(수정, 삭제, 통합 )작업을 할 수 있다.
따라서 push전 commit내용을 정리할때나, 커밋에 누락된 파일을 추가할때 사용

```shell
$ git rebase -i HEAD~~  
    #HEAD에서 HEAD~ 까지 커밋이 표시
    #상단의 pick을 squash로 바꾸면 해당 commit으로 통합된다
    #그런데 이때 주의 해야할것이 최신의 commit으로 통합하는 것이고 squash를 적게 되면 그 #이전의 commit이랑만 통합하므로
    #여러개의 commit을 통합할시 여러개의 pick을 모두 여러개의 squash로 바꿔줘야 한다
```

edit(squash 자리에)을 입력해주면 해당 commit을 수정할 수 있다.
-> 그럼 해당 commit을 수정해준 다음` add , git commit --amend`를 해준다
이 커밋 작업이 종료했다는것을 알리기 위해 `git rebase --continue`를 실행

만약 중간에 충돌이 발생하면` add , git rebase --continue`를 바로 실행,

중지하고 싶으면 `git rebase --abort `

```shell
$ git reset --hard ORIG_HEAD reset 과 마찬가지로 rebase전의 commit상태로 돌아갈 수 있다.
```
