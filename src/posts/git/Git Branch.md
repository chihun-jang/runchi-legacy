---
title: "Git Branch"
date: "2019-06-25"
category: ['git']
draft : False
---

### Git 분산버전관리시스템 - Branch

#### Branch 
```
        H   
    ↗️        ↘️ 
A  ➝  B  ➝  C  ➝ D
    ↘️                ↗️
        X    ➝  Y 
```

동일한 소스코드로 협업을 할때 **여러사람이 서로 다른 작업**을 하게 되면
다른 버전의 code가 만들어지게 되는데 이런 작업을 손쉽게 돕는 기능이 Branch이다

말그대로 나뭇가지처럼 **master branch에서 부터 뻗어 나와 우리가 사용하고 싶은 용도로 branch를 만들어 코드를 작성할 수 있는 것**이다.
(**_branch는 다른 branch의 영향을 받지 않는다_**)

이렇게 작업할경우 branch로 작업기록을 중간중간 남기게 되므로 문제가 발생했을 때
원인을 찾고 대책을 세우기 쉬워진다.

이렇게 branch를 나누어 작업을 한 이후에는 merge를 통해 branch를 모은다
(**그리고 현업에서느 일반적으로는 특정 이슈에 대해새 branch를 생성하고 코드를 작성한 후에 삭제를 해준다고 한다.**)


### 참고할 만한 Branch 모델

Git에서는 하는 작업에 따라 자유롭게 Branch를 만들 수 있는데
협업하는 **팀원들과 함께** branch의 작성규칙, 통합규칙을 정하는게 좋다


>master branch 란?   
repository를 처음 만들면 기본적으로 제공되는 branch로 새로운 branch를 만들어
checkout( 브랜치 이동 ) 을 하지 않는 이상 master에서 작업하게 됩니다.


* Main branch

✔ `master 브랜치`는 배포가능한 상태만을 관리, commit시 tag를 사용하여 배포 번호 기록
✔ `develop 브랜치`는 통합 브랜치의 역할을 하며 **이 브랜치를 기반으로 개발 진행**, **안정적인 상태(app의 모든 기능 정상동작) 유지**

✔ Feature branch or Topic branch
**새로운 기능 개발 및 버그 수정**이 필요할시 develop branch로부터 분기
개발이 완료되면 develop branch로 병합


✔ Release branch
* 모든 기능이 정상적으로 동작하는지 확인
* branch 앞에 'release-'를 붙인다.
* 최종 버그 수정등의 개발을 수행
* 모든 준비가 끝나고 배포가능한 상태가 되면 master branch로 병합. commit에 tag번호
* release에서 발견한 버그사항은 develop branch에도 적용해야하므로 병합작업


✔ Hotfix branch
* 배포 버전에 긴급 수정사항이 있을경우 **master branch에서 분기하는 branch**
* branch 이름 앞에 'hotfix-'를 붙인다
* develop branch는 개발 진행중이기때문에 hotfix에 대처하기 힘드므로 master에서 분기해서 처리한다
* 처리 후에는 develop branch에도 병합해준다

***

### 1. 브랜치 만들기

```shell
$ git branch < branch name > #branch 를 만들어 주는 명령어 
                               
$ git branch   #branch 목록을 확인하는 명령어
                       
```

***

### 2. 브랜치 전환하기

```shell
$ git checkout <목표 branch> #현재 위치한 branch 에서 목표 branch로 이동<HEAD>가 변경된다.
                              
$ git branch -b <목표 branch> #목표 branch를 생성함과 동시에 이동한다

```          

>브랜치를 **checkout하면 해당 브랜치의 최신 commit사항이 작업트리에 반영**된다   
⇒ **즉 directory에 해당 branch에서 작업한 최신 commit이 반영**된다

`git log`를 통해서 branch의 생성과 commit을 확인해 줄 수 있다.

***

### 3. Stash
   
branch의 변경사항에 대해 **commit하지 않으면** checkout을 통해
index와 작업 트리에 남아있는 내용들을 다른 브랜치에서 commit할 수도 있다.

그런데 이때 **다른 branch에서 변경사항에 대해 충돌되는 부분이 이미 commit되어 있다면 commit을 하지 않았다 할지라도 checkout이 되지 않는다**.(원래 커밋을 하면 conflict가 나지만 commit을 하지않아도 checkout이 되지않는다는 말)

이럴때 사용할 수 있는것이 `merge` 혹은 `stash`이다

```shell
A branch  : 1.txt 생성 , 첫번째 줄에 111 입력

$ git branch B 를 통해 B branch 생성


A branch  : 1.txt 의 첫번째 줄을 111222 로 수정  -- commit

$ git checkout B : 1.txt의 첫번째 줄은 111만 있음
                   1.txt의 첫번째 줄을 111333으로 수정 --- commit X


$ git checkout A : Error 발생

  # B branch에서 commit되지 않은 111333 부분이랑 
  # A에서 commit된 111222가 서로 충돌을 일으킴
```

