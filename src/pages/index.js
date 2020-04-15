import React,{useState} from "react"
import { Link, graphql } from "gatsby"
import Button from '@material-ui/core/Button';

import Layout from "../components/layout"
import SEO from "../components/seo"
import main from '../styles/main.module.css'


const IndexPage = ({ data }) => {
    const emptyQuery = ""
    const [state, setState] = useState({
      filteredData: [],
      query: emptyQuery,
    })
    
    const allPosts = data.allMarkdownRemark.edges
    const { filteredData, query } = state

    const hasSearchResults = filteredData && query !== emptyQuery

    const posts = hasSearchResults ? filteredData : allPosts

    
    const handleInputChange = event => {
      console.log(event.target.value)
        const query = event.target.value
        // this is how we get all of our posts
        const posts = data.allMarkdownRemark.edges || []
        // return all filtered posts
        const filteredData = posts.filter(post => {
            // destructure data from post frontmatter
            const {title, category } = post.node.frontmatter
            return (
                // standardize data with .toLowerCase()
                // return true if the description, title or tags
                // contains the query string
                title.toLowerCase().includes(query.toLowerCase()) ||
                category.toLowerCase().includes(query.toLowerCase()) 
                // (tags &&
                //     tags
                //         .join('') // convert tags from an array to string
                //         .toLowerCase()
                //         .includes(query.toLowerCase()))
            )
        })
        // update state according to the latest query and results
        setState({
            query, // with current query string from the `Input` event
            filteredData, // with filtered data from posts.filter(post => (//filteredData)) above
        })
    }

  return (
      <Layout>
          <SEO title="Home" />

          <h1>전체 글 목록</h1>

          <input
              type="text"
              placeholder="Type to filter posts..."
              onChange={handleInputChange}
          />

          <h4>{posts.length} Posts</h4>

          {posts.map(({ node }) => (
              <div className={main.main_post_section} key={node.id}>
                  <Link to={node.fields.slug}>
                      <h2 className={main.main_post_title}>
                          {node.frontmatter.title} - {node.frontmatter.category}
                      </h2>
                      <br></br>
                      <p className={main.main_post_date}>
                          {node.frontmatter.date}{' '}
                      </p>
                  </Link>
                  <div dangerouslySetInnerHTML={{ __html: node.html }} />
              </div>
          ))}

          <Link to="/page-2/">Go to page 2</Link>
      </Layout>
  )
}
  
   

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
