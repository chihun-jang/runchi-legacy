---
title: "#54 알고리즘 연습 - 완주하지 못한 선수(JS)"
date: "2020-05-17"
category: ['algorithm']
draft : False
---

>JS의 숙련도를 올리기위해 알고리즘 문제를 풀고있습니다

수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.
마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 
완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.


제한사항

* 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
* completion의 길이는 participant의 길이보다 1 작습니다.
* 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
* 참가자 중에는 동명이인이 있을 수 있습니다.


입출력 예

|participant|	completion|	return|
|-|-|-|
|[leo, kiki, eden]|	[eden, kiki]|	leo|
|[marina, josipa, nikola, vinko, filipa]|	[josipa, filipa, marina, nikola]|	vinko|
|[mislav, stanko, mislav, ana]|	[stanko, ana, mislav]|	mislav|

입출력 예 설명

예제 #1
leo는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #2
vinko는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #3
mislav는 참여자 명단에는 두 명이 있지만, 완주자 명단에는 한 명밖에 없기 때문에 한명은 완주하지 못했습니다.


> _**문제풀이 IDEA**_
>Python으로 먼저 푼 다음 JS로 푸는 것인만큼 해당 문제가 있는 category에 맞춰서 풀려고 생각을 해보았다. Hash라 한다면 JS에서는 객체타입이 될것이고 그러기위해서는 주어진 list를 객체로 변환한다음 이름을 key값 명수를 value값으로 지정을 해줘야한다. 그리고 key값마다 value값을 비교해 다른 key값을 보여주면 되는데 list에서 객체로 변환해서 비교를 하는과정이 비효율적이라고 생각해 그냥 list로 바로 비교를 하는 방법을 택했다.


#### 내 풀이 🏆

```javascript
function solution(participant, completion) {
    participant.sort()
    completion.sort()
 for (let i in completion){
        if (completion[i] !== participant[i]){
            return participant[i]
            }
        if (parseInt(i) === (completion.length -1)){
            return participant[parseInt(i)+1]
        }
    }
}
```

일단 sort를 해준다음 각 array의 ele를 비교해서 다를경우 return해주는 방식이다.
그런데!
```javascript 
   for(let i in participant) {
        if(participant[i] !== completion[i]) return participant[i];
    }
```
같은 for문을 이렇게 작성할수도 있는데
나는 for문의 두번째 if를 마지막 index의 경우 out of range가 날경우를 대비했는데
JS에서는 undefiend 값이 있으므로 저렇게 처리를 해줘도 된다는 점을 배웠다.


#### 다른 풀이 🏆

```javascript
const solution = (p, c) => {
    p.sort()
    c.sort()
    while (p.length) {
        let pp = p.pop()
        if (pp !== c.pop()) return pp
    }
}
```

*** 

이 외에도 문제를 풀면서 `for in` 이나 `for of` 같은 enumerate 문법에 대해서 알게되었다.
for in 이나 for of 같은경우에는 배열을 나열하는데 초점이 맞춰져 있기때문에 **_인덱스 순서가 중요한 array를 사용하는데는 사용하면 안된다_**
뿐만아니라 이렇게 하게되면 caching하여 사용하는 것도 아니므로 성능의 저하를 불러오게 되는데

따라서 `array.length `와 같은 것을 이용한 for문을 작성해주거나( `foreach`도 좋다 )
`arr_len = array.length `처럼 따로 빼내어 for문을 작성해주는 것도 더 좋은 방법이 될 수 있다.
