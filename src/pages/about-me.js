import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProfileBox from '../components/profile_box'

const SecondPage = () => (
    <Layout>
        <ProfileBox></ProfileBox>
        <SEO title="About-Me" />
        <h3>Runchi Blog를 찾아주셔서 감사합니다. 🙂</h3>
        {/* <p>Runchi Blog를 찾아주셔서 감사합니다. 🙂</p> */}
        
    </Layout>
)

export default SecondPage
 