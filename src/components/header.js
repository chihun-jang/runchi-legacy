import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';
import { COLORS } from '../constant';
import Category from './about/Category';
const Header = ({ siteTitle, setVisibleProfile }) => (
    <HeaderContainer>
        <BlogTitle>{siteTitle}</BlogTitle>

        <LeftRadiusBox />
    </HeaderContainer>
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
    padding: 1.2rem 2.4rem;
    /* border: 3px solid gray; */

    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;

    border-bottom-right-radius: 30px;

    position: relative;
    background-color: ${COLORS.secondaryColor};
`;

const LeftRadiusBox = styled.div`
    position: absolute;
    left: 0;
    width: 100px;
    height: 100px;
    bottom: -100px;
    background-color: ${COLORS.secondaryColor};
`;
const BlogTitle = styled.h1`
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: 0.2rem;
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3),
        -0.5px -0.5px 1px rgba(255, 255, 255, 1);
`;
