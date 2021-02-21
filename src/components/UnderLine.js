import React from 'react';
import styled from 'styled-components';

const UnderLine = ({ children }) => {
    return (
        <UnderLineContainer>
            {children}
            <Line />
        </UnderLineContainer>
    );
};

export default UnderLine;

const UnderLineContainer = styled.div`
    /* border: 2px solid green; */
    position: relative;
    display: inline-flex;
    justify-content: flex-start;
    & * {
        z-index: 2;
    }
`;
const Line = styled.span`
    background-color: rgba(247, 213, 0, 0.3);
    height: 100%;
    width: 1rem;
    display: inline-block;
    position: absolute;
    border-radius: 0.8rem;
    bottom: 0;
    left: -1.5rem;
    z-index: 0;
`;
