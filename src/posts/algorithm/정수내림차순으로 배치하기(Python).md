---
title: "#27 알고리즘 연습 - 정수내림차순으로 배치하기(Python)"
date: "2019-05-06"
category: ['algorithm']
draft : False
---

함수 solution은 정수 n을 매개변수로 입력받습니다. 
n의 각 자릿수를 큰것부터 작은 순으로 정렬한 새로운 정수를 리턴해주세요. 
예를들어 n이 118372면 873211을 리턴하면 됩니다.


제한 조건

n은 1이상 8000000000 이하인 자연수입니다.


입출력 예

|n|	return|
|-|-|
|118372	|873211|


>__*문제풀이*__   
정수는 일단 sort와 같은 메서드들을 쓸수 없으로므로
str로 형변환 해서 sort를 내림차순으로 sort해주면 된다.   
필요하다면 list와 str의 형변환을 자유롭게 왔다 갔다 할수 있게 하자




#### 내 풀이 🏆
```python
def solution(n):
    return int(''.join(sorted(str(n), reverse=True)))

    #입력받은 n값을 str로 바꾸어 sorted 내장함수로 option을 reverse로 주어서 내림차순으로 정렬

     #그리고 return되는 값은 list이므로 join을 이용해서 str로 바꿔주고 int로 다시한번 변환

```


코드를 작성함에 있어서 sorted가 아닌 reversed를 이용해서 한번에 정렬을 해주려 했었는데
원하는 값이 나오지 않았다.

그이유가 뭔지 테스트를 해보니
*reverse는 말그대로 역으로 뒤집는다는 의미*인데
이것을 무의식중에 sorted와 받대되게 사용하려 했었기 때문이다

sorted  :  오름차순 정렬

reversed : 거꾸로 정렬(역으로)

내림차순 정렬은 sort를 해주고 reversed를 해주거나 혹은 sorted에 reverse 옵션을 주도록 하자