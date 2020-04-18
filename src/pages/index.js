import React,{useState, Fragment} from "react"
import { Link, graphql } from "gatsby"
import Button from '@material-ui/core/Button';

import Layout from "../components/layout"
import SEO from "../components/seo"
import main from '../styles/main.module.css'


const IndexPage = ({ data }) => {
    // const emptyQuery = ""
    // const [state, setState] = useState({
    //   filteredData: [],
    //   query: emptyQuery,
    // })
    
    const allPosts = data.allMarkdownRemark.edges
    // const { filteredData, query } = state

    // const hasSearchResults = filteredData && query !== emptyQuery

    // const posts = hasSearchResults ? filteredData : allPosts

    
    // const handleInputChange = event => {
    //     const query = event.target.value
    //     const posts = data.allMarkdownRemark.edges || []
    //     const filteredData = posts.filter(post => {
    //         // destructure data from post frontmatter
    //         const {title, category } = post.node.frontmatter
    //         return (
              
    //             title.toLowerCase().includes(query.toLowerCase()) ||
    //             category.toLowerCase().includes(query.toLowerCase()) 
    //             // (tags &&
    //             //     tags
    //             //         .join('') // convert tags from an array to string
    //             //         .toLowerCase()
    //             //         .includes(query.toLowerCase()))
    //         )
    //     })
    //     setState({
    //         query, 
    //         filteredData, 
    //     })
    // }

  return (
      <Layout>
          <SEO title="Home" />

        <h2 className={main.main_title}>
        모든 글
        </h2>
        <span className={main.main_postcnt}>({allPosts.length} Posts)</span>
      

          {/* <input
              type="text"
              placeholder="검색해보세요!"
              onChange={handleInputChange}
          /> */}

      

      {allPosts.map(({ node }) => (
              <Fragment key={node.id}>
               

                <div className={main.main_post_section} >
                  <Link className={main.main_post_link} to={node.fields.slug}>

                    <h2 className={main.main_post_title}>
                      {node.frontmatter.title}<span>{node.frontmatter.category}</span>
                    </h2>

                    <h6 className={main.main_post_date}>
                      > {node.frontmatter.date}
                    </h6>

                  </Link>
                  <div className={main.main_post_content} dangerouslySetInnerHTML={{ __html: node.html }} />
                </div>
              </Fragment>
          ))}

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
