/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { css } from 'styled-components';

import Header from './header';
import '../styles/layout.css';

const Layout = ({ children, about }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <BackGround>
            <ResponsiveContainer>
                <Header siteTitle={data.site.siteMetadata.title} />

                <MainContainer about={about}>{children}</MainContainer>
            </ResponsiveContainer>
            <div className="circle1" />
            <div className="circle2" />
        </BackGround>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;

const BackGround = styled.div`
    min-height: 100vh;
    background: linear-gradient(to right top, #f5df4d, #abf5c3);
    padding: 2rem;
    display: flex;
    justify-content: center;

    & > .circle1,
    & > .circle2 {
        background: white;
        background: linear-gradient(
            to right bottom,
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.3)
        );
        height: 20rem;
        width: 20rem;

        @media (max-width: 768px) {
            height: 10rem;
            width: 10rem;
            padding: 1rem;
        }
        position: fixed;

        border-radius: 50%;
    }
    & > .circle1 {
        left: 15%;
        bottom: 20%;
    }
    & > .circle2 {
        right: 20%;
        top: 10%;
    }
`;
// F59982;
// F5DF4D;

const ResponsiveContainer = styled.section`
    margin: 0 auto;
    width: 1024px;
    background: white;

    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.2)
    );
    backdrop-filter: blur(2rem);
    border-radius: 1.5rem;

    z-index: 2;

    @media (max-width: 1024px) {
        width: 100%;
    }
`;
const MainContainer = styled.main`
    width: 100%;
    display: flex;
    @media (max-width: 768px) {
        flex-direction: column;
    }
    ${props =>
        props.about &&
        css`
            @media (max-width: 1024px) {
                flex-direction: column-reverse;
            }
        `}
`;
