---
title: "#3 알고리즘 연습 - 요일찾기(Python)"
date: "2019-01-12"
category: ['algorithm']
draft : False
---



2016년 1월 1일은 금요일입니다. 2016년 a월 b일은 무슨 요일일까요? 
두 수 a ,b를 입력받아 2016년 a월 b일이 무슨 요일인지 리턴하는 함수, solution을 완성하세요. 요일의 이름은 일요일부터 토요일까지 각각 SUN,MON,TUE,WED,THU,FRI,SAT입니다. 
예를 들어 a=5, b=24라면 5월 24일은 화요일이므로 문자열 TUE를 반환하세요.


* 제한 조건

2016년은 윤년입니다.
2016년 a월 b일은 실제로 있는 날입니다. (13월 26일이나 2월 45일같은 날짜는 주어지지 않습니다)


입출력 예

|a|b|result|
|-|-|-|
|5|24|TUE|

> _**문제풀이 IDEA**_
> 2016년(2016년은 윤년이다)의 각 월별 일수를 더해서 반복문을 통해 몇일째인지 구한다
(ex. 4월 19일 이면 1월 일수 + 2월 일수 + 3월 일수 + 19일)    
그리고 1주일의 단위인 7로 나눈 mod(나머지)값으로 요일을 대응시켜준다


#### 내 풀이 🏆 
(module을 쓰면 좀더 편하게 풀수 있겠지만 함수 작성을 한번 해보았습니다)

```python
def solution(a, b):
    sumday = {}    #월별 일수를 기록하기 위한 dictionary 만들기
    flus = b       #flus는 총합 일수를 나타내는 변수인데 a월 b일에서

                    #b일을 바로 기록하고 월별 일수만 더해주면 되므로 초기화를
                    #b로 해준다
    dayofweek = ["THU","FRI","SAT","SUN","MON","TUE","WED"] #1월 1일 기준 총합 일수는 1인데

                                                            #  7로 나눈 나머지는 1이고 

                                                            #  1월 1일 이므로 index1에 금요일이 오도록 list작성
                                                            
    for i in range(1,13):      #i는 월을 나타내고 이를 key값으로 쓴다
        if i == 2:                      #2월은 예외적으로 28일이 오므로 걸러준다
            sumday[i]=29         #그런데 윤년이므로 29를 value값으로 넣어준다
        elif i< 8:                      #월별 일수를 적어보면 8월 이전에는
            if i % 2 ==0:           #짝수 월에는 30일까지 있고
                sumday[i]=30                 
            else:                       #홀수 월에는 31일까지 있다.
                sumday[i]=31                 
        else:                           #8월 부터 12월까지는
            if i % 2 == 0:          #반대로 짝수월에 31일까지
                sumday[i]=31                 
            else:                       #홀수 월에 30일까지 있다.
                sumday[i]=30                 
    for i in range(1,a):            #그리고 1 <= x   < a 인 월 범위안에서 key값을 가져오고
            flus += sumday[i]    #sumday[i]로 value값을 flus에 누적해가며 더해준다
    return dayofweek[flus % 7] #위에 저장해놓은 요일 list에서 나머지값index에 대응되는 요일을 가져온다
```


#### 다른 풀이 🏆
```python
def getDayName(a,b):
    months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    days = ['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU']
    return days[(sum(months[:a-1])+b-1)%7]    #sum메서드를 이용해 months list의 0번째 부터 a-2번째 index까지의 갑을 더해준다

                                               #예를 들어 2월 4일 이라고 하면 1월까지의 일수를 더해주고 나머지 4일을 더해줘야하는데

                                               #이때 1월은 0번째 index이고 입력받은 2와 2차이가 나므로 slice를 :a-1까지로 해줫다

                                               #그리고 남은 잔여일을 더해주는데 이때 요일이 들어가있는 day list의 0번째 인덱스가

                                                #FRI이므로 b-1을 해줬다(1월 1일이 금요일이랬으니까)

                                                #만약 +b를 해주고자 한다면 days list의 첫째 원소로 THU가 오고 한칸씩 밀리면 된다
```