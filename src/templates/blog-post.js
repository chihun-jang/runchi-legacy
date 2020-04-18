import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default ({ data }) => {
    const post = data.markdownRemark
    return (
        <Layout>
            <h2>
              {post.frontmatter.title}
            </h2>
              {post.frontmatter.date} - {post.frontmatter.category}
            <div>
                {/* <h1>{post.frontmatter.title}</h1> */}
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </Layout>
    )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        category
      }
    }
  }
`