---
title: "Python Package"
date: "2019-01-22"
category: ['멋쟁이사자처럼','python']
draft : False
---

패키지는 . 을 이용해서 **모듈을 directory구조로 관리**할 수 있게 해주는데 **모듈명이 A.B 라면 A패키지의 B모듈**이라는 말이다


### ✔ 패키지생성

```python
Root_dic  -- mypack_dic --  A_dic -- __init__.py
                                  --  B_dic       -- __init__.py
                                                  -- B_module.py
                                  --  C_dic       -- CC_dic      -- __init__.py
                                  --  C_module.py
```

이런식으로 만들게 되는데

이때도 물론 *__Root_dic를 PYTHONPATH 환경변수에 등록해야지 어느 directory에서도 import__*할수 있다
(명령 프롬프트 창에서 `set PYTHONPATH = Root_dic`의 path)




### ✔패키지 사용
```python
👌  import mypack_dic.B_dic.B_module
    mypack_dic.B_dic.B_module.b_function()

👌  from mypack_dic.B_dic  import B_module
    B_module.b_function()

    # 위의 두개를 보면 import한 것을 한번 더 적어주고 . 을 이용해 사용해준다

👌  from  mypack_dic.B_dic.B_module import b_function
    b_function()


❌  import mypack_dic.B_dic.B_module.b_function
    #이렇게는 되지 않는데 패키지를 import하는 경우에는
    #마지막에 모듈이나 패키지가 와야한다. 함수가 오면 안 된다
```



### ✔ \__init__.py

해당 directory가 패키지의 일부임을 알려주는 역할

**python 3.3부터는 \__init__.py없어도 패키지로 인식이 되지만 
호환을 위해 \____init__.py를 써주는게 안전**하다

```python
❌ import mypack_dic
    mypack_dic.B_dic.B_module.b_function()

    #이렇게 하면 안되는데 mypack_dic 안에 있는 모듈을 사용하거나
    #__init__.py에 정의된 애들만 쓸 수 있다.

❌ from mypack_dic.B_dic import * 
    B_module.b_function()
    
    #이렇게 해주면  * 가 all을 나타낸다 할지라도
    #B_dic 의 __init__.py 의 내부변수 
    #__all__ = [import할 module list ] 에서  정의를 해줘야한다

    #따라서 __all__ = [B_module] 이런식으로 작성을 해주고
    #실행을 하면 B_module이 import되어 정상 작동한다
```



>❕  `import *` 부분이 module이 아닌 모듈내 함수와 변수등을 대상으로 
하고 있다면 `__all__ `변수와 상관없이 import된다



### ✔ import 경로

> #### 절대경로 :   
우리가 환경변수를 설정한 directory부터 절대경로를 따라 
다른 하위 directory의 모듈을 사용할 수있다

> #### 상대경로 :    
현재 module을 import하고자 하는 위치로 부터 
상대경로를 파악해 import해줄 수도 있는데   
이때 부모 directory는 `..`으로 표현해주도록 한다 ( `.` 는 현재 directory)   
( `.. `과 같은 상대적 접근자는 모듈안 즉 파일안에서만 사용해야지
 명령 프롬프트 or 파이썬 인터프리터 안에서 사용하고자 하면 Error 발생)
