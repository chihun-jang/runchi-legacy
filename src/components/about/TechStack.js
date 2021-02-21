import React from 'react';
import styled, { css } from 'styled-components';

const TechStack = ({ stack }) => {
    return (
        <>
            <TechHeader>🌲 Tech Stack</TechHeader>
            <StackSection>
                {stack.map(item => (
                    <StackItem>
                        <DotLabel>{item.name}</DotLabel>
                        <DotLine score={item.score}>
                            <Dot></Dot>
                            <StackInfo>{item.desc}</StackInfo>
                        </DotLine>
                        <DotMargin></DotMargin>
                    </StackItem>
                ))}
            </StackSection>
        </>
    );
};

export default TechStack;

const TechHeader = styled.header`
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3),
        -0.5px -0.5px 1px rgba(255, 255, 255, 1);
`;

const StackSection = styled.article`
    flex: 3;
    width: 100%;
    display: flex;
    margin-top: 2rem;
    padding-bottom: 1rem;
    align-items: flex-end;
    @media (max-width: 1024px) {
        height: 250px;
    }
    flex-wrap: nowrap;
    overflow: auto;

    ::-webkit-scrollbar {
        height: 1rem;
        width: 0rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: none;
        cursor: pointer;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(
            to right,
            rgba(245, 211, 162, 0.8),
            rgba(199, 245, 147, 0.8)
        );
        border-radius: 0.5rem;
        cursor: pointer;
    }

    box-shadow: 2px 1.5px 4px 0 rgb(0 0 0 / 10%),
        -2px 0px 4px rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
`;
const StackItem = styled.li`
    flex: 0 0 75px;
    height: 100%;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column-reverse;
`;
const DotLabel = styled.span`
    height: 25px;
`;
const DotMargin = styled.span`
    flex: 1;
`;
const DotLine = styled.div`
    flex: ${props => props.score};
    background-color: #f59982;
    width: 0.5px;
    margin: 0 auto;
    position: relative;
`;

const Dot = styled.span`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #f59982;

    position: absolute;
    left: calc(50% - 4px);
    top: 0px;
    &:hover,
    &:active {
        width: 12px;
        height: 12px;
        top: -2px;
        left: calc(50% - 6px);
        cursor: pointer;
    }

    &:hover + span,
    &:active + span {
        transform: scale(1);
    }
`;

const StackInfo = styled.span`
    position: absolute;
    width: 100px;
    padding: 0.5rem;
    top: 15px;
    left: -30px;
    transform: scale(0);

    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;

    background: #e1efa4;
    border: 3px solid rgba(245, 153, 130, 1);

    z-index: 3;
`;
