import React, { useState, Fragment, useRef, useEffect } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import SVG from '../components/svg';
import styled from 'styled-components';
import { useAllPosts } from '../queryhooks/use-all-posts';
import UnderLine from '../components/UnderLine';

const _ = require('lodash');

const IndexPage = ({ data }) => {
    const FrontEndArticle = useAllPosts(['FrontEnd'])[0].edges[0].node;
    const SubArticle = useAllPosts(['ML', 'CS', 'Diary']);
    console.log(SubArticle, '히히');
    // console.log(MLArticle, 'ggggggggg');
    // const CSArticle = useAllPosts('CS').edges[0].node;

    // const ComooArticle = useAllPosts('Comoo').edges[0].node;
    // const FrontEndArticle = useAllPosts()
    return (
        <>
            <SEO title="Home" />
            <Layout>
                <LeftSection>
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
                </RightSection>

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

const SmallArticle = styled(Article)`
    flex: 1;

    background: white;

    background: linear-gradient(
        to right top,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0.1)
    );
    & + & {
        margin-top: 2rem;
    }
`;

const SmallArticleTitle = styled(ArticleTitle)`
    font-size: 2rem;
`;

const SmallArticleInfo = styled(ArticleInfo)`
    font-size: 1.4rem;
`;

const SmallArticleContent = styled(ArticleContent)`
    font-size: 1.4rem;
`;
