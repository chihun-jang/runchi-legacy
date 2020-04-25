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

    const tagTemplate = path.resolve("src/templates/tags.js")

    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    const result = await graphql(
        `
            query {
                allMarkdownRemark {
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
            }
        `
    )

    const result2 = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tag
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tag) {
          fieldValue
        }
      }
    }
  `)
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: blogTemplate,
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.fields.slug,
            },
        })
    })

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.category,
            component: blogCategory,
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                category: node.frontmatter.category,
                slug: node.fields.slug,
            },
        })
      

        
    })


    const posts2 = result2.data.postsRemark.edges
    // Create post detail pages
    posts2.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: blogTemplate,
        })
    })
    // Extract tag data from query
    const tags = result2.data.tagsGroup.group
    // Make tag pages
    tags.forEach(tag => {
        createPage({
            path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
            component: tagTemplate,
            context: {
                tag: tag.fieldValue,
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
        value: node.frontmatter.category  + slug,
    })
  }
}