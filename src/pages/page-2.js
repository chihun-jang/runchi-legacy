import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>두번째 Link Page</h1>
    <p>페이지 2번째의 p</p>
    <Link to="/">홈으로</Link>
  </Layout>
)

export default SecondPage
