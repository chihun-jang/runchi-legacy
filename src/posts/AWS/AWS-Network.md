---
title: "Cloud Trail"
date: "2020-05-20"
category: ['AWS']
draft : True
---

VPC, Subnet, Route Table, Internet Gateway


AWS VPC(virtual Private Cloud) ?

Cloud 내부에서 구성되는 사용자의 AWS계정 전용 가상 Network, 이곳에서 AWS Resource를 시작할 수 있다.
이 VPC는 다른 가상 Network와 논리적으로 분리되어있다.

기본적으로 AWS에서 EC2-VPC를 제공하지만 Amazon VPC 는 AWS의 확장가능 인프라 사용과, 기존 network와 유사한 이점이있다.

VPC는 두개 이상의 region에 걸치는 것이 불가능하다. 그렇지만 1개의 VPC는 복수개의 Amazon Availability Zone(AZ)에 걸쳐 생성 가능.
또한 IP주소도 2^16, 65535개로 제한되어있다. 


### Subnet

* Public Subnet : Public Subnet은 Internet Gateway, ELB, Public IP/ Elastic IP를 가진 instance를 가지고있다. 특히 Nat Instance를 통해 PRivate Subnet에있는 instance가 Internet이 가능하게함

* Private Subnet : 외부와 차단되어있으며, 내부 instance들은 private ip만을 가지고있고, internet inbound/outbound가 불가능하며, 다른 subnet과의 연결만 가능하다.

분리된 가용영역에 subnet을 각각 구성하고 인스턴스를 생성해주면 HA(Hign Availability, 고가용성)을 가질수있다. 

그럼 이렇게 구성된 subnet들의 IP구성을 보면(이때 subnet에서 앞 4개 뒤1개의 IP는 관리용도로, 사용할수 없다)

VPC : 172.16.0.0/24 
subnet1 : 172.16.0.0/27
subnet2 : 172.16.0.32/27 

이런식으로 구성이 될것이다.
그럼 각 subnet 들은 27개의 network ip를 가지게 되고


## Internet Gateway (인터넷 게이트웨이)

Internet Gateway는 VPC의 인스턴스와 인터넷간에 통신을 가능하게 한다.
따라서 Network Traffic에 가용성 위험이나 대역폭 제약 조건이 발생 X

인터넷 라우팅 가능 트래픽에 대한 VPC 라우팅 테이블에 대상 제공
퍼블릭 IPv4주소가 할당된 instance에 대해 NAT(Network 주소 변환)을 수행


## Route Table
라우트 테이블은 ip address에 routing 경로를 정의하여 subnet 밖으로 나가는 outbound traffic에 대해 routing 경로를 설정하는 것,
라우팅 테이블의 destination 을 0.0.0.0/0(모든네트워크)로 잡고 Target을 우리가 생성한 IGW로 선택하는 것은 인터넷과의 연결을 위한것이다.

이때 target을 IGW로 잡아주는 것은 public subnet에 대해서이고, private subnet에 대해서는 target을 Nat server의 InstanceIP를 넣어줘야한다.