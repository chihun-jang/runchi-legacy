import React, { useEffect, useState } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SVG from '../components/svg';
import SEO from '../components/seo';
import styled, { css } from 'styled-components';

import Utterences from '../components/Utterances';
import UnderLine from '../components/UnderLine';
import { COLORS } from '../constant';
import hanlachichi from '../images/그윽한혁이.jpeg';
import like_icon from '../asset/icon/star_opacity.png';
import share_icon from '../asset/icon/share_opacity.png';

const _ = require('lodash');

export default ({ data }) => {
    const post = data.markdownRemark;

    return (
        <Layout>
            <PostContainer>
                <PostSummaryContainer>
                    <PostSummaryThumbnail></PostSummaryThumbnail>
                    <PostSummaryInfo>
                        <span>지금 읽는 글</span>
                        <PostSummaryTitle>
                            오늘은 날씨가 좋은 4월의 어느날
                        </PostSummaryTitle>
                        <PostSummaryCategoryContainer>
                            <PostSummaryCategory># 일상</PostSummaryCategory>
                            <PostSummaryCategory># 굿굿</PostSummaryCategory>
                        </PostSummaryCategoryContainer>
                        <PostSummaryDate>2022-04-19</PostSummaryDate>
                    </PostSummaryInfo>
                    <PostSummaryBtnContainer>
                        <PostSummaryBtn src={like_icon} />
                        <PostSummaryBtn src={share_icon} />
                    </PostSummaryBtnContainer>
                </PostSummaryContainer>
                <PostContentSection>
                    {/* <PostImg src={null} imgVisible={imgVisible} /> */}
                    <PostDesc>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vestibulum id eros non diam aliquam imperdiet non eu
                        ante. Duis ornare eget purus vel accumsan. Pellentesque
                        in libero efficitur, consectetur erat quis, ornare dui.
                        Nunc rutrum elementum elit commodo dapibus. Praesent
                        ultrices odio urna, id cursus nunc dictum vel. Aliquam
                        lectus dui, lacinia sit amet nibh quis, congue
                        vestibulum libero. Pellentesque sed lorem feugiat,
                        aliquam velit ac, placerat dolor. Integer vestibulum
                        nisi lobortis, gravida nibh eget, posuere tellus.
                        Vestibulum sit amet laoreet ante, quis vulputate tortor.
                        Etiam eleifend bibendum augue nec ultrices. Vivamus
                        pellentesque ut nunc tincidunt placerat. Vestibulum
                        suscipit sagittis dapibus. Duis nec vestibulum ante,
                        vitae feugiat lacus. Duis sollicitudin elementum metus
                        quis dapibus. Morbi luctus non enim vitae tincidunt. Sed
                        id ullamcorper enim. Quisque porta at ipsum et posuere.
                        In rutrum lectus eu vehicula suscipit. In iaculis
                        feugiat aliquet. Etiam maximus ex non leo condimentum,
                        eu ullamcorper sem faucibus. Aenean posuere nisi vel
                        risus interdum egestas. Suspendisse eu euismod orci.
                        Donec finibus interdum libero, ut sagittis lacus
                        vulputate et. Duis vitae lacinia magna, id porttitor
                        purus. Morbi fermentum dui non luctus euismod. Sed
                        turpis odio, semper vitae porta eu, efficitur sed mi. In
                        nec erat ac mi viverra tincidunt. In hac habitasse
                        platea dictumst. Nunc consequat nisi urna, eu posuere
                        erat luctus sed. Sed cursus nunc eu lacus iaculis
                        feugiat. Pellentesque in suscipit eros, rhoncus gravida
                        sapien. Phasellus ullamcorper risus a velit vulputate,
                        sed ullamcorper elit iaculis. Praesent turpis arcu,
                        accumsan et dignissim lacinia, euismod vitae justo.
                        Maecenas semper pellentesque volutpat. Morbi suscipit,
                        libero at bibendum pulvinar, velit arcu vulputate nisi,
                        sed ultricies ex dui pretium risus. Etiam eu facilisis
                        mauris, non posuere augue. Nulla varius vestibulum
                        justo. Cras venenatis ligula euismod aliquam elementum.
                        Aenean massa turpis, euismod ac molestie ut, efficitur
                        quis ipsum. Aliquam sed velit sit amet felis dapibus
                        consectetur. Proin ut mi a augue blandit vestibulum.
                        Praesent dignissim purus eu convallis pulvinar. Donec a
                        risus ut elit faucibus vestibulum vel ac est. Cras at
                        iaculis purus. Cras accumsan, elit sit amet volutpat
                        vulputate, sem mi mollis libero, vel malesuada justo
                        diam eu arcu. Sed eget sapien diam. Quisque justo nisi,
                        vehicula ut sem ut, consequat commodo ante. In efficitur
                        nunc diam, eu efficitur ante imperdiet quis. Curabitur
                        tempor laoreet felis sed malesuada. Vestibulum blandit
                        scelerisque justo, eget facilisis orci dapibus vitae.
                        Cras quis magna elementum libero suscipit vehicula. Sed
                        vulputate dictum enim, non tincidunt mauris placerat eu.
                        Duis id vestibulum justo. Praesent lobortis nibh
                        interdum, euismod erat nec, posuere nibh. Aliquam ac
                        eros luctus, dapibus urna in, efficitur nibh. Proin nisi
                        enim, finibus et consequat ac, faucibus eu diam. Integer
                        velit sapien, tincidunt a lorem vel, fringilla gravida
                        metus. Duis tempor vitae lorem a fringilla. Generated
                    </PostDesc>
                </PostContentSection>

                {/* <SEO title={post.frontmatter.title} description={post.excerpt} />
            <Container>
                <UnderLine>
                    <PostTitle>{post.frontmatter.title}</PostTitle>
                </UnderLine>
                <PostInfo>
                    <PostTagContainer>
                        {post.frontmatter.category.map(item => (
                            <PostTagItem
                                key={item}
                                to={`/category/${_.toLower(item)}`}
                            >
                                {item}
                            </PostTagItem>
                        ))}
                    </PostTagContainer>
                    <PostDate>{post.frontmatter.date}</PostDate>
                </PostInfo>

                <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />

                <CustomUtterences repo={'chihun-jang/runchi'} />
            </Container> */}
            </PostContainer>

            {/* <PostProgress>
                <div>
                    <span></span>
                </div>
            </PostProgress>

            <PostNavigation>
                <div>
                    <span></span>
                    <span></span>

                    <span></span>
                    <span></span>
                </div>
                <div>
                    <span></span>
                    <span></span>
                </div>
                <div>
                    <span></span>
                    <span></span>
                </div>
                <div>
                    <span></span>
                    <span></span>
                </div>
                <div></div>
            </PostNavigation> */}
        </Layout>
    );
};
export const query = graphql`
    query($slug: String) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            excerpt(pruneLength: 200, truncate: true, format: PLAIN)
            html
            frontmatter {
                title
                date
                category
            }
        }
    }
`;

