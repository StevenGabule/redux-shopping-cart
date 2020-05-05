import {
    ADD_TO_CART,
    CHECKOUT_REQUEST,
    CHECKOUT_FAILURE
} from '../constants/ActionTypes'

const initialState = {
    addedIds: [],
    quantityByIds: {}
};

const addedIds = (state = initialState.addedIds, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.indexOf(action.productId) !== -1 ) {
                return state;
            }
            return [...state, action.productId];
        default:
            return state;
    }
};

const quantityById = (state = initialState.quantityByIds, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const { productId} = action;
            return {
                ...state,
                [productId]: (state[productId] || 0) + 1
            };
        default:
            return state;
    }
};

export const getQuantity = (state, productId) => state.quantityByIds[productId] || 0;

export const getAddedIds = state => state.addedIds;

const cart = (state= initialState, action) => {
    switch (action.type) {
        case CHECKOUT_REQUEST:
            return initialState;
        case CHECKOUT_FAILURE:
            return action.cart;
        default:
            return {
                addedIds: addedIds(state.addedIds, action),
                quantityByIds: quantityById(state.quantityByIds, action)
            }
    }
};

export default cart;
