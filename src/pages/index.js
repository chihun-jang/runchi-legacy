import React, { useState, Fragment, useRef, useEffect } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import styled from 'styled-components';
import { useAllPosts } from '../queryhooks/use-all-posts';

import back_arrow from '../asset/icon/left_arrow_opacity.png';
import { COLORS, DEVICE } from '../constant';

const _ = require('lodash');

const IndexPage = ({ data }) => {
    const FrontEndArticle = useAllPosts(['FrontEnd'])[0].edges[0].node;
    const SubArticle = useAllPosts(['ML', 'CS', 'Diary']);
    const categoryArr = [
        {
            title: 'Develop',
            desc: '개발을 하며 알게된 것들',
            cnt: '2',
        },
        { title: 'DayMood', desc: '일상 생활을 하며 생각을 한 내용들' },
        { title: 'StartUp', desc: '창업을 하며 든 생각들' },
        { title: 'Cat', desc: '우리집 고양이들' },
        { title: '취미', desc: '내가 좋아하는 나의 취미들' },
    ];

    return (
        <>
            <SEO title="Home" />
            <Layout showHeader={true}>
                <SectionLabel style={{ marginTop: '24px' }}>
                    추천 글
                </SectionLabel>
                <RecommendSection>
                    <Link to={'/algorithm/추상화와%20캡슐화/'}>
                        <RecommendItem>
                            <img src={null} alt="이미지" />
                            <div>
                                <header>오늘의 혁이</header>
                                <RecommendItemLabel>
                                    <p>develop</p>
                                    <p>2022.01.31</p>
                                </RecommendItemLabel>
                            </div>
                        </RecommendItem>
                    </Link>
                    <Link to={'/algorithm/추상화와%20캡슐화/'}>
                        <RecommendItem>
                            <img src={null} alt="이미지" />
                            <div>
                                <header>오늘의 혁이</header>
                                <RecommendItemLabel>
                                    <p>develop</p>
                                    <p>2022.01.31</p>
                                </RecommendItemLabel>
                            </div>
                        </RecommendItem>
                    </Link>
                    <Link to={'/algorithm/추상화와%20캡슐화/'}>
                        <RecommendItem>
                            <img src={null} alt="이미지" />
                            <div>
                                <header>오늘의 혁이</header>
                                <RecommendItemLabel>
                                    <p>develop</p>
                                    <p>2022.01.31</p>
                                </RecommendItemLabel>
                            </div>
                        </RecommendItem>
                    </Link>
                    <Link to={'/algorithm/추상화와%20캡슐화/'}>
                        <RecommendItem>
                            <img src={null} alt="이미지" />
                            <div>
                                <header>오늘의 혁이</header>
                                <RecommendItemLabel>
                                    <p>develop</p>
                                    <p>2022.01.31</p>
                                </RecommendItemLabel>
                            </div>
                        </RecommendItem>
                    </Link>
                </RecommendSection>

                <SectionLabel>최신 글</SectionLabel>

                <RecentSection>
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <RecentItem>
                            <div>
                                <RecentItemIndex>{index + 1}</RecentItemIndex>
                                <RecentItemThumbNail></RecentItemThumbNail>
                                <RecentItemTitle>오늘의 일기</RecentItemTitle>
                            </div>

                            <div>
                                <RecentItemDate>22.03.01</RecentItemDate>
                                <RecentItemIcon src={back_arrow} />
                            </div>
                        </RecentItem>
                    ))}
                </RecentSection>
                <SectionLabel>카테고리</SectionLabel>

                <CategorySection>
                    {categoryArr.map(category => (
                        <Link to={'/theme/git/'}>
                            <CategoryItem>
                                <CategoryThumbnail src={null} />
                                <CategoryInfo>
                                    <header>{category.title}</header>
                                    <p>{category.desc}</p>
                                    <span>post - {category.cnt}</span>
                                </CategoryInfo>
                            </CategoryItem>
                        </Link>
                    ))}

                    {/* <div>알고리즘,cs</div> */}
                    {/* <div>장고</div> */}
                    {/* <div>html,css,js</div> */}
                    {/* <div>React,RN</div> */}
                </CategorySection>
                {/* <LeftSection>
                    <Article>
                        <Link to={_.toLower(FrontEndArticle.fields.slug)}>
                            <ArticleTitle>
                                <UnderLine>
                                    {FrontEndArticle.frontmatter.title}
                                </UnderLine>
                            </ArticleTitle>
                            <ArticleInfo>
                                <ArticleTagContainer>
                                    {FrontEndArticle.frontmatter.category.map(
                                        item => (
                                            <ArticleTagItem>
                                                {item}
                                            </ArticleTagItem>
                                        )
                                    )}
                                </ArticleTagContainer>
                                <ArticleDate>
                                    {FrontEndArticle.frontmatter.date}
                                </ArticleDate>
                            </ArticleInfo>
                            <ArticleContent>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: FrontEndArticle.html,
                                    }}
                                />
                            </ArticleContent>
                        </Link>
                    </Article>

                    <LeftContainer></LeftContainer>
                </LeftSection>
                <RightSection>
                    {SubArticle.map(item => (
                        <SmallArticle>
                            <Link
                                to={_.toLower(item.edges[0].node.fields.slug)}
                            >
                                <SmallArticleTitle>
                                    {item.edges[0].node.frontmatter.title}
                                </SmallArticleTitle>
                                <SmallArticleInfo>
                                    <ArticleTagContainer>
                                        {item.edges[0].node.frontmatter.category.map(
                                            item => (
                                                <ArticleTagItem>
                                                    {item}
                                                </ArticleTagItem>
                                            )
                                        )}
                                    </ArticleTagContainer>
                                    <ArticleDate>
                                        {item.edges[0].node.frontmatter.date}
                                    </ArticleDate>
                                </SmallArticleInfo>
                                <SmallArticleContent>
                                    {item.edges[0].node.excerpt}
                                </SmallArticleContent>
                            </Link>
                        </SmallArticle>
                    ))}
                </RightSection> */}

                {/* <div className={main.maintop_option}>
                <span>
                    <h2 className={main.main_title}>모든 글</h2>

                    <span className={main.main_postcnt}>
                        ({allPosts.length} Posts)
                    </span>
                </span>
            </div>

            <div className={main.main_post_container}>
                {allPosts.map(({ node }) => (
                    <div className={main.main_post_section} key={node.id}>
                        <Link
                            className={main.main_post_link}
                            to={node.fields.slug}
                        >
                            <div className={main.main_post_overflow}>
                                <h2 className={main.main_post_title}>
                                    {node.frontmatter.title}

                                    <div className={main.main_post_date}>
                                        {node.frontmatter.category.map(
                                            category_item => (
                                                <span
                                                    key={category_item}
                                                    className={_.capitalize(
                                                        category_item
                                                    )}
                                                >
                                                    {_.capitalize(
                                                        category_item
                                                    )}
                                                </span>
                                            )
                                        )}
                                        <SVG
                                            name="edit"
                                            width="20px"
                                            height="20px"
                                            color="#aaa"
                                        ></SVG>{' '}
                                        {node.frontmatter.date}
                                    </div>
                                </h2>

                                <div
                                    className={main.main_post_content}
                                    dangerouslySetInnerHTML={{
                                        __html: node.excerpt,
                                    }}
                                />
                            </div>
                        </Link>
                    </div>
                ))}
            </div> */}
                {/* </IndexContainer> */}
            </Layout>
        </>
    );
};

