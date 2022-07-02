import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterCategoryThunk } from '../store/slices/products.slice';
import { addToCartThunk } from '../store/slices/cart.slice';

const ProductDetails = () => {

    const [ products, setProducts ] = useState({})

    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()

    const productsList = useSelector(state => state.products)

    useEffect(() => {
        axios
            .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/")
            .then(res => {
                const productSearch = res.data.data.products?.find(productItem => productItem.id === Number(id))
                setProducts(productSearch)
                dispatch(filterCategoryThunk(productSearch?.category.id))
            })
    }, [dispatch, id])


    
    const [ quantity, setQuantity ] = useState(1)

    const addProduct = () => {
        const product = {
            id: id,
            quantity: quantity
        }
        /* console.log(product); */
        dispatch(addToCartThunk(product))
    }

    return (
        <div className='content mt'>
            <section className="product-detail">
                <div className="index-detail">
                    <span onClick={() => navigate("/")} style={{cursor:"pointer"}}>Home</span>
                    <div className="dot-index"></div>
                    <b>{products.title}</b>
                </div>
                
                <div className="product-container">

                    <div className="product-image">
                        <div className="image-container">
                            <img src={products.productImgs?.[0]} alt="" style={{width:"250px", height:"200px"}}/>
                            
                        </div>
                    </div>

                    <div className="product-info">
                        <p><b>{products.title}</b></p>

                        <div className="product-info1">

                            <div>
                                <p className='price'><span>Price</span> $ {products.price}</p>
                                <p className="input-title">Quantity</p>
                                <input 
                                    type="number" 
                                    min="1"     
                                    max="10" 
                                    className='input-addtocart' 
                                    placeholder='1'
                                    onChange={e => setQuantity(e.target.value)}
                                    value={quantity}
                                />
                                <button className='addtocart-btn' onClick={addProduct}>
                                    Add to cart<i className="fa-solid fa-cart-shopping"></i>
                                </button>
                            </div>
                            <div>
                                <p className="product-description">{products.description}</p>
                            </div>

                        </div>
                        
                    </div>

                </div>
                                 
                <div className="relatedProducts">
                    <h4>Discover similar items</h4>
                    <div className="relatedProducts-card-container">
                        {
                            productsList.map(productItem => (
                                <li 
                                    key={productItem.id} 
                                    style={{cursor: "pointer", listStyle:"none"}}>
                                    <div className="relatedProducts-card">
                                        <img src={productItem.productImgs[0]} alt="" style={{width:"200px", height:"150px"}} onClick={() => navigate(`/products/${productItem.id}`)}/>
                                        <p className='title' onClick={() => navigate(`/products/${productItem.id}`)}>{productItem.title}</p>
                                        <p className='price'><span>Price</span> $ {productItem.price}</p>
                                        <button className="cart-add" onClick={addProduct}>$</button>
                                    </div>
                                </li>
                            ))
                        }
                    </div>
                </div>                  
                          
                                         
                                        
                                
                          
                    
              
            </section>
            {/* <footer className='footer-detail'>
                <p>©Academlo 2002</p>
            </footer> */}
        </div>
    );
};

export default ProductDetails;