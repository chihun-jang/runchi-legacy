import React from 'react'
import { Link,graphql } from 'gatsby'

import Layout from '../components/layout'

export default ({ data }) => {
    const posts = data.allMarkdownRemark.edges
    return (
        <Layout>
            {posts.map(({ node }) => (
                <div>
                    <Link to={node.fields.slug}>
                        <h1>{node.frontmatter.title}</h1>
                        <p>작성일 : {node.frontmatter.date}</p>
                    </Link>
                </div>
            ))}
        </Layout>
    )
}
export const query = graphql`
           query($category: String!) {
               allMarkdownRemark(
                   filter: { frontmatter: { category: { eq: $category } } }
               ) {
                   edges {
                       node {
                           frontmatter {
                               category
                               date
                               title
                           }
                           fields {
                               slug
                           }
                       }
                   }
               }
           }
       `
