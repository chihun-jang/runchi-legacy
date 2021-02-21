import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';

export const useAllPosts = category => {
    const { allMarkdownRemark } = useStaticQuery(graphql`
        {
            allMarkdownRemark(
                sort: { fields: frontmatter___date, order: DESC }
                filter: { frontmatter: { draft: { eq: false } } }
            ) {
                group(field: frontmatter___category) {
                    fieldValue
                    edges {
                        node {
                            frontmatter {
                                date(locale: "")
                                draft
                                title
                                category
                            }
                            html
                            excerpt(
                                format: PLAIN
                                pruneLength: 100
                                truncate: true
                            )
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
        }
    `);
    // console.log(
    //     '이게 들어오네',
    //     allMarkdownRemark.group.filter(item =>
    //         category.includes(item.fieldValue)
    //     )
    // );
    if (category !== undefined)
        return allMarkdownRemark.group.filter(item =>
            category.includes(item.fieldValue)
        );

    return allMarkdownRemark.group;
};
