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
        <h3>운동</h3>
        <h3>프로그래밍</h3>
        <h3>사람좋아함</h3>
        <h3>본래전공은수학</h3>
        <h3>멋쟁이사자처럼 부산대</h3>
        <h3>멋쟁이사자처럼 직장인 강사</h3>
        <h3>모 스타트업 웹 풀스택 개발자</h3>
        {/* <p>Runchi Blog를 찾아주셔서 감사합니다. 🙂</p> */}
        
    </Layout>
)

export default SecondPage
 