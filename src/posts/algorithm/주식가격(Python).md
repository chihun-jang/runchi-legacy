---
title: "#48 알고리즘 연습 - 주식가격(Python)"
date: "2020-05-13"
category: ['algorithm']
draft : False
---

초 단위로 기록된 주식가격이 담긴 배열 prices가 매개변수로 주어질 때, 가격이 떨어지지 않은 기간은 몇 초인지를 return 하도록 solution 함수를 완성하세요.

제한사항
* prices의 각 가격은 1 이상 10,000 이하인 자연수입니다.
* prices의 길이는 2 이상 100,000 이하입니다.
  

입출력 예

|prices|	return|
|-|-|
|[1, 2, 3, 2, 3]|	[4, 3, 1, 1, 0]|


입출력 예 설명

* 1초 시점의 ₩1은 끝까지 가격이 떨어지지 않았습니다.
* 2초 시점의 ₩2은 끝까지 가격이 떨어지지 않았습니다.
* 3초 시점의 ₩3은 1초뒤에 가격이 떨어집니다. 따라서 1초간 가격이 떨어지지 않은 것으로 봅니다.
* 4초 시점의 ₩2은 1초간 가격이 떨어지지 않았습니다.
* 5초 시점의 ₩3은 0초간 가격이 떨어지지 않았습니다.



> *__문제풀이IDEA__*
>이것도 푼지 조금 오래된 문제인데 당시에는 단순히 내가 돌고있는 ele와 다음에 나오는 ele들을 비교해서 만약 다음의 ele가 작은 경우, 그 까지의 초를 cnt해주면 되지않을까 생각했다.


#### 내 풀이 🏆
```python
def solution(prices):
    answer =[]
    for i in range(len(prices)):
        cnt = 0
        for j in range(i+1,len(prices)):
            cnt +=1
            if prices[i] > prices[j]:
                break
        answer.append(cnt)
    return answer
```

보면 위의 식에서 이중 for문이 들어가는데 이중 for문 안에서 
i+1부터의 범위라고 할지라도 마지막 원소가 들어가게되면
out of range가 뜨는게 아닌 두번째 for문 자체가 실행 되지 않으므로 마지막 원소를 확인할때는 0이 answer에 append된다.

> range와 len대신 enum을 이용해줘도 가독성 측면에서 더 좋겠다. 라고 생각했는데 기본적으로 **enum은 1개씩 다보는거라 O(n)인 반면 range()의 경우에는 O(1)**이라 한다.

> 그리고 문제의 category가 스택&큐 였던만큼 해당 자료구조를 가져와서 사용했으면 효율성측면에서 더 개선이 될 여지가 있다.