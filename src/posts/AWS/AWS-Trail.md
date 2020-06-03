---
title: "Cloud Trail"
date: "2020-05-19"
category: ['AWS']
draft : False
---

### Cloud Trail
**Cloud trail** 기능은 말 그대로 특정 리전에서 일어나는 event같은것들을 추적해서 **_log_**를 남겨주는 역할을 한다.
trail을 생성 할때 region의 범위도 체크할수 있고, 이벤트의 범위또한 제한할수 있는데(이떄 설정하는 옵션에 따라 **추가비용**이 부과된다), 이러한 log들은 기본적으로 **`AWS S3 buckets`**에 저장이 되고 S3 buckets 사용요금은 또! **별도**로 부과된다

log는 **`json`**형식으로 기록이 되는데 trail을 생성하고 buckets에 저장하여 확인해본결과
trail을 따로 생성하지 않으면 `cloud trail console(최대 90일)`에 기록이 되던 것이 s3 buckets으로 옮겨가고 조금 더 **detail한 logging**설정이 가능하다는게 장점이었다.

지금 당장 사용 할것이 아니므로 실습후에 `S3 buckets` 과 `Cloud Trail` 둘다 지워줬는데, 이때 S3 buckets을 지울 때 정책설정이 **리소스 기반 정책**으로 S3 buckets에 대해서 **delete** 를 모두에 대해서 거부하고 있으므로 IAM에서 배웠던대로 정책을 건드려 delete가 가능하게 정책을 변경한 후에 삭제를 진행해줬다.

> 하단에 정책 생성기가 있는데 항목을 입력만해주면 자동으로 JSON형식으로 정책을 생성해준다
> 정책생성기 : [https://awspolicygen.s3.amazonaws.com/policygen.html](https://awspolicygen.s3.amazonaws.com/policygen.html)