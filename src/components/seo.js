/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title,image }) {

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle : title
            defaultDescription : description
            siteUrl : siteUrl
            defaultImage:image
            
          }
        }
      }
    `
  )
  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage
  } = site.siteMetadata


    const seotitle= title || defaultTitle
    const seodescription= description || defaultDescription
    const seoimage= `${siteUrl}${image || defaultImage}`

 

  return (
      <Helmet
          htmlAttributes={{
              lang,
          }}
          title={title}
          titleTemplate={`%s | ${defaultTitle}`}
          meta={[
              {
                  name: `description`,
                  content: seodescription,
              },
              {
                  property: `og:title`,
                  content: seotitle,
              },
              {
                  property: `og:image`,
                  content: seoimage,
              },
              {
                  property: `og:description`,
                  content: seodescription,
              },
              {
                  property: `og:type`,
                  content: `website`,
              },
              {
                  name: `twitter:card`,
                  content: `summary`,
              },
              {
                  name: `twitter:creator`,
                  content: site.siteMetadata.author,
              },
              {
                  name: `twitter:title`,
                  content: title,
              },
              {
                  name: `twitter:description`,
                  content: seodescription,
              },
          ].concat(meta)}
      />
  )
}


// 아무것도 props 가 안넘어올때 기본값으로 설정해주기 위함.
SEO.defaultProps = {
    lang: `ko`,
    meta: [],
    description: `개발과 생각을 좋아하는 Runchi의 집`,
  image: '/static/runchi_icon-5a51cc9376d31ea6094f0eb14d587a76.jpg',
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
