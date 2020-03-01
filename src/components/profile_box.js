import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import main from '../styles/main.module.css'
import ProfileImage from "./profile_image"

const ProfileBox = () => (
    <div className={main.profile_box}>
        <ProfileImage />
        <p className={main.profile_info}>chihun jang</p><br></br>
        <p className={main.profile_info}>벽에 그리는 키처럼 제 삶을 기록하는 곳입니다.</p>
    </div>
)



export default ProfileBox
