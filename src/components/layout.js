import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled, { css } from 'styled-components';

import Header from './header';
import '../styles/layout.css';
import { COLORS } from '../constant';
import { useState } from 'react';
import search_icon from '../asset/icon/search_opacity.png';
import home_icon from '../asset/icon/home_opacity.png';
import menu_icon from '../asset/icon/menu_opacity.png';

const Layout = ({ children, about, showHeader }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);
    const [visibleProfile, setVisibleProfile] = useState(false);
    return (
        <ResponsiveContainer>
            {showHeader && <Header siteTitle={'runchi'} />}

            <MainContainer leftTopRadius={showHeader}>
                {visibleProfile && (
                    <CloseProfileCover
                        onClick={() => setVisibleProfile(false)}
                    />
                )}
                {children}
            </MainContainer>

            <BottomNav>
                <LeftRadiusBox></LeftRadiusBox>

                <Link to="/">
                    <img src={search_icon} alt="search" />
                </Link>
                <Link to="/">
                    <img src={home_icon} alt="home" />
                </Link>
                <Link to="/theme/git/">
                    <img src={menu_icon} alt="menu" />
                </Link>

                <RightRadiusBox></RightRadiusBox>
            </BottomNav>
        </ResponsiveContainer>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;

const ResponsiveContainer = styled.section`
    background: ${COLORS.primaryColor};
    max-height: 100vh;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    /* border: 3px solid purple; */
    max-width: 768px;
    margin: 0 auto;
`;
const MainContainer = styled.main`
    flex: 1;
    border-top-right-radius: 0;

    ${({ leftTopRadius }) =>
        leftTopRadius &&
        css`
            border-top-left-radius: 40px;
        `}
    /* border-top-left-radius: 0; */
    border-bottom-right-radius: 40px;
    border-bottom-left-radius: 40px;
    /* border: 10px solid blue; */
    /* overflow-x: scroll; */
    max-height: calc(100vh - 64px);
    overflow-y: scroll;
    background-color: ${COLORS.primaryColor};
    z-index: 1;
    /* border: 2px solid black; */
`;

const BottomNav = styled.nav`
    /* border: 3px solid red; */
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    /* border: 3px solid red; */
    width: 100%;

    /* z-index: 1; */
    & > a {
        width: 48px;
        height: 48px;
        /* font-size: 3.2rem; */
        color: ${COLORS.textColor};
        & > img {
            width: 100%;
            height: 100%;
        }
    }
    background-color: ${COLORS.secondaryColor};
`;

const CloseProfileCover = styled.div`
    /* border: 3px solid red; */
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
`;

const LeftRadiusBox = styled.div`
    /* border: 2px solid red; */
    background-color: ${COLORS.secondaryColor};
    position: absolute;
    left: 0;
    top: -100px;
    width: 100px;
    height: 100px;
`;

const RightRadiusBox = styled.div`
    /* border: 2px solid blue; */
    background-color: ${COLORS.secondaryColor};
    position: absolute;

    right: 0;
    top: -100px;
    width: 100px;
    height: 100px;
`;