const Container = styled.section`
    /* border: 2px solid red; */
    width: 100%;
    margin: 3rem;
    padding: 3rem;

    background: white;
    /* rgba(199, 245, 147, 0.4), 
     rgba(245, 211, 162, 0.4)*/
    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.2)
    );
    border-radius: 1.5rem;
    box-shadow: 4px 4px 6px 0 rgb(0 0 0 / 10%),
        -4px -4px 6px rgba(255, 255, 255, 0.1);

    @media (max-width: 768px) {
        margin: 0;
    }
`;

const PostInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 2rem;
`;
const PostTagContainer = styled.div`
    /* border: 4px solid black; */
    display: flex;
    align-items: center;
`;

const PostTagItem = styled(Link)`
    font-weight: 700;
    color: rgb(250, 187, 12);
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3),
        -0.5px -0.5px 1px rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    & + & {
        &::before {
            content: '/';
            /* width: 5px; */
            /* height: 5px; */
            /* border-radius: 50%; */
            /* background-color: dimgray; */
            color: rgba(105, 105, 105, 0.5);
            display: inline-block;
            margin: 0 5px;
            text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3),
                -0.5px -0.5px 1px rgba(255, 255, 255, 1);
        }
    }
`;

const CustomUtterences = styled(Utterences)`
    /* border: 10px solid red; */
    background-color: black;
    width: 100%;
    & div {
        width: 100% !important;
        border: 10px solid red;
    }
