import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';
import { getPurchases } from './purchases.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})

export const { setCart } = cartSlice.actions;

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res => dispatch(setCart((res.data.data.cart.products))))
        .finally(() => dispatch(setIsLoading(false)))
}

export const addToCartThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .post("https://ecommerce-api-react.herokuapp.com/api/v1/cart/", product, getConfig() )
        .then(() =>{
            dispatch(getCartThunk())
            alert("Se añadió producto al carrito exitosamente")
        })
        .catch(error => { 
            /* console.log(error.response) */
            alert((error.response.data.message === "invalid input syntax for type integer: \"\"" ? "ingresa la cantidad" : error.response.data.message))
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const removeFromCartThunk = (productId) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${productId}`, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const buyCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases/", {}, getConfig())
        .then(() => {
            dispatch(getPurchases())
            dispatch(setCart([]))
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export default cartSlice.reducer;
