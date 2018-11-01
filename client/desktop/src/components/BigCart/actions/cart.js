const OPEN = "cart/OPEN";
const CLOSE = "cart/CLOSE";
const TOGGLE = "cart/TOGGLE";

const initState = {
    open: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case OPEN:
            return {
                ...state,
                open: true
            }

        case CLOSE:
            return {
                ...state,
                open: false
            }

        case TOGGLE:
            return {
                ...state,
                open: !state.open
            }
    
        default:
            return state
    }
}

export const openCart = () => {
    return {
        type: OPEN
    }
}

export const closeCart = () => {
    return {
        type: CLOSE
    }
}

export const toggleCart = () => {
    return {
        type: TOGGLE
    }
}