export const query = graphql`
    query MyQuery {
        allMarkdownRemark(
            filter: { frontmatter: { draft: { eq: false } } }
            sort: {
                order: [DESC, DESC]
                fields: [frontmatter___date, frontmatter___title]
            }
        ) {
            totalCount
            edges {
                node {
                    id
                    excerpt(pruneLength: 200, truncate: true)
                    html
                    frontmatter {
                        title
                        date
                        category
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;

export default IndexPage;

const IndexContainer = styled.section`
    border: 2px solid black;
    border-radius: 40px;
    border-top-right-radius: 0;
    background-color: ${COLORS.primaryColor};
`;
const LeftRadiusBox = styled.div`
    left: 0;
    width: 100px;
    height: 100px;
    background-color: #90a6a2;
    position: absolute;
    z-index: -1;
`;
const LeftSection = styled.section`
    /* border: 2px solid red; */
    flex: 2;
    margin-right: 2rem;

    @media (max-width: 768px) {
        margin-right: 0rem;
        margin-bottom: 2rem;
    }
    /* 
    background: white;

    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.4),
        rgba(255, 255, 255, 0.3)
    ); */
    position: relative;
    display: flex;
    /* background: white;
    /* rgba(199, 245, 147, 0.4), 
     rgba(245, 211, 162, 0.4)*/
    background: linear-gradient(
        to right bottom,
        rgba(245, 211, 162, 0.4),
        rgba(245, 211, 162, 0.2)
    );
    overflow: hidden;

    box-shadow: 4px 4px 6px 0 rgb(0 0 0 / 10%),
        -4px -4px 6px rgba(255, 255, 255, 0.1);
`;

const LeftContainer = styled.section`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 1rem;
    top: 1rem;
    background: white;
    /* rgba(199, 245, 147, 0.4), 
     rgba(245, 211, 162, 0.4)*/
    background: linear-gradient(
        to top,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0.2)
    );
`;

const Article = styled.div`
    z-index: 2;
    display: flex;
    flex-direction: column;
    padding: 2rem;
`;
const RightSection = styled.section`
    /* border: 2px solid red; */
    flex: 1;
    margin-left: 2rem;
    @media (max-width: 768px) {
        margin-right: 2rem;
    }

    display: flex;

    flex-direction: column;
`;

const ArticleTitle = styled.h1`
    font-weight: 700;
    font-size: 3rem;
    color: rgba(0, 0, 0, 0.8);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3),
        -1px -1px 2px rgba(255, 255, 255, 1);
`;
const ArticleInfo = styled.div`
    display: flex;
    justify-content: space-between;
