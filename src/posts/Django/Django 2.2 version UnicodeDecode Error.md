---
title: "Django unicodeDecodeError (version 2.2)"
date: "2019-04-04"
category: ['Django']
draft : False
---


Django 2.2version이 release된 후 공부를 하던중
`unicodeDecodeError`를 겪었다.


일단 증상으로는
![](https://4.bp.blogspot.com/-q2NqXeDhrfc/XKUCHb3kxhI/AAAAAAAA8TQ/me37us8_5iUSbmjBXwe0VOf3Eb2n27EwACEwYBhgL/s640/main%2Berror.png)
이렇게 Error가 발생하게 되면

![](https://2.bp.blogspot.com/-JFSh6RRcMbs/XKUCH5KmcMI/AAAAAAAA8TU/ZC-b4fJJNL0auiAtl2fDSMfBf3nAudhtACEwYBhgL/s640/unicode%2Berror.png)
`unicodeDecodeError: 'cp949' codec can't decode byte` 에러가 발생하게 되고
해당 에러가 계속 발생하여
![](https://2.bp.blogspot.com/-yNokDB15jTE/XKUCGcK3tiI/AAAAAAAA8TI/Vr5dpvGzHAMtb9HPvfNTBfbkvSAv0vNXQCEwYBhgL/s640/error%2Btemplate.png)
Error를 띄워주던 Template이 이처럼 `A server error occurred`만 출력 된다


그래서 `Error log`를 추적하고
`Django 2.1.8` 버전과도 비교 해보니 `technical_500.html file`내의 239번째 line의
`<span>...</span> 이 <span>…</span>`로 바뀌어 있음을 확인했다
![](https://4.bp.blogspot.com/-l8Jae3-q2aY/XKUCGVUX2VI/AAAAAAAA8TU/Gv_eoeessEIoIVZ_xJMsEaO9NqpIQmLhQCEwYBhgL/s640/diffrent%2Btext.png)
`Django 2.1.8` 까지는` <span>` 태그 내부가 `... (dot dot dot)` 으로 이루어져 있었는데

`Django 2.2` 부터는` <span>`태그 내부가` …(ellipsis, 말줄임표)` 으로 이루어져 있어

해당 태그를 읽을 때 `unicode Error`가 발생하였다.

그래서 `<span>태그 내부를 …(ellipsis, 말줄임표) 가 아닌 ... (dot dot dot)` 으로 바꿔주거나

![](https://1.bp.blogspot.com/-7X1UZVMZy58/XKUCGdbtVAI/AAAAAAAA8TM/1SdjeDtkuXYt8v0Q__zYDZwvMTesvlciQCEwYBhgL/s640/add%2Bencoding%2Boption.png)

위의 image에서와 같이 `debug.py`파일 331번째 line에 있는` technical_500.html`을 `encoding="utf-8"`로 open해주면

정상적으로 Template이 출력된다

![](https://4.bp.blogspot.com/-JF3r2KBEugE/XKUCHo23AFI/AAAAAAAA8TU/j0QhqsO7FjQs8eYwXCzI2rOkJJYvCSA6ACEwYBhgL/s640/normal%2Btemplate%2B.png)



> 혹시 설명이 부족하신 분들을 위해 상세하게 내용 추가
![](https://cdn-class.likelion.org/media/django-summernote/2019-04-04/82ac95ad-008a-480f-88b5-e6e462b56afc.png)
 
요런 unicodeDecodeError가 뜨는 경우를 보셨을껍니다.
그리고 우리의 template은
 ![](https://cdn-class.likelion.org/media/django-summernote/2019-04-04/15378afa-4ca1-4823-886a-459dd516244f.png)
이런 슬픈 화면을 보여주게 됩니다

그래서 열심히 구글링을 해봤지만 마음에 드는 답변이 없어서
`Error log`를 열심히 보니.
`Django 2.2 version`부터 
가상환경 `\Lib\site-packages\django\views\templates` 에 있는 `technical_500.html`의  239번째 line의 <span> 태그로 감싸진 부분이 말줄임표로 바뀌었음을 알수 있었습니다
![](https://cdn-class.likelion.org/media/django-summernote/2019-04-04/f62eadb2-a846-4fcb-9dad-11130fa04876.png)
`Django 2.1.8 vesrion`까지는 온점 세개였습니다ㅠㅠㅠ

그래서 해당 말줄임표를 지우고 온점 세개` ... `를 입력해주시면 `unicode Error`가 발생하지 않고 Error 템플릿이 뜨는 것을 확인하실 수 있습니다.
![](https://cdn-class.likelion.org/media/django-summernote/2019-04-04/cab52d62-f5a4-462b-891f-5e7ca2b81ead.png)


> 해결방법 2

가상환경 `\Lib\site-packages\django\views` 에 있는 `debug.py`의 331번째 line에서 `technical_500.html`을 열때 `open(encoding="utf-8")`로 수정해주시면 `technical_500.html`을 수정 안해주셔도 해결됩니다.
![](https://cdn-class.likelion.org/media/django-summernote/2019-04-04/1f9b0601-6cfb-437c-a96b-cbc282af5b5c.png)


-끝 - 
따라서 `pip install django==2.1.8 `로 설치를 강제해주시면 해당 `unicode Error`는 뜨지 않습니다
(5월 4일 기준 수정된 최신버전 2.2.1이 릴리즈되어서 그냥 `pip install django`해주셔도 무방합니다)


수정된 github 사항
https://github.com/django/django/commit/efb257a01764855a71051d5bcc7fd66c5ad6d210