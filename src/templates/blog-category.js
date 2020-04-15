import React from 'react'
import { Link,graphql } from 'gatsby'

import Layout from '../components/layout'

export default ({ data }) => {
    const post = data.markdownRemark
    return (
        <Layout>
            <div>
                <Link to={post.fields.slug}>
                    <h1>{post.frontmatter.title}</h1>
                    <p>작성일 : {post.frontmatter.date}</p>
                </Link>
                {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}
            </div>
        </Layout>
    )
}
export const query = graphql`
           query($category: String!) {
               markdownRemark(frontmatter: { category: { eq: $category } }) {
                   fields {
                       slug
                   }
                   frontmatter {
                       category
                       date
                       title
                   }
               }
           }
       `
