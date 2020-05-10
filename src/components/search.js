// import { Link, useState, useStaticQuery } from "gatsby"
// import React from "react"

// const Search = () => {
//     // const emptyQuery = ""
//     // const [state, setState] = useState({
//     //   filteredData: [],
//     //   query: emptyQuery,
//     // })
//     const handleInputChange = event => {
//         const query = event.target.value
//         const posts = data.allMarkdownRemark.edges || []
//         const filteredData = posts.filter(post => {
//             // destructure data from post frontmatter
//             const { title, category } = post.node.frontmatter
//             return (
//                 title.toLowerCase().includes(query.toLowerCase()) ||
//                 category.toLowerCase().includes(query.toLowerCase())
//                 // (tags &&
//                 //     tags
//                 //         .join('') // convert tags from an array to string
//                 //         .toLowerCase()
//                 //         .includes(query.toLowerCase()))
//             )
//         })
//         // setState({
//         //     query,
//         //     filteredData,
//         // })
//     }
//     return(
//         <input
//             type="text"
//             placeholder="검색해보세요!"
//             onChange={handleInputChange}
//         />
//     )
// }

// export const data = useStaticQuery(graphql`
//     {
//       allMarkdownRemark(filter: {frontmatter: {draft: {eq: false}}}, sort: {order: [DESC, DESC], fields: [frontmatter___date, frontmatter___title]}) {
//         totalCount
//         edges {
//           node {
//             id
//             excerpt(pruneLength: 200)
//             html
//             frontmatter {
//               title
//               date
//               category
//             }
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `)


// export default Search
