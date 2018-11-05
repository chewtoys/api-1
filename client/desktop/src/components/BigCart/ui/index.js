import styled from "styled-components";
import Scroll from "react-scrollbar";

export const Cart = styled.div`
    position: fixed;
    right: 7rem;
    width: 45rem;
    height: 42rem;
    background: var(--white);
    border-radius: 1rem 1rem 0 0;
    box-shadow: var(--mainShadow);
    bottom: ${props => props.isOpen ? `0` : `calc(-100vh - 1rem)`};
    transition: ${props => props.isOpen ? `bottom .5s cubic-bezier(0.9, 0.3, 0.35, 0.62)` : `bottom .3s ease`};
`;

export const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    height: 4rem;
    justify-content: space-between;
    color: hsl(0, 0%, 16%);
    padding: 1rem;
`;

export const Close = styled.div`
    font-size: 3rem;
    line-height: 1.8rem;
    cursor: pointer;
`;

export const ScrollArea = styled(Scroll)`
    height: calc(100% - 7rem);
    padding: 0;
    & > div:first-child {
        display: grid;
        padding: 1rem 1rem 1.5rem;
        grid-template-columns: repeat(auto-fill, 23%);
        justify-content: space-between;
        grid-gap: 1rem 1rem;
        position: relative;
    } 
`;

export const Item = styled.div`
    position: relative;
    user-select: none;
    :hover {
        &:not([data-count="1"]) {
            &::before {
                top: -2px;
            }
        }
    }
    ${props => props.count > 1 ? `
    ::before {
        content: "";
        height: 1rem;
        width: 80%;
        border-radius: 1rem 1rem 0 0;
        position: absolute;
        display: block;
        top: -4px;
        left: 10%;
        background: hsl(32, 55%, 71%);
        box-shadow: var(--mainShadow);
        transition: top .3s ease;
    }
    ` : `    
    ${Count} {
        visibility: hidden;
        transform: scale(.7);
        opacity: 0;
        color: transparent;
    }
    `}
    ::after {
        content: "";
        padding-bottom: 100%;
        position: relative;
        display: block;
    }
`;

export const Image = styled.img`
    position: absolute;
    border-radius: 1rem;
    box-shadow: var(--mainShadow);
    transition: box-shadow .3s ease;
    width: 100%;
    height: 100%;
    ${Item}:hover & {
        box-shadow: 0px 5px 10px -1px hsla(0, 0%, 0%, 0.5)
    }
`;

export const ItemHover = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: hsla(0, 0%, 0%, .2);
    z-index: 5;
    border-radius: 1rem;
    opacity: 0;
    transition: opacity .3s ease;
    ${Item}:hover & {
        opacity: 1;
    }
`;

export const Count = styled.div`
    position: absolute;
    top: -15px;
    left: -12px;
    color: var(--white);
    background: var(--mainColor);
    padding: 7px 11px 7px 10px;
    font-size: 13px;
    border-radius: 1rem;
    box-shadow: 0px 2px 10px -2px hsla(0, 0%, 0%, 0.5);
    font-weight: 600;
    visibility: visible;
    opacity: 1;
    transform: scale(1);
    transition: all .4s ease;                
    transition-duration: .4s;
    transition-timing-function: ease;
    transition-property: transform, opacity, visibility;
    z-index: 10;
`;

export const Action = styled.div`
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    z-index: 5;
    color: var(--white);
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    text-shadow: 0 0 10px hsla(0, 0%, 0%, .4), 0 3px 5px hsla(0, 0%, 0%, .4);
    font-weight: 600;
    cursor: pointer;
    opacity: 0;
    transition: opacity .3s ease;
    :hover {
        opacity: 1;
    }
`;

export const Add = styled(Action)`
    border-radius: 1rem 0 0 1rem;
    left: 0;
    background: linear-gradient(to right, hsla(0, 0%, 0%, .3) 1%, hsla(0, 0%, 0%, 0) 100%);
`;

export const Remove = styled(Action)`
    border-radius: 0 1rem 1rem 0;
    right: 0;
    background: linear-gradient(to left, hsla(0, 0%, 0%, .3) 1%, hsla(0, 0%, 0%, 0) 100%);
`;

export const Price = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    font-weight: bold;
    font-size: 1.3rem;
    color: var(--white);
    z-index: 10;
    text-shadow: 0 0 10px hsla(0, 0%, 0%, .4), 0 3px 5px hsla(0, 0%, 0%, .4);
    pointer-events: none;
`;

export const Spacy = styled.div`
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 5px;
    right: 10px;
    z-index: 10;
    filter: drop-shadow(0px 2px 1px hsla(0, 0%, 0%, .5));
    color: hsl(14, 100%, 57%);
    pointer-events: none;
    & svg {
        width: 2rem;
        height: 2rem;
    }
`;

export const Order = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    height: 38rem;
    background: var(--white);
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0px -2px 10px -1px hsla(0, 0%, 0%, 0.5);
    z-index: 10000;
    bottom: ${props => props.isActive ? `0` : `-34rem`};
    transition: ${props => props.isActive ? `bottom .5s cubic-bezier(0.9, 0.3, 0.35, 0.62)` : `bottom .3s ease`};
    ${props => !props.isActive ? `      
        ${Arrow}::after {
            left: 0;
            transform: rotate(-45deg);
        }
        ${Arrow}::before {
            right: 0;
            transform: rotate(45deg);
        }
    `: ``}
`;

export const OrderTitle = styled(Title)`
    cursor: pointer;
`;

export const Arrow = styled.div`
    width: 2rem;
    height: 1.5rem;
    display: inline-block;
    position: relative;
    margin-top: 0.3rem;
    ::after, ::before {
        content: "";
        top: .5rem;
        position: absolute;
        width: 1.3rem;
        height: .3rem;
        background-color: hsl(0, 0%, 16%);
        display: inline-block;
        transition: all .2s ease;
    }
    &::after {
        left: 0;
        transform: rotate(45deg);
    }
    &::before {
        right: 0;
        transform: rotate(-45deg);
    }
`;