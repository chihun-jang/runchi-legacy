import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ProfileImg from '../components/about/ProfileImg';
import Career from '../components/about/Career';
import SideProject from '../components/about/SideProject';
import Active from '../components/about/Active';
import TechStack from '../components/about/TechStack';
import { COLORS } from '../constant';
import insta_icon from '../asset/icon/insta_icon.png';
import linkedin_icon from '../asset/icon/linkedin.png';
import github_icon from '../asset/icon/left_arrow_opacity.png';
const ProfilePage = ({ visibleProfile }) => {
    const keywordArr = ['co-founder', 'developer', 'crossfit', '고양이'];
    return (
        <ProfileContainer visibleProfile={visibleProfile}>
            <ProfileSection>
                <ProfileImage />
                <SocialContainer>
                    <div>
                        <img src={insta_icon} />
                    </div>
                    <div>
                        <img src={linkedin_icon} />
                    </div>
                    <div>
                        <img src={github_icon} />
                    </div>
                </SocialContainer>

                <IntroduceContainer>
                    <div>
                        {keywordArr.map(keyword => (
                            <span>{keyword}</span>
                        ))}
                    </div>

                    <MottoContainer>
                        로망을 개발하는 개발자가 되겠습니다.
                    </MottoContainer>
                </IntroduceContainer>
            </ProfileSection>
        </ProfileContainer>
    );
};

export default ProfilePage;

const ProfileContainer = styled.section`
    border: 1px solid #ffffff;
    background-color: rgba(38, 40, 51, 0.9);
    width: 400px;
    height: 400px;
    border-radius: 50%;
    position: absolute;
    left: -100px;
    top: -100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2;
`;
const ProfileSection = styled.div`
    /* border: 3px solid red; */
    position: relative;
`;

const ProfileImage = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: black;
`;

const SocialContainer = styled.div`
    /* border: 3px solid purple; */
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    position: absolute;

    right: -60px;
    top: 0;
    & > div {
        /* background-color: rgba(255, 255, 255, 0.3); */
        width: 32px;
        height: 32px;
        border-radius: 50%;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;

        transform: scale(1);

        transition: all 0.3s ease-out;
    }

    & > div > img {
        width: 24px;
        height: 24px;
    }
    & > div:nth-child(1) {
        color: red;
        margin-left: -40px;
    }
    & > div:nth-child(2) {
        color: red;
        margin-left: 0px;
    }
    & > div:nth-child(3) {
        color: red;
        margin-left: -40px;
    }
    /* & > div:nth-child(4) {
        color: red;
        margin-left: -40px;
    } */
`;
const IntroduceContainer = styled.div`
    border: 3px solid black;
    max-width: 250px;
    margin-top: 16px;
    display: flex;

    flex-wrap: wrap;
    align-items: center;

    position: absolute;
    top: 150px;

    color: white;
    font-size: 12px;
    & > div > span {
        border: 2px solid black;
        padding: 4px 8px;
        border-radius: 8px;
        /* margin: 4px; */
        margin-right: 8px;
    }
`;

const MottoContainer = styled.div`
    margin-top: 16px;
`;
