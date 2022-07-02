import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buyCartThunk, removeFromCartThunk } from '../store/slices/cart.slice';

const CartSidebar = () => {

    const purchasesCart = useSelector(state => state.cart)

    const navigate = useNavigate()
    const dispatch = useDispatch()



    return (
        <div className='cart-content'>
            
            <div className="cart-body">
                {
                    purchasesCart.map(purchaseItem => (
                    <div className="cart-card" key={purchaseItem.id}>

                        <div className="cart-card1">
                            <p className='cart-purchase-brand' >{purchaseItem.brand}</p>
                            <p className='cart-purchase-title' onClick={() => navigate(`/products/${purchaseItem.id}`)} style={{cursor:"pointer"}}>{purchaseItem.title}</p>
                        </div>
                            <button className='button-remove-cart' onClick={() => dispatch(removeFromCartThunk(purchaseItem.id))}>
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        <div className="cart-card2">
                            <p className='cart-purchase-qty'>{purchaseItem.productsInCart.quantity}</p>
                            <p className='cart-purchase-total'>Total: <b>$ {(purchaseItem.price) * purchaseItem.productsInCart.quantity}</b></p>
                        </div>
                        
                    </div>
                    ))
                }
            </div>
                <button className='buy-cart' onClick={() => dispatch(buyCartThunk())}>
                    Checkout
                </button>
            
        </div>
    );
};

export default CartSidebar;