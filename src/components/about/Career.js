import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { css } from 'styled-components';

import profileImg from '../../asset/icon/left_arrow_opacity.png';
import github from '../../asset/icon/left_arrow_opacity.png';
import linkedIn from '../../asset/icon/left_arrow_opacity.png';
import gmail from '../../asset/icon/left_arrow_opacity.png';

const Career = ({ career }) => {
    return (
        <CareerContainer>
            <ProfileSection>
                <ProfileImg src={profileImg} alt="" />
                <ProfileInfoBox>
                    <ProfileInfo>
                        <a href="https://github.com/chihun-jang">
                            <img src={github} alt="" />
                        </a>
                    </ProfileInfo>
                    <ProfileInfo>
                        <a href="https://www.linkedin.com/in/%EC%B9%98%ED%9B%88-%EC%9E%A5-ab624b1b0/">
                            <img src={linkedIn} alt="" />
                        </a>
                    </ProfileInfo>
                    <ProfileInfo>
                        <img src={gmail} alt="" />
                        <InfoToolTipBox>
                            <InfoToolTipTail />
                            <InfoToolTip>jang.chihun@gmail.com</InfoToolTip>
                        </InfoToolTipBox>
                    </ProfileInfo>
                </ProfileInfoBox>
            </ProfileSection>
            <CareerSection>
                <VerticalBox>
                    <VerticalLine></VerticalLine>
                </VerticalBox>
                <CareerContent>
                    {career.map(item => (
                        <CareerList current={item.current}>
                            <CurrentCareerBg current={item.current} />
                            <CurrentCareerGlass current={item.current} />
                            <span>{item.period}</span>
                            <p>
                                {item.job}
                                {/* <span>{item.project}</span> */}
                            </p>
                        </CareerList>
                    ))}
                </CareerContent>
            </CareerSection>
        </CareerContainer>
    );
};

export default Career;
const CareerContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 1024px) {
        flex-direction: row;

        width: 100%;
    }
    @media (max-width: 560px) {
    }
    @media (max-width: 560px) {
        flex-direction: column;

        margin: 0 auto;
    }
`;
const ProfileSection = styled.div``;
const ProfileImg = styled.img`
    width: 200px;
    height: 200px;
    margin-bottom: 2rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #948282;
    opacity: 1;
    box-shadow: 4px 4px 6px 0 rgb(0 0 0 / 10%),
        -4px -4px 6px rgba(255, 255, 255, 0.1);
    @media (max-width: 630px) {
        width: 150px;
        height: 150px;
    }
`;

const ProfileInfoBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;
const ProfileInfo = styled.div`
    & + & {
        margin-top: 0.5rem;
    }
    & img {
        height: 30px;
        cursor: pointer;
        box-shadow: 4px 4px 6px 0 rgb(0 0 0 / 10%),
            -4px -4px 6px rgba(255, 255, 255, 0.1);
    }

    & img:hover + div,
    & img:active + div {
        display: block;
    }
    position: relative;
`;

const InfoToolTipBox = styled.div`
    display: none;
`;
const InfoToolTip = styled.div`
    padding: 0.5rem 1rem;
    background-color: black;
    border-radius: 1rem;
    color: white;
    position: absolute;
    top: 35px;
    left: -35px;
    z-index: 3;
`;
const InfoToolTipTail = styled.div`
    position: absolute;
    top: 30px;
    left: 10px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    border-bottom: 5px solid black;
`;
// 커리어가 들어가는 section
const CareerSection = styled.article`
    margin-top: 3rem;
    display: flex;
    /* border: 1px solid red; */
    flex: 1;

    @media (max-width: 1024px) {
        margin-top: unset;
    }
    @media (max-width: 560px) {
        margin-top: 1rem;
    }
`;
// 새로줄을 생성하기 위한 section
const VerticalBox = styled.div`
    flex: 3;
    display: flex;
    justify-content: flex-end;
`;

const VerticalLine = styled.div`
    height: 100%;
    width: 2.5px;
    background: linear-gradient(
        to bottom,
        rgba(245, 223, 77, 0.7),
        rgba(199, 245, 147, 0.7),
        rgba(245, 211, 162, 0.7)
    );
`;
// 커리어 내용이 들어가는 Content Container부분
const CareerContent = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    z-index: 0;
`;
// 현재 커리어의 컬러배경
const CurrentCareerBg = styled.div`
    ${props =>
        props.current &&
        css`
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            background: linear-gradient(
                to right top,
                rgba(245, 223, 77, 0.7),
                rgba(171, 245, 195, 0.3)
            );

            box-shadow: 4px 4px 6px 0 rgb(0 0 0 / 10%),
                -4px -4px 6px rgba(255, 255, 255, 0.1);
        `}
`;
// 현재 이력 위에 덮어줄 Glass
const CurrentCareerGlass = styled.div`
    ${props =>
        props.current &&
        css`
            position: absolute;
            left: 0.8rem;
            top: 0.2rem;

            width: 100%;
            height: 100%;
            border-radius: 1rem;

            background: linear-gradient(
                to right bottom,
                rgba(255, 255, 255, 0.5),
                rgba(255, 255, 255, 0.2)
            );
            backdrop-filter: blur(1rem);

            z-index: 1;
        `}
`;

// 커리어의 내용들을 적어나갈 List
const CareerList = styled.li`
    position: relative;
    display: inline-flex;
    padding: 1.5rem;

    & > span {
        position: absolute;
        top: 1rem;
        left: -11rem;

        padding: 0.5rem;

        ${props =>
            props.current &&
            css`
                backdrop-filter: drop-shadow(0px 0px 10px #ffdd00);
                border-radius: 2rem;
            `}
        @media (max-width: 475px) {
            left: -10rem;
        }
    }
    & > p {
        z-index: 2;

        span {
            display: inline-block;
            margin-top: 1rem;
            font-size: 1.2rem;
        }
    }
    & + & {
        margin-top: 1rem;
    }
`;