`;

const PostContainer = styled.div`
    /* border: 5px solid yellow; */
    position: relative;
    display: flex;
    flex-direction: column;
`;

const PostSummaryContainer = styled.div`
    padding: 24px;
    display: flex;
    position: relative;

    align-items: center;
    justify-content: flex-start;
    border-radius: 24px;

    border: 1px solid #ffffff;

    /* border: 2px solid green; */
    box-shadow: 0px 10px 20px rgba(54, 48, 116, 0.3);
`;
const PostSummaryThumbnail = styled.img`
    background-color: #000000;
    width: 150px;
    height: 150px;
    border-radius: 10%;

    /* border: 2px solid green; */
`;
const PostSummaryInfo = styled.div`
    /* border: 2px solid red; */
    margin-left: 2.4rem;
    display: flex;
    flex-direction: column;

    & > span:nth-child(1) {
        /* border: 5px solid black; */
        font-size: 1rem;
        color: #a39eb8;
    }
    & > * + * {
        margin-top: 4px;
    }
`;
const PostSummaryTitle = styled.header`
    /* border: 2px solid green; */
    font-size: 2.4rem;
    font-weight: 700;
`;

const PostSummaryCategoryContainer = styled.div`
    /* border: 3px solid red; */
    display: flex;
    & > div + div {
        margin-left: 8px;
    }
`;
const PostSummaryCategory = styled.div`
    /* border: 2px solid blue; */
    font-size: 1.4rem;
    color: rgba(54, 48, 116, 1);
`;
const PostSummaryDate = styled.div`
    font-size: 1.2rem;
    /* border: 2px solid purple; */
`;

const PostSummaryBtnContainer = styled.div`
    /* border: 2px solid blue; */
    display: flex;
    position: absolute;
    right: 24px;
    bottom: 24px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin-left: 12px;

    & > * + * {
        margin-top: 8px;
    }
`;

const PostSummaryBtn = styled.img`
    width: 24px;
    height: 24px;
`;
const PostSummaryKeyword = styled.span``;
const AlbumImg = styled.img`
    background-color: black;

    object-fit: cover;
    object-position: center;

    border-radius: 4px;
    width: 300px;
    height: calc(100vh - 488px);

    transition: all 0.3s ease-out;
    position: absolute;
    top: 48px;
    opacity: 1;

    opacity: 0.2;
    z-index: 0;
`;

const PostContentSection = styled.div`
    /* border: 3px solid green; */

    overflow-y: scroll;
    color: ${COLORS.textColor};
    transition: all 0.3s linear;

    padding: 24px 100px;

    max-height: 15%;

    padding: 24px 24px;
    max-height: 100%;

    z-index: 1;
`;

const PostProgress = styled.div`
    /* border: 3px solid gray; */
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
        width: 60%;
        height: 5px;
        background-color: black;
        position: relative;

        & > span {
            display: inline-block;
            width: 10px;
            height: 10px;

            background-color: gray;
            border-radius: 50%;
            position: absolute;
            top: -2.5px;
        }
    }
