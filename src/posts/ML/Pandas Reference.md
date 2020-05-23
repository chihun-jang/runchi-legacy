---
title: "Pandas Reference"
date: "2020-05-22"
category: ['python']
draft : False
---

>내가 보기위해서 옮겨온 Pandas Reference


# Pandas
- Pandas란 오픈소스로 높은 성능과 사용하기 쉬운 데이터 구조를 제공해준다
- Python language로 이루어진 데이터 분석 tool이다.

## Pandas 시작 

```python
import pandas as pd  #pandas 를 import하고 pd라고 줄여서 사용
```

## Pandas 사용하기
> **데이터 입출력**
> - ```data.to_csv('name.csv')``` data를 csv파일로 작성
> - ```my_data = pandas.read_csv('name.csv)``` csv 파일을 읽어옴
> - **위의 csv는 각각 excel,hdf 로 바뀌어 사용 할수 있다**

## Series(Pandas의 자료구조)
> **특징**  
> - index를 지정해 줄 수 있다.  
> - 지정하지 않을시 default값인 1,2,3,4가 지정된다
> - *mutable하다(index, value의 변경이 가능하다)*  
>
> **생성**  
> - Series의 생성은 list자료형과 함께 index를 list의 형태로 넘겨주거나  
> - dictionary type을 Series로 변경해주면 key값이 index로 value가 value로 간다.


```python
my_series = pd.Series([1,2,'good',True], index = ['하나','둘','셋','넷'])  
                      
print(my_series)

print("*"*30)

my_series2 = pd.Series({'첫째': 1, '둘째': 2, '셋째': 3})

print(my_series2)
```

    하나       1
    둘        2
    셋     good
    넷     True
    dtype: object
    ******************************
    첫째    1
    둘째    2
    셋째    3
    dtype: int64
    

> ## Series의 property
> - ```series.values```  *Series의 value*   
> - ```series.index``` *Series의 index (start는 포함, stop 이전)*
> - ```series.index.name``` *index들의 name을 붙여줄 수 있다.*


```python
print(my_series.index) # iterable한 index object를 가져온다
print("")
print(my_series.values)
print("")
my_series.index.name  ="index_col"
print(my_series)
```

    Index(['하나', '둘', '셋', '넷'], dtype='object', name='index_col')
    
    [1 2 'good' True]
    
    index_col
    하나       1
    둘        2
    셋     good
    넷     True
    dtype: object
    

## Data Frame(Pandas의 자료구조)
> **특징**  
> - 행의 index는 index로 열의 index는 columns으로 
> - *mutable( 값의 변경이 가능하다)*  
> **생성**  
> -  python의 dictionary, numpy 의 array로 생성가능  
> -  dictionary로 생성시 key값이 열의 이름으로 들어간다  
> -  초기에 columns과 index(row)를 설정하여 생성할 수 있다.  
>     - DataFrame(data, 설정, 설정)의 모양,
>     - 없는 index(columns)일때 NaN(Not a Number)으로 value를 채운다.  
>     - *이미 있는 index일경우 순서를 설정에 맞춰준다*


```python
mydata = {'name' : ['jang','kim','lee','park'],'age':[25,23,27,21]}
mydf = pd.DataFrame(mydata)
mydf2 = pd.DataFrame(mydata,index=['하나','둘','셋','넷'],columns=['age','name','bool'])

print(mydf)
print("*"*20)
print(mydf2)
```

       name  age
    0  jang   25
    1   kim   23
    2   lee   27
    3  park   21
    ********************
        age  name bool
    하나   25  jang  NaN
    둘    23   kim  NaN
    셋    27   lee  NaN
    넷    21  park  NaN
    

> ## Data Frame method & property
> - ```dataframe.values```  *Data Frame의 value들*   
> - ```dataframe.index``` *행의 index들*
> - ```dataframe.index.name``` *행의 이름을 설정해줄 수 있다.*
> - ```dataframe.columns``` *열의 index들*
> - ```dataframe.columns.name``` *열의 이름을 설정해줄 수 있다.*
> - ```dataframe.describe()``` *각각의 col에 해당하는 계산가능한 value로 count,평균,최소,최대 등을 표시(NaN은 계산불가)*



```python
mydf.index.name = '번호'
mydf.columns.name = "분류"
print(mydf)

mydf.describe() #name은 연산할수 있는 value가 없으므로 표시 X
```

    분류  name  age
    번호           
    0   jang   25
    1    kim   23
    2    lee   27
    3   park   21
    


