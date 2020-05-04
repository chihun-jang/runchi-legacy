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
        <br></br>
        <h5>About 페이지도 꾸며갈 예정입니다. </h5>
            <h5>문의사항은 jang.chihun@gamil.com으로 말씀해주시면 감사하겠습니다.!</h5>
        {/* <p>Runchi Blog를 찾아주셔서 감사합니다. 🙂</p> */}
    </Layout>
)

export default SecondPage
 