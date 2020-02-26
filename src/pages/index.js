import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  console.log(data),
  <Layout>
    <SEO title="Home" />
    <h1>메인페이지 타이틀을 답니다.</h1>
    <p>벽에 그리는 키처럼 제 삶을 기록하는 곳입니다.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>


    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link
          to={node.fields.slug}
        
        >
        <h3>
          {node.frontmatter.title}{" "}
   
        </h3>
        <p>{node.excerpt}</p>
        </Link>

      </div>
    ))}
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export const query = graphql`
query MyQuery {
  allMarkdownRemark {
    totalCount
    edges {
      node {
        id
        excerpt
        frontmatter {
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

export default IndexPage