## DataFrame 조작 Reperence
> ## Columns 편
> - ```dataframe['colname']``` *dataframe의 col*
> - ```dataframe[['col','col2'...]]``` *복수개의 col*
> - ```dataframe['colname'] = value```   
>      - colname 존재 : *index의 갯수만큼입력하면 index마다 다른 value대입(1개면 해당 value로 통일된 col생성)* 
>      
>      - colname 부재 :  새로운 열이 추가됨
>      - value값에 Series가 오면 DataFrame의 index에 Series의 index를 맞춰 배열한다
> - ```del dataframe['col]```  *col의 삭제*
> -  **```dataframe['col']``` 간의 사칙연산, 논리연산자(>,==,&,|) 사용가능하다**
>
> ## Row 편
> - ```dataframe['start_index' : 'end_index']``` *list의 indexing과 비슷한 모습*
> - ```dataframe.loc['rowname',<'target col name'>]```   
>     - *Series의 모양으로 반환하는데 이때 Series의 index가 사실상은 columns들의 name이 되는것이다,*
>     - *rowname부분에 slice가 들어갈수 있다*
>     - *target부분을 안적어주면 default로 전체를 반환한다*
>     - *target부분에 list모양이면 특정 col만, slice면 해당 범위 col을 가져온다*
> - ```dataframe.loc['rowname',<'target_col'>]= value``` *새로운 행 삽입*
>     - loc위치에 at을 사용할수 있고 더 빠르다
> - ```dataframe.iloc[]``` **loc과 다르게 name이 아닌 index번호를 사용하여 가져옴**
>     - iloc위치에 iat을 사용할수 있고 더 빠르다
> - ```dataframe.head(n)``` 위에서 n개 만큼의 행을 읽어옴, n을 안줄시 default==5  
> - ```dataframe.tail()```
> 
> ## 공통 편
> - ```dataframe.drop(name or condition , axis = 0 or 1) ``` 해당하는 행or열 삭제
>     - axis가 0이면 row(행)(default)
>     - axis가 1이면 col을 drop한다
> - ```dataframe.sum(axis=0 or 1) ``` axis에 해당하는 계산가능한 value의 합  
>     - sum이외에도 min,max,count,argmin(max),mean 등의 함수도 적용된다  
>
>    **위의 axis에서 알수있듯 ↓방향이 axis 0에 해당** 
>    **➝ 방향이 axis 1에 해당한다**
>    **따라서 drop의 경우 ↓로 진행하다 조건에 맞는 row를 발견하면 삭제하고**
>    **sum은 ↓의 방향으로 더해나가는 것이다**
>
> - ```dataframe.reindex(index = ... , col = ...)``` row와 col의 index를 다시 배열
> - ```dataframe.sort_index(axis=0 or 1, <ascending=bool> )``` index를 sort한다
>     - ascending option을 주지않으면 기본적으로 ascend = True 오름차순으로 된다
> - ```dataframe.sort_values(by=col,<ascending=bool>)``` col의 value들을 정렬한다
> - ```dataframe['row or col'].unique()``` 행 or 열의 유니크한 값
> - ```dataframe['row or col'].value_counts()``` 행 or 열의 value갯수 conunt
> - ```dataframe['row or col'].isin(value)``` 행 or 열에서 value가 있는지 bool로 return
> - ```dataframe.T``` dataframe을 전치한다
> (행과 열을 바꾼다,(0.0),(1.1),(2.2)...를 이은 선분을 기준으로 좌우대칭으로 교환)
> - ```dataframe2 = dataframe.copy()``` dataframe을 복사한다
>
> ## NaN 편   
> - ## 삭제
>   - ```dataframe.dropna(how='any')``` 하나이상이 NaN인경우
>   - ```dataframe.dropna(how='all')``` 모두 NaN
> - ## 변경
>   - ```dataframe.fillna(value = somevalue)``` somevalue값으로 NaN값을 변경
> - ## 확인
>   - ```dataframe.isnull()``` dataframe전체의 value에 대해 NaN인지 확인하여 bool로 리턴

## Pandas의 functions
> - ```pandas.date_range('date(yyyymmdd',period=n)``` *yyyymmdd부터 n일간의 range를 만들어준다*
> - ```pandas.to_datetime('yyyymmdd')```` yyyymmdd에 해당하는 Timestamp를 생성
>

## Pandas 응용
>
> ## Apply
> - ```dataframe.apply(function)``` data에 함수를 적용한다
>     - 이때 함수는 lambda function형태로 작성가능하다(lambda x: x.max()+x.min())
>
> ## 연결
> - ``` pandas.concat([dataframe[0:1],dataframe[2:3]]``` dataframe의 2행을 제거하고 concat으로 연결
> - ```pandas.merge(dataframe1, dataframe2, on = 'criteria')``` dataframe1과 2를 on에서 설정한 기준에 따라 merge한다
>
> ## Grouping
> - ```dataframe.groupby('value')``` 특정 value를 기준으로 data를 그룹화한다(행합침)
>     - value부분에 list가 들어가 여러 기준이 적용될 수 있는데 앞에서부터 기준을 적용하여 grouping
>

> at과 iat은 해당 위치에 있는 특정 스칼라값만 들고오는만큼 성능면에서 우수하다.

