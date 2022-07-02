import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, /* useParams */ } from 'react-router-dom';
/* import { addToCartThunk } from '../store/slices/cart.slice'; */
import { filterCategoryThunk, filterProductsThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    /* controlar input */
    const [ search, setSearch ] = useState("")

    //acceder al objeto
    const products = useSelector(state => state.products)

    /* categoria */
    const [ categories, setCategories ] = useState([])

    useEffect(() => {
        dispatch(getProductsThunk())

                /* categories */
        axios
            .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data.data.categories))
    }, [])

    
    const selectCategory = (id) => {
        dispatch(filterCategoryThunk(id))
        /* alert(id) */
    }


    /* *******revisar */
    const filterProductsFunction = () => {
        dispatch(filterProductsThunk(search)) //enviamos por parametros lo que insertamos en el input
        /* alert(search) */
    }

/* 
    const { id } = useParams()
    const [ quantity ] = useState(1)

    const addProduct = () => {
        const product = {
            id: id,
            quantity: quantity
        }
        //console.log(product);
        dispatch(addToCartThunk(product))
    } */


    

    return (
        <div className='mt'>
        
{/* Categorias */}
            <ul className='category-list-container'>
                {
                    categories.map(category => (
                        <li key={category.id}>
                            <p
                            onClick={() => selectCategory(category.id)}
                            style={{cursor:"pointer"}}
                            className="category-name"
                            >
                                {category.name}
                            </p>
                        </li>
                    ))
                }
            </ul>


{/* Products Filter */}            
            <div className="search">
                <form action="" className="input">
                    <input 
                        type="text" 
                        placeholder='Search a product...'
                        onChange={e => setSearch(e.target.value)}
                        value={search}/>
                    <button type="button" onClick={filterProductsFunction}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>



{/* Products lists */}
            <ul className='products-container'>
            {
                products.map(product => (
                    
                    <li key={product.id}>
                        <div 
                        className="product-card"
                        style={{cursor:"pointer"}}
                        >
                            <div className='product-image' onClick={() => navigate(`/products/${product.id}`)}>
                                <img src={product.productImgs[0]} alt="" className='over'/>
                                <img src={product.productImgs[1]} alt=""/>
                            </div>
                            <div className="product-info" onClick={() => navigate(`/products/${product.id}`)}>
                                <span className="brand"></span>
                                <strong>{product.title}</strong>
                                <span>Price</span>
                                <span className="amount">{product.price}</span>
                            </div>
                            <button className='cart-button' /* onClick={addProduct} */>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </button>
                        </div>
                    </li>
                ))
            }
            </ul>
        </div>
    );
};

export default Home;