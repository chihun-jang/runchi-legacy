---
title: "Git-hub advenced Tip"
date: "2020-03-29"
category: ['git']
draft : True
---

git revert commit hash 값을 적어주게 되면 해당 commit했던 내용이 사라지게 되는것 리셋과 리벌트가 둘다 해당 시점으로 코드가 돌아간다는 공통점이있지만 리셋의 경우 아예 내 커밋기록을 지워주고 리벌트는 덮어쓰는것이기때문에 혹시 같이 일을하고있는 팀원이있다면 code conflict 를 방지할수있다.
git revert HEAD~<갯수> git revert hash hash revert, 이름바꾸기