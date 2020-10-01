---
title: 'Elastic Beanstalk'
date: '2020-08-25'
category: ['AWS', 'deploy']
draft: True
---

# EB란? (PaaS, Platform As A Service)

100개 이상의 서비스로 구성된 AWS는 인프라 관리방법의 유연함을 제공하는 대신 사용방법이나 프로비저닝(준비)에 있어 까다로울 수 있다.

EB를 사용하면 이러한 염려에서 벗어나 App을 신속하게 배포하고 관리 할 수 있다.
(scaling, LB, monitoring 등을 자동으로 처리해준다.)

EB는 다양한 App을 지원하고, App을 배포할때 EB는 지원가능한 플랫폼 버전을 구축하고, EC2와 같은 리소스를 프로비저닝하여 App을 실행한다.

> EB는 사용자대신 인프라를 프로비저닝, 운영뿐만아니라 App stack을 관리해주므로 개발자의 노고를 훨씬 덜어준다. 따라서 server나 DB, LB, firewall, network를 관리하는데 드는 비용을 코드작성에 더 투자할 수 있다.

> EB는 Auto Scaling을 사용해 특정 요건하에 자동으로 확장,축소한다. eg. CPU사용률을 지표 ==> 최소 비용대비 높은 workload(작업량),트래픽을 처리

# 사용방법

크게 EB console, AWS CLI, eb CLI를 이용할 수 있다.
App을 source bundle 형태로 EB에 upload하고 App에 대한 몇가지 정보를 제공하면 EB가 자동으로 환경을 실행, AWS리소스 구성을 한다.

그 후에는 직접 관리하고 새로운 버전을 배포할 수 있다.
(정보들은 EB console이나, API 또는 AWS CLI등을 통해서 확인할 수 있다.)

# 요금

EB를 사용하는데 추가 요금은 없고 사용되는 기본 AWS 리소스의 비용이 빠져나간다(EC2, ELB, RDS,S3 등등)
