import React, { useState} from 'react'
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

    const allPosts = data.allMarkdownRemark.edges

    const emptyQuery = ""
    const [state, setState] = useState({
        filteredData: [],
        query: emptyQuery,
    })

    const { filteredData, query } = state

    const hasSearchResults = filteredData && query !== emptyQuery

    const posts = hasSearchResults ? filteredData : allPosts


    const handleInputChange = event => {
        const query = event.target.value
        const posts = data.allMarkdownRemark.edges || []
        const filteredData = posts.filter(post => {
            // destructure data from post frontmatter
            const { title, category } = post.node.frontmatter
            return (
                _.toLower(title).includes(_.toLower(query)) ||
                _.toLower(category).includes(_.toLower(query))
                // (tags &&
                //     tags
                //         .join('') // convert tags from an array to string
                //         .toLowerCase()
                //         .includes(query.toLowerCase()))
            )
        })
        setState({
            query,
            filteredData,
        })
    }

    return (
        <Layout>
            <div className={post_detail.optionbar}>
            <div className={post_detail.posts_cnt}>total : {posts.length}</div>
            <input
                className={post_detail.input_box}
                type="text"
                placeholder="🔍 글 검색 "
                onChange={handleInputChange}
            />
            </div>
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
                sort: { fields: [frontmatter___date,frontmatter___title], order: [DESC,DESC] }
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