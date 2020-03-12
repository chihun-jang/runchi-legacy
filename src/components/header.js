import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import main from '../styles/main.module.css'

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `none`,
      marginBottom: `1.45rem`,
      color:`black`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div className={main.sidenav}>≡</div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
