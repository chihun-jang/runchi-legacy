---
title: 'Django Model과 DB 그리고 Migration'
date: '2020-09-05'
category: ['django', '멋쟁이사자처럼']
draft: False
---

# Django Model과 Migration 그리고 DB

> 비장한 제목밑에 그러지 못한 내용이 올예정이다.

`Django`로 개발을 할땐 sqlite나 외부 DB를 이용해 개발을 하곤 한다.
이때 admin tool을 통해 DB에 직접적으로 조작을 가하면 Django에서는 Sync가 안 맞아 이를 인식하지 못하고, `makemigrations`이나 `migrate` 등 명령어에 애를 먹는 경우가 생길 수 있다.

> `Migrations` ?
> Migrations 파일을 만들어 주는 것으로 우리가 Class로 생성해준 Model DB에 반영시키기 전에 Migrations파일로 기록을 해두는 역할,

> `Migrate`?
> Migrations파일로 기록된 정보들을 DB에 적용시켜 주는 것

가장 대표적인 예로 DB의 Table간의 문제가 생겨서 직접 DB의 Table을 삭제하거나 Column을 조작한 경우인데,
간단한 예를 들어서 확인을 해보도록하자

e.g

```python

# Class Post(models.Model):
#     name =  models.CharFields("이름",max_length=100)
#     nickname =  models.CharFields("닉네임",max_length=100)

```

현재 상황은 `DB`에서 충돌이 일어나 직접 `Post Table`을 삭제해주었다.
**그리고 위의 예시와 같이 `Post Class`가 필요없어서 주석처리를 하고 다시금 `migrations`파일을 생성하려 한다.**
이때 Error가 발생할수 있는데,
그 이유은 migrations파일들에는 기존에 변경사항들이 001,002 이렇게 기록이 되어있고,
**새로운 Migration파일을 생성하기위해(Post Table을 지우자는 Migrations파일) DB를 조회해보니 Post Table은 이미 없는 것이다.**

따라서 이럴땐 **_Migration파일들을 정리하고 새로이 생성_**해주거나
Fake라 할지라도**_ Post Table을 DB에 수동으로 다시 CREATE을 해주고 DELETE내용의 Migration을 생성_**해줘야 하는 것이다.

---

즉 정리해보면 우리는 자연스럽게
DB와 model을 맞춰주기위해 DB의 Table도 지우고~ Model의 Class도 지우고~ 명령어를 실행해주면 되겠지? 하는데 내부적으로는 (Table이 지워진 상태)

--> Model의 Class를 사용자가 더이상 안 쓰겠데, 그럼 지우자
--> 그래그래 이전 migration들을 보니까 해당 Class는 생성된 적이 **_있네_**
-->**_그런데 찾아보니까 그 Model의 Class는 이미 없잖아??_**

위와같이 **_migration파일의 상태와 DB의 상태가 Sync_**가 안 맞아서 발생하는 문제이다.
따라서 작업을 해줄때는 우리의 생각대로 지워줬으니까 여기도 지워주면 되겠지! 이런 생각보다.
차근차근 지우는 단계를 반영시켜주고, 현재 Django가 어느 상태로 인식을 하고 있는지를 생각해 주는게 중요한 것 같다.

---

---

## Migration 파일은 버전관리를 해줘야할까?

<https://stackoverflow.com/questions/28035119/should-i-be-adding-the-django-migration-files-in-the-gitignore-file>

위의 Stackoverflow를 참고해보면 migrations file도 버전관리 git으로 관리해주는게 좋다고 한다.

> 협업을 할때는 `python manage.py makemigrations --merge` 명령어로 각기 다른 migration에 대해서 merge해주고 관리할 수 있다.

링크에서는 크게 3가지 이유를 들고 있는데,

1. **다수의 Production DB에 대해 migrations의 백업파일을 만들어주고 하는 과정이 여러번 일어나야하므로 비효율적이다.**

2. **손수 작성한 migrations파일**이 가끔 존재할수 있는데 makemigration으로는 생성되지 않는 아이들이므로 이러한 정보들이 유실될 수 있다.
3. migration은 코드리뷰를 담고, 우리 production 의 중요한 변경사항을 기록해 놨으므로 **log적인 측면에서 보존을 하는게 좋다**

이래서 Migration파일은 Git 과 같은 버전관리도구를 이용해서도 관리를 해주는게 좋다고 한다.
