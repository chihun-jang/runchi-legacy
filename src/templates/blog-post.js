import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SVG from '../components/svg';
import SEO from '../components/seo';
import styled from 'styled-components';

import Utterences from '../components/Utterances';
import UnderLine from '../components/UnderLine';
const _ = require('lodash');

export default ({ data }) => {
    const post = data.markdownRemark;

    return (
        <Layout>
            <SEO title={post.frontmatter.title} description={post.excerpt} />
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
            </Container>
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

const PostTitle = styled.h2`
    font-weight: 700;
    font-size: 2.5rem;
    color: dimgray;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3),
        -1px -1px 2px rgba(255, 255, 255, 1);
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

const PostDate = styled.span`
    /* border: 4px solid black; */

    color: rgba(105, 105, 105, 0.5);
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3),
        -0.5px -0.5px 1px rgba(255, 255, 255, 1);
    min-width: 10rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

const PostContent = styled.div`
    /* border: 5px solid orange; */
`;

const CustomUtterences = styled(Utterences)`
    border: 10px solid red;
    background-color: black;
    width: 100%;
    & div {
        width: 100% !important;
        border: 10px solid red;
    }
`;
