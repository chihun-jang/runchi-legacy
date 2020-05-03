import React from 'react'
import { useStaticQuery,Link,graphql } from 'gatsby'

import Layout from '../components/layout'
import post_detail from '../styles/post_detail.module.css'
import SVG from '../components/svg'

const _ = require("lodash")

// 이 페이지는 Category를 누른다음에 Category에 해당하는 post가 보이는 page
const Category =  ({ pageContext, data }) => {


    // const categoryposts = useStaticQuery(graphql`
    //     query($category: String) {
    //         allMarkdownRemark(
    //             sort: { fields: [frontmatter___date], order: DESC }
    //             filter: { frontmatter: { category: { in: [$category] } } }
    //         ) {
    //             totalCount
    //             edges {
    //                 node {
    //                     fields {
    //                         slug
    //                     }
    //                     frontmatter {
    //                         title
    //                         category
    //                         date
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // `)
    const {category} = pageContext
    const { edges, totalCount } = data.allMarkdownRemark

    const posts = data.allMarkdownRemark.edges
    return (
        <Layout>
            {posts.map(({ node }) => (
                <div className={post_detail.post_container} key={node.fields.slug}>
                    <Link to={node.fields.slug}>
                        <h2 className={post_detail.post_title}>
                            {node.frontmatter.title}
                            
                            <div className={post_detail.post_date}>
                                {node.frontmatter.category.map((category_item) => (
                                    <span key={category_item} className={_.capitalize(category_item)}>{_.capitalize(category_item)}</span>
                                ))}
                                
                                <span><SVG name="edit" width="20px" height="20px" color="#aaa" ></SVG> {node.frontmatter.date}</span>
                            </div>

                        </h2>
                    </Link>
                </div>
            ))}
        </Layout>
    )
}

export default Category


// Tags.propTypes = {
//     pageContext: PropTypes.shape({
//         tag: PropTypes.string.isRequired,
//     }),
//     data: PropTypes.shape({
//         allMarkdownRemark: PropTypes.shape({
//             totalCount: PropTypes.number.isRequired,
//             edges: PropTypes.arrayOf(
//                 PropTypes.shape({
//                     node: PropTypes.shape({
//                         frontmatter: PropTypes.shape({
//                             title: PropTypes.string.isRequired,
//                         }),
//                         fields: PropTypes.shape({
//                             slug: PropTypes.string.isRequired,
//                         }),
//                     }),
//                 }).isRequired
//             ),
//         }),
//     }),
// }


export const categoryposts = graphql`
        query($category: String) {
            allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC },
                filter: {frontmatter: {draft: {eq: false}, category: {in: [$category]}}}
            ) {
                totalCount
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            category
                            date
                        }
                    }
                }
            }
        }
    `