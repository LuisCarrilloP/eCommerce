import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchases } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchases())
    }, [dispatch])

    const getDate = purchaseDate => {
        const event = new Date(purchaseDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
        const date = event.toLocaleDateString('en-us', options);
        return date;  
    }


    return (
        <div className='mt'>
            <h3 className='purchasesTitle'>My purchases</h3>

            <ul className='purchases-list'>
                {
                    purchases.map(purchase => (
                        <div className='purchases-list-card' key={purchase.createdAt}>
                        <h5 key={purchase.createdAt}>{getDate(purchase.createdAt)}</h5>
                        <li  
                            key={purchase.id}
                            className="list-group-item">
                            {
                            purchase.cart.products.map(product =>(
                                <div className='purchases-info' key={product.id}>
                                
                                    <p 
                                        onClick={() => navigate(`/products/${product.id}`)}
                                        key={product.id}
                                        className="purchase-title"
                                    >
                                        {product.title}
                                        
                                    </p>
                                    <p key={product.title} className="purchase-qty">{product.productsInCart.quantity}</p>
                                    <p className="purchase-price">$ {product.price}</p>
                                </div>
                                
                                
                            ))
                            }
                        </li>
                        </div>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;