/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require(`gatsby-source-filesystem`)

const path = require(`path`)
const _ = require("lodash")



exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions


    const blogTemplate = path.resolve('./src/templates/blog-post.js')
    const blogCategory = path.resolve('./src/templates/blog-category.js')


    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    const result = await graphql(
        `
            query {
                postsRemark: allMarkdownRemark(
                    sort: { order: DESC, fields: [frontmatter___date] }
                    limit: 2000
                ) {
                    edges {
                        node {
                            frontmatter {
                                category
                            }
                            fields {
                                slug
                            }
                        }
                    }
                }
                categorysgroup: allMarkdownRemark(limit: 2000) {
                    group(field: frontmatter___category) {
                        fieldValue
                    }
                }
            }
        `
    )




    const posts = result.data.postsRemark.edges
    // Create post detail pages
    posts.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: blogTemplate,
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                //아래 슬러그를 안넘겨주면 blog-post 에서 detail page 를 만들어주는 부분에서 slug를 제대로 받아오지 못해서
                // 쿼리문을 제대로 못날려준다 ㅠㅠ
                slug: node.fields.slug,
            },
        })
    })
    // Extract tag data from query
    // 이거 누르면 category 상세 페이지로 이동
    const categorys = result.data.categorysgroup.group
    // Make tag pages
    categorys.forEach(category => {
        createPage({
            path: `/category/${_.kebabCase(category.fieldValue)}/`,
            component: blogCategory,
            context: {
                category: category.fieldValue,
            },
        })
    })



}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
        node,
        name: `slug`,
        value: slug,
    })
  }
}