import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import main from '../styles/main.module.css'

const Header = ({ siteTitle }) => (
  <header 
    className={main.gnb_nav}
    
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
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
