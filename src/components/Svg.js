import React from 'react';

const svg = {
    edit: '"M12 20h9'
}

const SVG = (props) => {
    return(
        <svg
            x="0px" y="0px"
            width={props.width ? props.width : "auto"}
            height={props.height ? props.height : "auto"}
           
            viewBox="0 0 645.698 136.753">
            <path
                fill={props.color}
                d={svg[props.name]}
            />
        ></svg>
    )
}

export default SVG;
