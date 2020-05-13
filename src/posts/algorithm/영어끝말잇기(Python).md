---
title: "#46 알고리즘 연습 - 영어끝말잇기(Python)"
date: "2020-05-13"
category: ['algorithm']
draft : False
---

1부터 n까지 번호가 붙어있는 n명의 사람이 영어 끝말잇기를 하고 있습니다. 영어 끝말잇기는 다음과 같은 규칙으로 진행됩니다.

1번부터 번호 순서대로 한 사람씩 차례대로 단어를 말합니다.
마지막 사람이 단어를 말한 다음에는 다시 1번부터 시작합니다.
앞사람이 말한 단어의 마지막 문자로 시작하는 단어를 말해야 합니다.
이전에 등장했던 단어는 사용할 수 없습니다.
한 글자인 단어는 인정되지 않습니다.
다음은 3명이 끝말잇기를 하는 상황을 나타냅니다.

tank → kick → know → wheel → land → dream → mother → robot → tank

위 끝말잇기는 다음과 같이 진행됩니다.

* 1번 사람이 자신의 첫 번째 차례에 tank를 말합니다.
* 2번 사람이 자신의 첫 번째 차례에 kick을 말합니다.
* 3번 사람이 자신의 첫 번째 차례에 know를 말합니다.
* 1번 사람이 자신의 두 번째 차례에 wheel을 말합니다.
(계속 진행)
끝말잇기를 계속 진행해 나가다 보면, 3번 사람이 자신의 세 번째 차례에 말한 tank 라는 단어는 이전에 등장했던 단어이므로 탈락하게 됩니다.

사람의 수 n과 사람들이 순서대로 말한 단어 words 가 매개변수로 주어질 때, 가장 먼저 탈락하는 사람의 번호와 그 사람이 자신의 몇 번째 차례에 탈락하는지를 구해서 return 하도록 solution 함수를 완성해주세요.


제한 사항

* 끝말잇기에 참여하는 사람의 수 n은 2 이상 10 이하의 자연수입니다.
* words는 끝말잇기에 사용한 단어들이 순서대로 들어있는 배열이며, 길이는 n 이상 100 이하입니다.
* 단어의 길이는 2 이상 50 이하입니다.
* 모든 단어는 알파벳 소문자로만 이루어져 있습니다.
* 끝말잇기에 사용되는 단어의 뜻(의미)은 신경 쓰지 않으셔도 됩니다.
* 정답은 [ 번호, 차례 ] 형태로 return 해주세요.
* 만약 주어진 단어들로 탈락자가 생기지 않는다면, [0, 0]을 return 해주세요.


입출력 예

|n|	words|	result|
|-|-|-|
|3|	[tank, kick, know, wheel, land, dream, mother, robot, tank]	|[3,3]|
|5|	[hello, observe, effect, take, either, recognize, encourage, ensure, establish, hang, gather, refer, reference, estimate, executive]|	[0,0]|
|2|	[hello, one, even, never, now, world, draw]|	[1,3]|

입출력 예 설명
입출력 예 #1
3명의 사람이 끝말잇기에 참여하고 있습니다.

* 1번 사람 : tank, wheel, mother
* 2번 사람 : kick, land, robot
* 3번 사람 : know, dream, tank
와 같은 순서로 말을 하게 되며, 3번 사람이 자신의 세 번째 차례에 말한 tank라는 단어가 1번 사람이 자신의 첫 번째 차례에 말한 tank와 같으므로 3번 사람이 자신의 세 번째 차례로 말을 할 때 처음 탈락자가 나오게 됩니다.

입출력 예 #2
5명의 사람이 끝말잇기에 참여하고 있습니다.

* 1번 사람 : hello, recognize, gather
* 2번 사람 : observe, encourage, refer
* 3번 사람 : effect, ensure, reference
* 4번 사람 : take, establish, estimate
* 5번 사람 : either, hang, executive
와 같은 순서로 말을 하게 되며, 이 경우는 주어진 단어로만으로는 탈락자가 발생하지 않습니다. 따라서 [0, 0]을 return하면 됩니다.

입출력 예 #3
2명의 사람이 끝말잇기에 참여하고 있습니다.

1번 사람 : hello, even, now, draw
2번 사람 : one, never, world
와 같은 순서로 말을 하게 되며, 1번 사람이 자신의 세 번째 차례에 'r'로 시작하는 단어 대신, n으로 시작하는 now를 말했기 때문에 이때 처음 탈락자가 나오게 됩니다.

>__*문제풀이*__   
문제에서 주어진 조건은
1. 이미 있는 단어의 경우 틀림
2. 지난 단어의 끝글자와 시작하는 단어의 첫글자가 다르면 틀림
이 두가지에 포커스를 맞춰서 틀린 순간을 캐치하려했다.
그리고 참가한 인원과 실행한 step을 비교해 몇번째사람인지, 몇번째 사이클을 돌았는지 answer에 넣어줬다.


#### 내 풀이 🏆
```python
def solution(n, words):
    answer = []
    
    for i in range(len(words)):
        if i == 0:
            continue
        if words[i][0]!=words[i-1][-1] or words[i] in words[:i]:
            answer=[i-(i//n)*n+1,i//n +1]
            break
    
    if answer ==[]:
        answer = [0,0]
    return answer
```

위의 코드를 보면 헷갈릴수도 있는 슬라이싱을 잘 써주는데 용이했고,
첫번째 index의 경우 out of range exception이 날수있으므로 continue를 이용,
틀린 사람을 발견하면 더 찾아볼 필요가 없으니 break를 쓴점

마지막으로 answer을 작성할때 보다 이해하기 쉽게 숫자를 대입해가며 식을 만든점이 눈여겨 볼만한 사항이다.

>range의 범위를 조정하고 return을 함수끝내는데 사용하면 보다
축약된 형태의 코드를 작성할 수 있다.