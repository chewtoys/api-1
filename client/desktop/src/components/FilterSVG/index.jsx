import React from "react";

const FilterSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
        <defs>
            <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                    result="goo"
                />
                {/* <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
                    result="goo"
                /> */}
                {/* <feComposite in="SourceGraphic" in2="goo" operator="atop" /> */}
                <feBlend in="SourceGraphic" in2="goo" />
            </filter>
        </defs>
    </svg>
);

export default FilterSVG;