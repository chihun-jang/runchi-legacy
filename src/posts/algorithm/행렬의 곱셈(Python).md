---
title: "#40 알고리즘 연습 - 행렬의 곱셈 (Python)"
date: "2019-06-16"
category: ['algorithm']
draft : False
---


2차원 행렬 arr1과 arr2를 입력받아, arr1에 arr2를 곱한 결과를 반환하는 함수, solution을 완성해주세요.


제한 조건

* 행렬 arr1, arr2의 행과 열의 길이는 2 이상 100 이하입니다.
* 행렬 arr1, arr2의 원소는 -10 이상 20 이하인 자연수입니다.
* 곱할 수 있는 배열만 주어집니다.


입출력 예

|arr1	|arr2|	return|
|-|-|-|
|[[1, 4], [3, 2], [4, 1]]	|[[3, 3], [3, 3]]|	[[15, 15], [15, 15], [15, 15]]|
|[[2, 3, 2], [4, 2, 4], [3, 1, 4]]|	[[5, 4, 3], [2, 4, 1], [3, 1, 1]]|	[[22, 22, 11], [36, 28, 18], [29, 20, 14]]|


>__*문제풀이*__    
처음 문제를 보고 떠올린 IDEA는 왠지 모르게 단순 행렬 계산으로 풀게 될때 시간이 많이 걸릴것 같았다.   
그래서 뭔가 pythonic하게 풀수 있는 방법이 없을까 나름의 고민을 해보전중
행렬의 기본 곱 연산이 행 * 열이기 때문에 이를 행*행으로 하면 우리가 다루기 쉬워지지 않을까 하는 생각이 들었고 전치 행렬을 만들기로 했다.   
하지만 위의 방법 또한 연산속도가 너무 저하되어서
다른 곱셈방법을 찾으려 노력해봤지만 결국 다시금 행*열 방법으로 돌아와 문제를 풀게 되었다.   




#### 내 풀이(전치행렬, 연산속도 느림) 🏆
```python

def solution(arr1, arr2):
    answer = []
    for i in range(1, len(arr2)):         #arr2를 전치행렬로 바꿔주기 위해 down-triangular 부분과 upper-triangular부분을
        for k in range(i):                #바꿔주는 2중 for문이다
            arr2[i][k], arr2[k][i] = arr2[k][i], arr2[i][k]   #python에서의 swqp은 이와같이 간단하게 일어난다
    for i in arr1:                       #arr1의 row들이고
        row_answer = []                  
        for j in arr2:                   #j는 arr2의 row인데 전치행렬이므로 사실상 원래 arr2의 col인것이다.
            row_answer.append(sum(a*b for a, b in zip(i, j)))  #두 list의 element를 곱해서 더함으로 행렬의 연산을 해준다.
        answer.append(row_answer)        #2중 list이므로 row_list에 담긴 애들을 answer에 넣어준다.
    return answer
```

#### 내 풀이2(기존의 행*렬의 방식으로 행렬의 곱셈을 진행) 🏆
```python

def solution(arr1, arr2):
    answer = []
    for i in range(len(arr1)):  # [[c00,c01],[c10,c11]]이라는 행렬이 나오기 위해서는 c10 = a10*b00 + a11*b10 처럼 
        temp_list = []          #sum( a(결과행index)(0~a의 열갯수) * b(0~a의 열갯수==b의 행갯수)(결과열index) 의 공식이 주어진다

        for j in range(len(arr2[0])):    #따라서 i는 arr1의 행갯수만큼 돌고 j는 arr2의 열갯수만큼 돈다
            sum_ = 0

            for k in range(len(arr2)):   #k는 arr2의 행의 갯수 즉 arr1의 열의 갯수만큼 돌면서 sum을 진행해 list에 넣어준다.
                sum_ += arr1[i][k]*arr2[k][j]

            temp_list.append(sum_)       #그리고 list에 append해주고
        answer.append(temp_list)         #하나의 row를 담은 temp_list가 완성되었으면 answer에 넣어준다.

    return answer
```

#### 다른 풀이(아름다운 코드) 🏆
```python

def productMatrix(A, B):

    return [[sum(a*b for a, b in zip(A_row, B_col)) for B_col in zip(*B)] for A_row in A]

    #list comprehension을 사용했기때문에 우측에서 부터 차근차근 뜯어나가 보자


    # 1. A_row를 이용해 A의 row list를 하나씩 가져온다


    # 2. zip(*B)를 해주게 되면 B가 [[1,2,3],[4,5,6],[7,8,9]]일때 *로 인해서 unpacking되는데 zip([1,2,3],[4,5,6],[7,8,9])가된다


    # 2-1. 따라서 (1,4,7),(2,3,8),(3,6,9)이런식으로 묶이게 되는데 이는 B행렬의 col을 나타내게된다


    # 3. 마지막으로 A의 row와 B의 col을 zip으로 다시 묶어줘 zip으로 묶인 a,b를 a*b로 iterable하게 반환해주면 sum을 이용해서 더한값을 B_col가 돌때마다 반환


    # 4. B_col 이 다 돌고 A_row도 다 돌때까지 작업을 수행한다
```


### 해당 문제와 관련되어 공부했던 개념인

__*행렬의 곱셈법, zip함수의 사용, *(asterisk)를 이용한 unpacking, python의 swap*__은 알아두고 넘어가도록 하자

