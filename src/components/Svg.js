import React from 'react';

const svg = {
    edit: 'M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z'
}



const SVG = (props) => {
    return(
        <svg
            x="0px" y="0px"
            width={props.width ? props.width : "auto"}
            height={props.height ? props.height : "auto"}
            viewBox="0 0 24 24"

            stroke="currentColor"
            fill={props.color}

            // strokeWidth={2}
            // className="feather feather-edit-3"
            // strokeLinecap="round"
            // strokeLinejoin="round"
            // {...props}
            >
            <path
                // fill={props.color}
                d={svg[props.name]}
            />
        </svg>
    )
}

export default SVG;
