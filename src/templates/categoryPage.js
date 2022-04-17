import React, { useState } from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SVG from '../components/svg';
import styled, { css } from 'styled-components';
import UnderLine from '../components/UnderLine';
import SEO from '../components/seo';
import { COLORS } from '../constant';

const _ = require('lodash');

// 이 페이지는 Category를 누른다음에 Category에 해당하는 post가 보이는 page
const Category = ({ pageContext, data }) => {
    // const category = pageContext;
    // const { edges, totalCount } = data.allMarkdownRemark;
    // const allPosts = edges;
    // console.log(category, '확인해보고 싶은데요', data);
    return (
        <Layout>
            <CategoryContainer>
                <CategoryInfoSection>
                    <CategoryName>
                        Title
                        <div>카테고리 설명 - 포스트 갯수</div>
                    </CategoryName>
                </CategoryInfoSection>
                <PostList>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
                        <Link to="/algorithm/추상화와%20캡슐화/">
                            <PostItem>
                                <PostImg />
                                <div>
                                    <PostTitle>오늘도 나는 스벅이다.</PostTitle>
                                    <PostDesc>
                                        스타벅스는 커피가 일관되어서 좋지
                                    </PostDesc>
                                </div>
                                <div>
                                    <PostDate>2022.02.01</PostDate>
                                    <PostView>3 min ago</PostView>
                                </div>
                            </PostItem>
                        </Link>
                    ))}
                </PostList>
                {/* <SEO
                title={`${category.category}`}
                description={`${category.category}(${totalCount})`}
            />

            <Container>
                <Header>
                    <UnderLine>
                        <p>{category.category}</p>
                    </UnderLine>
                    <span> ({totalCount}) </span>
                </Header>

                {allPosts.map(({ node }) => (
                    <PostItem key={node.fields.slug}>
                        <Link to={_.toLower(node.fields.slug)}>
                            <PostTitle>{node.frontmatter.title}</PostTitle>
                            <PostInfo>
                                <PostTagContainer>
                                    {node.frontmatter.category.map(item => (
                                        <PostTagItem
                                            key={item}
                                            to={`/category/${_.toLower(item)}`}
                                        >
                                            {item}
                                        </PostTagItem>
                                    ))}
                                </PostTagContainer>
                                <PostDate>{node.frontmatter.date}</PostDate>
                            </PostInfo>

                            <PostContent>{node.excerpt}</PostContent>
                        </Link>
                    </PostItem>
                ))}
            </Container> */}
            </CategoryContainer>
        </Layout>
    );
};

export default Category;

// export const query = graphql`
//     query($category: String) {
//         allMarkdownRemark(
//             filter: {
//                 frontmatter: {
//                     draft: { eq: false }
//                     category: { eq: $category }
//                 }
//             }
//             sort: { fields: frontmatter___date, order: DESC }
//         ) {
//             edges {
//                 node {
//                     frontmatter {
//                         category
//                         date
//                         title
//                     }
//                     excerpt(format: PLAIN, pruneLength: 200, truncate: true)
//                     fields {
//                         slug
//                     }
//                 }
//             }
//             totalCount
//         }
//     }
// `;

const CategoryContainer = styled.section`
    /* border: 5px solid green; */
    position: relative;
`;
const Container = styled.section`
    /* border: 2px solid red; */
    width: 100%;
    padding: 3rem;
`;

const Header = styled.header`
    padding: 1.5rem;
    margin-bottom: 2rem;
    /* border: 2px solid purple; */
    color: dimgray;

    font-size: 3rem;
    font-weight: bold;
    & p {
        z-index: 2;
    }
    & > span {
        font-size: 2.5rem;
    }
    & * {
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3),
            -1px -1px 2px rgba(255, 255, 255, 1);
    }
`;

const PostInfo = styled.div`
    /* border: 2px solid green; */
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`;

const PostTagContainer = styled.div``;

const PostTagItem = styled(Link)`
    font-weight: 700;
    color: rgb(250, 187, 12);
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3),
        -0.5px -0.5px 1px rgba(255, 255, 255, 1);

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

const PostContent = styled.p`
    /* border: 4px solid black; */
    padding-top: 2rem;
    color: #474747;
`;
const CategoryInfoSection = styled.div`
    /* border: 2px solid blue; */
    background-color: rgba(0, 0, 0, 0.5);
    height: 375px;
    position: sticky;
    top: -288px;
`;

const CategoryName = styled.header`
    font-size: 3.2rem;
    color: ${COLORS.textColor};
    padding-left: 32px;
    position: sticky;
    top: 290px;
    /* background: linear-gradient(
        to bottom,
        rgba(38, 40, 51, 0),
        rgba(255, 255, 255, 0.01)
    ); */
    padding: 8px 32px;
    /* border: 2px solid red; */
    background-color: rgba(242, 239, 235, 0.8);
    backdrop-filter: blur(1rem);

    & > div {
        font-size: 1.2rem;
        display: span;
    }
`;

const ThemeContainer = styled.section`
    /* border: 3px solid red; */
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PostList = styled.div`
    padding: 24px;
    width: calc(100%);
    /* padding-top: 12px; */

    /* 카테고리 페이지에서 포스트 리스트 링크를 블록처럼 다뤄준다. */
    & > a {
        display: block;
    }

    /* 그리고 포스트 사이 간격은 16px로 설정해준다. */
    & > a + a {
        /* margin-top: 16px; */

        border-top: 0.5px solid gray;
    }
`;
const PostItem = styled.div`
    /* border: 1px solid black; */

    padding: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;

    color: ${COLORS.textColor};

    /* 포스트 아이템 리스트의 Title과 Desc를 담고 잇는 부분 */
    & > div:nth-child(2) {
        flex: 1;
    }
    /* 포스트의 date와 읽은 시간 체크 */
    & > div:nth-child(3) {
        /* border: 3px solid #ffffff; */
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        /* max-width: 120px; */
    }
`;

const PostImg = styled.div`
    background-color: black;
    border-radius: 8px;
    width: 75px;
    height: 75px;
    margin-right: 16px;
`;

const PostTitle = styled.header`
    /* border: 2px solid red; */
    font-weight: 700;
    font-size: 1.8rem;
`;

const PostDesc = styled.div`
    /* border: 3px solid green; */
    font-size: 1.4rem;
`;

const PostDate = styled.div`
    /* border: 2px solid green; */
    font-size: 1.4rem;
    font-weight: 500;
`;
const PostView = styled.div`
    /* border: 3px solid red; */
    font-size: 1.2rem;
    font-weight: 400;
`;
