---
title: "IAM은 무엇인가"
date: "2020-05-17"
category: ['AWS']
draft : False
---

>나만의 언어로 AWS공부해보기

### IAM

**IAM(AWS Identity and Access Management)**을 이용하여
AWS의 리소스사용에 대한 **인증(Authentication)** 및 **권한부여(Authrization)**대상을 제어한다.
> 즉 쉽게 말하면 사용자들 마다 AWS의 각 기능에 접근할 수 있는 권한을 설정해주는 부분이다.

우리가 제일 처음 생성하는 **AWS계정(루트사용자)**의 경우에는 전체 권한(단일 로그인 자격 증명)을 지니고 있는데, **_일반적인 작업의 경우 루트 사용자를 사용하지 않는게 좋다_**. 단, 처음 IAM 사용자를 생성할때만 사용하자.

우리가 생성한 IAM으로 AWS에 로그인할 수 있는데 이때 EC2 관련 권한을 부여해줬다고 하더라도 IAM을 지정하기전에 생성했던 EC2에는 적용되지 않고
새로 EC2를 만들때 IAM Role을 설정해줘야지 해당 IAM을 이용한 제어가 가능해진다.

그럼 우리는 이제 IAM을 통해서 AWS를 조작할수 있게 된다.

> 추가로 루트 계정에 MFA(Multi-Factor-Authentication)을 적용하면 보안을 강화할 수 있는데 이는 우리가 게임 같은 것을 할때 OTP를 사용했던 것과 같이 Google OTP와 같은 것을 통해서 강화시킬수 있다.


***

#### 추가적인 IAM공부

AWS시작 및 IAM 설명(슬라이드) : [AWS시작 및 IAM 설명(슬라이드)](https://www.slideshare.net/awskorea/iam-aws-aws-aws-summit-seoul-2019)
IAM의 Policy(정책) : [IAM 의 Policy(정책)](https://musma.github.io/2019/11/05/about-aws-iam-policy.html)

위의 두 link를 참고하면 IAM의 사용법에 대해서 더 알아볼 수 있다. 
간단하게 설명했던 IAM의 용도보다 훨씬 더 복잡하고 많은 기능을 부여할수 있었다. 실습을 해봐야 어느정도 구조가 머리게 그려질 것 같지만, 대략적인 이해를 해보자면 우리는 우리의 정책(Policy)을 생성할 수 있고, 이는 JSON파일내에 `Statement`,`Action`,`Resouce`와 같은 요소들로 구성되어있다.
(ex. 어떤 condition을 만족할때 어떤 Resource 에 대해서 어떤 Action을 할 수 있게 Effect(허용/불허용) )

그리고 대표적으로 
* ID-Based Policy(자격중명 기반 정책) : 사용자에 따라 정책을 관리하고 각 리소스에 대한 권한을 부여해준다.
* Resource-Based Policy(리소스 기반 정책) : 리소스(S3 등)에서 자체적으로 관리하는 정책으로 Principal(보안주체)을 설정하여 권한을 열어줄 수 있다.


 
