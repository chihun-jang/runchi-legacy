import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProfileBox from '../components/profile_box'

const SecondPage = () => (
    <Layout>
        <ProfileBox></ProfileBox>
        <SEO title="About-Me" />
        <h1>About Me</h1>
        <p>제 소개를 여기에 적을겁니다</p>
    </Layout>
)

export default SecondPage
 