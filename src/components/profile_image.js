import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import main from '../styles/main.module.css'



const Image = () => {
  const data = useStaticQuery(graphql`
    query {
     file(relativePath: { eq: "mainprofile.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Img className={main.profile_image} fluid={data.file.childImageSharp.fluid} />
}

export default Image
