import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {

     const { register, handleSubmit } = useForm();
    
     const navigate = useNavigate();
    


    const submit = (data) => {
        axios
            .post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
            .then(res =>{
                /* console.log(res.data.data.token) */
                localStorage.setItem("token", res.data.data.token)
                navigate("/")
                alert("Sesión iniciada correctamente")
            })
                
            .catch(error => {
                /* console.log(error.response) */

                if(error.response?.status === 404){
                alert("Credenciales incorrectas")
            }
            })
        /* console.log(data); */
    }

    return (
        <div className='mt'>
           <div className="login-container">
                <form className="login" onSubmit={handleSubmit(submit)}>
                    <strong>Welcome! Enter your email and password to continue</strong>
                    <p className='login-message'>{/* {loginMessage} */}</p>

                    <div className="test-data">
                        <b>Test data</b>
                        <div className="field">
                            <i className="icon-mail"></i>john_doe@dummy.com
                        </div>
                        <div className="field">
                            <i className="icon-lock"></i>test1234
                        </div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            id="email"
                            { ...register("email") }
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" { ...register("password") } />
                    </div>
                    <div className="error-message">{/* { error } */}</div>
                    <button className='submit-button' type='submit'>
                        Login
                    </button>

                    {/* <div className="switch-forms">
                        Don't have an account? {" "}
                        <button type="button" onClick={() => navigate("/signup")}>
                            Sign up
                        </button>
                    </div> */}
                </form>
            </div>
        </div>
    );
};

export default Login;<h1>Login</h1>