`;
const PostNavigation = styled.div`
    /* border: 2px solid purple; */
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > div {
        width: 50px;
        height: 50px;
        /* border: 2px solid green; */

        color: ${COLORS.textColor};

        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /* 네비게이션에 위치한 재생버튼들 */

    /* 재생버튼은 재생중이라는 느낌을 주기위해서 눌러져있는 음각을 주고 */
    & > div:nth-child(3) {
        border-radius: 150px;
        background: #262833;
        box-shadow: inset 8px 8px 16px #1e2029, inset -8px -8px 16px #2e303d;
    }

    /* 나머지 버튼들은 누를 수 있다는 느낌을 주기위해서 양각을 준다. */
    & > div:nth-child(2),
    div:nth-child(4) {
        border-radius: 150px;
        background: linear-gradient(145deg, #292b37, #22242e);
        box-shadow: 8px 8px 16px #1e2029, -8px -8px 16px #2e303d;
    }

    /* 셔플 버튼을 담당하는 부분 */
    & > div:nth-child(1) {
        & > span:nth-child(1),
        span:nth-child(4) {
            width: 6px;
            height: 20px;
            background-color: ${COLORS.primaryColor};
            z-index: 1;
        }
        & > span:nth-child(1) {
            margin-right: -6px;
        }
        & > span:nth-child(4) {
            margin-left: -6px;
        }
        & > span:nth-child(2),
        span:nth-child(3) {
            width: 20px;
            height: 15px;
            border-radius: 15px;
            border: 3px solid ${COLORS.textColor};
        }

        & > span:nth-child(3) {
            margin-left: -3px;
        }
    }

    /* 이전 버튼을 담당하는 부분 */
    & > div:nth-child(2) {
        & > span:nth-child(1) {
            display: inline-block;
            height: 30px;
            width: 2px;
            background-color: ${COLORS.textColor};
        }
        & > span:nth-child(2) {
            display: inline-block;
            width: 0;
            height: 0;
            border-top: 20px solid transparent;
            border-bottom: 20px solid transparent;

            border-right: 30px solid ${COLORS.textColor};
        }
    }

    /* play 버튼을 담당하는 div */
    & > div:nth-child(3) {
        & > span {
            display: inline-block;
            height: 30px;
            width: 8px;
            background-color: ${COLORS.textColor};
        }
        & > span + span {
            margin-left: 8px;
        }
    }
    /* 다음 버튼을 담당하는 부분 */
    & > div:nth-child(4) {
        & > span:nth-child(1) {
            display: inline-block;
            width: 0;
            height: 0;
            border-top: 20px solid transparent;
            border-bottom: 20px solid transparent;

            border-left: 30px solid ${COLORS.textColor};
        }
        & > span:nth-child(2) {
            display: inline-block;
            height: 30px;
            width: 2px;
            background-color: ${COLORS.textColor};
        }
    }
`;

const CloseBtn = styled.div`
    position: absolute;
    top: 24px;
    right: 24px;

    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    cursor: pointer;

    transform: scale(0);
    transition: all 0.3s ease-out;

    & > div:nth-child(1) {
        width: 3px;
        height: 100%;
        background-color: ${COLORS.textColor};
        transform: rotate(45deg);
        margin-right: -1.5px;
    }
    & > div:nth-child(2) {
        width: 3px;
        height: 100%;
        background-color: ${COLORS.textColor};
        transform: rotate(135deg);
        margin-left: -1.5px;
    }
`;

const PostImg = styled.img`
    /* border: 3px solid red; */
    width: 0;
    height: 150px;
    border-radius: 15px;
    position: absolute;
    right: 24px;
    top: 24px;

    transition: all 0.3s ease-out;
    object-fit: cover;
    object-position: center;

    opacity: 0;

    /* transform: scaleX(0); */

    opacity: 1;
    width: 150px;
    /* transform: scaleX(1); */
`;

const PostDate = styled.div`
    /* border: 4px solid black; */
    width: 100%;
    display: inline-block;

    /* color: rgba(105, 105, 105, 0.5); */
    color: ${COLORS.textColor};
    /* display: flex; */
    font-weight: 300;
    max-width: calc(100%x);
    transition: all 0.3s ease-out;
`;

const PostTitle = styled.h1`
    /* line-height: 1.2; */
    /* font-size: 3.6rem; */
    color: ${COLORS.textColor};
    /* text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1),
            -1px -1px 1px rgba(255, 255, 255, 1); */

    font-size: 1.4rem;
    /* font-weight: 400; */
    font-weight: 400;

    /* border: 2px solid red; */
    max-width: calc(100%x);
    transition: all 0.3s ease-out;
`;

const PostKeyword = styled.div`
    /* border: 3px solid red; */

    margin-top: 16px;
    max-width: calc(100%);
    transition: all 0.3s ease-out;
    font-size: 1.2rem;
    & > span {
        display: inline-block;
        /* border: 3px solid green; */
        padding: 4px 6px;
        border-radius: 8px;
        border: 1px solid #ffffff;
        border-radius: 8px;
    }
    & > span + span {
        margin-left: 8px;
    }
`;
const PostDesc = styled.p`
    /* 포스트 콘텐츠 */

    font-weight: 400;
    margin-top: 24px;
`;
