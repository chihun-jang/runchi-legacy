import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
const _ = require('lodash');

const Category = () => {
    const category = [
        'FrontEnd',
        'Javascript',
        'Diary',
        'ML',
        'CS',
        'Django',
        'Algorithm',
        'AWS',
        'Co-Work',
        'HTML',
        'CSS',
        'Python',
        'React',
        'ReactNative',
    ];
    return (
        <>
            <CategoryContainer>
                {category.map(item => (
                    <CategoryItem to={`/category/${_.toLower(item)}`}>
                        <CategoryItemInner />
                        <span>{item}</span>
                    </CategoryItem>
                ))}
            </CategoryContainer>
        </>
    );
};

export default Category;

const CategoryContainer = styled.section`
    padding-bottom: 0.5rem;
    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.1)
    );

    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: mandatory;
`;

const CategoryItem = styled(Link)`
    padding: 0.5rem 2rem;
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 0.5rem;
    background: linear-gradient(
        to right top,
        rgba(245, 223, 77, 0.9),
        rgba(199, 245, 147, 0.9)
    );
    color: dimgray;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3),
        -1px -1px 2px rgba(255, 255, 255, 1);
    box-shadow: 3px 3px 4px 0 rgb(0 0 0 / 10%),
        -3px -3px 4px rgba(255, 255, 255, 0.1);

    & > span {
        z-index: 2;
    }
    & + & {
        margin-left: 2rem;
    }
    cursor: pointer;
`;

const CategoryItemInner = styled.div`
    position: absolute;
    left: 2px;
    top: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 0.5rem;

    background: linear-gradient(
        to right top,
        rgba(255, 255, 255, 0.8),
        rgba(255, 255, 255, 0.5)
    );
`;
