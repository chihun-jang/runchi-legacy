import React from "react"
import { useStaticQuery,Link,graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const CategoryPage = () => {


    const categories = useStaticQuery(graphql`
        {
            allMarkdownRemark {
                group(field: frontmatter___category) {
                    fieldValue
                    totalCount
                }
            }
        }
    `)


    return (
        <Layout>
            <SEO title="Category" />
            <h1>목차-Category</h1>
            <p>목차를 하자</p>
            {categories.allMarkdownRemark.group.map(category => (
                <Link to={category.fieldValue}>
                    <div>
                        {category.fieldValue}({category.totalCount})
                    </div>
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
