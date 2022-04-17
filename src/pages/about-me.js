import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ProfileImg from '../components/about/ProfileImg';
import mentor from '../asset/icon/left_arrow_opacity.png';
import leader from '../asset/icon/left_arrow_opacity.png';
import hackathon from '../asset/icon/left_arrow_opacity.png';
import code from '../asset/icon/left_arrow_opacity.png';
import Career from '../components/about/Career';
import SideProject from '../components/about/SideProject';
import Active from '../components/about/Active';
import TechStack from '../components/about/TechStack';

const AboutMe = () => {
    const career = [
        {
            period: '2020.11',
            job: 'startup co-founder Front-End Dev',
            project:
                'React,Redux,React-Saga를 활용하여 store정보를 입력,수정, 보여주는 Product 제작',

            current: true,
        },
        {
            period: '2019.11',
            job: 'Pusan Likelion Works Teacher',
            project:
                'HTML,CSS, Python, Django를 기본으로 한 web develop 기초 교육(1,2,3기 진행)',

            current: true,
        },
        {
            period: '2020.10 \n 2020.11',
            job: 'startup Front-End Dev',
            project: 'react와 redux를 이용하여 영양제 제조 service 개발, ',

            current: false,
        },
        {
            period: '2019.11 \n 2020.06',
            job: 'startup FullStack Dev',
            project:
                'Django와 AWS(EC2,LB,Route53)이용한 full community Site 제작 및 운영',
            current: false,
        },
    ];
    const sideproject = [
        {
            period: '2020.12',
            name: 'UMK MBTI TEST \n (React, Redux, amplify)',
            direction: 'top',
        },
        {
            period: '2020.09',
            name: 'AngelHack \n (Django)',
            direction: 'bottom',
        },
        {
            period: '2020.04',
            name: '선거 정보 알림 서비스 \n (Django,EC2)',
            direction: 'top',
        },
        {
            period: '2020.03',
            name: 'PNU LL Apply Page \n (Django, BootStrap)',
            direction: 'bottom',
        },
        {
            period: '2019.10',
            name: 'To do Love \n Play Store 출시 \n (RN)',
            direction: 'top',
        },
    ];

    const active = [
        {
            icon: mentor,
            desc:
                '청소년 대상 프로그래밍 멘토링 진행  KB국민은행  X  멋쟁이사자처럼',
        },
        {
            icon: hackathon,
            desc: '다수 해커톤에 재미있게 참여했지만 수상은 😢',
        },
        {
            icon: code,
            desc:
                'Django 공식 Repo에 debugging PR을 날렸지만  다른분이 PR 빼앗아가서 슬픔',
        },
        {
            icon: leader,
            desc: '부산 멋쟁이사자처럼 7기 대표',
        },
    ];

    const stack = [
        {
            name: 'HTML/CSS',
            desc: '요청한 모든 디자인 구현 가능',
            score: 6,
        },

        {
            name: 'JS',
            desc: 'Vanilla JS로 DOM조작을 통한 Interaction',
            score: 2,
        },
        {
            name: 'Django',
            desc: 'Web Service를 Full로 만들 수 있고, 수업 가능',
            score: 4,
        },
        {
            name: 'Git',
            desc: '협업을 하는데 무리없음, 필요한 부분 찾아서 적용가능',
            score: 2,
        },
        {
            name: 'AWS',
            desc:
                'Route 53, Amplify, EC2, ELB, EB 등을 사용해보고, 관심도 많음',
            score: 0.5,
        },
        {
            name: 'React',
            desc: 'Redux, Redux-Saga를 사용하여 기본적인 SPA 작성가능.',
            score: 2,
        },
        {
            name: 'RN',
            desc:
                'LocalStorage를 이용해 Gamification이 적용된 TodoApp PlayStore에 출시.',
            score: 1,
        },
        {
            name: 'Gatsby',
            desc:
                '공식문서를 읽고, 다른 블로그를 참고하여 본인만의 정적 Site 생성.',
            score: 2,
        },
        {
            name: 'ML',
            desc: '관심이 있어 책을 3권째 읽고 틈틈히 공부를 하려는 시도 중.',
            score: 0.25,
        },
    ];
    const myValues = [
        '- 구글링으로 해결 못할 것은 없다.',
        '- 선한 영향을 주는 개발자가 되자',
    ];
    const totalEffect = 205000;
    const student = 100;
    return (
        <>
            <SEO title="About-Me" />
            <Layout about>
                <LeftSection>
                    <Career career={career} />
                </LeftSection>

                <RightSection>
                    <SideProject sideproject={sideproject} />
                    <Active active={active} />
                    <TechStack stack={stack} />
                </RightSection>
            </Layout>
        </>
    );
};

export default AboutMe;

const LeftSection = styled.section`
    flex: 1;
    background: white;
    /* rgba(199, 245, 147, 0.4), 
     rgba(245, 211, 162, 0.4)*/
    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.2)
    );

    padding: 3rem;
    @media (max-width: 1024px) {
        flex: auto;
        border-radius: 0 0 1.5rem 1.5rem;
    }
    @media (max-width: 475px) {
        padding: 1rem;
    }
`;

const RightSection = styled.section`
    flex: 2;

    display: flex;
    padding: 2rem;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    @media (max-width: 1024px) {
        flex: auto;
    }
`;
