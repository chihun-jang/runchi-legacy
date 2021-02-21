---
title: "Github 잔디가 심어지지 않을 때"
date: "2020-03-29"
category: ['Co-work','Git']
draft : False
---

살아가다 보면 생각지도 못한 장애물을 맞이하게 될때가 있다.
(사실 거창하게 썼지만 그렇게 큰건 아니다.)

오늘 소개할 Tip은 이에 대한 이야기다.

2018년 처음 Git과 Github을 알게 되었고 19년 열심히 잔디씨를 뿌렸지만
내 Github에는 잔디가 심어지지 않았다.


## Github에 잔디가 심어지지 않을 떄

일단 해당 문제는 *Github User-email 이랑 내 local의 User-Email 이 달라서 발생하는 문제*라서

```bash
git config --list 
```

User-email 을 확인하고 

```bash
git config --global user.email "바꿀 email"
```
이렇게 바꿔주기만 하면 된다. 

그런데 이렇게 해주면 *이후에 기록되는 commit부터 변경사항이 적용*되기때문에
이전에 잘못작성한 Commit 은 그대로 잔디를 보여주지 않는다.


### 이전 Commit변경하기

```bash
git filter-branch --env-filter 'if [ "$GIT_AUTHOR_EMAIL" = "incorrect@email" ]; then
     GIT_AUTHOR_EMAIL=correct@email;
     GIT_AUTHOR_NAME="Correct Name";
     GIT_COMMITTER_EMAIL=$GIT_AUTHOR_EMAIL;
     GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"; fi' -- --all
```

Stackoverflow 에선 위의 코드를 작성해주면 잘못된 User-Email로 작성된 commit 의 Email을 수정할 수 있다고 한다.
이렇게 *잘못된 Commit을 수정해주면 이전에 누락되었던 우리의 잔디도 되살아*난다


이렇게 마무리를 해도 되지만
위의 명령어를 조금만 공부를 해보았다.

*Author* 와 *Committer* 의 차이
- Author : 해당 코드를 제일 처음 생성한 원작자
- Committer : 해당 코드를 최종 commit한 사람,

==> 따라서 Author와 Committer가 같으면 Committer는 생략할 수도 있다.

* `git filter-branch`  : 브랜치를 재작성 할수 있는 기능 (`git filter-branch --help`를 치면 filter-branch로 할수잇는 것들이 나온다.)
* `--env-filter <command>` : 특정 경우에만 해당 명령어를 실행한다. (author,committer name, email, time 등 변수 재작성 가능) 
* linux의 shell script로 작성하는 if-else문
```shell
if condition
then
    commands
else
    commands
fi
```

* `--all` 은 모든 브랜치 재작성, `-- `는 `--all` 과 filter-branch옵션(`--env-filter`)을 분리해주는 역할정도로 생각해주면 될 것 같다.



