import React from "react"
import { useStaticQuery,Link,graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const CategoryPage = () => {


    const category = useStaticQuery(graphql`
    query CategoryQuery{
            allMarkdownRemark(limit: 1000) {
            group(field: frontmatter___category) {
                fieldValue
                totalCount
                }
            totalCount
            edges {
            node {
                id
                excerpt
                html
                frontmatter {
                title
                date
                category
                }
                fields {
                    slug
                }
                }
            }
        }
    }
  `)


    return (
        <Layout>
            <SEO title="Category" />
            <h1>목차-Category</h1>
            <p>목차를 하자</p>
            {category.allMarkdownRemark.edges.map(({ node }) => (
                <Link to={node.frontmatter.category}>
                    <div>{node.frontmatter.category}</div>
                </Link>
            ))}
        </Layout>
    )
  
}

// 여기는 댓글플러그인을 구현하기 위한 Script코드
{/* <script src="https://utteranc.es/client.js"
    repo="chihun-jang/runchi"
    issue-term="title"
    label="Comment"
    theme="photon-dark"
    crossorigin="anonymous"
    async>
</script> */}

export default CategoryPage
