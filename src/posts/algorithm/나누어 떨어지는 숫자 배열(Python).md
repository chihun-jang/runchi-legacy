---
title: '#8 알고리즘 연습 - 나누어 떨어지는 숫자 배열 Python & JS'
date: '2019-01-21'
category: ['algorithm']
draft: False
---

array의 각 element 중 divisor로 나누어 떨어지는 값을 오름차순으로 정렬한 배열을 반환하는 함수, solution을 작성해주세요.
divisor로 나누어 떨어지는 element가 하나도 없다면 배열에 -1을 담아 반환하세요.

제한사항

-   arr은 자연수를 담은 배열입니다.
-   정수 i, j에 대해 i ≠ j 이면 arr[i] ≠ arr[j] 입니다.
-   divisor는 자연수입니다.
-   array는 길이 1 이상인 배열입니다.

입출력 예

| arr           | divisor | return        |
| ------------- | ------- | ------------- |
| [5, 9, 7, 10] | 5       | [5, 10]       |
| [2, 36, 1, 3] | 1       | [1, 2, 3, 36] |
| [3,2,6]       | 10      | [-1]          |

입출력 예 설명

입출력 예#1
arr의 원소 중 5로 나누어 떨어지는 원소는 5와 10입니다. 따라서 [5, 10]을 리턴합니다.

입출력 예#2
arr의 모든 원소는 1으로 나누어 떨어집니다. 원소를 오름차순으로 정렬해 [1, 2, 3, 36]을 리턴합니다.

입출력 예#3
3, 2, 6은 10으로 나누어 떨어지지 않습니다. 나누어 떨어지는 원소가 없으므로 [-1]을 리턴합니다.

> **_문제풀이_**
> python에서는 list를 동적으로 사용할수 있기 때문에 반복문과 조건문 그리고 append를 이용해주면 기본 코드를 짤 수 있다.
> 하지만 return 값 또한 list이고 반복문과 조건문이 들어간다면
> list comprehension을 사용한다면 조금더 코드가 간결하게 작성될것 같다

#### 내 풀이 🏆

```python
def solution(arr, divisor):
    answer = [i for i in arr if i%divisor==0]
    # i라는 애들을 answer list안에 담는데 arr배열의 원소중
    # divisor로 나누어 떨어지는 숫자들을 i로 가져와서 담겠다라는 의미

    if len(answer) ==0:       #그런데 만약 list가 빈 list라면 나누어 떨어지는 숫자가 없는것
        answer.append(-1)     #따라서 예외처리로 -1을 해준다

    return sorted(answer)     #sort한 값을 answer에 넘겨준다(sorted는 sort와 달리 원래 배열을 바꾸지X)

```

#### 내 풀이2 🏆

```python
def solution(arr, divisor):
    answer = [i for i in arr if i%divisor==0]
    if not answer:   #answer 가 빈 배열이면 false로 처리되므로 not을 붙여 빈배열일 경우 -1을 담은 배열을 리턴해준다.
        return [-1]
    return sorted(answer)
```

### 참고할 만한 것

-   ⭐*List comprehension*

Syntax : `[ (expression) for item in list if conditional ]`

Example :

```python
[ n for n in range(10) if x%2 ==0]

==>[0, 2, 4, 6, 8]


[ n + 1 for n in range(10) if x%2 ==0]

==>[1, 3, 5, 7, 9]


>>>[ n + m    for n in [1,2,3]     for y in [1,2,3] ]

==>[2, 4, 6]
```

-   삼항연산자

삼항연산자가 일반 if문과 속도차이가 없다는 글을 봤기도 했고
가독성측면에서 그다지 좋다는 느낌을 못받은만큼(개인적) 굳이 3항 연산자를 이용해 조건문처리를 해주지 않았다

그래도 쓰는 방법을 알고 넘어가자

조건문과 삼항연산자

```python

if x%2 ==0:
    print("짝수입니다")
else:
    print("홀수입니다")


print("짝수입니다") if x%2==0 else print("홀수입니다")

```

#### 내 풀이3(javascript) 🏆

```javascript
function solution(arr, divisor) {
    var answer = [];
    arr.forEach(ele => {
        if (ele % divisor === 0) {
            answer.push(ele);
        }
    });
    if (answer.length === 0) {
        return [-1];
    }
    return answer.sort((a, b) => a - b);
}
```

-   실제로 프로그래밍을 하는 상황에서는 쓰다보니까 map과 같은 것을 잘 사용했지만 이렇게 막상 알고리즘 문제로 주어지니
    python의 `for i in` 과 비슷한 것에 신경쓰다보니 forEach가 가장 먼저 떠올랐던 것 같다.
    그리고 다른 코드와 비교해봐도 삼항연산자와 같은 활용도 측면에서 많이 부족했던 코드가 아닌가싶다.
    하지만 해당 문제를 풀면서 다시금 JS에서는 sort의 기본값이 str을 기준으로한 sort라는 것을 알고 옵션을 주어 number sotring이 가능하다는 것을 복습 할 수 있었다.

#### 다른 풀이1(javascript) 🏆

```javascript
function solution(arr, divisor) {
    var answer = [];
    arr.map(o => {
        o % divisor === 0 && answer.push(o);
    });
    return answer.length ? answer.sort((a, b) => a - b) : [-1];
}
```

-   map으로 arr의 원소 각각에 대하여 탐색을 하면서 좌측에 있는 mod 조건의 True 여부에 따라서 다음 `answer.push()`부분을 실행해준다.
    그리고 마지막 return부분에서 3항연산자를 사용하여 length에 따라서 sort된 배열과 -1배열을 각각 조건에 따라 return해준다.

#### 다른 풀이2 (javascript) 🏆

```javascript
function solution(arr, divisor) {
    var answer = arr.filter(v => v % divisor == 0);
    return answer.length == 0 ? [-1] : answer.sort((a, b) => a - b);
}
```

-   위의 map보다 더욱 직관적인 함수 filter를 사용하였는데 filter를 이용하여 조건에 해당하는 원소들을 모아 반환되는 값을 바로 answer에다가 넣어줌으로써 보다 직관적인 코드가 되었다.
