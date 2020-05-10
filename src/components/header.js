import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import main from '../styles/main.module.css'
import Search from '../components/search'
const Header = ({ siteTitle }) => (
  <header 
    className={main.gnb_nav}
  >
    <div
      className={main.gnb_container}
    >
      <h1 className={main.gnb_title} >
        <Link to="/">
          {siteTitle}
        </Link>
      </h1>
      <Link to="/about-me/"> 
      <h6 className={main.gnb_compo}>
        about me
      </h6>
      </Link>
      <Link to="/category/"> 
      <h6 className={main.gnb_compo}>
          category
      </h6>
      </Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
