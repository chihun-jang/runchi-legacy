---
title: "Django & Linux 명령어(기본)"
date: "2019-01-16"
category: ['멋쟁이사자처럼']
draft : False
---
장고 명령어 & 리눅스 명령어(Django)
⭐장고명령어

django-admin startproject [프로젝트명] : 새로운 프로젝트 생성

python manage.py startapp [앱이름] : 새로운 장고앱 생성

python manage.py runserver : 개발 서버 실행

python manage.py makemigrations [앱이름] : 마이그레이션 파일 생성

python manage.py migrate [앱이름] : 마이그레이션 적용

python manage.py collectstatic : static 파일들을 settings.STATIC_ROOT 경로로 모음

python manage.py --help : 지원하는 명령어 목록


⭐django-admin VS manage.py

django-admin 은 DJANGO_SETTINGS_MODULE 가 셋팅되어있길
기대하며 사용하는 것이고 manage.py를 사용하는게 좀더편리하다

그래서 처음에 프로젝트 만들때는 django-admin 으로 만들고
다음부터는 manage.py를 쓰는 것 같다

manage.py가 thin wrapper라고 하는데.....
자세한 내용은 너무 어려우므로 더 궁금하신 분들은  구글링 하시길 바랍니다

⭐리눅스 명령어

clear : command 창 깨끗하게 정리

pwd  :  현재 내가 위치한 path 위치를 보여줌

cd <directory name>  : directory 이동 할때 사용

ls     : 현재 위치한 곳에 file 및 folder 보여줌

touch <file name>: 크기가 0인 file생성

mkdir <directory name> : directory생성

rm <file name> 또는 rm -R <directory name>
     : 파일 및 폴더 삭제(폴더를 삭제할때는 하위 file까지 삭제해줘야하므로 -R을 붙여줌)

cat <file name>  : 파일내용을 보여줌

mv <filename> <바꿀filename> : filename을 바꿔준다
     <filename> <directoryname> : file을 directory로 이동시켜준다
                                             
                                              file뿐만 아니라 directory name도 변경가능
