import React from "react"
import { Link, graphql } from "gatsby"
import Button from '@material-ui/core/Button';

import Layout from "../components/layout"
import ProfileBox from '../components/profile_box'
import SEO from "../components/seo"
import main from '../styles/main.module.css'


const IndexPage = ({data}) => (
  console.log(data),
  <Layout>
    <SEO title="Home" />

    <ProfileBox></ProfileBox>

    <h1>메인페이지 타이틀을 답니다.</h1>
    
   



    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link to={node.fields.slug} >
          <h2 className={main.main_post_title}>
          {node.frontmatter.title}{" "}
          </h2>
        <p className={main.main_post_date}>{node.frontmatter.date}{" "}</p>
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
          date
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
