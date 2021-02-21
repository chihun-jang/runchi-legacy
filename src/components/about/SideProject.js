import React from 'react';
import styled, { css } from 'styled-components';

const SideProject = ({ sideproject }) => {
    return (
        <>
            <ProjectSectionHeader>
                🌴 Side Project <span>(205,000)</span>
            </ProjectSectionHeader>
            <ProjectSection>
                {sideproject.map(item => (
                    <ProjectNode direction={item.direction}>
                        <span>{item.period}</span>
                        <p>{item.name}</p>
                    </ProjectNode>
                ))}
                <HorizonLine />
            </ProjectSection>
        </>
    );
};

export default SideProject;

const ProjectSectionHeader = styled.header`
    & > span {
        font-size: 1.2rem;
    }
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3),
        -0.5px -0.5px 1px rgba(255, 255, 255, 1);
`;

// 사이드 프로젝트를 담아두는 Section
const ProjectSection = styled.article`
    position: relative;
    margin: 0 auto;
    padding: 2rem;
    margin: 1.5rem 0;
    width: 100%;
    min-height: 250px;

    flex: 3 0 auto;
    display: flex;
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
`;

// 프로젝트를 Line위에 표시하는 Node

const ProjectNode = styled.li`
    display: flex;
    flex: 0 0 auto;

    position: relative;

    & + & {
        margin-left: 2rem;
    }

    /* 프로젝트의 Date를 표시하기 위함. */
    & > span {
        width: 100px;
        height: 20px;
        position: absolute;
        top: calc(50% - 10px);
        left: calc(50% - 50px);
        text-align: center;
        z-index: 3;

        /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3),
            -1px -1px 2px rgba(255, 255, 255, 0.8); */
    }

    /* Side프로젝트 Name이 들어가는 부분인데
    Height부분을 조절해서 Date부분도 커버가 가능하게했다. */
    & > p {
        height: 60%;

        display: flex;
        flex-direction: column;
        padding: 1rem;

        font-size: 1.4rem;
        border-radius: 1.5rem;

        background: linear-gradient(
            to top,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0.3)
        );
        backdrop-filter: blur(1rem);

        z-index: 2;

        /* 따라서 방향이 아래라면 글들도 상자의 하단에 위치시켜 주고자한다. */
        ${props =>
            props.direction === 'bottom' &&
            css`
                justify-content: flex-end;
                background: linear-gradient(
                    to bottom,
                    rgba(255, 255, 255, 0.8),
                    rgba(255, 255, 255, 0.2)
                );
            `} /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3),
            -1px -1px 2px rgba(255, 255, 255, 0.8); */
    }

    /* 얘는 Project별 각 상자에 대해서 세로로 정렬을 해주는것으로 */
    /* 방향에따라서 박스를 위로 위치시킬지 아래로 위치시킬지 결정한다. */
    ${props =>
        props.direction === 'top' &&
        css`
            align-items: flex-start;
        `}
    ${props =>
        props.direction === 'bottom' &&
        css`
            align-items: flex-end;
        `}

     @media(max-width:768px) {
        width: unset;
    }
`;
// 가로 라인
const HorizonLine = styled.div`
    width: 150%;

    height: 2px;
    position: absolute;
    top: calc(50% - 1px);
    left: 0;
    background: black;
    @media (max-width: 1024px) {
        width: 100%;
    }
    @media (max-width: 768px) {
        width: 140%;
    }
    @media (max-width: 475px) {
        width: 250%;
    }
`;