`$ git stash `

위의 명령어를 통해 지금 위치한 branch의 1.txt 파일을 stash 한다

#### stash란?
**merge는 아예 확정적으로 commit을 하는거라면** 
stash는 git내부의 가상의 어떠한 공간에 충돌이 일어나는 file을 **임시로**넣음

즉 임시 보관의 개념으로 사용할 수 있다.

```shell
$ git stash
$ git checkout A  # 이제는 충돌하는 부분 없이 A로의 이동이 가능
$ git stash show  # stash 된 file들을 확인할 수 있다.
$ git stash pop   # stash 된 file을 다시 뽑아내어 git add , commit을 해줄수 있다.
```

이처럼 commit을 하지 않은 채 branch의 이동간에 `conflict`가 나는 경우 
우리는 `stash`를 이용해서 해결할 수 있다.

***

### 4. 브랜치 병합하기

```shell
$ git merge <대상 branch> # 현재 사용중인 branch에 대상 branch의 내용을 병합해준다.
                            

#현재 (master) branch를 사용중이라고 하면
#git merge mybranch 
#위의 명령어 실행시 mybranch의 변경사항을 master branch로 병합해준다.
```

***

### 5. 브랜치의 충돌

```shell
A ➝ B ➝C ➝ D(master)[HEAD]
            ↘️              
                X ➝ Y(bugfix)
```

위의 D commit 과 Y commit 이 같은 내용을 서로 다르게 변경한 경우 conflict가 발생할 수 있는데 Git이 자동으로 충돌내용에 대해서 알려주기 때문에 직접 수정해서 다시 commit을 해줘야한다


```shell
A ➝ B ➝C ➝ D ➝ F(master)[HEAD]
            ↘️           ↗️
                X ➝ Y (bugfix)
```
그럼 이렇게 F라는 **merge commit**이 새로 생성되게 된다
위와 같은 방법은 **_non fast-forward_** 병합이다.



> 브랜치 병합의 두 방법 ( merge & rebase )   
> * merge - 변경내용의 이력이 모두 그대로 남아있기 때문에 복잡하게 보일 수 있음   
> * rebase -  이력은 단순하지만 원래의 commit이 변경됨. 
>           정확한 이력을 남겨야 할 필요가 있을때는 사용하면 안됨

***

#### fast- forward(빨리감기) 

```shell

A ➝ B(master)[HEAD]
           ↘️
                X ➝ Y ➝ Z(bugfix)
```

```shell
A ➝ B   
           ↘️   
               X ➝ Y ➝ Z(master)(bugfix)[HEAD]
```

master branch가 변경된 이력이 없기 때문에
**bugfix는 master branch의 이력을 모두 포함**하고 있다

따라서 master브랜치가 빨리 감기된 모양을 가진다.



#### merge commit(병합 커밋)

```shell
A ➝ B ➝C ➝ D ➝ E(master)[HEAD]
            ↘️              
                X ➝ Y ➝ Z(bugfix)
```

```shell
A ➝ B ➝C ➝ D ➝ E ➝ F(master)[HEAD]
            ↘️                    ↗️
                X ➝ Y ➝ Z(bugfix)
```
**bugfix가 분기한 이후 master의 변경사항이 있는 경우**
양쪽의 변경을 모두 가져온 `merge commit`을 실행



> ፠ **non fast-forward**   
> ast forward를 할 수 있는 경우에도 master의 branch 확장을 통해
**non fast-forward** 병합을 할수 있는데(그래서 F라는 commit 이 추가로 생성되었다)
> ```shell
>A ➝ B➝➝➝➝➝➝➝➝ F(master)[HEAD]
>          ↘️                       ↗️
>              X ➝ Y ➝ Z(bugfix)
>```
위와 같이 bugfix가 그대로 남기때문에 브랜치 관리면에서 유용할 수 있다.

***


### rebase(base를 변경한다)


`$ git rebase <목표 branch>` : 
지금 위치한(HEAD가 있는) 브랜치에 목표 branch의 변경사항을 update해준다  

만약 file간의 충돌이 발생한 경우에는 직접 수정해준 이후에 commit작업이 아닌 
`git add <수정 file>`
`git rebase --continue` : 명령어를 실행 시켜줘야한다 
(rebase 취소는 git rebase --abort)   


```shell
A ➝ B ➝C ➝ D(master)
            ↘️              
                X ➝ Y(bugfix)[HEAD]

A ➝ B ➝C ➝ D(master) ➝ X' ➝ Y'(bugfix)[HEAD]
```

bugfix branch를 master 브랜치에 rebase 하면
bugfix branch의 이력이 master branch 뒤로 이동한다

(즉 bugfix branch의 base를 B에서 D로 바꾸어 변경사항도 적용해주는 것이다)

따라서 master branch의 이력를 변경하기 위해 이제는 `fast-forward` 를 통해 병합해주자


### 6. 브랜치 삭제

```shell
$ git branch -d <branch name> #branch를 삭제하는 명령어    
```
