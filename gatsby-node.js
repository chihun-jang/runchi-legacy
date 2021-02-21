/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require(`gatsby-source-filesystem`);

const path = require(`path`);
const _ = require('lodash');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const blogTemplate = path.resolve('./src/templates/blog-post.js');

    const categoryPage = path.resolve('./src/templates/categoryPage.js');
    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    const result = await graphql(
        `
            query {
                allMarkdownRemark(
                    sort: { fields: frontmatter___date, order: DESC }
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
        `
    );

    // 블로그 글을 적은 post의 list를 가져온다.
    const groups = result.data.allMarkdownRemark.group;
    // Create post detail pages path와 사용할 component, 그리고 context를 설정해준다.
    groups.forEach(group =>
        group.edges.map(edge =>
            createPage({
                path: `${_.toLower(edge.node.fields.slug)}`,
                component: blogTemplate,
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    //아래 슬러그를 안넘겨주면 blog-post 에서 detail page 를 만들어주는 부분에서 slug를 제대로 받아오지 못해서
                    // 쿼리문을 제대로 못날려준다
                    slug: edge.node.fields.slug,
                },
            })
        )
    );
    // Extract tag data from query
    // 카테고리 List를 들고와서 사용해주자.

    // Make category pages
    groups.forEach(category => {
        createPage({
            path: `/category/${_.toLower(category.fieldValue)}/`,
            component: categoryPage,
            context: {
                category: category.fieldValue,
            },
        });
    });
};

// Node를 만드는데 markdownRemark type일때 아래와같이 만들어준다.
exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `posts` });
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        });
    }
};
