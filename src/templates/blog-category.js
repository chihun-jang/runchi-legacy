import React from 'react'
import { Link,graphql } from 'gatsby'

import Layout from '../components/layout'
import post_detail from '../styles/post_detail.module.css'
import SVG from '../components/SVG'

export default ({ data }) => {
    const posts = data.allMarkdownRemark.edges
    return (
        <Layout>
            {posts.map(({ node }) => (
                <div className={post_detail.post_container}>
                    <Link to={node.fields.slug}>
                        <h2 className={post_detail.post_title}>
                            {node.frontmatter.title}
                            <div className={post_detail.post_category}>
                                <span className={node.frontmatter.category}>
                                    {node.frontmatter.category}
                                </span>
                            </div>
                            <span className={post_detail.post_date}>
                                <SVG name="edit" width="20px" height="20px" color="#aaa" ></SVG> {node.frontmatter.date}
                            </span>

                        </h2>
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
