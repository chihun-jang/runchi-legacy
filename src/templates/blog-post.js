import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import post_detail from '../styles/post_detail.module.css'
import SVG from '../components/svg'

export default ({ data }) => {
    const post = data.markdownRemark
    return (
      <Layout >
        <div className={post_detail.post_container}>
          <h2 className={post_detail.post_title}>
            {post.frontmatter.title}
            <div className={post_detail.post_category}>
              <span className={ post.frontmatter.category}>
                {post.frontmatter.category}
              </span>
            </div>
            <span className={post_detail.post_date}>
              <SVG name="edit" width="20px" height="20px" color="#aaa" ></SVG> {post.frontmatter.date}
            </span>

          </h2>

          
          <div className={post_detail.post_content}>
            {/* <h1>{post.frontmatter.title}</h1> */}
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
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