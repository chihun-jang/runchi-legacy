import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const ProfileImg = () => {
    const data = useStaticQuery(graphql`
        query {
            file(relativePath: { eq: "chihun-jang.png" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return <StyledImg fluid={data.file.childImageSharp.fluid} />;
};

export default ProfileImg;

const StyledImg = styled(Img)`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    opacity: 1;
`;
