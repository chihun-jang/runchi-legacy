import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import post_detail from '../styles/post_detail.module.css'
import SVG from '../components/svg'
import SEO from "../components/seo"
const _ = require("lodash")

export default ({ data }) => {
    const post = data.markdownRemark

    // const { ogimage } = post.frontmatter
    // const ogImagePath = ogimage && ogimage.childImageSharp.fixed.src

    return (
      <Layout >
        <SEO 
          title={post.frontmatter.title}
          description={post.frontmatter.desc} 
          // image={ogImagePath}

          />


        <div className={post_detail.post_container}>
          <h2 className={post_detail.post_title}>
            {post.frontmatter.title}
           
            <div className={post_detail.post_date}>
              <span className={_.capitalize(post.frontmatter.category)}>
                {_.capitalize(post.frontmatter.category)}
              </span>
              <SVG name="edit" width="20px" height="20px" color="#aaa" ></SVG> {post.frontmatter.date}
            </div>

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
           query ($slug: String){
               markdownRemark(
                   fields: { slug: { eq: $slug } }
               ) {
                   html
                   frontmatter {
                       title
                       date
                       category
                   }
               }
           }
       `

// 필요하다면 category와 같은 레벨로 og image를 query로 날려서 불러올수있따.

// ogimage {
//   childImageSharp {
//     fixed {
//       src
//     }
//   }
// }