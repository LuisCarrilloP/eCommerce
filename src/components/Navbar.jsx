import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartThunk } from '../store/slices/cart.slice';
import CartSidebar from './CartSidebar';

const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = () => localStorage.setItem("token", "")

    useEffect(() => {
        dispatch(getCartThunk())
    }, [dispatch])

    return (
        <div>
            <div className='navbar'>
                <div className="banner">
                    <h3 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>e-commerce</h3>
                </div>
                <div className="navbar-links">
                    <i className="fa-solid fa-user" onClick={() => navigate("/login")}></i>
                    <i className="fa-solid fa-box-archive" onClick={() => navigate("/purchases")}></i>
                    <input type="checkbox" id="check" />
                    <label htmlFor="check">
                        <i className="fa-solid fa-cart-shopping" id='btn' /* onClick={handleShow} */></i>
                        <i className="fa-solid fa-xmark" id='cancel'></i>
                    </label>
                    <div className='sidebar'>
                        <header className='sidebar-header'>Carrito de compras</header>
                        <CartSidebar
                            /* show={show} handleClose={handleClose} */
                        />
                    </div>
                    <i className="fa-solid fa-arrow-right-from-bracket" onClick={logout}></i>
                </div>
            </div>
            
        </div>
    );
};

export default Navbar;