import React from "react"
import { useStaticQuery,Link,graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import category from '../styles/category.module.css'

import PropTypes from 'prop-types'
const _ = require("lodash")


// 여기는 Category List를 보여주는 Page 입니다.
const CategoryList = (
    // {
    //     data: {
    //         allMarkdownRemark: { group },
    //         site: {
    //             siteMetadata: { title },
    //         },
    //     },
    // }
) => {


    const categories = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
            allMarkdownRemark(filter: {frontmatter: {draft: {eq: false}}},limit: 2000) {
                group(field: frontmatter___category) {
                    fieldValue
                    totalCount
                }
            }
        }
    `)


    return (
        <Layout>
            <SEO 
                title="Category"
                description="주제별 카테고리 확인" />

            <h1 className={category.category_title}>Category</h1>

            <section className={category.category_section}>

                {categories.allMarkdownRemark.group.map(item => (
                    <Link to={`/category/${_.kebabCase(item.fieldValue)}/`} key={item.fieldValue}>
                        <div className={category.category_item }>
                            <div className={_.capitalize(item.fieldValue)}>
                                {item.fieldValue === '멋쟁이사자처럼'
                                    ? '멋사'
                                    :_.capitalize(item.fieldValue)}</div>{' '}
                            <span className={_.capitalize(item.fieldValue)}>{item.totalCount}</span>
                        </div>
                    </Link>
                ))}

            </section>

        </Layout>
    )
  
}


CategoryList.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            group: PropTypes.arrayOf(
                PropTypes.shape({
                    fieldValue: PropTypes.string.isRequired,
                    totalCount: PropTypes.number.isRequired,
                }).isRequired
            ),
        }),
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                title: PropTypes.string.isRequired,
            }),
        }),
    }),
}




export default CategoryList