`;
const ArticleTagContainer = styled.div``;

const ArticleTagItem = styled.span`
    font-weight: 700;
    color: rgb(250, 187, 12);
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.2),
        -0.5px -0.5px 1px rgba(255, 255, 255, 1);

    & + & {
        margin-left: 2rem;
    }
`;
const ArticleDate = styled.span`
    color: rgba(0, 0, 0, 0.7);
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3),
        -0.5px -0.5px 1px rgba(255, 255, 255, 1);
`;

const ArticleContent = styled.div`
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    /* 얘는 21번째 줄에 말줄임표를 넣어주는 애 */
    display: -webkit-box;
    -webkit-line-clamp: 18;
    -webkit-box-orient: vertical;
    margin-top: 1.5rem;
`;

const SectionLabel = styled.header`
    color: ${COLORS.textColor};
    padding-left: 24px;
    font-size: 2rem;
    font-weight: 700;
    /* border: 2px solid red; */
    margin-top: 12px;
`;
const RecommendSection = styled.section`
    /* border: 1px solid green; */

    padding: 16px 32px;
    /* height: 400px; */

    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    align-items: center;
    justify-content: flex-start;

    & > a + a {
        margin-left: 24px;
    }
`;
const RecommendItem = styled.div`
    flex-shrink: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 4px;

    /* border: 1px solid gray; */

    & > img {
        width: 240px;
        height: 180px;
        opacity: 0.7;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;

        overflow: hidden;
        object-fit: cover;
        object-position: center;
        border-radius: 8px;
        /* border: 1px solid gray; */
        background-color: #000000;
    }

    /* 앨범커버의 설명이 들어가는 부분  */
    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        /* border: 1px solid red; */
        margin-top: 4px;
        color: ${COLORS.textColor};
        padding: 4px;
        border: 1px solid gray;
        border-radius: 4px;
    }

    /* 앨범의 제목 */
    & > div > header {
        font-size: 1.6rem;
        font-weight: 700;
    }
`;
const RecommendItemLabel = styled.div`
    /* border: 1px solid gray; */
    display: flex;

    & > p {
        font-size: 1.2rem;
        font-weight: 500;
    }

    & > p + p {
        margin-left: 8px;
    }
`;

const RecentSection = styled.section`
    /* border: 1px solid gray; */
    padding: 0px 32px;
`;
const RecentItem = styled.div`
    /* border: 1px solid gray; */

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0px;

    & + & {
        border-top: 1px solid gray;
    }
    & > div {
        /* border: 1px solid gray; */
        display: flex;
    }
`;
const RecentItemIndex = styled.span`
    /* border: 1px solid gray; */
    font-weight: 700;
    margin-right: 16px;
    display: flex;
    align-items: center;
`;
const RecentItemThumbNail = styled.div`
    /* border: 1px solid gray; */
    width: 32px;
    height: 32px;
    margin-right: 12px;
    background-color: #000000;
    border-radius: 4px;
`;
const RecentItemTitle = styled.div`
    /* border: 1px solid gray; */
    font-size: 1.4rem;
    font-weight: 700;
    display: flex;
    align-items: center;
`;
const RecentItemDate = styled.span`
    /* border: 1px solid gray; */
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    margin-right: 8px;
`;
const RecentItemIcon = styled.img`
    width: 24px;
    height: 24px;
    /* border: 1px solid gray; */
    transform: rotate(180deg);
`;
const CategorySection = styled.section`
    /* border: 1px solid gray; */
    /* overflow-x: scroll; */
    overflow-x: scroll;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding: 24px 32px;
    & > a + a {
        margin-left: 24px;
    }
`;

const CategoryItem = styled.div`
    width: 300px;

    flex-shrink: 0;
    color: ${COLORS.textColor};

    display: flex;
    align-items: center;
    padding: 12px;

    border: 1px solid gray;
    border-radius: 8px;
    /* background: linear-gradient(145deg, #292b37, #22242e); */
    /* box-shadow: 12px 12px 24px #20222b, -12px -12px 24px #2c2e3b; */
`;

const CategoryThumbnail = styled.img`
    @keyframes RotateImg {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
    height: 92px;
    width: 92px;
    flex-shrink: 0;

    border-radius: 50%;

    margin-right: 12px;
    background-color: #000000;

    /* border: 1px solid gray; */
    /* transition: all 1s linear; */
    @media only screen and ${DEVICE.laptop} {
        &:hover {
            animation-duration: 3s;
            animation-name: RotateImg;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }
    }
`;

const CategoryInfo = styled.div`
    /* border: 1px solid gray; */
    display: flex;
    flex-direction: column;

    & > header {
        font-size: 1.6rem;
        font-weight: 700;
        /* border: 1px solid gray; */
    }

    & > p {
        font-size: 1.2rem;
        font-weight: 500;
        /* border: 1px solid gray; */
        /* overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; */
        margin: 6px 0px;
    }
    & > span {
        /* border: 1px solid gray; */

        font-size: 1rem;
        font-weight: 300;
    }
`;
