import React, { useState } from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SVG from '../components/svg';
import styled, { css } from 'styled-components';
import UnderLine from '../components/UnderLine';
import SEO from '../components/seo';

const _ = require('lodash');

// 이 페이지는 Category를 누른다음에 Category에 해당하는 post가 보이는 page
const Category = ({ pageContext, data }) => {
    const category = pageContext;
    const { edges, totalCount } = data.allMarkdownRemark;
    const allPosts = edges;
    console.log(category, '확인해보고 싶은데요', data);
    return (
        <Layout>
            <SEO
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
            </Container>
        </Layout>
    );
};

export default Category;

export const query = graphql`
    query($category: String) {
        allMarkdownRemark(
            filter: {
                frontmatter: {
                    draft: { eq: false }
                    category: { eq: $category }
                }
            }
            sort: { fields: frontmatter___date, order: DESC }
        ) {
            edges {
                node {
                    frontmatter {
                        category
                        date
                        title
                    }
                    excerpt(format: PLAIN, pruneLength: 200, truncate: true)
                    fields {
                        slug
                    }
                }
            }
            totalCount
        }
    }
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

const PostItem = styled.div`
    /* border: 2px solid blue; */
    padding: 2rem;
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

    border-radius: 2rem;
    & + & {
        margin-top: 3rem;
    }
`;

const PostTitle = styled.h2`
    /* border: 2px solid red; */
    font-weight: 700;
    font-size: 2.2rem;
    color: dimgray;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3),
        -1px -1px 2px rgba(255, 255, 255, 1);
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

const PostDate = styled.span`
    color: rgba(105, 105, 105, 0.5);
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3),
        -0.5px -0.5px 1px rgba(255, 255, 255, 1);
    min-width: 10rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

const PostContent = styled.p`
    /* border: 4px solid black; */
    padding-top: 2rem;
    color: #474747;
`;
