import React from 'react';
import styled, { css } from 'styled-components';

const Active = ({ active }) => {
    return (
        <>
            <ActiveHeader>🌱 Active</ActiveHeader>
            <ActiveSection>
                {active.map(item => (
                    <ActiveItem>
                        <ActiveIcon src={item.icon} alt="" />
                        <p>{item.desc}</p>
                    </ActiveItem>
                ))}
            </ActiveSection>
        </>
    );
};

export default Active;

const ActiveHeader = styled.header`
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3),
        -0.5px -0.5px 1px rgba(255, 255, 255, 1);
`;

const ActiveSection = styled.ul`
    flex: 2;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 2rem 0;
    margin-bottom: 3rem;
    padding-left: 2rem;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const ActiveItem = styled.li`
    display: flex;
    align-items: center;
    & + & {
        margin-top: 1rem;
    }
`;

const ActiveIcon = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 1rem;
`;
