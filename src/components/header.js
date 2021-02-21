import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';
import Category from './about/Category';

const Header = ({ siteTitle }) => (
    <>
        <HeaderContainer>
            <HeaderMenu>
                <Link to="/">
                    <Logo>{siteTitle}</Logo>
                </Link>
                <AboutMe to="/about-me">🙋‍♂️</AboutMe>
            </HeaderMenu>
            <Category />
        </HeaderContainer>
    </>
);

Header.propTypes = {
    siteTitle: PropTypes.string,
};

Header.defaultProps = {
    siteTitle: ``,
};

export default Header;

const HeaderContainer = styled.header`
    /* border: 3px solid blue; */
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    padding-bottom: 1rem;
    background: white;
    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.1)
    );
    border-radius: 1.5rem 1.5rem 0 0;

    box-shadow: 0px 2px 4px 0 rgb(0 0 0 / 10%),
        0px -2px 4px rgba(255, 255, 255, 0.1);
`;
const HeaderMenu = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
`;
const Logo = styled.h1`
    color: dimgray;
    font-weight: 900;
    font-size: 3.2rem;

    text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3),
        -2px -2px 3px rgba(255, 255, 255, 1);

    margin-right: 20px;
`;
const AboutMe = styled(Link)`
    font-size: 2.4rem;
    display: flex;
    align-items: center;
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3),
        -0.5px -0.5px 1px rgba(255, 255, 255, 1);
`;
