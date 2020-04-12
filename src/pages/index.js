import React from "react"
import { Link, graphql } from "gatsby"
import Button from '@material-ui/core/Button';

import Layout from "../components/layout"
import SEO from "../components/seo"
import main from '../styles/main.module.css'


const IndexPage = ({data}) => (
  console.log(data),
  <Layout>
    <SEO title="Home" />

    <h1>전체 글 목록</h1>
    
   



    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>

    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div className={main.main_post_section} key={node.id}>
        <Link to={node.fields.slug} >
          <h2 className={main.main_post_title}>
          {node.frontmatter.title} - {node.frontmatter.category}
          </h2><br></br>
        <p className={main.main_post_date}>{node.frontmatter.date}{" "}</p>
        </Link>
        <div dangerouslySetInnerHTML={{ __html: node.html }} />
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
`

export default IndexPage
